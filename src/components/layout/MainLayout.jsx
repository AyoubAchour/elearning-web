import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

const MainLayout = () => {
    const location = useLocation();
    const isCourseDetailPage = location.pathname.match(/^\/courses\/\d+$/);

    return (
        <div className="flex flex-col min-h-screen relative">
            {/* Navbar positioned absolutely to overlay content */}
            {!isCourseDetailPage && (
                <div className="absolute top-0 left-0 right-0 z-50">
                    <Navbar />
                </div>
            )}
            
            {/* Main content with padding to account for navbar */}
            <main className="flex-grow">
                <Outlet />
            </main>
            
            {/* Don't show the footer on course detail pages */}
            {!isCourseDetailPage && <Footer />}
        </div>
    );
};

export default MainLayout;