import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { use, useEffect, useState } from 'react';
import  './CheckOutForm.css'
import {BeatLoader} from 'react-spinners'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../auth/AuthContext';
import Swal from 'sweetalert2';
import { CloudDownload } from 'lucide-react';



const CheckOutForm = ({totalPrice, orderData, closeModal, refetch}) => {
    const {user} = use(AuthContext)
    const axiosSecure = useAxiosSecure()
    const stripe = useStripe();
    const elements = useElements();

    const [cardError, setCardError] = useState(null)
    const [processing , setProcessing] = useState(false)
    const [clientSecret , setClientSecret] = useState('')

    useEffect(()=> {
        const getClientSecret = async () =>{
            // server request.......
            const {data} = await axiosSecure.post('/create-payment-intent', {
                quantity: orderData?.quantity, 
                productId: orderData?.productId,
            })
            setClientSecret(data?.clientSecret)
        }
        getClientSecret()
    }, [axiosSecure, orderData])

  
  //   const handleSubmit = async (event) => {
       
  //     // Block native form submission.
  //     event.preventDefault();
  
  //     if (!stripe || !elements) {
  //       // Stripe.js has not loaded yet. Make sure to disable
  //       // form submission until Stripe.js has loaded.
  //       return;
        
  //     }
  //     setProcessing(true)
  
  //     // Get a reference to a mounted CardElement. Elements knows how
  //     // to find your CardElement because there can only ever be one of
  //     // each type of element.
  //     const card = elements.getElement(CardElement);
  
  //     if (card == null) {
  //       return;
  //     }
  
  //     // Use your card Element with other Stripe.js APIs
  //     const {error, paymentMethod} = await stripe.createPaymentMethod({
  //       type: 'card',
  //       card,
  //     });
  
  //     if (error) {
  //       console.log('[error]', error);
  //       setCardError(error.message)
  //       setProcessing(false)
  //     } else {
  //       console.log('[PaymentMethod]', paymentMethod);
  //       setCardError(null)
  //     }
  //     // the money will be deducted 
  //     const result = await stripe
  //     .confirmCardPayment(clientSecret, {
  //       payment_method: {
  //         card,
  //         billing_details: {
  //           name: user?.displayName,
  //           email: user?.email,
  //         },
  //       },
  //     })

  //     if(result?.error){
  //       setCardError(result?.error?.message)
  //       return
  //     }
  //     if (result?.paymentIntent?.status === "succeeded") {
  //       // save order data in db
  //       const orderInfo = {
  //         ...orderData,
  //         transactionId: result.paymentIntent.id,
  //       };
      
  //       try {
  //         const { data } = await axiousSecure.post("/order", orderInfo);
      
  //         if (data) {
  //           await Swal.fire({
  //             icon: "success",
  //             title: "Your Order placed successfully",
  //             timer: 1500,
  //             showConfirmButton: false,
  //           });

  //           const {data:result} =await axiousSecure.patch(
  //               `/quantity-update/${orderData?.productId}`, 
  //               {quantityToUpdate: orderData?.quantity, status:'decrease'}
  //           )
  //  console.log(result);
  //           closeModal();
  //           refetch()
  //         }
  //       } catch (error) {
  //         console.error(error);
  //       } finally {
  //         setProcessing(false);
  //         setCardError(null);
  //       }
  //       // update product quantity in db from product collection 
  //     }

  //     console.log(result);
      


  //   };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!stripe || !elements || !clientSecret) return;
  
    setProcessing(true);
  
    const card = elements.getElement(CardElement);
    if (!card) return;
  
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      },
    });
  
    if (result?.error) {
      setCardError(result.error.message);
      setProcessing(false);
      return;
    }
  
    if (result?.paymentIntent?.status === "succeeded") {
      try {
        await axiosSecure.post("/order", {
          ...orderData,
          transactionId: result.paymentIntent.id,
        });
  
        await axiosSecure.patch(
          `/quantity-update/${orderData?.productId}`,
          { quantityToUpdate: orderData?.quantity }
        );
  
        
        closeModal();
        refetch();
  
        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          timer: 1500,
          showConfirmButton: false,
        });
  
      } catch (err) {
        console.error(err);
      } finally {
        setProcessing(false);
      }
    }
  };
  
  
    return (
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            disableLink: true,
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        {
            cardError && <p className='text-red-500 mb-5'>{cardError}</p>
        }
        <button className='btn' type="submit" disabled={!stripe || processing}>
          {processing? <BeatLoader /> : `Pay ${totalPrice}$`}
        </button>
      </form>
    );
};

export default CheckOutForm;

