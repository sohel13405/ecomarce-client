import React, { use, useState } from 'react';
import AddProductForm from '../../components/Form/AddProductForm/AddProductForm';
import axios from 'axios';
import { imageUpload } from '../../api/utils';
import { AuthContext } from '../../components/auth/AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AddProduct = () => {

    const {user} = use(AuthContext)
    const [isUploading, setIsUploading] = useState(false)

    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate()

    const handleFormSubmit = async e =>{
        e.preventDefault()

        setIsUploading(true)

        const form = e.target;
        const name = form?.name?.value;
        const price = form?.price?.value;
        const quantity = form?.quantity?.value;
        const category = form?.category?.value;
        const description = form?.description?.value;
        const image = form?.image?.files[0];
       
   try{
     //    image url response from imgbb
     const imageUrl = await imageUpload(image)

     const productData = {
        name,
        price : parseFloat(price),
        quantity : parseInt(quantity),
        category,
        description,
        image:imageUrl,
        seller : {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
      }
     }
    

      const {data} = await axiosSecure.post(
          `${import.meta.env.VITE_API_URL}/add-product`,
          productData
      )
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Product hasbeen Uploaded",
        showConfirmButton: false,
        timer: 1500
      });

      form.reset()

      navigate('/')    

   }
   catch(error){
    console.log(error)
   }
   finally{
    setIsUploading(false)
   }
        

           

    }


    return (
        <div>
            <AddProductForm handleFormSubmit={handleFormSubmit} isUploading={isUploading} >

            </AddProductForm>
        </div>
    );
};

export default AddProduct;