import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const QuizResultsPage = () => {
  const { quizId } = useParams();
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState(null);
  const [results, setResults] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Fetch quiz and results data
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      const quizData = {
        id: parseInt(quizId),
        title: quizId === '1' ? 'React Fundamentals Mid-Term' : 
               quizId === '2' ? 'React Fundamentals Final Exam' : 
               quizId === '3' ? 'JavaScript Advanced Concepts' : 
               'Python Basics Assessment',
        courseId: parseInt(quizId) <= 2 ? 1 : parseInt(quizId) === 3 ? 2 : 3,
        courseName: parseInt(quizId) <= 2 ? 'React Fundamentals' : 
                   parseInt(quizId) === 3 ? 'Advanced JavaScript' : 
                   'Python for Beginners',
        questions: parseInt(quizId) === 2 ? 15 : 10,
        passingScore: parseInt(quizId) === 2 ? 75 : 70
      };

      // Generate sample results
      const sampleResults = Array.from({ length: 25 }, (_, index) => {
        const score = Math.floor(Math.random() * 101);
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));
        
        return {
          id: index + 1,
          studentId: 100 + index,
          studentName: `Student ${100 + index}`,
          email: `student${100 + index}@example.com`,
          avatar: `https://randomuser.me/api/portraits/${index % 2 ? 'men' : 'women'}/${(index % 15) + 1}.jpg`,
          score,
          passed: score >= quizData.passingScore,
          submittedAt: date.toISOString(),
          completionTime: Math.floor(Math.random() * 15) + 5, // minutes
          attempts: Math.floor(Math.random() * 2) + 1
        };
      });

      setQuiz(quizData);
      setResults(sampleResults);
      setLoading(false);
    }, 1000);
  }, [quizId]);

  // Handle sorting
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc'); // Default to descending when changing sort field
    }
  };

  // Filter and sort results
  const filteredResults = results.filter(result => {
    if (filterStatus === 'passed') {
      return result.passed;
    } else if (filterStatus === 'failed') {
      return !result.passed;
    }
    return true;
  });

  const sortedResults = [...filteredResults].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'name') {
      comparison = a.studentName.localeCompare(b.studentName);
    } else if (sortBy === 'score') {
      comparison = a.score - b.score;
    } else if (sortBy === 'time') {
      comparison = a.completionTime - b.completionTime;
    } else if (sortBy === 'attempts') {
      comparison = a.attempts - b.attempts;
    } else if (sortBy === 'date') {
      comparison = new Date(a.submittedAt) - new Date(b.submittedAt);
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // View student result details
  const viewStudentResult = (studentId) => {
    setSelectedStudentId(studentId);
  };

  // Close student result modal
  const closeStudentResult = () => {
    setSelectedStudentId(null);
  };

  // Get selected student data
  const selectedStudent = selectedStudentId ? results.find(r => r.studentId === selectedStudentId) : null;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quiz Results</h1>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-2">
          <div>
            <h2 className="text-lg font-medium text-gray-900">{quiz.title}</h2>
            <p className="text-gray-600">{quiz.courseName}</p>
          </div>
          <div className="mt-2 sm:mt-0 flex items-center space-x-2">
            <Link
              to={`/instructor/quizzes/${quizId}/edit`}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit Quiz
            </Link>
            <Link
              to="/instructor/quizzes"
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Quizzes
            </Link>
          </div>
        </div>
      </div>

      {/* Quiz overview */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Average Score</span>
            <span className="text-2xl font-bold text-gray-900">
              {Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length)}%
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Pass Rate</span>
            <span className="text-2xl font-bold text-gray-900">
              {Math.round((results.filter(r => r.passed).length / results.length) * 100)}%
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Avg. Completion Time</span>
            <span className="text-2xl font-bold text-gray-900">
              {Math.round(results.reduce((sum, r) => sum + r.completionTime, 0) / results.length)} min
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div>
            <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">Filter by status</label>
            <select
              id="statusFilter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="all">All Results</option>
              <option value="passed">Passed Only</option>
              <option value="failed">Failed Only</option>
            </select>
          </div>
          <div className="ml-auto flex items-center">
            <span className="text-sm text-gray-500 mr-2">Total Results: {filteredResults.length}</span>
          </div>
        </div>
      </div>

      {/* Results table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    className="flex items-center focus:outline-none"
                    onClick={() => handleSort('name')}
                  >
                    Student
                    {sortBy === 'name' && (
                      <span className="ml-1">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    className="flex items-center focus:outline-none"
                    onClick={() => handleSort('score')}
                  >
                    Score
                    {sortBy === 'score' && (
                      <span className="ml-1">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    className="flex items-center focus:outline-none"
                    onClick={() => handleSort('time')}
                  >
                    Completion Time
                    {sortBy === 'time' && (
                      <span className="ml-1">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    className="flex items-center focus:outline-none"
                    onClick={() => handleSort('attempts')}
                  >
                    Attempts
                    {sortBy === 'attempts' && (
                      <span className="ml-1">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    className="flex items-center focus:outline-none"
                    onClick={() => handleSort('date')}
                  >
                    Submitted
                    {sortBy === 'date' && (
                      <span className="ml-1">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedResults.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full object-cover" src={result.avatar} alt={result.studentName} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{result.studentName}</div>
                        <div className="text-sm text-gray-500">{result.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="text-sm font-medium text-gray-900">{result.score}%</div>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          result.score < quiz.passingScore ? 'bg-red-500' :
                          result.score < 80 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${result.score}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      result.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {result.passed ? 'Passed' : 'Failed'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {result.completionTime} minutes
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {result.attempts}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(result.submittedAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => viewStudentResult(result.studentId)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Result Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white rounded-lg max-w-2xl w-full mx-4 p-6 overflow-y-auto max-h-screen">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Student Quiz Result</h2>
              <button onClick={closeStudentResult} className="text-gray-400 hover:text-gray-500">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-6 flex items-center">
              <div className="flex-shrink-0 h-16 w-16">
                <img className="h-16 w-16 rounded-full object-cover" src={selectedStudent.avatar} alt={selectedStudent.studentName} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{selectedStudent.studentName}</h3>
                <p className="text-gray-600">{selectedStudent.email}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Quiz Performance</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Score</p>
                  <p className={`text-lg font-semibold ${
                    selectedStudent.passed ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {selectedStudent.score}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <p className={`text-lg font-semibold ${
                    selectedStudent.passed ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {selectedStudent.passed ? 'Passed' : 'Failed'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Completion Time</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedStudent.completionTime} minutes</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Attempts</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedStudent.attempts}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Question Performance</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-3">This is a placeholder for detailed question-by-question analysis.</p>
                <div className="space-y-3">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className="flex items-center">
                      <div className={`flex-shrink-0 h-5 w-5 rounded-full ${
                        Math.random() > 0.3 ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-700">Question {i + 1}</p>
                      </div>
                    </div>
                  ))}
                  <p className="text-xs text-gray-500 mt-4">And more questions...</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={closeStudentResult}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizResultsPage; 