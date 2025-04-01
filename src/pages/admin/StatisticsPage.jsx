import React, { useState } from 'react';

const StatisticsPage = () => {
  const [timeRange, setTimeRange] = useState('month');
  
  // Sample statistics data for UI demonstration
  const statistics = {
    users: {
      total: 1250,
      newThisMonth: 87,
      growthRate: 12,
      active: 950,
      demographics: {
        '18-24': 25,
        '25-34': 40,
        '35-44': 20,
        '45-54': 10,
        '55+': 5
      }
    },
    courses: {
      total: 148,
      published: 128,
      underReview: 8,
      draft: 12,
      averageRating: 4.6,
      completionRate: 68,
      popularCategories: [
        { name: 'Web Development', count: 42 },
        { name: 'Data Science', count: 28 },
        { name: 'UI/UX Design', count: 22 },
        { name: 'Mobile Development', count: 18 },
        { name: 'Machine Learning', count: 15 }
      ]
    },
    subscriptions: {
      active: 830,
      newThisMonth: 65,
      revenue: {
        total: 58245,
        thisMonth: 7845,
        lastMonth: 7250
      },
      plans: [
        { name: 'Basic Plan', users: 320, percentage: 38 },
        { name: 'Premium Plan', users: 390, percentage: 47 },
        { name: 'Annual Plan', users: 120, percentage: 15 }
      ]
    },
    engagement: {
      averageSessionTime: '28 minutes',
      coursesStarted: 1850,
      coursesCompleted: 920,
      certificatesIssued: 860,
      quizzesTaken: 4220,
      forumPosts: 680
    }
  };

  const timeRangeOptions = [
    { value: 'week', label: 'Last Week' },
    { value: 'month', label: 'Last Month' },
    { value: 'quarter', label: 'Last Quarter' },
    { value: 'year', label: 'Last Year' },
    { value: 'all', label: 'All Time' }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Platform Statistics</h1>
          <p className="text-gray-600">Comprehensive analytics and metrics</p>
        </div>
        <div className="flex items-center">
          <label htmlFor="timeRange" className="mr-2 text-sm text-gray-600">Time range:</label>
          <select
            id="timeRange"
            value={timeRange}
            onChange={e => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {timeRangeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* User Statistics */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">User Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <StatCard 
            title="Total Users" 
            value={statistics.users.total} 
            change={`+${statistics.users.growthRate}%`}
            changeType="positive"
          />
          <StatCard 
            title="New Users" 
            value={statistics.users.newThisMonth} 
            change={`This ${timeRange}`}
            changeType="neutral"
          />
          <StatCard 
            title="Active Users" 
            value={statistics.users.active} 
            change={`${Math.round((statistics.users.active / statistics.users.total) * 100)}% of total`}
            changeType="neutral"
          />
          <StatCard 
            title="Avg. Session Duration" 
            value={statistics.engagement.averageSessionTime} 
            change="+5% from last month"
            changeType="positive"
          />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">User Demographics</h3>
          <div className="h-60 flex items-center justify-center">
            <div className="w-full max-w-md">
              {Object.entries(statistics.users.demographics).map(([ageGroup, percentage]) => (
                <div key={ageGroup} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{ageGroup}</span>
                    <span className="text-sm font-medium text-gray-700">{percentage}%</span>
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Course Statistics */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <StatCard 
            title="Total Courses" 
            value={statistics.courses.total} 
            change={`${statistics.courses.published} published`}
            changeType="neutral"
          />
          <StatCard 
            title="Average Rating" 
            value={statistics.courses.averageRating} 
            change="out of 5.0"
            changeType="neutral"
          />
          <StatCard 
            title="Completion Rate" 
            value={`${statistics.courses.completionRate}%`} 
            change="+3% from last month"
            changeType="positive"
          />
          <StatCard 
            title="Courses Under Review" 
            value={statistics.courses.underReview} 
            change="pending approval"
            changeType="neutral"
          />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Popular Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {statistics.courses.popularCategories.map((category, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                    <span className="text-sm font-medium text-gray-700">{category.count} courses</span>
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full" 
                      style={{ width: `${(category.count / statistics.courses.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-800 mb-2">{statistics.engagement.coursesCompleted}</div>
                <p className="text-gray-600">Courses completed</p>
                <div className="mt-4 text-4xl font-bold text-gray-800 mb-2">{statistics.engagement.certificatesIssued}</div>
                <p className="text-gray-600">Certificates issued</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Statistics */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Revenue & Subscriptions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <StatCard 
            title="Total Revenue" 
            value={`$${statistics.subscriptions.revenue.total.toLocaleString()}`} 
            change="+8% from last month"
            changeType="positive"
          />
          <StatCard 
            title={`Revenue this ${timeRange}`} 
            value={`$${statistics.subscriptions.revenue.thisMonth.toLocaleString()}`} 
            change={`+${Math.round(((statistics.subscriptions.revenue.thisMonth - statistics.subscriptions.revenue.lastMonth) / statistics.subscriptions.revenue.lastMonth) * 100)}% from last ${timeRange}`}
            changeType="positive"
          />
          <StatCard 
            title="Active Subscriptions" 
            value={statistics.subscriptions.active} 
            change={`+${statistics.subscriptions.newThisMonth} new`}
            changeType="positive"
          />
          <StatCard 
            title="Avg. Revenue per User" 
            value={`$${(statistics.subscriptions.revenue.total / statistics.users.active).toFixed(2)}`} 
            change="lifetime value"
            changeType="neutral"
          />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Subscription Plans Distribution</h3>
          <div className="space-y-6">
            {statistics.subscriptions.plans.map((plan, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-gray-800">{plan.name}</span>
                  <span className="text-gray-600">{plan.users} users ({plan.percentage}%)</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-indigo-500' : 'bg-purple-500'
                    }`}
                    style={{ width: `${plan.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Engagement Metrics</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Courses Started</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{statistics.engagement.coursesStarted}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+12% from last {timeRange}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Courses Completed</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{statistics.engagement.coursesCompleted}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+8% from last {timeRange}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Quizzes Taken</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{statistics.engagement.quizzesTaken}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+15% from last {timeRange}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Forum Posts</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{statistics.engagement.forumPosts}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+5% from last {timeRange}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Certificates Issued</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{statistics.engagement.certificatesIssued}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+9% from last {timeRange}</td>
              </tr>
            </tbody>
          </table>
        </div>
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
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </div>
    </div>
    <div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className={`text-sm mt-1 ${
        changeType === 'positive' ? 'text-green-600' : 
        changeType === 'negative' ? 'text-red-600' : 
        'text-gray-600'
      }`}>
        {change}
      </div>
    </div>
  </div>
);

export default StatisticsPage; 