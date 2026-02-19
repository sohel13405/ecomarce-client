import React from 'react';
import CategoryCards from '../Shared/CategoryCards';
import CategorySlider from '../Shared/CategorySlider';
import ProductSideBySide from '../Shared/ProductSideBySide';
import Xshape from '../xshape/Xshape';
import CompanyIcons from '../Icons/CompanyIcons';
import FeaturedProducts from '../featured/FeaturedProducts';


const Home = () => {
    return (
        <div>

           <div  className=' w-full lg:w-7xl mx-auto mt-16 mb-16'>
           <CategoryCards></CategoryCards>
           </div>

           <CategorySlider></CategorySlider>

           <div>
            <FeaturedProducts></FeaturedProducts>
        </div>

       

           <div>
            <ProductSideBySide></ProductSideBySide>
           </div>

          <div className=' w-screen mt-10 mb-10'>
          <Xshape></Xshape>
          </div>

        <div>
            <CompanyIcons></CompanyIcons>
        </div>

        

        </div>
    );
};

export default Home;