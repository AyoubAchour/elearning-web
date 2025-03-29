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
  const [completedLessons, setCompletedLessons] = useState([]);
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isCourseFinished, setIsCourseFinished] = useState(false);
  const [isQuizDone, setIsQuizDone] = useState(false);

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
      
      setIsEnrolled(true);
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
        
        // Load saved notes
        const savedNotes = localStorage.getItem(`course_${courseId}_notes`);
        if (savedNotes) {
          setNotes(JSON.parse(savedNotes));
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

  // Check if course is completed whenever completedLessons changes
  useEffect(() => {
    if (course) {
      const totalLessons = course.modules.reduce(
        (total, module) => total + module.lessons.length, 
        0
      );
      const finished = completedLessons.length === totalLessons;
      setIsCourseFinished(finished);
      
      // Check if quiz is completed
      const quizResultsStr = localStorage.getItem(`course_${courseId}_quiz_results`);
      if (quizResultsStr) {
        try {
          const quizResults = JSON.parse(quizResultsStr);
          setIsQuizDone(quizResults.completed === true);
        } catch {
          setIsQuizDone(false);
        }
      }
    }
  }, [courseId, course, completedLessons]);

  const handleModuleClick = (index) => {
    setActiveModule(index);
    setActiveLesson(0); // Reset to first lesson when changing modules
  };

  const handleLessonClick = (moduleIndex, lessonIndex) => {
    setActiveModule(moduleIndex);
    setActiveLesson(lessonIndex);
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
  
  const handleAddNote = () => {
    if (note.trim()) {
      const newNote = {
        id: Date.now(),
        text: note,
        lessonId: course?.modules[activeModule]?.lessons[activeLesson]?.id,
        lessonTitle: course?.modules[activeModule]?.lessons[activeLesson]?.title,
        timestamp: new Date().toISOString()
      };
      
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      setNote('');
      
      // Save to localStorage
      localStorage.setItem(`course_${courseId}_notes`, JSON.stringify(updatedNotes));
    }
  };
  
  const handleDeleteNote = (noteId) => {
    const updatedNotes = notes.filter(n => n.id !== noteId);
    setNotes(updatedNotes);
    localStorage.setItem(`course_${courseId}_notes`, JSON.stringify(updatedNotes));
  };

  const navigateToNextLesson = () => {
    const currentModule = course?.modules[activeModule];
    if (!currentModule) return;
    
    // If there are more lessons in the current module
    if (activeLesson < currentModule.lessons.length - 1) {
      setActiveLesson(activeLesson + 1);
    } 
    // If there are more modules
    else if (activeModule < course.modules.length - 1) {
      setActiveModule(activeModule + 1);
      setActiveLesson(0);
    }
  };
  
  const navigateToPreviousLesson = () => {
    // If we're not at the first lesson of the current module
    if (activeLesson > 0) {
      setActiveLesson(activeLesson - 1);
    } 
    // If we're at the first lesson but not the first module
    else if (activeModule > 0) {
      setActiveModule(activeModule - 1);
      // Go to the last lesson of the previous module
      setActiveLesson(course.modules[activeModule - 1].lessons.length - 1);
    }
  };

  const navigateToQuiz = () => {
    navigate(`/courses/${courseId}/quiz`);
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
  const currentLessonNotes = notes.filter(n => n.lessonId === currentLesson?.id);

  return (
    <div className="min-h-screen bg-white pt-16"> {/* Add pt-16 to prevent navbar overlap */}
      {/* Header */}
      <div className="bg-blue-600 p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-white text-2xl font-bold">{course?.title}</h1>
          <div className="text-blue-100 text-sm mt-1">{course?.modules.length} sections • {course?.duration}</div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content Area */}
          <div className="w-full md:w-2/3">
            {/* Video Player Area */}
            <div className="bg-black relative aspect-video rounded-lg mb-6">
              <div className="absolute inset-0 flex items-center justify-center">
                {!isVideoPlaying ? (
                  <button 
                    onClick={toggleVideoPlayback}
                    className="bg-white/20 rounded-full p-4 hover:bg-white/30 transition-colors"
                  >
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    {currentLesson?.videoUrl ? (
                      <iframe 
                        className="w-full h-full"
                        src={currentLesson.videoUrl}
                        title={currentLesson.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <div className="text-white text-lg">
                        {currentLesson?.type === 'video' 
                          ? `Playing: ${currentLesson?.title}` 
                          : `This lesson is a ${currentLesson?.type} resource`}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Course Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Your progress</span>
                <span className="text-sm font-medium text-blue-600">{courseProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${courseProgress}%` }}></div>
              </div>
            </div>
            
            {/* Lesson Information */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{currentLesson?.title}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <span>{currentLesson?.duration}</span>
                <span>•</span>
                <span>{currentLesson?.type || 'content'}</span>
                <span>•</span>
                <button 
                  onClick={() => toggleLessonCompletion(currentLesson?.id)}
                  className="flex items-center gap-1 text-blue-600 hover:underline"
                >
                  {completedLessons.includes(currentLesson?.id) ? 'Mark as incomplete' : 'Mark as complete'}
                </button>
              </div>
              
              {currentLesson?.description && (
                <div className="bg-gray-50 p-3 rounded-md mb-4 text-gray-700">
                  {currentLesson.description}
                </div>
              )}
              
              {/* Module progress information */}
              <div className="text-sm text-gray-600">
                <span>Module: </span>
                <span className="font-medium">{course?.modules[activeModule]?.title}</span>
                <span> • </span>
                <span>Lesson {activeLesson + 1} of {course?.modules[activeModule]?.lessons.length}</span>
              </div>
              
              {/* Lesson navigation */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={navigateToPreviousLesson}
                  disabled={activeModule === 0 && activeLesson === 0}
                  className={`flex items-center gap-2 px-4 py-2 border rounded-md ${
                    activeModule === 0 && activeLesson === 0
                      ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                      : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                  Previous
                </button>
                
                <button
                  onClick={navigateToNextLesson}
                  disabled={
                    activeModule === course?.modules.length - 1 && 
                    activeLesson === course?.modules[activeModule]?.lessons.length - 1
                  }
                  className={`flex items-center gap-2 px-4 py-2 border rounded-md ${
                    activeModule === course?.modules.length - 1 && 
                    activeLesson === course?.modules[activeModule]?.lessons.length - 1
                      ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                      : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Notes Section */}
            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Lesson Notes</h3>
              <div className="mb-4">
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add notes for this lesson..."
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                ></textarea>
                <button
                  onClick={handleAddNote}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Save Note
                </button>
              </div>
              
              {currentLessonNotes.length > 0 ? (
                <div className="space-y-3">
                  {currentLessonNotes.map(note => (
                    <div key={note.id} className="bg-white p-3 rounded-md border border-gray-200">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-gray-500">
                          {new Date(note.timestamp).toLocaleString()}
                        </span>
                        <button 
                          onClick={() => handleDeleteNote(note.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                          </svg>
                        </button>
                      </div>
                      <p className="text-gray-700 whitespace-pre-wrap">{note.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No notes for this lesson yet.</p>
              )}
            </div>
            
            {/* Resources Section */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Resources</h3>
              
              <div className="space-y-2">
                <a href="#" className="flex items-center p-3 bg-white rounded-md border border-gray-200 hover:bg-blue-50">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span className="font-medium">Lesson Slides</span>
                </a>
                
                <a href="#" className="flex items-center p-3 bg-white rounded-md border border-gray-200 hover:bg-blue-50">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span className="font-medium">Code Examples</span>
                </a>
                
                <a href="#" className="flex items-center p-3 bg-white rounded-md border border-gray-200 hover:bg-blue-50">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path>
                    </svg>
                  </div>
                  <span className="font-medium">Additional Reading</span>
                </a>
              </div>
            </div>

            {/* Completion message shown only when all lessons are completed and quiz not yet taken */}
            {isCourseFinished && !isQuizDone && (
              <div className="bg-white p-6 border border-gray-200 rounded-lg text-center mb-6">
                <p className="font-bold mb-2">Congratulations! You've completed all lessons.</p>
                <p className="mb-4">Take the quiz to test your knowledge and earn a certificate.</p>
                <button 
                  onClick={navigateToQuiz}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Take Quiz
                </button>
              </div>
            )}

            {/* Certificate message shown when course and quiz are completed */}
            {isCourseFinished && isQuizDone && (
              <div className="bg-white p-6 border border-gray-200 rounded-lg text-center mb-6">
                <p className="font-bold mb-2">Course and Quiz Completed!</p>
                <p className="mb-4">You've successfully completed both the course and the quiz.</p>
                <button 
                  onClick={() => navigate(`/courses/${courseId}/certificate`)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  View Certificate
                </button>
              </div>
            )}
          </div>

          {/* Course Contents Sidebar */}
          <div className="w-full md:w-1/3">
            <div className="bg-gray-50 rounded-lg p-4 sticky top-20"> {/* Make sidebar sticky */}
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-between">
                Course Contents
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </h2>
              
              {isEnrolled ? (
                <div className="divide-y divide-gray-200">
                  {course?.modules.map((module, moduleIndex) => (
                    <div key={module.id} className="py-3">
                      <div className="flex items-center justify-between cursor-pointer" onClick={() => handleModuleClick(moduleIndex)}>
                        <h3 className="text-sm font-medium text-gray-900">{module.title}</h3>
                        <div className="flex items-center text-gray-400 text-xs">
                          <span>{module.lessons.length} videos</span>
                        </div>
                      </div>
                      
                      {activeModule === moduleIndex && (
                        <div className="mt-2 space-y-2 pl-2">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <div 
                              key={lesson.id} 
                              className={`flex items-center py-1 px-2 rounded-md text-sm ${
                                activeModule === moduleIndex && activeLesson === lessonIndex
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'text-gray-700 hover:bg-gray-100 cursor-pointer'
                              }`}
                              onClick={() => handleLessonClick(moduleIndex, lessonIndex)}
                            >
                              <div className="mr-3 flex-shrink-0">
                                {lesson.type === 'video' ? (
                                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                                  </svg>
                                ) : (
                                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"></path>
                                  </svg>
                                )}
                              </div>
                              <div className="flex-grow">
                                <p>{lesson.title}</p>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-500">
                                    {lesson.duration}
                                  </span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleLessonCompletion(lesson.id);
                                    }}
                                    className="ml-2"
                                  >
                                    {completedLessons.includes(lesson.id) ? (
                                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                      </svg>
                                    ) : (
                                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                      </svg>
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="mb-3 text-gray-500">
                    You need to enroll in this course to access the full content
                  </div>
                  <button 
                    onClick={() => navigate(`/courses/${courseId}`)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Go to Course Details
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContentPage; 