import React, { useState, useRef, useEffect } from 'react';
import { fetchCategories } from '../../services/api';
import { getCategoryIcon } from '../../utils/IconMapper';

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
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const carouselRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);
    const [visibleItemCount, setVisibleItemCount] = useState(5);

    // Fetch categories from the API
    useEffect(() => {
        const getCategories = async () => {
            try {
                setLoading(true);
                const data = await fetchCategories();
                setCategories(data);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch categories:', err);
                setError('Failed to load categories. Please try again later.');
                // Fallback to static data if API fails
                setCategories([
                    { _id: 1, titre: 'Business' },
                    { _id: 2, titre: 'Professional Skills' },
                    { _id: 3, titre: 'Relationship' },
                    { _id: 4, titre: 'Lifestyle' },
                    { _id: 5, titre: 'Education' }
                ]);
            } finally {
                setLoading(false);
            }
        };

        getCategories();
    }, []);

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
    }, [categories]); // Recalculate when categories change

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
                
                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500">{error}</div>
                ) : (
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
                                        key={category._id} 
                                        className="flex-shrink-0 flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                                        style={{ width: '90px' }}
                                    >
                                        <div className="text-blue-600 mb-3">
                                            {getCategoryIcon(category.titre)}
                                        </div>
                                        <h3 className="text-xs font-medium text-gray-900 text-center">
                                            {category.titre}
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
                )}
                
                {/* Carousel Dots/Indicators */}
                {!loading && !error && (
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
                )}
            </div>
        </section>
    );
};

export default CategorySection;