import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

const MainLayout = ({ children }) => {
    const location = useLocation();
    const isCourseDetailPage = location.pathname.match(/^\/courses\/\d+$/);
    const shouldOverlayNavbar = location.pathname === '/' || location.pathname === '/courses';

    return (
        <div className="min-h-screen flex flex-col">
            <div className={`${shouldOverlayNavbar ? 'absolute w-full z-50' : ''}`}>
                <Navbar />
            </div>
            <main className={`flex-grow ${!shouldOverlayNavbar ? 'pt-16' : ''}`}>
                {children || <Outlet />}
            </main>
            {!isCourseDetailPage && <Footer />}
        </div>
    );
};

export default MainLayout;