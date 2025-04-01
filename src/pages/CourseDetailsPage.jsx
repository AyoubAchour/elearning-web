import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { isAuthenticated, hasActiveSubscription, getEnrolledCourses, enrollInCourse } from '../utils/auth';
import CourseDetailNavbar from '../components/courses/CourseDetailNavbar';
import { fetchCourseById } from '../services/api';

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModules, setExpandedModules] = useState({});
  const [userRating, setUserRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const courseData = await fetchCourseById(courseId);
        setCourse(courseData);
        setError(null);
        
        // Check if user is already enrolled in this course
        if (isAuthenticated()) {
          const enrolledCourses = getEnrolledCourses();
          if (enrolledCourses.includes(courseId)) {
            setIsEnrolled(true);
          }
        }
      } catch (err) {
        console.error('Error fetching course:', err);
        setError('Failed to load course details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
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

  const handleSubmitReview = (e) => {
    e.preventDefault();
    
    // Validate form
    if (userRating === 0) {
      alert('Please select a rating');
      return;
    }
    
    if (reviewTitle.trim() === '') {
      alert('Please add a review title');
      return;
    }
    
    if (reviewContent.trim() === '') {
      alert('Please add review content');
      return;
    }
    
    // In a real app, you would submit this to an API
    console.log({
      courseId,
      rating: userRating,
      title: reviewTitle,
      content: reviewContent
    });
    
    // Show success message
    alert('Thank you for your review!');
    
    // Reset form
    setUserRating(0);
    setReviewTitle('');
    setReviewContent('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <p className="text-xl text-red-600 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Course not found</p>
      </div>
    );
  }

  return (
    <>
      <CourseDetailNavbar courseTitle={course.nom} />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section with Background Image */}
        <div className="relative h-[400px] -mt-[64px]">
          <div className="absolute inset-0">
            <img 
              src={course.image || 'https://via.placeholder.com/1200x400?text=No+Image'} 
              alt={course.nom} 
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
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`pb-4 px-2 ${activeTab === 'overview' 
                    ? 'text-blue-600 font-medium border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Overview
                </button>
                <button 
                  onClick={() => setActiveTab('instructor')}
                  className={`pb-4 px-2 ${activeTab === 'instructor' 
                    ? 'text-blue-600 font-medium border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Instructor
                </button>
                <button 
                  onClick={() => setActiveTab('qa')}
                  className={`pb-4 px-2 ${activeTab === 'qa' 
                    ? 'text-blue-600 font-medium border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Q & A
                </button>
                <button 
                  onClick={() => setActiveTab('avis')}
                  className={`pb-4 px-2 ${activeTab === 'avis' 
                    ? 'text-blue-600 font-medium border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Avis
                </button>
              </div>

              {/* Course Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-6">{course.nom}</h1>

              {/* Course Description */}
              {activeTab === 'overview' && (
                <>
                  {/* Instructor Info */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-blue-100 rounded-full overflow-hidden">
                      <img 
                        src={course.professeurId?.image && !course.professeurId.image.startsWith('http') 
                          ? `http://localhost:3000/uploads/${course.professeurId.image}` 
                          : course.professeurId?.image || 'https://via.placeholder.com/48?text=Instructor'} 
                        alt={course.professeurId?.name || 'Instructor'} 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/48?text=Instructor';
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{course.professeurId?.name || 'Instructor'}</h3>
                      <p className="text-sm text-gray-600">
                        {course.professeurId?.speciality 
                          ? `${course.professeurId.speciality}, Instructor at CodeLab` 
                          : 'Web Developer, Researcher, Instructor at CodeLab'}
                      </p>
                    </div>
                  </div>

                  <div className="prose max-w-none">
                    <p className="text-gray-600 leading-relaxed">
                      {course.description || 'No description available for this course.'}
                    </p>
                  </div>

                  {/* Course Curriculum */}
                  {course.modules && course.modules.length > 0 && (
                    <div className="mt-10">
                      <h2 className="text-xl font-bold text-gray-800 mb-4">Course Curriculum</h2>
                      <div className="border rounded-lg overflow-hidden divide-y divide-gray-200">
                        {course.modules.map((module, index) => {
                          const totalDuration = module.lessons && module.lessons.length 
                            ? module.lessons.reduce((acc, lesson) => {
                                const minutes = parseInt((lesson.duration || '0:00').split(':')[0]);
                                return acc + (minutes || 0);
                              }, 0) 
                            : 0;
                          
                          const isExpanded = expandedModules[module._id] || false;
                          
                          return (
                            <div key={module._id} className="bg-white">
                              <div 
                                className="p-4 hover:bg-gray-50 flex justify-between items-center cursor-pointer"
                                onClick={() => setExpandedModules({
                                  ...expandedModules,
                                  [module._id]: !isExpanded
                                })}
                              >
                                <div>
                                  <h3 className="font-medium text-gray-900">
                                    {index + 1}. {module.titre || 'Unnamed Module'}
                                  </h3>
                                  <p className="text-sm text-gray-500">
                                    {module.videos?.length || 0} videos • {totalDuration} min
                                  </p>
                                </div>
                                <svg 
                                  className={`w-5 h-5 text-gray-500 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`}
                                  fill="currentColor" 
                                  viewBox="0 0 20 20"
                                >
                                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                </svg>
                              </div>
                              
                              {isExpanded && module.videos && module.videos.length > 0 && (
                                <div className="border-t border-gray-100 bg-gray-50 divide-y divide-gray-100">
                                  {module.videos.map((video, videoIndex) => (
                                    <div key={video._id} className="p-3 pl-8 flex items-center justify-between">
                                      <div className="flex items-center">
                                        <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div>
                                          <p className="text-sm font-medium text-gray-800">
                                            {videoIndex + 1}. {video.titre || 'Unnamed Video'}
                                          </p>
                                          {video.completed && (
                                            <span className="text-xs text-green-600">Completed</span>
                                          )}
                                        </div>
                                      </div>
                                      <div className="flex items-center">
                                        {isEnrolled ? (
                                          <button className="text-xs text-blue-600 hover:text-blue-700 mr-3">
                                            {video.completed ? 'Review' : 'Start'}
                                          </button>
                                        ) : null}
                                        <span className="text-xs text-gray-500">{video.duration || '0:00'}</span>
                                      </div>
                                    </div>
                                  ))}
                                  
                                  <div className="p-3 bg-blue-50 flex justify-between items-center">
                                    <span className="text-sm text-blue-700 font-medium">{isEnrolled ? 'Continue learning this module' : 'Enroll to access this module'}</span>
                                    {isEnrolled ? (
                                      <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                                        Continue
                                      </button>
                                    ) : null}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="mt-6 flex justify-center">
                        <button 
                          className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                          onClick={() => {
                            // Expand or collapse all modules
                            const allModuleIds = course.modules.map(m => m._id);
                            const allExpanded = allModuleIds.every(id => expandedModules[id]);
                            
                            if (allExpanded) {
                              // Collapse all
                              setExpandedModules({});
                            } else {
                              // Expand all
                              const expandAll = {};
                              allModuleIds.forEach(id => {
                                expandAll[id] = true;
                              });
                              setExpandedModules(expandAll);
                            }
                          }}
                        >
                          {course.modules.every(m => expandedModules[m._id]) 
                            ? 'Collapse All Sections' 
                            : 'Expand All Sections'}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Instructor Tab */}
              {activeTab === 'instructor' && (
                <div className="py-4">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="w-32 h-32 bg-blue-100 rounded-full overflow-hidden">
                      <img 
                        src={course.professeurId?.image && !course.professeurId.image.startsWith('http') 
                          ? `http://localhost:3000/uploads/${course.professeurId.image}` 
                          : course.professeurId?.image || 'https://via.placeholder.com/128?text=Instructor'} 
                        alt={course.professeurId?.name || 'Instructor'} 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/128?text=Instructor';
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {course.professeurId?.name || 'Instructor'}
                      </h2>
                      <p className="text-gray-600 text-sm mb-4">
                        {course.professeurId?.speciality 
                          ? `${course.professeurId.speciality}, Instructor at CodeLab` 
                          : 'Web Developer, Researcher, Instructor at CodeLab'}
                      </p>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="ml-1 text-gray-700">
                            {course.averageRating?.toFixed(1) || '0.0'} Instructor Rating
                          </span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          <span className="ml-1 text-gray-700">
                            {course.enrolledCount || 0} Students
                          </span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          <span className="ml-1 text-gray-700">
                            {course.professeurId?.courseId?.length || 1} Courses
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 prose max-w-none">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">About Me</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {course.professeurId?.bio || 
                        "I am an experienced web developer and educator with over 10 years of industry experience. I specialize in modern web technologies including React, Node.js, and cloud platforms. My teaching approach focuses on practical, project-based learning that prepares students for real-world development challenges."}
                    </p>
                    {/* Default paragraph as fallback if no additional instructor info is available */}
                    <p className="text-gray-600 leading-relaxed">
                      Throughout my career, I've worked with startups and enterprise companies alike, helping them build scalable web applications and training their development teams. I'm passionate about sharing my knowledge and helping others grow in their tech careers.
                    </p>
                  </div>
                  
                  {/* Contact Information */}
                  {course.professeurId?.email && (
                    <div className="mt-8 bg-blue-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                      <div className="flex items-center gap-2 text-gray-700">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href={`mailto:${course.professeurId.email}`} className="text-blue-600 hover:underline">
                          {course.professeurId.email}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Q&A Tab */}
              {activeTab === 'qa' && (
                <div className="py-4">
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
                    
                    <div className="space-y-4">
                      <div className="border rounded-lg overflow-hidden">
                        <div className="p-4 bg-gray-50">
                          <h3 className="font-medium text-gray-900">Do I need any prior knowledge to take this course?</h3>
                        </div>
                        <div className="p-4 border-t">
                          <p className="text-gray-600">
                            This course is designed for all skill levels. While some basic understanding of the topic might be helpful, we start from the fundamentals and progressively move to more advanced concepts. Complete beginners can follow along without issues.
                          </p>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg overflow-hidden">
                        <div className="p-4 bg-gray-50">
                          <h3 className="font-medium text-gray-900">Will I get a certificate after completing this course?</h3>
                        </div>
                        <div className="p-4 border-t">
                          <p className="text-gray-600">
                            Yes! Upon completion of all course materials and assignments, you'll receive a certificate of completion that you can add to your resume or share on your professional networks.
                          </p>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg overflow-hidden">
                        <div className="p-4 bg-gray-50">
                          <h3 className="font-medium text-gray-900">How long do I have access to the course materials?</h3>
                        </div>
                        <div className="p-4 border-t">
                          <p className="text-gray-600">
                            Once enrolled, you have lifetime access to all course materials. This includes any future updates or additional content added to the course over time.
                          </p>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg overflow-hidden">
                        <div className="p-4 bg-gray-50">
                          <h3 className="font-medium text-gray-900">Is there any support if I have questions during the course?</h3>
                        </div>
                        <div className="p-4 border-t">
                          <p className="text-gray-600">
                            Absolutely! You can ask questions in the dedicated Q&A section for each lesson. The instructor typically responds within 24-48 hours. You'll also benefit from a community of fellow students who can help with certain questions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Have a Question?</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <form className="space-y-4">
                        <textarea 
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows="3"
                          placeholder="Type your question here..."
                        ></textarea>
                        <button 
                          type="submit"
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Submit Question
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {/* Avis (Reviews) Tab */}
              {activeTab === 'avis' && (
                <div className="py-4">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-gray-900 mb-1">{course.averageRating}</div>
                      <div className="flex items-center justify-center mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg 
                            key={star}
                            className={`w-5 h-5 ${star <= Math.floor(course.averageRating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <div className="text-sm text-gray-500">Course Rating</div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((num) => (
                          <div key={num} className="flex items-center gap-2">
                            <div className="flex items-center gap-1 w-16">
                              <span className="text-sm text-gray-600">{num}</span>
                              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </div>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-yellow-400 rounded-full"
                                style={{ width: `${num === 5 ? 70 : num === 4 ? 20 : num === 3 ? 5 : num === 2 ? 3 : 2}%` }}
                              ></div>
                            </div>
                            <div className="w-12 text-xs text-gray-500 text-right">
                              {num === 5 ? '70%' : num === 4 ? '20%' : num === 3 ? '5%' : num === 2 ? '3%' : '2%'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-gray-900 mb-4">{course.reviews} Reviews</h3>
                    
                    <div className="space-y-6">
                      {/* Sample reviews - in a real app these would come from an API or data file */}
                      <div className="border-b pb-6">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full overflow-hidden">
                            <img src="https://via.placeholder.com/40" alt="Reviewer" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Alex Thompson</h4>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg 
                                    key={star}
                                    className={`w-4 h-4 ${star <= 5 ? 'text-yellow-400' : 'text-gray-300'}`} 
                                    fill="currentColor" 
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">2 weeks ago</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600">
                          This course exceeded my expectations. The content is well-structured and the instructor explains complex concepts in an easy-to-understand way. I've already started applying what I've learned to my projects.
                        </p>
                      </div>
                      
                      <div className="border-b pb-6">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full overflow-hidden">
                            <img src="https://via.placeholder.com/40" alt="Reviewer" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Maria Rodriguez</h4>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg 
                                    key={star}
                                    className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`} 
                                    fill="currentColor" 
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">1 month ago</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600">
                          Great course for beginners! The instructor takes time to explain each concept thoroughly. I would have liked more advanced topics towards the end, which is why I'm giving 4 stars instead of 5. Overall, still highly recommended.
                        </p>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full overflow-hidden">
                            <img src="https://via.placeholder.com/40" alt="Reviewer" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">James Wilson</h4>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg 
                                    key={star}
                                    className={`w-4 h-4 ${star <= 5 ? 'text-yellow-400' : 'text-gray-300'}`} 
                                    fill="currentColor" 
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">2 months ago</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600">
                          The practical exercises and real-world examples in this course make it stand out from others I've taken. The instructor is knowledgeable and responds quickly to questions. Worth every penny!
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-8 text-center">
                      <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        Load More Reviews
                      </button>
                    </div>
                    
                    {/* Add Review Form */}
                    <div className="mt-10 border-t pt-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Share Your Feedback</h3>
                      
                      {isEnrolled ? (
                        <div className="bg-gray-50 rounded-lg p-6">
                          <form onSubmit={handleSubmitReview}>
                            <div className="mb-6">
                              <label className="block text-gray-700 text-sm font-medium mb-2">Your Rating</label>
                              <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                  <button 
                                    key={rating}
                                    type="button"
                                    className="w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100"
                                    title={`${rating} star${rating !== 1 ? 's' : ''}`}
                                    onClick={() => setUserRating(rating)}
                                  >
                                    <svg 
                                      className={`w-8 h-8 mx-auto text-gray-300 hover:text-yellow-400 ${
                                        rating <= userRating ? 'text-yellow-400' : ''
                                      }`} 
                                      fill="currentColor" 
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  </button>
                                ))}
                              </div>
                            </div>
                            
                            <div className="mb-6">
                              <label htmlFor="review-title" className="block text-gray-700 text-sm font-medium mb-2">Review Title</label>
                              <input
                                type="text"
                                id="review-title"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Summarize your experience"
                                value={reviewTitle}
                                onChange={(e) => setReviewTitle(e.target.value)}
                              />
                            </div>
                            
                            <div className="mb-6">
                              <label htmlFor="review-content" className="block text-gray-700 text-sm font-medium mb-2">Your Review</label>
                              <textarea
                                id="review-content"
                                rows="4"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="What did you like or dislike? What did you use this course for?"
                                value={reviewContent}
                                onChange={(e) => setReviewContent(e.target.value)}
                              ></textarea>
                            </div>
                            
                            <button
                              type="submit"
                              className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Submit Review
                            </button>
                          </form>
                        </div>
                      ) : (
                        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-6 text-center">
                          <div className="mb-4">
                            <svg className="w-12 h-12 text-yellow-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h4 className="text-lg font-medium text-gray-800 mb-2">Enroll to Leave a Review</h4>
                          <p className="text-gray-600 mb-4">You need to be enrolled in this course to share your feedback.</p>
                          <button
                            onClick={handleEnrollClick}
                            className="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                          >
                            Enroll Now
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Course Info Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-20">
                {/* Video Preview */}
                <div className="relative aspect-video">
                  <img 
                    src={course.image || 'https://via.placeholder.com/400x300?text=No+Image'} 
                    alt={course.nom} 
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
                  <h2 className="text-xl font-semibold mb-6">{course.nom}</h2>
                  
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
                      <span className="text-gray-600">{course.modules?.length || 0} Modules</span>
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
    </>
  );
};

export default CourseDetailsPage; 