import React from 'react';
import { useNavigate } from 'react-router-dom';
import pattern from '../../assets/images/Patern.svg';

const PricingCard = ({ title, price, period, features, discount }) => {
  const navigate = useNavigate();

  const handleSubscribe = () => {
    navigate('/subscribe');
  };

  return (
    <div className="bg-white rounded-2xl relative overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Pattern background */}
      <img 
        src={pattern} 
        alt="" 
        className="absolute top-0 left-0 w-full pointer-events-none"
      />
      
      <div className="p-8 relative">
        {/* Plan title */}
        <h3 className="text-2xl font-semibold text-blue-600 mb-8">{title}</h3>
        
        {/* Features list */}
        <ul className="space-y-4 mb-12">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-gray-600">
              <svg className="w-5 h-5 mr-3 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-500">{feature}</span>
            </li>
          ))}
        </ul>
        
        {/* Price section */}
        <div className="mb-12">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-900">{price}</span>
            <span className="text-xl text-gray-600 ml-1">TND</span>
            <span className="text-gray-500 ml-2">/ {period}</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">(billed monthly)</p>
        </div>
        
        {/* Subscribe button */}
        <button 
          onClick={handleSubscribe}
          className="w-full py-4 px-6 bg-[#7F56D9] text-white rounded-xl font-semibold hover:bg-[#6941C6] transition-colors duration-200 text-lg"
        >
          Subscribe
        </button>
        
        {/* Discount badge */}
        {discount && (
          <div className="absolute top-8 right-8 bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
            Save {discount}%
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingCard;
