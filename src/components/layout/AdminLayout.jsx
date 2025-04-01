import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../utils/auth';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const sidebarItems = [
    { name: 'Dashboard', path: '/admin', icon: 'grid' },
    { name: 'Instructor Applications', path: '/admin/instructor-applications', icon: 'users' },
    { name: 'Subscriptions', path: '/admin/subscriptions', icon: 'credit-card' },
    { name: 'Statistics', path: '/admin/statistics', icon: 'chart-bar' },
    { name: 'Course Review', path: '/admin/course-review', icon: 'collection' },
    { name: 'Categories', path: '/admin/categories', icon: 'folder' },
    { name: 'User Feedback', path: '/admin/feedback', icon: 'chat' },
    { name: 'User Management', path: '/admin/users', icon: 'user-group' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-blue-800 text-white fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-blue-700">
          <Link to="/admin" className="flex items-center">
            <div className="bg-white text-blue-800 p-2 rounded-lg mr-2">
              <span className="text-lg font-bold">ADMIN</span>
            </div>
            <span className="text-xl font-bold">Dashboard</span>
          </Link>
          <button 
            onClick={toggleSidebar}
            className="md:hidden text-white hover:text-blue-200 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Sidebar navigation */}
        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-100 hover:bg-blue-700'
                  }`}
                >
                  <span className="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                  </span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Logout button */}
        <div className="absolute bottom-0 w-full p-4 border-t border-blue-700">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-blue-100 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ${
        isSidebarOpen ? 'md:ml-64' : 'ml-0'
      }`}>
        {/* Header */}
        <header className="bg-white h-16 shadow-sm flex items-center justify-between px-6">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-blue-600 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>
          
          {/* User profile */}
          <div className="flex items-center">
            <span className="text-gray-800 mr-2">Admin</span>
            <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 