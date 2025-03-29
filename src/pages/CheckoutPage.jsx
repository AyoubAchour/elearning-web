import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const { plan } = location.state || {};
  
  // Form validation states
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: ''
  });
  
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Input formatting and validation
    let formattedValue = value;
    
    if (name === 'cardNumber') {
      // Remove non-digit characters and limit to 16 digits
      formattedValue = value.replace(/\D/g, '').slice(0, 16);
      // Add spaces every 4 digits
      formattedValue = formattedValue.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    } else if (name === 'expiry') {
      // Remove non-digit characters
      const digits = value.replace(/\D/g, '').slice(0, 4);
      if (digits.length > 2) {
        formattedValue = `${digits.slice(0, 2)}/${digits.slice(2)}`;
      } else {
        formattedValue = digits;
      }
    } else if (name === 'cvc') {
      // Remove non-digit characters and limit to 3 or 4 digits
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }
    
    setFormData({
      ...formData,
      [name]: formattedValue
    });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Card number validation (16 digits)
    if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    
    // Expiry validation (MM/YY format and not expired)
    if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
      newErrors.expiry = 'Use MM/YY format';
    } else {
      const [month, year] = formData.expiry.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;
      
      if (parseInt(month) < 1 || parseInt(month) > 12) {
        newErrors.expiry = 'Invalid month';
      } else if (
        parseInt(year) < currentYear || 
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)
      ) {
        newErrors.expiry = 'Card has expired';
      }
    }
    
    // CVC validation (3-4 digits)
    if (formData.cvc.length < 3) {
      newErrors.cvc = 'CVC must be 3-4 digits';
    }
    
    // Name validation
    if (formData.name.trim().length < 3) {
      newErrors.name = 'Please enter your full name';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (!plan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Plan Selected</h2>
          <p className="text-gray-600 mb-8">Please select a subscription plan to proceed with checkout.</p>
          <button
            onClick={() => navigate('/subscribe')}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Plans
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submitting
    if (!validateForm()) {
      return;
    }
    
    setIsProcessing(true);

    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate('/payment-success', { state: { plan } });
    } catch (err) {
      console.error("Payment processing error:", err);
      setIsProcessing(false);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <button 
            onClick={() => navigate('/subscribe')}
            className="text-blue-600 hover:text-blue-800 flex items-center font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Plans
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs rounded-full mb-2">
                    {plan.featured ? 'POPULAR CHOICE' : 'SELECTED PLAN'}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900">{plan.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Plan Price</span>
                    <span className="font-medium text-gray-900">${plan.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium text-gray-900">{plan.period}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 my-4"></div>
                
                <div className="flex justify-between items-center text-lg">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-blue-600">${plan.price}</span>
                </div>
                
                <div className="mt-4 text-xs text-gray-500">
                  <p>Your subscription will renew automatically at the end of your billing period.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="md:col-span-2">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Details</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    className={`w-full px-4 py-3 rounded-lg border ${errors.cardNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    required
                  />
                  {errors.cardNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      className={`w-full px-4 py-3 rounded-lg border ${errors.expiry ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      required
                    />
                    {errors.expiry && (
                      <p className="mt-1 text-sm text-red-600">{errors.expiry}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVC
                    </label>
                    <input
                      type="text"
                      name="cvc"
                      value={formData.cvc}
                      onChange={handleChange}
                      placeholder="123"
                      className={`w-full px-4 py-3 rounded-lg border ${errors.cvc ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      required
                    />
                    {errors.cvc && (
                      <p className="mt-1 text-sm text-red-600">{errors.cvc}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    required
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 my-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600">Your payment information is secure and encrypted</span>
                </div>
                
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium text-lg
                    ${isProcessing ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'} 
                    transition-colors`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : `Pay $${plan.price}`}
                </button>
                
                <div className="flex flex-wrap gap-2 justify-center mt-4">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6 object-contain" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 object-contain" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png" alt="American Express" className="h-6 object-contain" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Paypal_logo.svg/2560px-Paypal_logo.svg.png" alt="PayPal" className="h-6 object-contain" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 