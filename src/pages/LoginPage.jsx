import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, currentUser, loading: authLoading, error: authError } = useAuth();
  
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Get the redirect path from location state or default to courses
  const from = location.state?.from || '/courses';

  // Check for success message from signup and redirect if already logged in
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the location state after showing the message but keep the 'from' path
      const { from } = location.state;
      window.history.replaceState({ from }, document.title);
    }
    
    // Check if user is already logged in
    if (currentUser) {
      navigate(from); // Redirect to the original requested page or courses
    }
  }, [location, navigate, from, currentUser]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Call login function from auth context
      const credentials = {
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe
      };
      
      const response = await login(credentials);
      
      // Check user role for redirection
      if (response?.user?.isAdmin) {
        navigate('/admin');
      } else if (response?.user?.role === 'instructor') {
        navigate('/instructor');
      } else {
        // Navigate to the original requested page or courses
        navigate(from);
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        form: error.response?.data?.message || authError || 'Invalid email or password. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check for external loading state from auth context
  const loading = isLoading || authLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      {/* Logo */}
      <Link to="/" className="absolute top-6 left-6 flex items-center">
        <div className="bg-blue-600 text-white p-2 rounded-lg">
          <span className="text-xl font-bold">LOGO</span>
        </div>
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left side - Login Form */}
        <div className="p-8 md:p-12 flex flex-col">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
            <p className="text-gray-600">Log in to your account to continue your learning journey</p>
          </div>
          
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded">
              <p>{successMessage}</p>
            </div>
          )}
          
          {(errors.form || authError) && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
              <p>{errors.form || authError}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6 flex-grow">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-base
                ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'} 
                transition-colors shadow-md`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </div>
              ) : 'Log In'}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-800">
                Sign up
              </Link>
            </p>
          </div>
          
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                type="button"
                className="w-full py-3 px-6 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 flex items-center justify-center"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.56V20.34H19.28C21.36 18.42 22.56 15.59 22.56 12.25Z" fill="#4285F4" />
                  <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.56C14.73 18.21 13.48 18.59 12 18.59C9.00999 18.59 6.47999 16.64 5.62999 13.97H1.95999V16.84C3.72999 20.42 7.59999 23 12 23Z" fill="#34A853" />
                  <path d="M5.63 13.97C5.39 13.35 5.26 12.69 5.26 12C5.26 11.31 5.39 10.65 5.63 10.03V7.16H1.96C1.35 8.62 1 10.27 1 12C1 13.73 1.35 15.38 1.96 16.84L5.63 13.97Z" fill="#FBBC05" />
                  <path d="M12 5.41C13.62 5.41 15.06 5.99 16.21 7.08L19.36 3.94C17.45 2.15 14.97 1 12 1C7.59999 1 3.72999 3.58 1.95999 7.16L5.62999 10.03C6.47999 7.36 9.00999 5.41 12 5.41Z" fill="#EA4335" />
                </svg>
                Continue with Google
              </button>
            </div>
          </div>
        </div>
        
        {/* Right side - Welcome Message */}
        <div className="hidden md:block relative bg-gradient-to-br from-blue-500 to-indigo-700">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-white">
            <div className="max-w-md text-center">
              <h2 className="text-2xl font-bold mb-6">Welcome back to your learning journey</h2>
              <div className="h-1 w-20 bg-blue-300 rounded mx-auto mb-6"></div>
              <p className="mb-8">Continue your education with our expert-led courses and unlock new opportunities for personal and professional growth.</p>
              
              <div className="mt-10 bg-blue-700/30 p-5 rounded-lg border border-blue-400/30">
                <div className="flex flex-col items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-blue-200 mb-3 overflow-hidden">
                    <img src="/images/testimonials/user1.jpg" alt="Student" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <blockquote className="italic text-sm">
                  "The courses on this platform helped me transition into a new career. The instructors are amazing and the community support is incredibly helpful."
                </blockquote>
                <p className="mt-2 text-blue-200 font-medium">— Michael Chen, Software Engineer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 