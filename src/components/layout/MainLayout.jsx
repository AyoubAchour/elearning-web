import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

const MainLayout = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <div className="flex flex-col min-h-screen relative">
            {/* Navbar positioned absolutely to overlay content */}
            <div className="absolute top-0 left-0 right-0 z-50">
                <Navbar />
            </div>
            
            {/* Main content with padding to account for navbar */}
            <main className="flex-grow">
                <Outlet />
            </main>
            
            {/* Only show Footer on non-homepage routes */}
            {!isHomePage && <Footer />}
        </div>
    );
};

export default MainLayout;