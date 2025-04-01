import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboardPage = () => {
  // These would come from API/state in a real application
  const statistics = {
    totalUsers: 1250,
    activeSubscriptions: 830,
    totalRevenue: '$58,245',
    pendingInstructorApplications: 12,
    totalCourses: 148,
    categories: 18,
    newUsersThisWeek: 87,
    coursesUnderReview: 8
  };

  const quickAccessCards = [
    {
      title: 'Instructor Applications',
      description: `${statistics.pendingInstructorApplications} applications pending review`,
      icon: 'users',
      color: 'blue',
      link: '/admin/instructor-applications'
    },
    {
      title: 'Subscriptions',
      description: `${statistics.activeSubscriptions} active subscriptions`,
      icon: 'credit-card',
      color: 'indigo',
      link: '/admin/subscriptions'
    },
    {
      title: 'Course Reviews',
      description: `${statistics.coursesUnderReview} courses pending review`,
      icon: 'document-search',
      color: 'green',
      link: '/admin/course-review'
    },
    {
      title: 'Categories',
      description: `${statistics.categories} categories available`,
      icon: 'folder',
      color: 'yellow',
      link: '/admin/categories'
    },
    {
      title: 'User Management',
      description: `${statistics.totalUsers} users on the platform`,
      icon: 'user-group',
      color: 'purple',
      link: '/admin/users'
    }
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome to the admin panel. Here's an overview of the platform.</p>
      </div>

      {/* Key statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Total Users" 
          value={statistics.totalUsers} 
          change="+12% from last month"
          changeType="positive"
        />
        <StatCard 
          title="Active Subscriptions" 
          value={statistics.activeSubscriptions} 
          change="+5% from last month"
          changeType="positive"
        />
        <StatCard 
          title="Total Revenue" 
          value={statistics.totalRevenue} 
          change="+8% from last month"
          changeType="positive"
        />
        <StatCard 
          title="Total Courses" 
          value={statistics.totalCourses} 
          change="+3 new this week"
          changeType="positive"
        />
      </div>

      {/* Quick access section */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Access</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickAccessCards.map((card, index) => (
          <Link 
            key={index}
            to={card.link}
            className={`bg-white p-5 rounded-lg shadow hover:shadow-md transition-shadow border-l-4 border-${card.color}-500`}
          >
            <div className="flex items-start">
              <div className={`rounded-full bg-${card.color}-100 p-3 mr-4`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-${card.color}-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{card.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{card.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent activity section */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Sample activity rows */}
            <ActivityRow 
              activity="New Instructor Application" 
              user="John Smith" 
              date="2 hours ago" 
              status="pending" 
            />
            <ActivityRow 
              activity="Course Submitted for Review" 
              user="Sarah Johnson" 
              date="5 hours ago" 
              status="pending" 
            />
            <ActivityRow 
              activity="New Subscription" 
              user="Michael Brown" 
              date="1 day ago" 
              status="completed" 
            />
            <ActivityRow 
              activity="Category Update" 
              user="Admin" 
              date="2 days ago" 
              status="completed" 
            />
            <ActivityRow 
              activity="New User Registration" 
              user="Lisa Anderson" 
              date="3 days ago" 
              status="completed" 
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Statistics Card Component
const StatCard = ({ title, value, change, changeType }) => (
  <div className="bg-white rounded-lg shadow p-5">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <div className="rounded-full bg-blue-100 p-2">
        {/* Icon placeholder */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
    </div>
    <div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className={`text-sm mt-1 ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
        {change}
      </div>
    </div>
  </div>
);

// Activity Row Component
const ActivityRow = ({ activity, user, date, status }) => (
  <tr>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm font-medium text-gray-900">{activity}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-500">{user}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-500">{date}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
        status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
      }`}>
        {status === 'pending' ? 'Pending' : 'Completed'}
      </span>
    </td>
  </tr>
);

export default AdminDashboardPage; 