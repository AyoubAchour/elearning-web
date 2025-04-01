import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CreateQuizPage = () => {
  const navigate = useNavigate();
  
  // Sample instructor courses data
  const instructorCourses = [
    { id: 1, title: 'React Fundamentals' },
    { id: 2, title: 'Advanced JavaScript' },
    { id: 3, title: 'Python for Beginners' },
    { id: 4, title: 'Data Science with Python' },
    { id: 5, title: 'Web Design Fundamentals' }
  ];

  // Basic quiz information
  const [quizInfo, setQuizInfo] = useState({
    title: '',
    courseId: '',
    description: '',
    passingScore: 70,
    timeLimit: 15,
    active: true
  });

  // Question management
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    }
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('basic'); // 'basic' or 'questions'
  const [errors, setErrors] = useState({});

  // Handle quiz info changes
  const handleQuizInfoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setQuizInfo({
      ...quizInfo,
      [name]: type === 'checkbox' ? checked : 
              type === 'number' ? Number(value) : 
              value
    });
    
    // Clear any error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // Handle adding a new question
  const handleAddQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    };
    setQuestions([...questions, newQuestion]);
    setCurrentQuestionIndex(questions.length);
  };

  // Handle question text changes
  const handleQuestionChange = (e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex] = {
      ...updatedQuestions[currentQuestionIndex],
      question: e.target.value
    };
    setQuestions(updatedQuestions);
  };

  // Handle option text changes
  const handleOptionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex] = {
      ...updatedQuestions[currentQuestionIndex],
      options: updatedQuestions[currentQuestionIndex].options.map(
        (option, i) => i === index ? value : option
      )
    };
    setQuestions(updatedQuestions);
  };

  // Handle correct answer selection
  const handleCorrectAnswerChange = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex] = {
      ...updatedQuestions[currentQuestionIndex],
      correctAnswer: index
    };
    setQuestions(updatedQuestions);
  };

  // Handle removing a question
  const handleRemoveQuestion = (indexToRemove) => {
    if (questions.length <= 1) {
      return; // Don't allow removing the last question
    }
    
    const updatedQuestions = questions.filter((_, index) => index !== indexToRemove);
    setQuestions(updatedQuestions);
    
    // Adjust current question index if needed
    if (currentQuestionIndex >= updatedQuestions.length) {
      setCurrentQuestionIndex(updatedQuestions.length - 1);
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Validate quiz info
    if (!quizInfo.title.trim()) {
      newErrors.title = 'Quiz title is required';
    }
    
    if (!quizInfo.courseId) {
      newErrors.courseId = 'Course selection is required';
    }
    
    if (!quizInfo.description.trim()) {
      newErrors.description = 'Quiz description is required';
    }
    
    if (quizInfo.passingScore < 1 || quizInfo.passingScore > 100) {
      newErrors.passingScore = 'Passing score must be between 1 and 100';
    }
    
    if (quizInfo.timeLimit < 1) {
      newErrors.timeLimit = 'Time limit must be at least 1 minute';
    }
    
    // Validate questions
    const questionErrors = [];
    questions.forEach((question, index) => {
      const qErrors = {};
      
      if (!question.question.trim()) {
        qErrors.question = 'Question text is required';
      }
      
      // Check if at least two options are provided
      const validOptions = question.options.filter(opt => opt.trim().length > 0);
      if (validOptions.length < 2) {
        qErrors.options = 'At least two answer options are required';
      }
      
      // Make sure the correct answer has content
      if (!question.options[question.correctAnswer]?.trim()) {
        qErrors.correctAnswer = 'The correct answer must have content';
      }
      
      if (Object.keys(qErrors).length > 0) {
        questionErrors[index] = qErrors;
      }
    });
    
    if (questionErrors.length > 0) {
      newErrors.questions = questionErrors;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Focus on the section with errors
      if (Object.keys(errors).some(key => ['title', 'courseId', 'description', 'passingScore', 'timeLimit'].includes(key))) {
        setActiveSection('basic');
      } else {
        setActiveSection('questions');
      }
      return;
    }
    
    // In a real app, we would send this data to an API
    console.log('Quiz to be created:', {
      ...quizInfo,
      questions
    });
    
    // Redirect back to the quizzes list
    navigate('/instructor/quizzes');
  };

  // Current question data
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="pb-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Quiz</h1>
        <p className="text-gray-600">Create assessments to test your students' knowledge</p>
      </div>
      
      {/* Navigation Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <button
              className={`inline-block py-4 px-4 text-sm font-medium ${
                activeSection === 'basic'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
              }`}
              onClick={() => setActiveSection('basic')}
            >
              Basic Information
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block py-4 px-4 text-sm font-medium ${
                activeSection === 'questions'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
              }`}
              onClick={() => setActiveSection('questions')}
            >
              Questions ({questions.length})
            </button>
          </li>
        </ul>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Basic Information Section */}
        {activeSection === 'basic' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Quiz Details</h2>
            </div>
            <div className="p-6 space-y-6">
              {/* Quiz Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Quiz Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={quizInfo.title}
                  onChange={handleQuizInfoChange}
                  className={`block w-full border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="e.g., JavaScript Fundamentals Quiz"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>
              
              {/* Course Selection */}
              <div>
                <label htmlFor="courseId" className="block text-sm font-medium text-gray-700 mb-1">
                  Course <span className="text-red-500">*</span>
                </label>
                <select
                  id="courseId"
                  name="courseId"
                  value={quizInfo.courseId}
                  onChange={handleQuizInfoChange}
                  className={`block w-full border ${errors.courseId ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                >
                  <option value="">Select a course</option>
                  {instructorCourses.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
                {errors.courseId && (
                  <p className="mt-1 text-sm text-red-600">{errors.courseId}</p>
                )}
              </div>
              
              {/* Quiz Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={quizInfo.description}
                  onChange={handleQuizInfoChange}
                  className={`block w-full border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Explain what this quiz will assess and any instructions for students"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>
              
              {/* Quiz Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="passingScore" className="block text-sm font-medium text-gray-700 mb-1">
                    Passing Score (%)
                  </label>
                  <input
                    type="number"
                    id="passingScore"
                    name="passingScore"
                    min="1"
                    max="100"
                    value={quizInfo.passingScore}
                    onChange={handleQuizInfoChange}
                    className={`block w-full border ${errors.passingScore ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                  {errors.passingScore && (
                    <p className="mt-1 text-sm text-red-600">{errors.passingScore}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="timeLimit" className="block text-sm font-medium text-gray-700 mb-1">
                    Time Limit (minutes)
                  </label>
                  <input
                    type="number"
                    id="timeLimit"
                    name="timeLimit"
                    min="1"
                    value={quizInfo.timeLimit}
                    onChange={handleQuizInfoChange}
                    className={`block w-full border ${errors.timeLimit ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                  {errors.timeLimit && (
                    <p className="mt-1 text-sm text-red-600">{errors.timeLimit}</p>
                  )}
                </div>
              </div>
              
              {/* Active Status */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="active"
                  name="active"
                  checked={quizInfo.active}
                  onChange={handleQuizInfoChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="active" className="ml-2 block text-sm text-gray-700">
                  Make quiz active and available to students
                </label>
              </div>
            </div>
          </div>
        )}
        
        {/* Questions Section */}
        {activeSection === 'questions' && (
          <div className="space-y-6">
            {/* Question Tabs */}
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Quiz Questions</h3>
                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Question
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {questions.map((question, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium ${
                      currentQuestionIndex === index
                        ? 'bg-indigo-600 text-white'
                        : question.question.trim() ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    Question {index + 1}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Current Question Editor */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Question {currentQuestionIndex + 1}</h3>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveQuestion(currentQuestionIndex)}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-red-600 bg-white hover:bg-gray-50 focus:outline-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove
                  </button>
                )}
              </div>
              <div className="p-6 space-y-6">
                {/* Question Text */}
                <div>
                  <label htmlFor="questionText" className="block text-sm font-medium text-gray-700 mb-1">
                    Question <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="questionText"
                    rows={2}
                    value={currentQuestion.question}
                    onChange={handleQuestionChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your question here"
                  />
                  {errors.questions?.[currentQuestionIndex]?.question && (
                    <p className="mt-1 text-sm text-red-600">{errors.questions[currentQuestionIndex].question}</p>
                  )}
                </div>
                
                {/* Answer Options */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Answer Options <span className="text-red-500">*</span>
                  </label>
                  
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center mb-4">
                      <input
                        type="radio"
                        id={`answer-${index}`}
                        name="correctAnswer"
                        checked={currentQuestion.correctAnswer === index}
                        onChange={() => handleCorrectAnswerChange(index)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        className="ml-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder={`Option ${index + 1}`}
                      />
                    </div>
                  ))}
                  
                  {errors.questions?.[currentQuestionIndex]?.options && (
                    <p className="mt-1 text-sm text-red-600">{errors.questions[currentQuestionIndex].options}</p>
                  )}
                  {errors.questions?.[currentQuestionIndex]?.correctAnswer && (
                    <p className="mt-1 text-sm text-red-600">{errors.questions[currentQuestionIndex].correctAnswer}</p>
                  )}
                  
                  <p className="text-sm text-gray-500 mt-2">
                    Select the radio button next to the correct answer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Form Actions */}
        <div className="mt-6 flex justify-between">
          <Link
            to="/instructor/quizzes"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
          >
            Cancel
          </Link>
          
          <div className="flex space-x-3">
            {activeSection === 'basic' ? (
              <button
                type="button"
                onClick={() => setActiveSection('questions')}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              >
                Continue to Questions
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setActiveSection('basic')}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                >
                  Back to Details
                </button>
                
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                >
                  Create Quiz
                </button>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateQuizPage; 