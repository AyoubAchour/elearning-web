import React, { useState } from 'react';

const InstructorApplicationsPage = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      specialization: 'Web Development',
      experience: '5 years',
      education: 'Master in Computer Science',
      applicationDate: '2023-03-15',
      status: 'pending',
      description: 'I have extensive experience teaching React, Node.js, and full-stack development. I have previously worked as a bootcamp instructor and published several online tutorials.'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      specialization: 'Data Science',
      experience: '8 years',
      education: 'PhD in Statistics',
      applicationDate: '2023-03-18',
      status: 'pending',
      description: 'I am a data scientist with expertise in machine learning, deep learning, and data visualization. I have published research papers and have taught at university level.'
    },
    {
      id: 3,
      name: 'Michael Smith',
      email: 'michael.smith@example.com',
      specialization: 'Graphic Design',
      experience: '4 years',
      education: 'Bachelor of Fine Arts',
      applicationDate: '2023-03-20',
      status: 'pending',
      description: 'I specialize in UI/UX design and have worked with multiple startups to improve their brand identity and user experience. I am proficient in Adobe Creative Suite and Figma.'
    }
  ]);

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newInstructorData, setNewInstructorData] = useState({
    fullName: '',
    email: '',
    password: '',
    bio: '',
    specialization: '',
    meetLink: '',
    meetDate: '',
    meetTime: '',
    emailMessage: ''
  });

  const openViewModal = (application) => {
    setSelectedApplication(application);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedApplication(null);
  };

  const openCreateModal = (application) => {
    // Generate a default meeting date (3 days from now)
    const meetDate = new Date();
    meetDate.setDate(meetDate.getDate() + 3);
    
    const formattedDate = meetDate.toISOString().split('T')[0];
    const formattedTime = '10:00';
    
    // Pre-fill form with application data
    setNewInstructorData({
      fullName: application.name,
      email: application.email,
      password: generateRandomPassword(),
      bio: application.description,
      specialization: application.specialization,
      meetLink: '',
      meetDate: formattedDate,
      meetTime: formattedTime,
      emailMessage: `Dear ${application.name},\n\nCongratulations! Your application to become an instructor on our platform has been approved. We'd like to schedule a brief onboarding session to discuss the next steps.\n\nPlease join the Google Meet session at the scheduled time. If the proposed time doesn't work for you, please let us know and we'll reschedule.\n\nBest regards,\nThe Admin Team`
    });
    setSelectedApplication(application);
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInstructorData({
      ...newInstructorData,
      [name]: value
    });
  };

  const generateRandomPassword = () => {
    // Generate random 10-character password
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const approveApplication = (applicationId) => {
    // In a real app, this would make an API call
    const updatedApplications = applications.map(app => 
      app.id === applicationId 
        ? { ...app, status: 'approved' } 
        : app
    );
    setApplications(updatedApplications);
    closeCreateModal();
    closeViewModal();
  };

  const rejectApplication = (applicationId) => {
    // In a real app, this would make an API call
    const updatedApplications = applications.map(app => 
      app.id === applicationId 
        ? { ...app, status: 'rejected' } 
        : app
    );
    setApplications(updatedApplications);
    closeViewModal();
  };

  const createInstructorAccount = (applicationId) => {
    // In a real app, this would create the account via API
    // and send the Google Meet invitation email
    console.log('Creating instructor account:', newInstructorData);
    
    // Simulate sending invitation email
    console.log('Sending invitation email with Google Meet link:', {
      to: newInstructorData.email,
      subject: 'Instructor Application Approved - Onboarding Meeting Invitation',
      meetLink: newInstructorData.meetLink,
      meetDate: newInstructorData.meetDate,
      meetTime: newInstructorData.meetTime,
      message: newInstructorData.emailMessage
    });
    
    // Update application status
    approveApplication(applicationId);
  };

  // Helper function to generate a Google Meet link
  const generateMeetLink = () => {
    // In a real app, you might integrate with Google Calendar API
    // For now, we're just generating a random meeting ID
    const meetId = Math.random().toString(36).substring(2, 12);
    const meetLink = `https://meet.google.com/${meetId}`;
    
    setNewInstructorData({
      ...newInstructorData,
      meetLink
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Instructor Applications</h1>
        <p className="text-gray-600">Review and manage applications from potential instructors.</p>
      </div>

      {/* Applications List */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specialization
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experience
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Application Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                        {application.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-4">
                        <div className="text-base font-semibold text-gray-900">{application.name}</div>
                        <div className="text-xs text-gray-500">{application.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {application.specialization}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {application.experience}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {application.applicationDate}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      application.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : application.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <button
                      onClick={() => openViewModal(application)}
                      className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded hover:bg-blue-50 mr-2"
                    >
                      View Details
                    </button>
                    {application.status === 'pending' && (
                      <button
                        onClick={() => openCreateModal(application)}
                        className="text-green-600 hover:text-green-900 px-2 py-1 rounded hover:bg-green-50"
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {applications.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                    No instructor applications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Application Modal */}
      {isViewModalOpen && selectedApplication && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white rounded-lg max-w-2xl w-full mx-4 p-6">
            <div className="flex justify-between items-center mb-6 border-b pb-3">
              <h2 className="text-xl font-bold text-gray-900">Application Details</h2>
              <button onClick={closeViewModal} className="text-gray-400 hover:text-gray-500">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-6 flex items-center">
              <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold">
                {selectedApplication.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{selectedApplication.name}</h3>
                <p className="text-gray-600">{selectedApplication.email}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Specialization</h4>
                <p className="font-medium text-gray-900">{selectedApplication.specialization}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Experience</h4>
                <p className="font-medium text-gray-900">{selectedApplication.experience}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Education</h4>
                <p className="font-medium text-gray-900">{selectedApplication.education}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Application Date</h4>
                <p className="font-medium text-gray-900">{selectedApplication.applicationDate}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Description</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-900 whitespace-pre-wrap">{selectedApplication.description}</p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              {selectedApplication.status === 'pending' && (
                <>
                  <button
                    onClick={() => rejectApplication(selectedApplication.id)}
                    className="px-4 py-2 bg-white border border-red-500 text-red-600 rounded-md hover:bg-red-50"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => openCreateModal(selectedApplication)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Approve
                  </button>
                </>
              )}
              <button
                onClick={closeViewModal}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Instructor Account Modal */}
      {isCreateModalOpen && selectedApplication && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white rounded-lg max-w-4xl w-full mx-4 p-6 overflow-y-auto max-h-screen">
            <div className="flex justify-between items-center mb-6 border-b pb-3">
              <h2 className="text-xl font-bold text-gray-900">Create Instructor Account</h2>
              <button onClick={closeCreateModal} className="text-gray-400 hover:text-gray-500">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={newInstructorData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={newInstructorData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Temporary Password
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="password"
                      name="password"
                      value={newInstructorData.password}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md rounded-r-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setNewInstructorData({...newInstructorData, password: generateRandomPassword()})}
                      className="px-3 py-2 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300"
                    >
                      Generate
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    A temporary password that the instructor will be required to change on first login.
                  </p>
                </div>
                <div>
                  <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
                    Specialization
                  </label>
                  <input
                    type="text"
                    id="specialization"
                    name="specialization"
                    value={newInstructorData.specialization}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows="3"
                  value={newInstructorData.bio}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Google Meet Invitation</h3>
              <div className="bg-blue-50 p-4 rounded-md mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-sm text-blue-800">
                    Schedule an onboarding meeting with the instructor to discuss platform guidelines, course creation process, and answer their questions.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="meetLink" className="block text-sm font-medium text-gray-700 mb-1">
                    Google Meet Link
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="meetLink"
                      name="meetLink"
                      value={newInstructorData.meetLink}
                      onChange={handleInputChange}
                      placeholder="https://meet.google.com/xxx-xxxx-xxx"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md rounded-r-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={generateMeetLink}
                      className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 flex items-center"
                    >
                      <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Generate
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Create a Google Meet link or enter one manually.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="meetDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Meeting Date
                    </label>
                    <input
                      type="date"
                      id="meetDate"
                      name="meetDate"
                      value={newInstructorData.meetDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="meetTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Meeting Time
                    </label>
                    <input
                      type="time"
                      id="meetTime"
                      name="meetTime"
                      value={newInstructorData.meetTime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="emailMessage" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Message
                </label>
                <textarea
                  id="emailMessage"
                  name="emailMessage"
                  rows="6"
                  value={newInstructorData.emailMessage}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">
                  This message will be sent to the instructor along with their account credentials and meeting details.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                onClick={closeCreateModal}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => createInstructorAccount(selectedApplication.id)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
              >
                <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Create Account & Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorApplicationsPage; 