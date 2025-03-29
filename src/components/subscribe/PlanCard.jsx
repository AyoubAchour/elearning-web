import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const PlanCard = ({ 
  title, 
  price, 
  period, 
  description, 
  features, 
  isActive,
  onCardClick
}) => {
  const navigate = useNavigate();

  const handleSubscribe = (e) => {
    e.stopPropagation(); // Prevent card click event
    navigate('/checkout', {
      state: {
        plan: {
          title,
          price,
          period,
          features
        }
      }
    });
  };

  return (
    <div 
      onClick={onCardClick}
      className={`rounded-2xl p-8 transition-all duration-300 h-full flex flex-col cursor-pointer 
        ${isActive 
          ? 'bg-blue-600 text-white shadow-lg transform scale-[1.02]' 
          : 'bg-white hover:shadow-lg hover:transform hover:scale-[1.02]'
        }`}
    >
      {/* Plan Title */}
      <h3 className={`text-lg font-semibold mb-6 ${
        isActive ? 'text-white' : 'text-blue-600'
      }`}>
        {title}
      </h3>

      {/* Price */}
      <div className="mb-4">
        <div className="flex items-baseline">
          <span className="text-[32px] font-bold">$</span>
          <span className="text-[32px] font-bold">{price}</span>
          <span className="text-lg ml-1">/{period}</span>
        </div>
        <p className={`text-sm mt-2 ${
          isActive ? 'text-white/80' : 'text-gray-600'
        }`}>
          {description}
        </p>
      </div>

      {/* Features */}
      <div className="mt-8 flex-grow">
        <p className={`text-sm font-medium mb-4 ${
          isActive ? 'text-white' : 'text-gray-900'
        }`}>
          WHAT'S INCLUDED
        </p>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg 
                className={`w-4 h-4 mr-3 flex-shrink-0 mt-1 ${
                  isActive ? 'text-white' : 'text-gray-400'
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className={`text-sm leading-tight ${
                isActive ? 'text-white/90' : 'text-gray-600'
              }`}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Subscribe Button */}
      <button
        onClick={handleSubscribe}
        className={`w-full mt-8 py-3 px-6 rounded-lg font-medium text-sm transition-all duration-200 
          ${isActive
            ? 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-md hover:transform hover:scale-[1.02]'
            : 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-md hover:transform hover:scale-[1.02]'
          } cursor-pointer`}
      >
        Subscribe
      </button>
    </div>
  );
};

PlanCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  period: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  isActive: PropTypes.bool,
  onCardClick: PropTypes.func.isRequired
};

PlanCard.defaultProps = {
  isActive: false
};

export default PlanCard; 