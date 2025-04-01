import React, { useState } from 'react';

const EarningsPage = () => {
  // Sample earnings data
  const earningsData = {
    totalEarnings: 38800,
    availableForPayout: 3250,
    pendingPayouts: 1200,
    lifetimeStudents: 776,
    monthlyBreakdown: [
      { month: 'Jan 2023', earnings: 2800, students: 42 },
      { month: 'Feb 2023', earnings: 3200, students: 48 },
      { month: 'Mar 2023', earnings: 3600, students: 54 },
      { month: 'Apr 2023', earnings: 4100, students: 60 },
      { month: 'May 2023', earnings: 4500, students: 65 },
      { month: 'Jun 2023', earnings: 3900, students: 58 },
      { month: 'Jul 2023', earnings: 3600, students: 55 },
      { month: 'Aug 2023', earnings: 3400, students: 52 },
      { month: 'Sep 2023', earnings: 3200, students: 50 },
      { month: 'Oct 2023', earnings: 3750, students: 56 },
      { month: 'Nov 2023', earnings: 2750, students: 42 },
    ],
    courseEarnings: [
      { id: 1, title: 'React Fundamentals', earnings: 13900, students: 278, percentOfTotal: 36 },
      { id: 2, title: 'Advanced JavaScript', earnings: 7800, students: 156, percentOfTotal: 20 },
      { id: 3, title: 'Python for Beginners', earnings: 17100, students: 342, percentOfTotal: 44 }
    ],
    payoutHistory: [
      { id: 'P12345', date: '2023-10-15', amount: 2800, status: 'completed', method: 'Bank Transfer' },
      { id: 'P12290', date: '2023-09-15', amount: 3200, status: 'completed', method: 'Bank Transfer' },
      { id: 'P12158', date: '2023-08-15', amount: 3400, status: 'completed', method: 'PayPal' },
      { id: 'P11940', date: '2023-07-15', amount: 3600, status: 'completed', method: 'Bank Transfer' },
      { id: 'P11820', date: '2023-06-15', amount: 3900, status: 'completed', method: 'Bank Transfer' }
    ],
    pendingEarnings: [
      { courseId: 1, title: 'React Fundamentals', amount: 650, date: '2023-12-15' },
      { courseId: 2, title: 'Advanced JavaScript', amount: 280, date: '2023-12-15' },
      { courseId: 3, title: 'Python for Beginners', amount: 270, date: '2023-12-15' }
    ]
  };

  // States for filtering
  const [timeRange, setTimeRange] = useState('year');
  const [activeTab, setActiveTab] = useState('overview');

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Chart data for earnings over time
  const barMaxHeight = 150; // max height for bars in px
  const maxEarning = Math.max(...earningsData.monthlyBreakdown.map(month => month.earnings));
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>
        <p className="text-gray-600">Track your revenue and manage payouts</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('payouts')}
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'payouts'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Payout History
          </button>
          <button
            onClick={() => setActiveTab('statements')}
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'statements'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Statements
          </button>
        </nav>
      </div>

      {/* Overview Tab Content */}
      {activeTab === 'overview' && (
        <>
          {/* Earnings Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Total Earnings</h3>
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(earningsData.totalEarnings)}</p>
              <p className="text-sm text-gray-500 mt-1">Lifetime earnings from all courses</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Available for Payout</h3>
              <p className="text-3xl font-bold text-green-600">{formatCurrency(earningsData.availableForPayout)}</p>
              <p className="text-sm text-gray-500 mt-1">Next payout scheduled for December 15</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Pending Earnings</h3>
              <p className="text-3xl font-bold text-yellow-600">{formatCurrency(earningsData.pendingPayouts)}</p>
              <p className="text-sm text-gray-500 mt-1">Earnings still in the review period</p>
            </div>
          </div>

          {/* Earnings Over Time */}
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">Earnings Over Time</h3>
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                    timeRange === 'month'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  } border border-gray-300`}
                  onClick={() => setTimeRange('month')}
                >
                  Month
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium ${
                    timeRange === 'quarter'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  } border-t border-b border-gray-300`}
                  onClick={() => setTimeRange('quarter')}
                >
                  Quarter
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                    timeRange === 'year'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  } border border-gray-300`}
                  onClick={() => setTimeRange('year')}
                >
                  Year
                </button>
              </div>
            </div>
            
            {/* Chart */}
            <div className="h-64">
              <div className="h-full flex items-end space-x-2">
                {earningsData.monthlyBreakdown.map((month, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-indigo-500 rounded-t-sm hover:bg-indigo-600 transition-all duration-200"
                      style={{ height: `${(month.earnings / maxEarning) * barMaxHeight}px` }}
                    >
                      <div className="opacity-0 hover:opacity-100 h-full flex items-center justify-center text-white font-medium transition-opacity">
                        {formatCurrency(month.earnings)}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2 truncate w-full text-center">
                      {month.month}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Course Earnings Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Earnings by Course</h3>
              <div className="space-y-4">
                {earningsData.courseEarnings.map((course) => (
                  <div key={course.id}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{course.title}</span>
                      <span className="text-sm font-medium text-gray-900">{formatCurrency(course.earnings)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-indigo-600 h-2.5 rounded-full" 
                        style={{ width: `${course.percentOfTotal}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {course.students} students enrolled ({course.percentOfTotal}% of total earnings)
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Pending Earnings</h3>
              {earningsData.pendingEarnings.length > 0 ? (
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Course</th>
                        <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Amount</th>
                        <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Payout Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {earningsData.pendingEarnings.map((earning) => (
                        <tr key={earning.courseId} className="hover:bg-gray-50">
                          <td className="py-4 pl-4 pr-3 text-sm text-gray-900">{earning.title}</td>
                          <td className="px-3 py-4 text-sm text-gray-900 text-right">{formatCurrency(earning.amount)}</td>
                          <td className="px-3 py-4 text-sm text-gray-500 text-right">{formatDate(earning.date)}</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50">
                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900">Total</td>
                        <td className="px-3 py-4 text-sm font-medium text-gray-900 text-right">
                          {formatCurrency(earningsData.pendingEarnings.reduce((sum, item) => sum + item.amount, 0))}
                        </td>
                        <td className="px-3 py-4"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 italic">No pending earnings at this time.</p>
              )}
            </div>
          </div>
        </>
      )}

      {/* Payout History Tab Content */}
      {activeTab === 'payouts' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Payout History</h2>
              <button 
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center text-sm"
              >
                Request Payout
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payout ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
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
                {earningsData.payoutHistory.map((payout) => (
                  <tr key={payout.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {payout.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(payout.date)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {formatCurrency(payout.amount)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {payout.method}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {payout.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Statements Tab Content */}
      {activeTab === 'statements' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Monthly Statements</h3>
            <p className="text-sm text-gray-500 mt-1">Download monthly statements for your records and tax purposes</p>
          </div>
          <div className="overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {earningsData.monthlyBreakdown.map((month, index) => (
                <li key={index}>
                  <div className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{month.month}</p>
                      <p className="text-sm text-gray-500">
                        {formatCurrency(month.earnings)} • {month.students} students
                      </p>
                    </div>
                    <button className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download PDF
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Payment Methods and Settings */}
      <div className="mt-8 bg-white rounded-lg shadow">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Payment Settings</h3>
          <p className="text-sm text-gray-500 mt-1">Manage your payout methods and tax information</p>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Bank Account (Primary)</h4>
              <p className="text-sm text-gray-500">Bank of America ****6789</p>
            </div>
            <button className="text-sm text-indigo-600 hover:text-indigo-900">
              Edit
            </button>
          </div>
          <div className="flex justify-between items-center mb-4 pt-4 border-t border-gray-200">
            <div>
              <h4 className="text-sm font-medium text-gray-900">PayPal</h4>
              <p className="text-sm text-gray-500">instructor@example.com</p>
            </div>
            <button className="text-sm text-indigo-600 hover:text-indigo-900">
              Edit
            </button>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Tax Information</h4>
              <p className="text-sm text-gray-500">W-9 form submitted</p>
            </div>
            <button className="text-sm text-indigo-600 hover:text-indigo-900">
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsPage; 