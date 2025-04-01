import React, { useState } from 'react';

const CourseReviewPage = () => {
  // Sample courses pending review
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Complete React Developer Course',
      instructor: 'John Smith',
      submittedDate: '2023-03-15',
      category: 'Web Development',
      duration: '18 hours',
      lessons: 24,
      status: 'pending',
      thumbnail: 'https://via.placeholder.com/150',
      description: 'A comprehensive course on React development covering hooks, context API, Redux, and building full-stack applications with Node.js backend.'
    },
    {
      id: 2,
      title: 'Machine Learning Fundamentals',
      instructor: 'Sarah Johnson',
      submittedDate: '2023-03-18',
      category: 'Data Science',
      duration: '22 hours',
      lessons: 30,
      status: 'pending',
      thumbnail: 'https://via.placeholder.com/150',
      description: 'Learn the foundations of machine learning, including supervised and unsupervised learning, neural networks, and practical applications with Python.'
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      instructor: 'Michael Davis',
      submittedDate: '2023-03-20',
      category: 'Design',
      duration: '15 hours',
      lessons: 20,
      status: 'pending',
      thumbnail: 'https://via.placeholder.com/150',
      description: 'Master the principles of UI/UX design, user research, wireframing, prototyping and design systems to create engaging digital experiences.'
    }
  ]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const openModal = (course) => {
    setSelectedCourse(course);
    setReviewNotes('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  const approveCourse = (courseId) => {
    const updatedCourses = courses.map(course => 
      course.id === courseId 
        ? { ...course, status: 'approved', reviewNotes: reviewNotes || 'Approved without notes' } 
        : course
    );
    setCourses(updatedCourses);
    closeModal();
  };

  const rejectCourse = (courseId) => {
    if (!reviewNotes) {
      alert('Please provide feedback for the rejection');
      return;
    }
    
    const updatedCourses = courses.map(course => 
      course.id === courseId 
        ? { ...course, status: 'rejected', reviewNotes } 
        : course
    );
    setCourses(updatedCourses);
    closeModal();
  };

  const requestChanges = (courseId) => {
    if (!reviewNotes) {
      alert('Please provide details for the requested changes');
      return;
    }
    
    const updatedCourses = courses.map(course => 
      course.id === courseId 
        ? { ...course, status: 'changes_requested', reviewNotes } 
        : course
    );
    setCourses(updatedCourses);
    closeModal();
  };

  const filteredCourses = filterStatus === 'all' 
    ? courses 
    : courses.filter(course => course.status === filterStatus);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Course Review</h1>
        <p className="text-gray-600">Review and approve submitted courses</p>
      </div>

      {/* Filter options */}
      <div className="mb-6 flex items-center">
        <label htmlFor="status-filter" className="mr-2 text-sm font-medium text-gray-700">Filter by status:</label>
        <select
          id="status-filter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="changes_requested">Changes Requested</option>
        </select>
      </div>

      {/* Course list */}
      <div className="grid grid-cols-1 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div 
              key={course.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 mb-4 md:mb-0">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title} 
                      className="w-full h-40 object-cover rounded-md"
                    />
                  </div>
                  <div className="md:w-3/4 md:pl-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h2>
                        <p className="text-gray-600 mb-4">{course.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        course.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        course.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                        course.status === 'changes_requested' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {course.status === 'changes_requested' 
                          ? 'Changes Requested' 
                          : course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Instructor</p>
                        <p className="text-sm font-medium">{course.instructor}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Category</p>
                        <p className="text-sm font-medium">{course.category}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Duration</p>
                        <p className="text-sm font-medium">{course.duration}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Lessons</p>
                        <p className="text-sm font-medium">{course.lessons}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Submitted on</p>
                        <p className="text-sm font-medium">{course.submittedDate}</p>
                      </div>
                      
                      {course.status === 'pending' ? (
                        <button
                          onClick={() => openModal(course)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          Review Course
                        </button>
                      ) : (
                        <div>
                          <p className="text-xs text-gray-500">Review Notes</p>
                          <p className="text-sm font-medium truncate max-w-md">{course.reviewNotes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">No courses found with the selected filter.</p>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {isModalOpen && selectedCourse && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white rounded-lg max-w-4xl w-full mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Course Review</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">{selectedCourse.title}</h3>
              <p className="text-gray-600 mb-4">{selectedCourse.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Instructor</p>
                  <p className="text-sm font-medium">{selectedCourse.instructor}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Category</p>
                  <p className="text-sm font-medium">{selectedCourse.category}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Duration</p>
                  <p className="text-sm font-medium">{selectedCourse.duration}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Lessons</p>
                  <p className="text-sm font-medium">{selectedCourse.lessons}</p>
                </div>
              </div>
            </div>
            
            {/* Course Content Preview - In a real app, this would show actual content */}
            <div className="mb-6 border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium mb-2">Course Content Preview</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium mb-2">Course Modules</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Introduction to the Course</li>
                    <li>• Getting Started with the Basics</li>
                    <li>• Intermediate Concepts</li>
                    <li>• Advanced Techniques</li>
                    <li>• Project Implementation</li>
                    <li>• Final Assessment & Certification</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium mb-2">Materials & Resources</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Course Manual (PDF)</li>
                    <li>• Exercise Files</li>
                    <li>• Code Samples</li>
                    <li>• Project Templates</li>
                    <li>• Reference Guides</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Review Notes */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review Notes / Feedback
              </label>
              <textarea
                rows="4"
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder="Provide your feedback or reasons for rejection here..."
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => rejectCourse(selectedCourse.id)}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
              >
                Reject
              </button>
              <button
                onClick={() => requestChanges(selectedCourse.id)}
                className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200"
              >
                Request Changes
              </button>
              <button
                onClick={() => approveCourse(selectedCourse.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseReviewPage; 