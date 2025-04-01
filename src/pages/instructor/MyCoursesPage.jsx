import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MyCoursesPage = () => {
  // Sample course data - in a real app, this would come from an API
  const initialCourses = [
    { 
      id: 1, 
      title: 'React Fundamentals', 
      thumbnail: 'https://via.placeholder.com/150x100?text=React',
      description: 'A comprehensive introduction to React including hooks, state management, and component architecture.',
      students: 64, 
      revenue: '$1,280', 
      lastUpdated: '2023-08-15', 
      rating: 4.8,
      progress: 100, 
      published: true,
      completionRate: 78,
      status: 'active'
    },
    { 
      id: 2, 
      title: 'Advanced JavaScript', 
      thumbnail: 'https://via.placeholder.com/150x100?text=JS',
      description: 'Dive deep into JavaScript with advanced concepts like closures, prototypes, and async programming.',
      students: 42, 
      revenue: '$840', 
      lastUpdated: '2023-09-22', 
      rating: 4.7,
      progress: 100, 
      published: true,
      completionRate: 65,
      status: 'active'
    },
    { 
      id: 3, 
      title: 'Python for Beginners', 
      thumbnail: 'https://via.placeholder.com/150x100?text=Python',
      description: 'Start your journey with Python programming language with this beginner-friendly course.',
      students: 50, 
      revenue: '$1,000', 
      lastUpdated: '2023-07-10', 
      rating: 4.6,
      progress: 100, 
      published: true,
      completionRate: 82,
      status: 'active'
    },
    { 
      id: 4, 
      title: 'Data Science with Python', 
      thumbnail: 'https://via.placeholder.com/150x100?text=DataSci',
      description: 'Learn data analysis, visualization and machine learning techniques using Python libraries.',
      students: 0, 
      revenue: '$0', 
      lastUpdated: '2023-10-05', 
      rating: 0,
      progress: 75, 
      published: false,
      completionRate: 0,
      status: 'draft'
    },
    { 
      id: 5, 
      title: 'Web Design Fundamentals', 
      thumbnail: 'https://via.placeholder.com/150x100?text=WebDesign',
      description: 'Master the basics of UI/UX design principles and create beautiful web interfaces.',
      students: 0, 
      revenue: '$0', 
      lastUpdated: '2023-08-30', 
      rating: 0,
      progress: 30, 
      published: false,
      completionRate: 0,
      status: 'draft'
    }
  ];

  const [courses, setCourses] = useState(initialCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('lastUpdated');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  // Filter and sort courses
  const filteredCourses = courses
    .filter(course => {
      // Search filter
      if (searchTerm && !course.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Status filter
      if (statusFilter !== 'all' && course.status !== statusFilter) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort courses
      let comparison = 0;
      
      if (sortBy === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === 'students') {
        comparison = a.students - b.students;
      } else if (sortBy === 'rating') {
        comparison = a.rating - b.rating;
      } else if (sortBy === 'lastUpdated') {
        comparison = new Date(a.lastUpdated) - new Date(b.lastUpdated);
      } else if (sortBy === 'revenue') {
        // Remove $ and convert to number
        const aRevenue = parseFloat(a.revenue.replace('$', '').replace(',', ''));
        const bRevenue = parseFloat(b.revenue.replace('$', '').replace(',', ''));
        comparison = aRevenue - bRevenue;
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

  const handleDeleteClick = (course) => {
    setCourseToDelete(course);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setCourses(courses.filter(course => course.id !== courseToDelete.id));
    setShowDeleteModal(false);
    setCourseToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setCourseToDelete(null);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
        <p className="text-gray-600">Manage and track all your courses</p>
      </div>

      {/* Filters and Actions */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
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

          {/* Status Filter */}
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Courses</option>
            <option value="active">Published</option>
            <option value="draft">Drafts</option>
          </select>
        </div>

        {/* Create Course Button */}
        <Link 
          to="/instructor/courses/create" 
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create New Course
        </Link>
      </div>

      {/* Course List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center focus:outline-none" 
                    onClick={() => handleSort('title')}
                  >
                    Course
                    {sortBy === 'title' && (
                      <span className="ml-1">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center focus:outline-none" 
                    onClick={() => handleSort('students')}
                  >
                    Students
                    {sortBy === 'students' && (
                      <span className="ml-1">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center focus:outline-none" 
                    onClick={() => handleSort('rating')}
                  >
                    Rating
                    {sortBy === 'rating' && (
                      <span className="ml-1">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center focus:outline-none" 
                    onClick={() => handleSort('revenue')}
                  >
                    Revenue
                    {sortBy === 'revenue' && (
                      <span className="ml-1">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center focus:outline-none" 
                    onClick={() => handleSort('lastUpdated')}
                  >
                    Last Updated
                    {sortBy === 'lastUpdated' && (
                      <span className="ml-1">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
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
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-14 w-24">
                          <img className="h-14 w-24 object-cover rounded" src={course.thumbnail} alt={course.title} />
                        </div>
                        <div className="ml-4 flex flex-col">
                          <h3 className="text-base font-semibold text-gray-900 mb-1">{course.title}</h3>
                          <p className="text-xs text-gray-500 max-w-md line-clamp-2">{course.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {course.students}
                      {course.completionRate > 0 && (
                        <div className="text-xs text-gray-400 mt-1">
                          {course.completionRate}% completion rate
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {course.rating > 0 ? (
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500 mr-1">{course.rating}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">No ratings</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {course.revenue}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(course.lastUpdated).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {course.published ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Published
                        </span>
                      ) : (
                        <div>
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Draft
                          </span>
                          <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                            <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                          </div>
                          <span className="text-xs text-gray-500">{course.progress}% complete</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <Link to={`/instructor/courses/${course.id}`} className="text-indigo-600 hover:text-indigo-900" title="Edit course">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        <Link to={`/instructor/courses/${course.id}/analytics`} className="text-purple-600 hover:text-purple-900" title="View course analytics">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </Link>
                        <button 
                          onClick={() => handleDeleteClick(course)} 
                          className="text-red-600 hover:text-red-900"
                          title="Delete course"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                    No courses found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Course</h3>
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to delete "{courseToDelete?.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
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

export default MyCoursesPage; 