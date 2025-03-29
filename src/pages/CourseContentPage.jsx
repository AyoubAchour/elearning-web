import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { isAuthenticated, hasActiveSubscription, getEnrolledCourses } from '../utils/auth';
import { extendedCoursesData } from '../data/extendedCoursesData';

const CourseContentPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [activeModule, setActiveModule] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [progress] = useState(30); // Mock progress percentage
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    // Check if user is authenticated and has subscription or is enrolled in this course
    const checkAccess = () => {
      const isAuth = isAuthenticated();
      const hasSubscription = hasActiveSubscription();
      const enrolledCourses = getEnrolledCourses();
      
      if (!isAuth) {
        navigate('/login', { state: { from: `/courses/${courseId}/content` } });
        return false;
      }
      
      if (!hasSubscription && !enrolledCourses.includes(courseId)) {
        navigate(`/courses/${courseId}`);
        return false;
      }
      
      return true;
    };
    
    if (checkAccess()) {
      // Find course in our data
      const foundCourse = extendedCoursesData.find(c => c.id === parseInt(courseId));
      
      if (foundCourse) {
        setCourse(foundCourse);
        // Initialize completed lessons from localStorage if available
        const savedProgress = localStorage.getItem(`course_${courseId}_progress`);
        if (savedProgress) {
          setCompletedLessons(JSON.parse(savedProgress));
        }
      } else {
        // Fallback to mock data if course not found
        const mockCourseData = {
          id: courseId,
          title: 'Course Not Found',
          description: 'This course could not be found in our database.',
          instructor: 'Unknown',
          modules: [
            {
              id: 1,
              title: 'No content available',
              lessons: [
                {
                  id: '1-1',
                  title: 'No lessons available',
                  duration: '0:00',
                  type: 'video',
                  completed: false,
                  videoUrl: '',
                }
              ]
            }
          ]
        };
        setCourse(mockCourseData);
      }
      
      setLoading(false);
    }
  }, [courseId, navigate]);

  const handleModuleClick = (index) => {
    setActiveModule(index);
    setActiveLesson(0); // Reset to first lesson when changing modules
  };

  const handleLessonClick = (moduleIndex, lessonIndex) => {
    setActiveModule(moduleIndex);
    setActiveLesson(lessonIndex);
    setIsMobileMenuOpen(false); // Close mobile menu when selecting a lesson
  };

  const toggleVideoPlayback = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  const toggleLessonCompletion = (lessonId) => {
    const updatedCompletedLessons = completedLessons.includes(lessonId)
      ? completedLessons.filter(id => id !== lessonId)
      : [...completedLessons, lessonId];
    
    setCompletedLessons(updatedCompletedLessons);
    
    // Save progress to localStorage
    localStorage.setItem(
      `course_${courseId}_progress`, 
      JSON.stringify(updatedCompletedLessons)
    );
  };

  const calculateCourseProgress = () => {
    if (!course) return 0;
    
    const totalLessons = course.modules.reduce(
      (total, module) => total + module.lessons.length, 
      0
    );
    
    return Math.round((completedLessons.length / totalLessons) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center pt-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const currentLesson = course?.modules[activeModule]?.lessons[activeLesson];
  const courseProgress = calculateCourseProgress();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 pt-16">
      {/* Mobile course menu toggle */}
      <div className="lg:hidden fixed bottom-4 right-4 z-30">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row flex-grow">
        {/* Video Section */}
        <div className="w-full lg:w-2/3 bg-black lg:min-h-screen lg:sticky lg:top-16 lg:h-[calc(100vh-64px)]">
          {/* Course Progress Bar */}
          <div className="bg-blue-800 text-white px-4 py-2">
            <div className="flex justify-between items-center text-sm mb-1">
              <span>Course Progress</span>
              <span>{courseProgress}% Complete</span>
            </div>
            <div className="w-full bg-blue-900 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${courseProgress}%` }}
              ></div>
            </div>
          </div>
          
          {/* Video Container */}
          <div className="relative" style={{ paddingBottom: "56.25%" }}>
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-900">
              {!isVideoPlaying ? (
                <div className="text-center">
                  <h3 className="text-white text-xl font-medium mb-6">{currentLesson?.title}</h3>
                  <button 
                    onClick={toggleVideoPlayback}
                    className="bg-blue-600 rounded-full p-4 hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  {/* Video Player Placeholder */}
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-white text-lg">Video is playing: {currentLesson?.title}</p>
                    </div>
                    {/* Video Controls Overlay - only show when hovering */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <button 
                        onClick={toggleVideoPlayback}
                        className="bg-white/20 backdrop-blur-sm rounded-full p-2 text-white"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Video Controls */}
          <div className="bg-gray-900 px-6 py-4">
            <div className="flex justify-between items-center text-white mb-2">
              <span className="text-sm md:text-base font-medium">{currentLesson?.title}</span>
              <span className="text-sm">{currentLesson?.duration}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5 mb-4">
              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="flex justify-between">
              <div className="flex space-x-4">
                <button className="text-gray-300 hover:text-white focus:outline-none transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z"></path>
                  </svg>
                </button>
                <button className="text-gray-300 hover:text-white focus:outline-none transition-colors" onClick={toggleVideoPlayback}>
                  {isVideoPlaying ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                    </svg>
                  )}
                </button>
                <button className="text-gray-300 hover:text-white focus:outline-none transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z"></path>
                  </svg>
                </button>
              </div>
              <div className="flex space-x-4">
                <button 
                  className="text-gray-300 hover:text-white focus:outline-none transition-colors"
                  onClick={() => toggleLessonCompletion(currentLesson?.id)}
                >
                  {completedLessons.includes(currentLesson?.id) ? (
                    <div className="flex items-center space-x-1 text-green-500">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span className="text-xs">Completed</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-xs">Mark as Complete</span>
                    </div>
                  )}
                </button>
                <button className="text-gray-300 hover:text-white focus:outline-none transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Course Contents Sidebar - Desktop */}
        <div className={`lg:w-1/3 bg-white lg:h-[calc(100vh-64px)] lg:sticky lg:top-16 overflow-y-auto transition-all duration-300 lg:block ${
          isMobileMenuOpen ? 'fixed inset-0 z-20 pt-16' : 'hidden'
        }`}>
          <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
            <h2 className="text-xl font-bold text-gray-800">Course Contents</h2>
            <p className="text-sm text-gray-500">
              {course?.modules.length} sections • {course?.modules.reduce((total, module) => total + module.lessons.length, 0)} lessons
            </p>
          </div>
          
          <div className="p-2">
            {course?.modules.map((module, moduleIndex) => (
              <div key={module.id} className="mb-4">
                <button
                  className={`flex items-center justify-between w-full p-3 rounded-lg text-left ${
                    activeModule === moduleIndex 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                  onClick={() => handleModuleClick(moduleIndex)}
                >
                  <div className="flex items-center">
                    <div className={`w-7 h-7 flex items-center justify-center rounded-full mr-3 ${
                      activeModule === moduleIndex ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {moduleIndex + 1}
                    </div>
                    <span className={activeModule === moduleIndex ? 'font-medium' : ''}>{module.title}</span>
                  </div>
                  <div className="flex items-center">
                    {/* Module Progress Indicator */}
                    <div className="mr-3 text-xs text-gray-500">
                      {module.lessons.filter(lesson => 
                        completedLessons.includes(lesson.id)
                      ).length}/{module.lessons.length}
                    </div>
                    <svg
                      className={`w-5 h-5 transform transition-transform ${
                        activeModule === moduleIndex ? 'rotate-180' : ''
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </button>
                
                {/* Lesson list */}
                {activeModule === moduleIndex && (
                  <div className="pl-12 pr-3 space-y-1 mt-1">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <button
                        key={lesson.id}
                        className={`flex items-center w-full p-3 rounded-lg text-left group ${
                          activeModule === moduleIndex && activeLesson === lessonIndex
                            ? 'bg-blue-100 text-blue-700'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                        onClick={() => handleLessonClick(moduleIndex, lessonIndex)}
                      >
                        <div className="mr-3 flex-shrink-0">
                          {completedLessons.includes(lesson.id) ? (
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-blue-500"></div>
                          )}
                        </div>
                        <div className="flex-grow">
                          <p className={`text-sm ${
                            activeModule === moduleIndex && activeLesson === lessonIndex 
                              ? 'font-medium' 
                              : ''
                          }`}>
                            {lesson.title}
                          </p>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            {lesson.type === 'video' ? (
                              <>
                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                                <span>{lesson.duration} video</span>
                              </>
                            ) : (
                              <>
                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                                <span>{lesson.duration} reading</span>
                              </>
                            )}
                          </div>
                        </div>
                        {/* Current Lesson Indicator */}
                        {activeModule === moduleIndex && activeLesson === lessonIndex && (
                          <div className="ml-2 w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Additional Resources Section */}
          <div className="border-t border-gray-200 p-4 mt-4">
            <h3 className="font-bold text-gray-800 mb-3">Additional Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 00-1.414-1.414L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                  Course materials (PDF)
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path>
                  </svg>
                  Discussion forum
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                  </svg>
                  Get help from instructor
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContentPage; 