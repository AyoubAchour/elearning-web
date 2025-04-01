import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateAnnouncementPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    courseId: '',
    sendEmail: true,
    pinned: false
  });

  // Sample courses data
  const instructorCourses = [
    { id: 1, title: 'React Fundamentals' },
    { id: 2, title: 'Advanced JavaScript' },
    { id: 3, title: 'Python for Beginners' },
    { id: 4, title: 'Data Science with Python' },
    { id: 5, title: 'Web Design Fundamentals' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit the announcement data to an API
    console.log('Announcement submitted:', formData);
    alert('Announcement created successfully!');
    navigate('/instructor/discussions');
  };

  const handleCancel = () => {
    navigate('/instructor/discussions');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create Announcement</h1>
        <p className="text-gray-600">Share important information with students enrolled in your course</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Announcement Details</h3>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Course Selection */}
            <div>
              <label htmlFor="courseId" className="block text-sm font-medium text-gray-700 mb-1">
                Course <span className="text-red-500">*</span>
              </label>
              <select
                id="courseId"
                name="courseId"
                required
                value={formData.courseId}
                onChange={handleInputChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select a course</option>
                {instructorCourses.map(course => (
                  <option key={course.id} value={course.id}>{course.title}</option>
                ))}
                <option value="all">All Courses</option>
              </select>
            </div>
            
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter announcement title"
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            
            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Content <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                required
                rows={6}
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Write your announcement here..."
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <p className="mt-2 text-sm text-gray-500">
                Format text using Markdown. You can use **bold**, *italic*, [links](https://example.com), and lists.
              </p>
            </div>
            
            {/* Options */}
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="sendEmail"
                    name="sendEmail"
                    type="checkbox"
                    checked={formData.sendEmail}
                    onChange={handleInputChange}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="sendEmail" className="font-medium text-gray-700">
                    Send email notification
                  </label>
                  <p className="text-gray-500">Students will receive an email with this announcement</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="pinned"
                    name="pinned"
                    type="checkbox"
                    checked={formData.pinned}
                    onChange={handleInputChange}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="pinned" className="font-medium text-gray-700">
                    Pin announcement
                  </label>
                  <p className="text-gray-500">This announcement will stay at the top of the course discussions</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Announcement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAnnouncementPage; 