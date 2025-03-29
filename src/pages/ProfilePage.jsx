import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { isAuthenticated, getCurrentUser, getEnrolledCourses, updateUserProfile } from '../utils/auth';
import profilePicture from '../assets/images/profile-picture.svg';
import { coursesData } from '../data/coursesData';
import { extendedCoursesData } from '../data/extendedCoursesData';

const ProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseProgress, setCourseProgress] = useState({});
  
  // Edit profile states
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    // Get current user data
    const userData = getCurrentUser();
    setUser(userData);
    
    // Initialize form data with current user info
    setFormData({
      fullName: userData?.fullName || '',
      email: userData?.email || '',
      password: '',
      confirmPassword: '',
    });
    
    // Check if we should enable edit mode from navigation state
    if (location.state?.editMode) {
      setIsEditing(true);
    }

    // Get and map enrolled courses
    const userEnrolledCourses = getEnrolledCourses();
    
    // First try to get course details from extended data for richer information
    const extendedCourseDetails = userEnrolledCourses.map(courseId => {
      return (
        extendedCoursesData.find(course => course.id === parseInt(courseId)) ||
        coursesData.find(course => course.id === parseInt(courseId)) || 
        { id: courseId, title: 'Unknown Course', image: 'https://via.placeholder.com/300' }
      );
    });
    
    setEnrolledCourses(extendedCourseDetails);
    
    // Calculate progress for each course
    const progressData = {};
    userEnrolledCourses.forEach(courseId => {
      const savedProgressStr = localStorage.getItem(`course_${courseId}_progress`);
      if (savedProgressStr) {
        const completedLessons = JSON.parse(savedProgressStr);
        const course = extendedCoursesData.find(c => c.id === parseInt(courseId));
        
        if (course) {
          const totalLessons = course.modules.reduce(
            (total, module) => total + module.lessons.length, 
            0
          );
          progressData[courseId] = {
            completed: completedLessons.length,
            total: totalLessons,
            percentage: Math.round((completedLessons.length / totalLessons) * 100)
          };
        }
      } else {
        progressData[courseId] = { completed: 0, total: 0, percentage: 0 };
      }
    });
    
    setCourseProgress(progressData);
    setLoading(false);
  }, [navigate, location.state]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
    
    // Clear success message when user edits
    if (updateSuccess) {
      setUpdateSuccess(false);
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    // Validate fullName
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    
    // Validate email
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    // Only validate password if it's being changed
    if (formData.password) {
      // Check password strength
      if (formData.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
      } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(formData.password)) {
        errors.password = 'Password must include uppercase, lowercase and number';
      }
      
      // Validate password confirmation
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - reset form
      setFormData({
        fullName: user?.fullName || '',
        email: user?.email || '',
        password: '',
        confirmPassword: '',
      });
      setFormErrors({});
    }
    
    setIsEditing(!isEditing);
    setUpdateSuccess(false);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Create update object (don't include empty password)
    const updateData = {
      fullName: formData.fullName,
      email: formData.email,
    };
    
    // Only include password if it was changed
    if (formData.password) {
      updateData.password = formData.password;
    }
    
    // Update user profile
    const success = updateUserProfile(updateData);
    
    if (success) {
      // Get updated user data
      const updatedUserData = getCurrentUser();
      setUser(updatedUserData);
      setUpdateSuccess(true);
      
      // Clear password fields
      setFormData({
        ...formData,
        password: '',
        confirmPassword: '',
      });
      
      // Dispatch event to notify navbar about profile update
      window.dispatchEvent(new Event('userProfileUpdated'));
      
      // Exit edit mode after a delay
      setTimeout(() => {
        setIsEditing(false);
        setUpdateSuccess(false);
      }, 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="bg-blue-600 p-6 text-center">
            <div className="inline-block bg-white p-2 rounded-full mb-4">
              <img
                src={profilePicture}
                alt="Profile"
                className="h-24 w-24 rounded-full"
              />
            </div>
            <h1 className="text-2xl font-bold text-white">{user?.fullName}</h1>
            <p className="text-blue-100">{user?.email}</p>
            <p className="text-blue-200 text-sm mt-2">
              Member since {formatDate(user?.createdAt || user?.loginTime)}
              {user?.lastUpdated && ` • Last updated ${formatDate(user?.lastUpdated)}`}
            </p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Account Information */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Account Information</h2>
                  <button 
                    onClick={handleEditToggle}
                    className={`text-sm px-3 py-1 rounded-md ${
                      isEditing 
                        ? 'bg-gray-200 text-gray-700' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>
                
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {updateSuccess && (
                      <div className="bg-green-50 text-green-700 p-3 rounded-md text-sm mb-4">
                        Your profile has been updated successfully!
                      </div>
                    )}
                    
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                          formErrors.fullName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {formErrors.fullName && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.fullName}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                          formErrors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password (leave blank to keep current)
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                          formErrors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {formErrors.password && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                          formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {formErrors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.confirmPassword}</p>
                      )}
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  </form>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">{user?.fullName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{user?.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">User ID</p>
                      <p className="font-medium text-gray-700">{user?.id}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Subscription Information */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Subscription</h2>
                {user?.subscription ? (
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Plan</p>
                      <p className="font-medium">{user.subscription.title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <div className="flex items-center">
                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                          user.subscription.isActive ? 'bg-green-500' : 'bg-red-500'
                        }`}></span>
                        <p className="font-medium">
                          {user.subscription.isActive ? 'Active' : 'Inactive'}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p className="font-medium">{formatDate(user.subscription.startDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Expiry Date</p>
                      <p className="font-medium">{formatDate(user.subscription.expiryDate)}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-4">
                    <p className="text-gray-500 mb-4">You don't have an active subscription</p>
                    <Link
                      to="/subscribe"
                      className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Get a Subscription
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enrolled Courses Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-800">My Courses</h2>
                <p className="text-gray-500">Courses you've enrolled in</p>
              </div>
              {enrolledCourses.length > 0 && (
                <Link 
                  to="/my-courses"
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                >
                  View All Courses
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                </Link>
              )}
            </div>
          </div>

          <div className="p-6">
            {enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.slice(0, 3).map(course => {
                  const progress = courseProgress[course.id] || { percentage: 0 };
                  
                  return (
                    <Link 
                      key={course.id} 
                      to={`/courses/${course.id}/content`}
                      className="block overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white"
                    >
                      <div className="relative h-48">
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4 text-white">
                          <h3 className="font-bold text-lg">{course.title}</h3>
                          <div className="mt-1 flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                            </svg>
                            <span className="text-sm">{progress.percentage > 0 ? 'Continue Learning' : 'Start Learning'}</span>
                          </div>
                          
                          {/* Progress bar */}
                          <div className="mt-2">
                            <div className="w-full bg-gray-200/30 rounded-full h-1.5">
                              <div 
                                className="bg-blue-500 h-1.5 rounded-full" 
                                style={{ width: `${progress.percentage}%` }}
                              ></div>
                            </div>
                            <div className="text-xs mt-1 text-blue-100">
                              {progress.percentage}% Complete
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
                
                {enrolledCourses.length > 3 && (
                  <Link 
                    to="/my-courses"
                    className="block overflow-hidden rounded-lg bg-gray-50 shadow-md hover:shadow-lg transition-shadow border-2 border-dashed border-gray-200 h-48 flex flex-col items-center justify-center"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <span className="font-medium text-gray-900">View All {enrolledCourses.length} Courses</span>
                    <span className="text-sm text-gray-500 mt-1">See your complete learning journey</span>
                  </Link>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"></path>
                  <path fillRule="evenodd" d="M10 9a2 2 0 100-4 2 2 0 000 4zm1 2.586l4 4-4-4zm-2 0L5 15.586l4-4z" clipRule="evenodd"></path>
                </svg>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No Courses Yet</h3>
                <p className="text-gray-500 mb-4">You haven't enrolled in any courses yet</p>
                <Link
                  to="/courses"
                  className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Browse Courses
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 mt-8 justify-center">
          <button 
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            onClick={() => navigate('/courses')}
          >
            Explore More Courses
          </button>
          <button 
            className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            onClick={() => navigate('/')}
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 