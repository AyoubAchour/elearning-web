import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const StudentsPage = () => {
  // Sample students data - in a real app, this would come from an API
  const initialStudents = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
      enrollmentDate: '2023-06-15',
      lastActive: '2023-11-01',
      coursesEnrolled: [
        { id: 1, title: 'React Fundamentals', progress: 78, lastAccessed: '2023-10-29' },
        { id: 3, title: 'Python for Beginners', progress: 42, lastAccessed: '2023-10-15' }
      ],
      completedCourses: 1,
      totalQuizScore: 85
    },
    {
      id: 2,
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      enrollmentDate: '2023-07-21',
      lastActive: '2023-10-28',
      coursesEnrolled: [
        { id: 1, title: 'React Fundamentals', progress: 100, lastAccessed: '2023-10-28' },
        { id: 2, title: 'Advanced JavaScript', progress: 65, lastAccessed: '2023-10-27' }
      ],
      completedCourses: 1,
      totalQuizScore: 92
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      enrollmentDate: '2023-05-10',
      lastActive: '2023-10-30',
      coursesEnrolled: [
        { id: 2, title: 'Advanced JavaScript', progress: 89, lastAccessed: '2023-10-30' }
      ],
      completedCourses: 0,
      totalQuizScore: 78
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david.wilson@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      enrollmentDate: '2023-08-05',
      lastActive: '2023-10-15',
      coursesEnrolled: [
        { id: 1, title: 'React Fundamentals', progress: 100, lastAccessed: '2023-10-15' }
      ],
      completedCourses: 1,
      totalQuizScore: 95
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      email: 'lisa.anderson@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      enrollmentDate: '2023-09-12',
      lastActive: '2023-10-31',
      coursesEnrolled: [
        { id: 3, title: 'Python for Beginners', progress: 22, lastAccessed: '2023-10-31' }
      ],
      completedCourses: 0,
      totalQuizScore: 68
    }
  ];

  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('lastActive');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // All courses this instructor teaches
  const instructorCourses = [
    { id: 1, title: 'React Fundamentals' },
    { id: 2, title: 'Advanced JavaScript' },
    { id: 3, title: 'Python for Beginners' },
    { id: 4, title: 'Data Science with Python' },
    { id: 5, title: 'Web Design Fundamentals' }
  ];

  // Filter and sort students
  const filteredStudents = students
    .filter(student => {
      // Search filter for name or email
      if (searchTerm && 
          !student.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !student.email.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Course filter
      if (courseFilter !== 'all') {
        if (!student.coursesEnrolled.some(course => course.id.toString() === courseFilter)) {
          return false;
        }
      }
      
      // Activity filter
      if (activeFilter !== 'all') {
        const lastActiveDate = new Date(student.lastActive);
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate - lastActiveDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (activeFilter === 'recent' && diffDays > 7) {
          return false;
        } else if (activeFilter === 'inactive' && diffDays <= 30) {
          return false;
        }
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort students
      let comparison = 0;
      
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'enrollmentDate') {
        comparison = new Date(a.enrollmentDate) - new Date(b.enrollmentDate);
      } else if (sortBy === 'lastActive') {
        comparison = new Date(a.lastActive) - new Date(b.lastActive);
      } else if (sortBy === 'progress') {
        // Calculate average progress across all courses
        const aAvgProgress = a.coursesEnrolled.reduce((sum, course) => sum + course.progress, 0) / a.coursesEnrolled.length;
        const bAvgProgress = b.coursesEnrolled.reduce((sum, course) => sum + course.progress, 0) / b.coursesEnrolled.length;
        comparison = aAvgProgress - bAvgProgress;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const viewStudentProfile = (student) => {
    setSelectedStudent(student);
    setShowProfileModal(true);
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
    setSelectedStudent(null);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getDaysAgo = (dateString) => {
    const lastActive = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - lastActive);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else {
      return `${diffDays} days ago`;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Students</h1>
        <p className="text-gray-600">View and manage students enrolled in your courses</p>
      </div>

      {/* Filters and Actions */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or email..."
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
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
          >
            <option value="all">All Courses</option>
            {instructorCourses.map(course => (
              <option key={course.id} value={course.id.toString()}>
                {course.title}
              </option>
            ))}
          </select>

          {/* Activity Filter */}
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
          >
            <option value="all">All Activity</option>
            <option value="recent">Active in last 7 days</option>
            <option value="inactive">Inactive (30+ days)</option>
          </select>
        </div>

        {/* Export Button */}
        <button 
          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Students List */}
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
                  Courses Enrolled
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center focus:outline-none" 
                    onClick={() => handleSort('progress')}
                  >
                    Progress
                    {sortBy === 'progress' && (
                      <span className="ml-1">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center focus:outline-none" 
                    onClick={() => handleSort('enrollmentDate')}
                  >
                    Enrollment Date
                    {sortBy === 'enrollmentDate' && (
                      <span className="ml-1">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center focus:outline-none" 
                    onClick={() => handleSort('lastActive')}
                  >
                    Last Active
                    {sortBy === 'lastActive' && (
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
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full object-cover" src={student.avatar} alt={student.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {student.coursesEnrolled.length} course{student.coursesEnrolled.length !== 1 ? 's' : ''}
                      </div>
                      <div className="text-xs text-gray-500">
                        {student.completedCourses} completed
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {student.coursesEnrolled.length > 0 ? (
                        <div>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="bg-blue-600 h-2.5 rounded-full" 
                                style={{ 
                                  width: `${Math.round(
                                    student.coursesEnrolled.reduce((sum, course) => sum + course.progress, 0) / 
                                    student.coursesEnrolled.length
                                  )}%` 
                                }}
                              ></div>
                            </div>
                            <span className="ml-2 text-xs text-gray-500">
                              {Math.round(
                                student.coursesEnrolled.reduce((sum, course) => sum + course.progress, 0) / 
                                student.coursesEnrolled.length
                              )}%
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Avg. quiz score: {student.totalQuizScore}%
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">No courses</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(student.enrollmentDate)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{formatDate(student.lastActive)}</span>
                      <div className="text-xs text-gray-500">
                        {getDaysAgo(student.lastActive)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <button
                        onClick={() => viewStudentProfile(student)}
                        className="text-indigo-600 hover:text-indigo-900 px-2 py-1 rounded hover:bg-indigo-50"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-sm text-gray-500">
                    No students found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Profile Modal */}
      {showProfileModal && selectedStudent && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white rounded-lg max-w-4xl w-full mx-4 p-6 overflow-y-auto max-h-screen">
            <div className="flex justify-between items-center mb-6 border-b pb-3">
              <h2 className="text-xl font-bold text-gray-900">Student Profile</h2>
              <button onClick={closeProfileModal} className="text-gray-400 hover:text-gray-500">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-6 flex items-center">
              <div className="mr-4">
                <img src={selectedStudent.avatar} alt={selectedStudent.name} className="h-20 w-20 rounded-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{selectedStudent.name}</h3>
                <p className="text-gray-600">{selectedStudent.email}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Enrolled since {formatDate(selectedStudent.enrollmentDate)} • Last active {getDaysAgo(selectedStudent.lastActive)}
                </p>
              </div>
            </div>
            
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Course Progress</h4>
              {selectedStudent.coursesEnrolled.map((course) => (
                <div key={course.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <h5 className="text-md font-medium text-gray-900">{course.title}</h5>
                    <span className="text-sm text-gray-500">Last accessed: {formatDate(course.lastAccessed)}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-3">
                      <div 
                        className={`h-2.5 rounded-full ${
                          course.progress < 30 ? 'bg-red-500' : 
                          course.progress < 70 ? 'bg-yellow-500' : 
                          'bg-green-500'
                        }`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{course.progress}%</span>
                  </div>
                </div>
              ))}
              
              {selectedStudent.coursesEnrolled.length === 0 && (
                <p className="text-gray-500 italic">This student is not enrolled in any of your courses.</p>
              )}
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Activity Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-blue-500 text-lg font-semibold">{selectedStudent.coursesEnrolled.length}</div>
                  <div className="text-gray-600">Courses Enrolled</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-green-500 text-lg font-semibold">{selectedStudent.completedCourses}</div>
                  <div className="text-gray-600">Courses Completed</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-purple-500 text-lg font-semibold">{selectedStudent.totalQuizScore}%</div>
                  <div className="text-gray-600">Average Quiz Score</div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                onClick={closeProfileModal}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
              <a
                href={`mailto:${selectedStudent.email}`}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Student
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsPage; 