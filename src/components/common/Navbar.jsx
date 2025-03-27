import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [language, setLanguage] = useState('en');
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ar' : 'en');
    };

    return (
        <nav className="bg-transparent sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center">
                            <div className="bg-blue-600 text-white p-2 rounded-lg">
                                <span className="text-xl font-bold">LOGO</span>
                            </div>
                        </Link>
                    </div>

                    {/* Right side - Navigation, Language Selector and Sign Up */}
                    <div className="hidden md:flex items-center space-x-6">
                        {/* Navigation Links */}
                        <div className="flex items-center space-x-4 mr-4">
                            <Link to="/" className="text-white hover:text-blue-300 px-3 py-2 text-sm font-medium">
                                Home
                            </Link>
                            <Link to="/courses" className="text-white hover:text-blue-300 px-3 py-2 text-sm font-medium">
                                Course
                            </Link>
                            <Link to="/about" className="text-white hover:text-blue-300 px-3 py-2 text-sm font-medium">
                                About
                            </Link>
                            <Link to="/contact" className="text-white hover:text-blue-300 px-3 py-2 text-sm font-medium">
                                Contact
                            </Link>
                        </div>

                        {/* Language Selector */}
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center text-white hover:text-blue-300"
                        >
                            <span className="mr-1">{language === 'en' ? '🇺🇸' : '🇸🇦'}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Search icon - Only show on non-home pages */}
                        {!isHomePage && (
                            <button
                                type="button"
                                className="text-white hover:text-blue-300"
                                aria-label="Search"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        )}

                        <Link
                            to="/login"
                            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Sign Up
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden items-center">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-300 hover:bg-blue-600/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                            onClick={toggleMenu}
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isMenuOpen ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu, show/hide based on menu state */}
            {isMenuOpen && (
                <div className="md:hidden bg-gray-900/80 backdrop-blur-sm" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            to="/"
                            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-blue-300 hover:bg-blue-600/20"
                        >
                            Home
                        </Link>
                        <Link
                            to="/courses"
                            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-blue-300 hover:bg-blue-600/20"
                        >
                            Course
                        </Link>
                        <Link
                            to="/about"
                            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-blue-300 hover:bg-blue-600/20"
                        >
                            About
                        </Link>
                        <Link
                            to="/contact"
                            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-blue-300 hover:bg-blue-600/20"
                        >
                            Contact
                        </Link>
                        <div className="mt-4 flex flex-col space-y-3 px-3">
                            {/* Language Selector */}
                            <button
                                onClick={toggleLanguage}
                                className="flex items-center text-white hover:text-blue-300"
                            >
                                <span className="mr-2">{language === 'en' ? '🇺🇸 English' : '🇸🇦 العربية'}</span>
                            </button>

                            {/* Search - Only show on non-home pages */}
                            {!isHomePage && (
                                <button
                                    type="button"
                                    className="flex items-center text-white hover:text-blue-300"
                                    aria-label="Search"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    Search
                                </button>
                            )}

                            <Link
                                to="/login"
                                className="w-full flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;