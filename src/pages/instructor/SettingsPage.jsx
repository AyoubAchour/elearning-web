import React, { useState } from 'react';

const SettingsPage = () => {
  // Sample user data
  const [user, setUser] = useState({
    name: 'John Smith',
    email: 'instructor@example.com',
    bio: 'Experienced web developer and instructor with over 10 years of experience in JavaScript and React.',
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    website: 'https://johnsmith.dev',
    twitter: '@johnsmith',
    github: 'johnsmith',
    linkedin: 'johnsmith',
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    courseEnrollments: true,
    courseFeedback: true,
    newQuestions: true,
    promotionalEmails: false,
    weeklyDigest: true,
    courseCompletions: true,
  });

  // Handle profile update
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // In a real app, this would send data to an API
    alert('Profile updated successfully!');
  };

  // Handle notification toggle
  const handleNotificationToggle = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Settings Menu</h3>
            </div>
            <nav className="px-3 py-3">
              <div className="space-y-1">
                <a 
                  href="#profile" 
                  className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                >
                  <svg className="mr-3 h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile Information
                </a>
                <a 
                  href="#notifications" 
                  className="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                >
                  <svg className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  Notification Preferences
                </a>
                <a 
                  href="#account" 
                  className="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                >
                  <svg className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Account Security
                </a>
                <a 
                  href="#payout" 
                  className="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                >
                  <svg className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Payout Settings
                </a>
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Information */}
          <div id="profile" className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
              <p className="mt-1 text-sm text-gray-500">
                Update your profile information and public details
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <form onSubmit={handleProfileUpdate}>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center">
                      <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-100">
                        <img src={user.profileImage} alt={user.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="ml-5">
                        <div className="flex items-center space-x-3">
                          <button
                            type="button"
                            className="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                          >
                            Change
                          </button>
                          <button
                            type="button"
                            className="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="mt-2 text-xs text-gray-500">
                          Recommended dimensions: 400px x 400px. Max file size: 1MB.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                        Bio
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="bio"
                          name="bio"
                          rows={4}
                          value={user.bio}
                          onChange={(e) => setUser({ ...user, bio: e.target.value })}
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Brief description for your profile. This will be displayed on your instructor page.
                      </p>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                        Website
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                          https://
                        </span>
                        <input
                          type="text"
                          name="website"
                          id="website"
                          value={user.website.replace('https://', '')}
                          onChange={(e) => setUser({ ...user, website: `https://${e.target.value}` })}
                          className="flex-1 block w-full rounded-none rounded-r-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
                        Twitter
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                          @
                        </span>
                        <input
                          type="text"
                          name="twitter"
                          id="twitter"
                          value={user.twitter.replace('@', '')}
                          onChange={(e) => setUser({ ...user, twitter: `@${e.target.value}` })}
                          className="flex-1 block w-full rounded-none rounded-r-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="github" className="block text-sm font-medium text-gray-700">
                        GitHub
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                          github.com/
                        </span>
                        <input
                          type="text"
                          name="github"
                          id="github"
                          value={user.github}
                          onChange={(e) => setUser({ ...user, github: e.target.value })}
                          className="flex-1 block w-full rounded-none rounded-r-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Notification Preferences */}
          <div id="notifications" className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
              <p className="mt-1 text-sm text-gray-500">
                Manage your email notification settings
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="courseEnrollments"
                      name="courseEnrollments"
                      type="checkbox"
                      checked={notifications.courseEnrollments}
                      onChange={() => handleNotificationToggle('courseEnrollments')}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="courseEnrollments" className="font-medium text-gray-700">
                      Course Enrollments
                    </label>
                    <p className="text-gray-500">Receive an email when a student enrolls in your course.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="courseFeedback"
                      name="courseFeedback"
                      type="checkbox"
                      checked={notifications.courseFeedback}
                      onChange={() => handleNotificationToggle('courseFeedback')}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="courseFeedback" className="font-medium text-gray-700">
                      Course Feedback
                    </label>
                    <p className="text-gray-500">Receive an email when a student leaves a review on your course.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="newQuestions"
                      name="newQuestions"
                      type="checkbox"
                      checked={notifications.newQuestions}
                      onChange={() => handleNotificationToggle('newQuestions')}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="newQuestions" className="font-medium text-gray-700">
                      New Questions
                    </label>
                    <p className="text-gray-500">Receive an email when a student asks a question in your course.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="courseCompletions"
                      name="courseCompletions"
                      type="checkbox"
                      checked={notifications.courseCompletions}
                      onChange={() => handleNotificationToggle('courseCompletions')}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="courseCompletions" className="font-medium text-gray-700">
                      Course Completions
                    </label>
                    <p className="text-gray-500">Receive an email when a student completes your course.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="weeklyDigest"
                      name="weeklyDigest"
                      type="checkbox"
                      checked={notifications.weeklyDigest}
                      onChange={() => handleNotificationToggle('weeklyDigest')}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="weeklyDigest" className="font-medium text-gray-700">
                      Weekly Digest
                    </label>
                    <p className="text-gray-500">Receive a weekly summary of your course activities and statistics.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="promotionalEmails"
                      name="promotionalEmails"
                      type="checkbox"
                      checked={notifications.promotionalEmails}
                      onChange={() => handleNotificationToggle('promotionalEmails')}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="promotionalEmails" className="font-medium text-gray-700">
                      Promotional Emails
                    </label>
                    <p className="text-gray-500">Receive emails about platform updates, tips, and promotional opportunities.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </div>
          </div>

          {/* Account Security */}
          <div id="account" className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Account Security</h3>
              <p className="mt-1 text-sm text-gray-500">
                Manage your password and account security settings
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-6">
                {/* Change Password Section */}
                <div>
                  <h4 className="text-base font-medium text-gray-900">Change Password</h4>
                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-4">
                    <div className="sm:col-span-6">
                      <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                        Current Password
                      </label>
                      <div className="mt-1">
                        <input
                          type="password"
                          name="current-password"
                          id="current-password"
                          autoComplete="current-password"
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                        New Password
                      </label>
                      <div className="mt-1">
                        <input
                          type="password"
                          name="new-password"
                          id="new-password"
                          autoComplete="new-password"
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                        Confirm New Password
                      </label>
                      <div className="mt-1">
                        <input
                          type="password"
                          name="confirm-password"
                          id="confirm-password"
                          autoComplete="new-password"
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Update Password
                    </button>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="pt-6 border-t border-gray-200">
                  <h4 className="text-base font-medium text-gray-900">Two-Factor Authentication</h4>
                  <p className="mt-1 text-sm text-gray-500">
                    Add additional security to your account using two-factor authentication.
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Status: <span className="text-red-500">Not Enabled</span>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        We'll ask for a verification code in addition to your password when you sign in.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Enable 2FA
                    </button>
                  </div>
                </div>
                
                {/* Login Sessions */}
                <div className="pt-6 border-t border-gray-200">
                  <h4 className="text-base font-medium text-gray-900">Active Sessions</h4>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage your active login sessions.
                  </p>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Windows PC - Chrome
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Current session • Last active just now • United States
                        </p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Current
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          iPhone 12 - Safari
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Last active 2 days ago • United States
                        </p>
                      </div>
                      <button
                        type="button"
                        className="text-sm text-red-600 hover:text-red-900"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="text-sm text-red-600 hover:text-red-900 font-medium"
                    >
                      Logout of all other sessions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payout Settings */}
          <div id="payout" className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Payout Settings</h3>
              <p className="mt-1 text-sm text-gray-500">
                Manage your payment methods and preferences
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-6">
                {/* Payment Methods */}
                <div>
                  <h4 className="text-base font-medium text-gray-900">Payment Methods</h4>
                  <p className="mt-1 text-sm text-gray-500">
                    Add and manage your payout methods
                  </p>
                  
                  <div className="mt-4 space-y-4">
                    {/* Bank Account Method */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-gray-100 p-2 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">Bank of America ****6789</p>
                            <p className="text-xs text-gray-500">Primary payment method</p>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <button
                            type="button"
                            className="text-sm text-indigo-600 hover:text-indigo-900 font-medium"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="text-sm text-gray-500 hover:text-gray-700 font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* PayPal Method */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-blue-100 p-2 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.641.641 0 0 1 .632-.54h6.752c2.267 0 3.66.75 4.132 2.223.198.619.314 1.23.301 1.954l.004.165c-.06 2.01-1.14 4.486-3.096 5.312-.635.266-1.346.398-2.108.398h-.738c-.602 0-1.128.398-1.26.974l-.153.657-1.284 8.248a.149.149 0 0 1-.147.126z" />
                              <path d="M16.012 8.83c-.057 2.018-1.138 4.49-3.09 5.316a4.436 4.436 0 0 1-2.055.398h-.723c-.602 0-1.124.4-1.26.975l-.15.655-1.268 8.378a.145.145 0 0 1-.143.126H2.47a.145.145 0 0 1-.143-.126.132.132 0 0 1 0-.04L5.773 7.315a.64.64 0 0 1 .633-.54h6.752c.9 0 1.686.15 2.334.435-.296.298-.516.655-.659 1.034-.07.188-.123.39-.16.585l.002-.002z" />
                              <path d="M19.012 7.28c-.038.66-.221 1.453-.533 2.135-.98 2.052-3.07 2.958-5.604 2.958h-.757c-.602 0-1.123.4-1.259.975l-1.655 10.786a.133.133 0 0 1-.143.126h-4.09c-.079 0-.127-.048-.127-.116a.134.134 0 0 1 0-.04l.532-3.37.989-6.302.004-.046c.136-.576.657-.974 1.258-.974h.724c3.058 0 5.445-1.237 6.148-4.818.296-1.429.156-2.647-.422-3.506a2.25 2.25 0 0 0-.494-.462l.016-.004c.27.156.51.342.713.56.75.757 1.016 1.888.699 3.148z" />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">PayPal</p>
                            <p className="text-xs text-gray-500">instructor@example.com</p>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <button
                            type="button"
                            className="text-sm text-indigo-600 hover:text-indigo-900 font-medium"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="text-sm text-gray-500 hover:text-gray-700 font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      className="mt-2 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Payment Method
                    </button>
                  </div>
                </div>
                
                {/* Payout Schedule */}
                <div className="pt-6 border-t border-gray-200">
                  <h4 className="text-base font-medium text-gray-900">Payout Schedule</h4>
                  <p className="mt-1 text-sm text-gray-500">
                    Choose when you'd like to receive your earnings
                  </p>
                  
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center">
                      <input
                        id="monthly"
                        name="payout-schedule"
                        type="radio"
                        defaultChecked
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor="monthly" className="ml-3 block text-sm font-medium text-gray-700">
                        Monthly (Payouts on the 15th of each month)
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="biweekly"
                        name="payout-schedule"
                        type="radio"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor="biweekly" className="ml-3 block text-sm font-medium text-gray-700">
                        Bi-weekly (Payouts every other Friday)
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="weekly"
                        name="payout-schedule"
                        type="radio"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor="weekly" className="ml-3 block text-sm font-medium text-gray-700">
                        Weekly (Payouts every Friday)
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Tax Information */}
                <div className="pt-6 border-t border-gray-200">
                  <h4 className="text-base font-medium text-gray-900">Tax Information</h4>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage your tax forms and information
                  </p>
                  
                  <div className="mt-4 bg-green-50 p-4 rounded-md">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">Tax form submitted</h3>
                        <div className="mt-2 text-sm text-green-700">
                          <p>We have your W-9 form on file. You'll receive your 1099 form at the beginning of next year.</p>
                        </div>
                        <div className="mt-4">
                          <div className="-mx-2 -my-1.5 flex">
                            <button type="button" className="px-2 py-1.5 rounded-md text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600">
                              View Form
                            </button>
                            <button type="button" className="ml-3 px-2 py-1.5 rounded-md text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600">
                              Update Information
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Payout Threshold */}
                <div className="pt-6 border-t border-gray-200">
                  <h4 className="text-base font-medium text-gray-900">Payout Threshold</h4>
                  <p className="mt-1 text-sm text-gray-500">
                    Set a minimum amount before receiving a payout
                  </p>
                  
                  <div className="mt-4">
                    <div className="flex items-center">
                      <label htmlFor="threshold" className="block text-sm font-medium text-gray-700 mr-4">
                        Minimum payout amount:
                      </label>
                      <div className="relative rounded-md shadow-sm w-32">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          name="threshold"
                          id="threshold"
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 py-2 sm:text-sm border-gray-300 rounded-md"
                          placeholder="50.00"
                          defaultValue="50.00"
                          min="10"
                          step="1"
                        />
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      We'll hold your earnings until they reach this amount, then process your payout according to your schedule.
                      Minimum value is $10.
                    </p>
                  </div>
                </div>
                
                <div className="pt-5 flex justify-end">
                  <button
                    type="button"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 