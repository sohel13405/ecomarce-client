import React from 'react';
import CategoryCards from '../Shared/CategoryCards';
import CategorySlider from '../Shared/CategorySlider';
import ProductSideBySide from '../Shared/ProductSideBySide';
import Xshape from '../xshape/Xshape';
import CompanyIcons from '../Icons/CompanyIcons';
import FeaturedProducts from '../featured/FeaturedProducts';
import FeaturedThreeProducts from '../Shared/FeaturedThreeProducts';
import { useLoaderData } from 'react-router';
import CustomerReviews from '../featured/CustomerReviews';
import RecentProducts from '../Shared/RecentProducts';


const Home = () => {

    const products = useLoaderData()

    return (
        <div>

           <div  className=' w-full lg:w-7xl mx-auto mt-16 mb-16'>
           <CategoryCards></CategoryCards>
           </div>

           <CategorySlider></CategorySlider>

           <div>
            <FeaturedProducts></FeaturedProducts>
        </div>

       

           

          <div className=' '>
          <Xshape></Xshape>
          </div>

          <div>
           <FeaturedThreeProducts products={products}></FeaturedThreeProducts>
           </div>

           <div className=''>
            <CustomerReviews></CustomerReviews>
           </div>

           <div>
            <RecentProducts products={products}></RecentProducts>
           </div>

        <div className=''>
            <CompanyIcons></CompanyIcons>
        </div>

        

        </div>
    );
};

export default Home;