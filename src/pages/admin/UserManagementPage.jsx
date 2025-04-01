import React, { useState } from 'react';

const UserManagementPage = () => {
  // Sample users data
  const [users, setUsers] = useState([
    {
      id: 1,
      fullName: 'John Smith',
      email: 'john.smith@example.com',
      role: 'student',
      joinDate: '2023-01-15',
      lastActive: '2023-05-20',
      coursesEnrolled: 4,
      subscriptionStatus: 'active',
      subscriptionType: 'premium',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: 2,
      fullName: 'Emma Johnson',
      email: 'emma.johnson@example.com',
      role: 'student',
      joinDate: '2023-02-08',
      lastActive: '2023-05-18',
      coursesEnrolled: 2,
      subscriptionStatus: 'active',
      subscriptionType: 'basic',
      avatar: 'https://i.pravatar.cc/150?img=5'
    },
    {
      id: 3,
      fullName: 'Michael Brown',
      email: 'michael.brown@example.com',
      role: 'instructor',
      joinDate: '2023-01-05',
      lastActive: '2023-05-21',
      coursesCreated: 3,
      subscriptionStatus: 'n/a',
      avatar: 'https://i.pravatar.cc/150?img=8'
    },
    {
      id: 4,
      fullName: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      role: 'student',
      joinDate: '2023-03-12',
      lastActive: '2023-05-10',
      coursesEnrolled: 5,
      subscriptionStatus: 'expired',
      subscriptionType: 'premium',
      avatar: 'https://i.pravatar.cc/150?img=9'
    },
    {
      id: 5,
      fullName: 'David Lee',
      email: 'david.lee@example.com',
      role: 'student',
      joinDate: '2023-02-28',
      lastActive: '2023-05-15',
      coursesEnrolled: 1,
      subscriptionStatus: 'active',
      subscriptionType: 'annual',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    {
      id: 6,
      fullName: 'Jennifer Garcia',
      email: 'jennifer.garcia@example.com',
      role: 'student',
      joinDate: '2023-04-02',
      lastActive: '2023-05-19',
      coursesEnrolled: 3,
      subscriptionStatus: 'active',
      subscriptionType: 'basic',
      avatar: 'https://i.pravatar.cc/150?img=10'
    },
    {
      id: 7,
      fullName: 'Robert Martinez',
      email: 'robert.martinez@example.com',
      role: 'instructor',
      joinDate: '2023-01-20',
      lastActive: '2023-05-21',
      coursesCreated: 2,
      subscriptionStatus: 'n/a',
      avatar: 'https://i.pravatar.cc/150?img=12'
    },
    {
      id: 8,
      fullName: 'Lisa Thompson',
      email: 'lisa.thompson@example.com',
      role: 'student',
      joinDate: '2023-03-25',
      lastActive: '2023-05-17',
      coursesEnrolled: 2,
      subscriptionStatus: 'active',
      subscriptionType: 'premium',
      avatar: 'https://i.pravatar.cc/150?img=6'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [subscriptionFilter, setSubscriptionFilter] = useState('all');
  const [sortField, setSortField] = useState('joinDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isUserDetailsModalOpen, setIsUserDetailsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Filter users based on search term and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = 
      roleFilter === 'all' || 
      user.role === roleFilter;
    
    const matchesSubscription = 
      subscriptionFilter === 'all' || 
      (subscriptionFilter === 'active' && user.subscriptionStatus === 'active') ||
      (subscriptionFilter === 'expired' && user.subscriptionStatus === 'expired') ||
      (subscriptionFilter === 'none' && user.subscriptionStatus === 'n/a');
    
    return matchesSearch && matchesRole && matchesSubscription;
  });
  
  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a[sortField] < b[sortField]) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (a[sortField] > b[sortField]) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });
  
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };
  
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };
  
  const deleteUser = () => {
    if (!userToDelete) return;
    
    setUsers(users.filter(user => user.id !== userToDelete.id));
    closeDeleteModal();
  };
  
  const viewUserDetails = (user) => {
    setSelectedUser(user);
    setIsUserDetailsModalOpen(true);
  };
  
  const closeUserDetailsModal = () => {
    setIsUserDetailsModalOpen(false);
    setSelectedUser(null);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600">View and manage platform users</p>
      </div>
      
      {/* Filters and search */}
      <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search Users
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="role-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Role
            </label>
            <select
              id="role-filter"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="instructor">Instructors</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="subscription-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Subscription Status
            </label>
            <select
              id="subscription-filter"
              value={subscriptionFilter}
              onChange={(e) => setSubscriptionFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="none">No Subscription</option>
            </select>
          </div>
        </div>
        
        <div className="text-sm text-gray-600">
          Showing {sortedUsers.length} of {users.length} users
        </div>
      </div>
      
      {/* Users table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {sortedUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('role')}
                  >
                    <div className="flex items-center">
                      Role
                      {sortField === 'role' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('joinDate')}
                  >
                    <div className="flex items-center">
                      Join Date
                      {sortField === 'joinDate' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('lastActive')}
                  >
                    <div className="flex items-center">
                      Last Active
                      {sortField === 'lastActive' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subscription
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img 
                            className="h-10 w-10 rounded-full" 
                            src={user.avatar} 
                            alt={user.fullName} 
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'instructor' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.joinDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.lastActive)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.subscriptionStatus === 'active' ? (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {user.subscriptionType.charAt(0).toUpperCase() + user.subscriptionType.slice(1)}
                        </span>
                      ) : user.subscriptionStatus === 'expired' ? (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Expired
                        </span>
                      ) : (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          N/A
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => viewUserDetails(user)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        View
                      </button>
                      <button
                        onClick={() => openDeleteModal(user)}
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
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-500">No users found matching your criteria.</p>
          </div>
        )}
      </div>
      
      {/* Delete confirmation modal */}
      {isDeleteModalOpen && userToDelete && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white rounded-lg max-w-md w-full mx-4 p-6">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900">Delete User Account</h2>
            </div>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete the account for <span className="font-medium">{userToDelete.fullName}</span>? This action cannot be undone and will remove all associated data.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={deleteUser}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* User details modal */}
      {isUserDetailsModalOpen && selectedUser && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white rounded-lg max-w-2xl w-full mx-4 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">User Details</h2>
              <button onClick={closeUserDetailsModal} className="text-gray-400 hover:text-gray-500">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex flex-col md:flex-row mb-6">
              <div className="md:w-1/3 flex justify-center mb-4 md:mb-0">
                <img 
                  src={selectedUser.avatar} 
                  alt={selectedUser.fullName} 
                  className="h-32 w-32 rounded-full"
                />
              </div>
              <div className="md:w-2/3">
                <h3 className="text-lg font-medium text-gray-900">{selectedUser.fullName}</h3>
                <p className="text-gray-600 mb-4">{selectedUser.email}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="text-sm font-medium">{selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Join Date</p>
                    <p className="text-sm font-medium">{formatDate(selectedUser.joinDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Active</p>
                    <p className="text-sm font-medium">{formatDate(selectedUser.lastActive)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Subscription</p>
                    <p className="text-sm font-medium">
                      {selectedUser.subscriptionStatus === 'active' 
                        ? `${selectedUser.subscriptionType.charAt(0).toUpperCase() + selectedUser.subscriptionType.slice(1)} (Active)` 
                        : selectedUser.subscriptionStatus === 'expired' 
                          ? 'Expired' 
                          : 'None'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Activity Summary</h4>
              
              {selectedUser.role === 'student' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">Enrolled Courses</h5>
                    <p className="text-3xl font-bold text-blue-600">{selectedUser.coursesEnrolled}</p>
                    {/* This would be replaced with actual course data in a real implementation */}
                    <ul className="mt-4 text-sm text-gray-600">
                      <li className="py-1">• Introduction to Web Development</li>
                      <li className="py-1">• Advanced JavaScript</li>
                      {selectedUser.coursesEnrolled > 2 && (
                        <li className="py-1 text-blue-600">
                          +{selectedUser.coursesEnrolled - 2} more courses
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">Progress</h5>
                    <div className="mt-4">
                      <div className="flex justify-between mb-1">
                        <p className="text-sm text-gray-600">Completion Rate</p>
                        <p className="text-sm font-medium text-gray-900">65%</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between mb-1">
                        <p className="text-sm text-gray-600">Assignments Completed</p>
                        <p className="text-sm font-medium text-gray-900">12/18</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between mb-1">
                        <p className="text-sm text-gray-600">Quizzes Completed</p>
                        <p className="text-sm font-medium text-gray-900">8/10</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">Courses Created</h5>
                    <p className="text-3xl font-bold text-blue-600">{selectedUser.coursesCreated}</p>
                    {/* This would be replaced with actual course data in a real implementation */}
                    <ul className="mt-4 text-sm text-gray-600">
                      <li className="py-1">• Data Science Fundamentals</li>
                      <li className="py-1">• Machine Learning with Python</li>
                      {selectedUser.coursesCreated > 2 && (
                        <li className="py-1 text-blue-600">
                          +{selectedUser.coursesCreated - 2} more courses
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">Performance</h5>
                    <div className="mt-4">
                      <div className="flex justify-between mb-1">
                        <p className="text-sm text-gray-600">Average Rating</p>
                        <p className="text-sm font-medium text-gray-900">4.7/5.0</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between mb-1">
                        <p className="text-sm text-gray-600">Total Students</p>
                        <p className="text-sm font-medium text-gray-900">248</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between mb-1">
                        <p className="text-sm text-gray-600">Course Completion Rate</p>
                        <p className="text-sm font-medium text-gray-900">76%</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '76%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  closeUserDetailsModal();
                  openDeleteModal(selectedUser);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage; 