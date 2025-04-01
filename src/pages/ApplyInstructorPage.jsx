import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';

const ApplyInstructorPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        country: '',
        specialty: '',
        experience: '',
        topics: '',
        linkedin: '',
        portfolio: ''
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        
        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Full name is required';
        } else if (formData.name.trim().length < 3) {
            newErrors.name = 'Name must be at least 3 characters long';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Phone validation
        const phoneRegex = /^\+?[\d\s-]{8,}$/;
        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        // Country validation
        if (!formData.country.trim()) {
            newErrors.country = 'Country is required';
        }

        // Specialty validation
        if (!formData.specialty.trim()) {
            newErrors.specialty = 'Area of specialty is required';
        }

        // Experience validation
        if (!formData.experience) {
            newErrors.experience = 'Years of experience is required';
        } else if (parseInt(formData.experience) < 0) {
            newErrors.experience = 'Experience cannot be negative';
        }

        // Topics validation
        if (!formData.topics.trim()) {
            newErrors.topics = 'Teaching topics are required';
        }

        // LinkedIn validation (optional)
        if (formData.linkedin && !formData.linkedin.includes('linkedin.com')) {
            newErrors.linkedin = 'Please enter a valid LinkedIn URL';
        }

        // Portfolio validation (optional)
        if (formData.portfolio && !formData.portfolio.startsWith('http')) {
            newErrors.portfolio = 'Please enter a valid URL';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSubmitSuccess(true);
            
            // Reset form after success
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const renderField = (name, label, type = 'text', placeholder = '', required = true) => {
        const handleNumberInput = (e) => {
            // Only allow numbers
            const value = e.target.value.replace(/[^0-9]/g, '');
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
            
            // Clear error when user starts typing
            if (errors[name]) {
                setErrors(prev => ({
                    ...prev,
                    [name]: ''
                }));
            }
        };

        const handleKeyPress = (e) => {
            if (type === 'number' && !/[0-9]/.test(e.key)) {
                e.preventDefault();
            }
        };

        return (
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
                <input
                    type={type === 'number' ? 'text' : type}
                    name={name}
                    required={required}
                    value={formData[name]}
                    onChange={type === 'number' ? handleNumberInput : handleChange}
                    placeholder={placeholder}
                    className={`w-full px-4 py-2 border ${
                        errors[name] ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                    onKeyPress={handleKeyPress}
                    min={type === 'number' ? "0" : undefined}
                />
                {errors[name] && (
                    <p className="mt-1 text-sm text-red-500">{errors[name]}</p>
                )}
            </div>
        );
    };

    const formContent = (
        <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Join Our Teaching Community
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Share your expertise with students worldwide and become part of our growing community of educators.
                    </p>
                </div>

                {submitSuccess ? (
                    <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
                        <p className="text-lg text-gray-600 mb-6">
                            Thank you for your interest in becoming a mentor. We'll review your application and get back to you within 2-3 business days.
                        </p>
                        <div className="animate-pulse">
                            <p className="text-sm text-gray-500">Redirecting to home page...</p>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-xl p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Personal Information */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-gray-900 pb-2 border-b">
                                    Personal Information
                                </h3>
                                
                                {renderField('name', 'Full Name', 'text', 'John Doe')}
                                {renderField('email', 'Email Address', 'email', 'john@example.com')}
                                {renderField('phone', 'Phone Number', 'tel', '+1234567890')}
                                {renderField('country', 'Country', 'text', 'United States')}
                            </div>

                            {/* Professional Information */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-gray-900 pb-2 border-b">
                                    Professional Information
                                </h3>
                                
                                {renderField('specialty', 'Area of Specialty', 'text', 'e.g., Web Development, Data Science')}
                                {renderField('experience', 'Years of Experience', 'number')}
                                {renderField('topics', 'Topics You Want to Teach', 'text', 'e.g., JavaScript, React, Node.js')}
                                {renderField('linkedin', 'LinkedIn Profile', 'url', 'https://linkedin.com/in/...', false)}
                                {renderField('portfolio', 'Portfolio/Website', 'url', 'https://...', false)}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8 flex justify-end">
                            <button
                                type="submit"
                                disabled={submitting}
                                className={`px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                                    transition-all transform hover:scale-105 ${
                                    submitting ? 'opacity-75 cursor-not-allowed' : ''
                                }`}
                            >
                                {submitting ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : (
                                    'Submit Application'
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );

    return <MainLayout>{formContent}</MainLayout>;
};

export default ApplyInstructorPage; 