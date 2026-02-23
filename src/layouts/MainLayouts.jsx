import React from 'react';
import Navbar from '../components/Shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Shared/Footer';
import TopNavbar from '../components/Shared/TopNavbar';
import ScrollToTop from '../components/Shared/ScrollToTop';


const MainLayouts = () => {
    return (
        <div className=' bg-white'>
            <ScrollToTop></ScrollToTop>
            <div className=' sticky top-0 z-10 '>
            <TopNavbar></TopNavbar>
            </div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayouts;