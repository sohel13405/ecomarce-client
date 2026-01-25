import React from 'react';
import Navbar from '../components/Shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Shared/Footer';
import TopNavbar from '../components/Shared/TopNavbar';


const MainLayouts = () => {
    return (
        <div>
            <TopNavbar></TopNavbar>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayouts;