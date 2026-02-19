import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import { use,  useEffect,  useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../auth/AuthContext";
import { Elements } from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js';
import CheckOutForm from "../Form/CheckOutForm";


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);

const PurchaseModal = ({ isOpen, closeModal, product,refetch}) => {
//   if (!product) return null;

const {user} = use(AuthContext)

  const {
    image,
    name,
    price,
    quantity,
    category,
    description,
    seller,
    _id,
  } = product;


  const [selectedQuantity , setSelectedQuantity] = useState (1)
  const [totalPrice, setTotalPrice] = useState(price)
  const [orderData , setOrderData] = useState({

        seller,
        productId: _id,
        quantity:1,
        price: price,
        productName: name,
        productCategory: category,
        productImage: image,

  })

  useEffect(() =>{
    if(user)
  setOrderData(prev => {
    
        return {
            ...prev,
            customer : {
                name: user?.displayName,
                email: user?.email,
                image: user?.photoURL,
                    },
        }
      })
  },[user])


  const handleQuantity = value =>{
    const totalQuantity = parseInt(value)
if(totalQuantity > quantity) return  Swal.fire("You Cannot Purchase More Product");

const calculatedPrice =  totalQuantity * price
    setSelectedQuantity(totalQuantity)
    setTotalPrice(calculatedPrice)

     setOrderData (prev => {
        return {
            ...prev,
            price: calculatedPrice,
            quantity: totalQuantity,
        }
      })

  }

 

//   const handleOrder = () =>{
//     console.log(orderData)
//   }
  

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      className="relative z-50"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          className="w-full max-w-2xl rounded-3xl bg-white p-6 md:p-8 shadow-2xl transition-all"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <DialogTitle className="text-2xl text-gray-600 font-bold">
              Review Info Before Purchase
            </DialogTitle>

            <button
              onClick={closeModal}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Image */}
            <div className="rounded-2xl flex items-center justify-center overflow-hidden border">
              <img
                src={image}
                alt={name}
                className="w-full h-36 object-cover"
              />
            </div>

            {/* Info */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold">{name}</h2>

              <div className="flex items-center gap-3">
                <img
                  src={seller?.image}
                  alt="seller"
                  className="w-10 h-10 rounded-full object-cover border"
                />
                <p className="text-sm font-medium">
                  Seller: <span className="font-semibold">{seller?.name}</span>
                </p>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed"> Description :
                {description}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-xs uppercase text-gray-400">Category</p>
                  <p className="font-semibold">{category}</p>
                </div>

                <div>
                  <p className="text-xs uppercase text-gray-400">Stock</p>
                  <p
                    className={`font-semibold ${
                      quantity > 0
                        ? "text-emerald-600"
                        : "text-rose-600"
                    }`}
                  >
                    {quantity > 0 ? `${quantity} Available` : "Out of Stock"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase text-gray-400">Price per unite</p>
                <p className="text-3xl font-black text-primary">${price}</p>
              </div>
            </div>
          </div>

          <hr className="mt-7 mb-3" />
        <div><h2 className="font-bold text-gray-500">Order Info :</h2></div>
                    <div className="mt-2 mb-2">
                        <input 
                        value={selectedQuantity}
                        onChange={e => handleQuantity(e.target.value)}
                         className="border rounded-2xl px-3.5" type="number" min={1}
                           />
                    </div>

          <p >selected quantity  : {selectedQuantity}</p>
          <p className="font-bold">total price : {totalPrice}</p>

                    {/* stripe checkout form  */}
          <Elements stripe={stripePromise}>
      <CheckOutForm  totalPrice={totalPrice} orderData={orderData} closeModal={closeModal}  refetch={refetch}/>
    </Elements>

          {/* Footer */}
          <div className="flex justify-end gap-4 mt-8">
            <button 
              onClick={closeModal}
              className="px-6 py-3 rounded-xl border hover:bg-gray-50 transition"
            >
              Cancel
            </button>

         
          </div>

        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default PurchaseModal;
