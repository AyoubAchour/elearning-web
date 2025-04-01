import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CourseQuizzesPage = () => {
  // Sample instructor courses data
  const instructorCourses = [
    { id: 1, title: 'React Fundamentals' },
    { id: 2, title: 'Advanced JavaScript' },
    { id: 3, title: 'Python for Beginners' },
    { id: 4, title: 'Data Science with Python' },
    { id: 5, title: 'Web Design Fundamentals' }
  ];

  // Sample quizzes data
  const [quizzes, setQuizzes] = useState([
    { 
      id: 1,
      courseId: 1,
      title: 'React Fundamentals Mid-Term',
      questions: 10,
      passingScore: 70,
      timeLimit: 15,
      active: true,
      attempts: 145,
      avgScore: 82,
      passRate: 78
    },
    { 
      id: 2,
      courseId: 1,
      title: 'React Fundamentals Final Exam',
      questions: 15,
      passingScore: 75,
      timeLimit: 30,
      active: true,
      attempts: 112,
      avgScore: 76,
      passRate: 65
    },
    { 
      id: 3,
      courseId: 2,
      title: 'JavaScript Advanced Concepts',
      questions: 12,
      passingScore: 70,
      timeLimit: 20,
      active: true,
      attempts: 89,
      avgScore: 79,
      passRate: 71
    },
    { 
      id: 4,
      courseId: 3,
      title: 'Python Basics Assessment',
      questions: 10,
      passingScore: 65,
      timeLimit: 15,
      active: true,
      attempts: 210,
      avgScore: 81,
      passRate: 85
    }
  ]);

  // Filter states
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showInactiveQuizzes, setShowInactiveQuizzes] = useState(false);
  
  // Deletion confirmation
  const [quizToDelete, setQuizToDelete] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // Filter quizzes based on selected filters
  const filteredQuizzes = quizzes.filter(quiz => {
    // Filter by course
    if (selectedCourse !== 'all' && quiz.courseId.toString() !== selectedCourse) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm && !quiz.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by active status
    if (!showInactiveQuizzes && !quiz.active) {
      return false;
    }
    
    return true;
  });

  // Handle quiz deletion
  const initiateDelete = (quizId) => {
    const quiz = quizzes.find(q => q.id === quizId);
    setQuizToDelete(quiz);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    if (quizToDelete) {
      // In a real app, this would send a request to your API
      setQuizzes(quizzes.filter(q => q.id !== quizToDelete.id));
      setShowDeleteConfirmation(false);
      setQuizToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setQuizToDelete(null);
  };

  // Toggle quiz active status
  const toggleQuizStatus = (quizId) => {
    setQuizzes(quizzes.map(quiz => 
      quiz.id === quizId ? { ...quiz, active: !quiz.active } : quiz
    ));
  };

  // Find course title by ID
  const getCourseTitle = (courseId) => {
    const course = instructorCourses.find(c => c.id === courseId);
    return course ? course.title : 'Unknown Course';
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Course Quizzes</h1>
        <p className="text-gray-600">Create and manage quizzes for your courses</p>
      </div>

      {/* Filters and Actions */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search quizzes..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Course Filter */}
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="all">All Courses</option>
            {instructorCourses.map(course => (
              <option key={course.id} value={course.id.toString()}>
                {course.title}
              </option>
            ))}
          </select>
          
          {/* Show Inactive Toggle */}
          <div className="flex items-center">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={showInactiveQuizzes} 
                  onChange={() => setShowInactiveQuizzes(!showInactiveQuizzes)}
                />
                <div className={`block w-10 h-6 rounded-full ${showInactiveQuizzes ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${showInactiveQuizzes ? 'transform translate-x-4' : ''}`}></div>
              </div>
              <span className="ml-3 text-sm text-gray-700">Show inactive quizzes</span>
            </label>
          </div>
        </div>

        <Link
          to="/instructor/quizzes/create"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center whitespace-nowrap"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create New Quiz
        </Link>
      </div>

      {/* Quizzes Table */}
      {filteredQuizzes.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quiz Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Questions
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Passing Score
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time Limit
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pass Rate
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredQuizzes.map((quiz) => (
                  <tr key={quiz.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {quiz.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getCourseTitle(quiz.courseId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {quiz.questions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {quiz.passingScore}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {quiz.timeLimit} min
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 max-w-[100px]">
                          <div 
                            className={`h-2.5 rounded-full ${
                              quiz.passRate < 50 ? 'bg-red-500' : 
                              quiz.passRate < 70 ? 'bg-yellow-500' : 
                              'bg-green-500'
                            }`} 
                            style={{ width: `${quiz.passRate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500">{quiz.passRate}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <button
                          onClick={() => toggleQuizStatus(quiz.id)}
                          className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${
                            quiz.active ? 'bg-green-500' : 'bg-gray-200'
                          }`}
                          role="switch"
                        >
                          <span
                            className={`${
                              quiz.active ? 'translate-x-5' : 'translate-x-0'
                            } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                          ></span>
                        </button>
                        <span className="ml-2 text-sm text-gray-500">
                          {quiz.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/instructor/quizzes/${quiz.id}/results`}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Results
                      </Link>
                      <Link
                        to={`/instructor/quizzes/${quiz.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => initiateDelete(quiz.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No quizzes found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || selectedCourse !== 'all' || !showInactiveQuizzes
              ? "Try adjusting your filters to find what you're looking for."
              : "Get started by creating your first quiz for your course."}
          </p>
          <Link
            to="/instructor/quizzes/create"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Quiz
          </Link>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white rounded-lg max-w-md w-full mx-4 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Quiz</h3>
            <p className="text-gray-500 mb-6">
              Are you sure you want to delete the quiz "{quizToDelete?.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseQuizzesPage; 