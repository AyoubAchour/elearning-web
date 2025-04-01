import React from 'react';
import { Link } from 'react-router-dom';

const InstructorDashboardPage = () => {
  // Mock data - in a real app, this would come from an API
  const stats = {
    totalStudents: 156,
    totalCourses: 4,
    totalRevenue: '$3,250',
    averageRating: 4.7,
    completionRate: 78,
    pendingQuestions: 5,
    courseViews: 1287,
    enrollmentsThisMonth: 24,
    totalQuizzes: 12,
    quizCompletionRate: 85
  };

  const recentActivities = [
    { id: 1, type: 'enrollment', course: 'Advanced JavaScript', student: 'Sarah Johnson', date: '1 hour ago' },
    { id: 2, type: 'review', course: 'React Fundamentals', student: 'Michael Brown', rating: 5, date: '3 hours ago' },
    { id: 3, type: 'question', course: 'Python for Beginners', student: 'Emily Davis', date: '5 hours ago' },
    { id: 4, type: 'completion', course: 'React Fundamentals', student: 'David Wilson', date: '1 day ago' },
    { id: 5, type: 'enrollment', course: 'Python for Beginners', student: 'Lisa Anderson', date: '1 day ago' }
  ];

  const courses = [
    { id: 1, title: 'React Fundamentals', students: 64, rating: 4.8, progress: 100, published: true },
    { id: 2, title: 'Advanced JavaScript', students: 42, rating: 4.7, progress: 100, published: true },
    { id: 3, title: 'Python for Beginners', students: 50, rating: 4.6, progress: 100, published: true },
    { id: 4, title: 'Data Science with Python', students: 0, rating: 0, progress: 75, published: false }
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Instructor Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's an overview of your teaching activity.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Students" value={stats.totalStudents} icon="users" color="blue" />
        <StatCard title="Total Courses" value={stats.totalCourses} icon="book" color="green" />
        <StatCard title="Total Revenue" value={stats.totalRevenue} icon="cash" color="purple" />
        <StatCard title="Average Rating" value={stats.averageRating} icon="star" color="yellow" />
        <StatCard title="Total Quizzes" value={stats.totalQuizzes} icon="quiz" color="orange" />
        <StatCard title="Quiz Completion" value={`${stats.quizCompletionRate}%`} icon="check" color="teal" />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link 
            to="/instructor/courses/create" 
            className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow transition-shadow border-l-4 border-indigo-500"
          >
            <div className="rounded-full p-2 bg-indigo-100 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Create New Course</h3>
              <p className="text-sm text-gray-500">Start building your next course</p>
            </div>
          </Link>

          <Link 
            to="/instructor/discussions" 
            className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow transition-shadow border-l-4 border-red-500"
          >
            <div className="rounded-full p-2 bg-red-100 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Answer Questions</h3>
              <p className="text-sm text-gray-500">{stats.pendingQuestions} questions pending</p>
            </div>
          </Link>

          <Link 
            to="/instructor/courses" 
            className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow transition-shadow border-l-4 border-green-500"
          >
            <div className="rounded-full p-2 bg-green-100 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Update Courses</h3>
              <p className="text-sm text-gray-500">Manage your existing content</p>
            </div>
          </Link>

          <Link 
            to="/instructor/quizzes" 
            className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow transition-shadow border-l-4 border-yellow-500"
          >
            <div className="rounded-full p-2 bg-yellow-100 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Manage Quizzes</h3>
              <p className="text-sm text-gray-500">Create and monitor assessments</p>
            </div>
          </Link>

          <Link 
            to="/instructor/analytics" 
            className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow transition-shadow border-l-4 border-blue-500"
          >
            <div className="rounded-full p-2 bg-blue-100 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">View Analytics</h3>
              <p className="text-sm text-gray-500">Track your performance</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Two column layout for courses and activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Your Courses */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Your Courses</h2>
              <Link to="/instructor/courses" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Students
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
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
                  {courses.map((course) => (
                    <tr key={course.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{course.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{course.students}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
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
                      <td className="px-6 py-4 whitespace-nowrap">
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
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link to={`/instructor/courses/${course.id}`} className="text-indigo-600 hover:text-indigo-900 mr-3">
                          Edit
                        </Link>
                        <Link to={`/instructor/courses/${course.id}/content`} className="text-indigo-600 hover:text-indigo-900">
                          Content
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
            </div>
            <div className="px-6 py-4 divide-y divide-gray-200">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="py-3">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-3">
                      {activity.type === 'enrollment' && (
                        <div className="bg-green-100 rounded-full p-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                          </svg>
                        </div>
                      )}
                      {activity.type === 'review' && (
                        <div className="bg-yellow-100 rounded-full p-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        </div>
                      )}
                      {activity.type === 'question' && (
                        <div className="bg-blue-100 rounded-full p-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      )}
                      {activity.type === 'completion' && (
                        <div className="bg-purple-100 rounded-full p-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">
                        <span className="font-medium">{activity.student}</span>
                        {activity.type === 'enrollment' && ' enrolled in '}
                        {activity.type === 'review' && ' left a review on '}
                        {activity.type === 'question' && ' asked a question in '}
                        {activity.type === 'completion' && ' completed '}
                        <span className="font-medium">{activity.course}</span>
                        {activity.type === 'review' && (
                          <span className="ml-1 text-yellow-500">
                            {'★'.repeat(activity.rating)}
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-lg shadow-sm p-5">
    <div className="flex justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <div className={`rounded-full p-3 bg-${color}-100`}>
        {icon === 'users' && (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-${color}-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}
        {icon === 'book' && (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-${color}-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        )}
        {icon === 'cash' && (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-${color}-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
        {icon === 'star' && (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-${color}-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        )}
        {icon === 'quiz' && (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-${color}-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        )}
        {icon === 'check' && (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-${color}-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </div>
    </div>
  </div>
);

export default InstructorDashboardPage; 