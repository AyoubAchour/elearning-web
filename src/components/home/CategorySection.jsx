import React, { useState, useRef, useEffect } from 'react';

// For this example, I'll create placeholder icon components

const BusinessIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const SkillsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);

const RelationshipIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const LifestyleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);

const EducationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5m0 0l9-5-9-5-9 5 9 5m0 0v6" />
    </svg>
);

// Arrow icons for carousel navigation
const LeftArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const RightArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

const CategorySection = () => {
    const categories = [
        { id: 1, name: 'Business', icon: <BusinessIcon /> },
        { id: 2, name: 'Professional Skills', icon: <SkillsIcon /> },
        { id: 3, name: 'Relationship', icon: <RelationshipIcon /> },
        { id: 4, name: 'Lifestyle', icon: <LifestyleIcon /> },
        { id: 5, name: 'Education', icon: <EducationIcon /> },
        { id: 6, name: 'Technology', icon: <BusinessIcon /> },
        { id: 7, name: 'Health', icon: <LifestyleIcon /> },
        { id: 8, name: 'Arts', icon: <EducationIcon /> },
        { id: 9, name: 'Arts', icon: <EducationIcon /> },
        { id: 10, name: 'Arts', icon: <EducationIcon /> },
        { id: 11, name: 'Arts', icon: <EducationIcon /> },
        { id: 12, name: 'Arts', icon: <EducationIcon /> },
        { id: 13, name: 'Arts', icon: <EducationIcon /> },
    ];

    const carouselRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);
    const [visibleItemCount, setVisibleItemCount] = useState(5);

    // Calculate visible items and max scroll position
    useEffect(() => {
        const updateCarouselMetrics = () => {
            if (carouselRef.current) {
                const containerWidth = carouselRef.current.clientWidth;
                const itemWidth = 100; // Width of each item + margin
                const calculatedVisibleItems = Math.floor(containerWidth / itemWidth);
                
                setVisibleItemCount(calculatedVisibleItems);
                setMaxScroll(carouselRef.current.scrollWidth - carouselRef.current.clientWidth);
            }
        };

        updateCarouselMetrics();
        window.addEventListener('resize', updateCarouselMetrics);
        
        return () => {
            window.removeEventListener('resize', updateCarouselMetrics);
        };
    }, []);

    // Scroll by a fixed number of items
    const scroll = (direction) => {
        if (carouselRef.current) {
            const itemWidth = 100; // Width of each item + margin
            const scrollAmount = itemWidth * (direction === 'left' ? -1 : 1);
            
            const newPosition = direction === 'left' 
                ? Math.max(0, scrollPosition + scrollAmount)
                : Math.min(maxScroll, scrollPosition + scrollAmount);
            
            carouselRef.current.scrollTo({
                left: newPosition,
                behavior: 'smooth'
            });
            
            setScrollPosition(newPosition);
        }
    };

    return (
        <section className="py-2 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
                    Explore Our Categories
                </h2>
                
                <div className="relative max-w-4xl mx-auto">
                    {/* Left Arrow */}
                    <button 
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
                        aria-label="Scroll left"
                        disabled={scrollPosition <= 0}
                        style={{ left: '-12px' }}
                    >
                        <LeftArrowIcon />
                    </button>
                    
                    {/* Carousel Container */}
                    <div className="overflow-hidden mx-10">
                        <div 
                            ref={carouselRef}
                            className="flex space-x-4 py-4 transition-transform duration-300 ease-in-out"
                            style={{ 
                                scrollBehavior: 'smooth',
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                                overflowX: 'auto',
                                WebkitOverflowScrolling: 'touch'
                            }}
                        >
                            {categories.map((category) => (
                                <div 
                                    key={category.id} 
                                    className="flex-shrink-0 flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                                    style={{ width: '90px' }}
                                >
                                    <div className="text-blue-600 mb-3">
                                        {category.icon}
                                    </div>
                                    <h3 className="text-xs font-medium text-gray-900 text-center">
                                        {category.name}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Right Arrow */}
                    <button 
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
                        aria-label="Scroll right"
                        disabled={scrollPosition >= maxScroll}
                        style={{ right: '-12px' }}
                    >
                        <RightArrowIcon />
                    </button>
                </div>
                
                {/* Carousel Dots/Indicators */}
                <div className="flex justify-center mt-4 space-x-2">
                    {Array.from({ length: Math.ceil(categories.length / visibleItemCount) }).map((_, index) => (
                        <button
                            key={index}
                            className={`h-2 w-2 rounded-full ${
                                index === Math.floor(scrollPosition / (carouselRef.current?.clientWidth || 1))
                                    ? 'bg-blue-600'
                                    : 'bg-gray-300'
                            }`}
                            onClick={() => {
                                if (carouselRef.current) {
                                    const newPosition = index * (carouselRef.current.clientWidth || 0);
                                    carouselRef.current.scrollTo({
                                        left: newPosition,
                                        behavior: 'smooth'
                                    });
                                    setScrollPosition(newPosition);
                                }
                            }}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategorySection;