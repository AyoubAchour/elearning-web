import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <span className="text-xl font-bold">E-Learning</span>
                    </div>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-blue-400">Terms</a>
                        <a href="#" className="hover:text-blue-400">Privacy</a>
                        <a href="#" className="hover:text-blue-400">Contact</a>
                    </div>
                </div>
                <div className="mt-8 text-center text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} E-Learning Platform. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;