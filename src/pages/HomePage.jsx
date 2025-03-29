import React from 'react';
import HeroSection from '../components/home/HeroSection';
import CategorySection from '../components/home/CategorySection';
import WhoIsElearning from '../components/home/WhoIsElearning';
import PopularCourses from '../components/home/PopularCourses';
import PricingPlans from '../components/home/PricingPlans';
import SuccessStats from '../components/home/SuccessStats';
import Newsletter from '../components/home/Newsletter';

const HomePage = () => {
    return (
        <div className="min-h-screen">
            <HeroSection />
            <CategorySection />
            <WhoIsElearning />
            <PopularCourses />
            <PricingPlans />
            <SuccessStats />
            <Newsletter />
            {/* Other sections will be added here */}
        </div>
    );
};

export default HomePage;