import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { coursesData } from '../data/coursesData';
import { extendedCoursesData } from '../data/extendedCoursesData';
import { isAuthenticated, hasActiveSubscription, getEnrolledCourses, enrollInCourse } from '../utils/auth';

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Try to find the course in extended data first, then fall back to regular data
  const course = 
    extendedCoursesData.find(c => c.id === parseInt(courseId)) || 
    coursesData.find(c => c.id === parseInt(courseId));

  useEffect(() => {
    // Check if user is already enrolled in this course
    if (isAuthenticated()) {
      const enrolledCourses = getEnrolledCourses();
      if (enrolledCourses.includes(courseId)) {
        setIsEnrolled(true);
      }
    }
  }, [courseId]);

  const handleEnrollClick = () => {
    // If user is not authenticated, redirect to login
    if (!isAuthenticated()) {
      navigate('/login', { state: { from: `/courses/${courseId}` } });
      return;
    }

    setLoading(true);

    // Check if user has an active subscription
    if (hasActiveSubscription()) {
      // Enroll user in this course
      const success = enrollInCourse(courseId);
      if (success) {
        // Redirect to enrollment success page
        setTimeout(() => {
          navigate('/enrollment-success', { 
            state: { courseId } 
          });
        }, 500);
      } else {
        setLoading(false);
        alert('Failed to enroll in course. Please try again.');
      }
    } else {
      // Redirect to subscription page
      navigate('/subscribe');
    }
  };

  const handleContinueLearning = () => {
    navigate(`/courses/${courseId}/content`);
  };

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Course not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <div className="relative h-[400px]">
        <div className="absolute inset-0">
          <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Details */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg">
            {/* Course Navigation */}
            <div className="flex gap-8 mb-8 text-sm border-b">
              <button className="text-blue-600 font-medium border-b-2 border-blue-600 pb-4 px-2">Overview</button>
              <button className="text-gray-500 hover:text-gray-700 pb-4 px-2">Instructor</button>
              <button className="text-gray-500 hover:text-gray-700 pb-4 px-2">Q & A</button>
              <button className="text-gray-500 hover:text-gray-700 pb-4 px-2">Avis</button>
            </div>

            {/* Course Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{course.title}</h1>

            {/* Instructor Info */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-100 rounded-full overflow-hidden">
                <img src="https://via.placeholder.com/48" alt="Instructor" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Mohammed saad</h3>
                <p className="text-sm text-gray-600">Web Developer, Researcher, Instructor at CodeLab</p>
              </div>
            </div>

            {/* Course Description */}
            <div className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum is the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </div>
          </div>

          {/* Right Column - Course Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Video Preview */}
              <div className="relative aspect-video">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <button className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">{course.title}</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-600">Self-paced access</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-600">Certificate of completion</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="text-gray-600">{course.lessons} Modules</span>
                  </div>
                </div>

                {isEnrolled ? (
                  <button 
                    onClick={handleContinueLearning}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    Continue Learning
                  </button>
                ) : (
                  <button 
                    onClick={handleEnrollClick}
                    disabled={loading}
                    className={`w-full bg-purple-600 text-white py-3 rounded-lg font-medium transition-colors ${
                      loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-purple-700'
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </div>
                    ) : 'Enroll Now'}
                  </button>
                )}

                <div className="mt-6">
                  <h3 className="font-medium mb-2">Share this Course</h3>
                  <div className="flex gap-3">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 16h4v4h-4v-4zm0-14h4v12h-4V2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage; 