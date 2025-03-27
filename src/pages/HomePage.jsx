import React from 'react';
import HeroSection from '../components/home/HeroSection';
import CategorySection from '../components/home/CategorySection';
import WhoIsElearning from '../components/home/WhoIsElearning';

const HomePage = () => {
    return (
        <div className="min-h-screen">
            <HeroSection />
            <CategorySection />
            <WhoIsElearning />
            {/* Other sections will be added here */}
        </div>
    );
};

export default HomePage;