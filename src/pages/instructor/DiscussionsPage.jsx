import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DiscussionsPage = () => {
  // Sample discussions data
  const initialDiscussions = [
    {
      id: 1,
      courseId: 1,
      courseName: 'React Fundamentals',
      title: 'Trouble understanding React hooks',
      content: 'I am trying to use useEffect but I\'m not sure when to include dependencies in the dependency array...',
      student: {
        id: 3,
        name: 'Emily Davis',
        avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      },
      createdAt: '2023-10-28T14:32:00',
      status: 'unanswered',
      replies: 0,
      views: 8,
      lastActivity: '2023-10-28T14:32:00'
    },
    {
      id: 2,
      courseId: 2,
      courseName: 'Advanced JavaScript',
      title: 'Clarification on closures',
      content: 'In the lecture on closures, you mentioned that they retain access to variables. Could you elaborate on memory implications?',
      student: {
        id: 2,
        name: 'Michael Brown',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
      createdAt: '2023-10-25T09:45:00',
      status: 'answered',
      replies: 2,
      views: 15,
      lastActivity: '2023-10-27T11:20:00'
    },
    {
      id: 3,
      courseId: 1,
      courseName: 'React Fundamentals',
      title: 'Best practices for component structure',
      content: 'I\'m working on a complex form and I\'m not sure how to split it into components efficiently...',
      student: {
        id: 1,
        name: 'Sarah Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
      },
      createdAt: '2023-10-22T16:50:00',
      status: 'answered',
      replies: 4,
      views: 23,
      lastActivity: '2023-10-29T08:15:00'
    },
    {
      id: 4,
      courseId: 3,
      courseName: 'Python for Beginners',
      title: 'Error with list comprehensions',
      content: 'I\'m getting a syntax error when trying to use nested list comprehensions as shown in lecture 8...',
      student: {
        id: 5,
        name: 'Lisa Anderson',
        avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      },
      createdAt: '2023-10-30T10:22:00',
      status: 'unanswered',
      replies: 0,
      views: 3,
      lastActivity: '2023-10-30T10:22:00'
    },
    {
      id: 5,
      courseId: 2,
      courseName: 'Advanced JavaScript',
      title: 'Async/await vs Promises',
      content: 'Could you clarify when we should use async/await over .then() chains? Are there performance differences?',
      student: {
        id: 4,
        name: 'David Wilson',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      },
      createdAt: '2023-10-26T14:10:00',
      status: 'answered',
      replies: 1,
      views: 19,
      lastActivity: '2023-10-28T16:40:00'
    }
  ];

  const [discussions, setDiscussions] = useState(initialDiscussions);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('lastActivity');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showDiscussionModal, setShowDiscussionModal] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);

  // All courses this instructor teaches
  const instructorCourses = [
    { id: 1, title: 'React Fundamentals' },
    { id: 2, title: 'Advanced JavaScript' },
    { id: 3, title: 'Python for Beginners' },
    { id: 4, title: 'Data Science with Python' },
    { id: 5, title: 'Web Design Fundamentals' }
  ];

  // Filter and sort discussions
  const filteredDiscussions = discussions
    .filter(discussion => {
      // Search filter
      if (searchTerm && !discussion.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Course filter
      if (courseFilter !== 'all' && discussion.courseId.toString() !== courseFilter) {
        return false;
      }
      
      // Status filter
      if (statusFilter !== 'all' && discussion.status !== statusFilter) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort discussions
      let comparison = 0;
      
      if (sortBy === 'lastActivity') {
        comparison = new Date(a.lastActivity) - new Date(b.lastActivity);
      } else if (sortBy === 'created') {
        comparison = new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === 'replies') {
        comparison = a.replies - b.replies;
      } else if (sortBy === 'views') {
        comparison = a.views - b.views;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const viewDiscussion = (discussion) => {
    setSelectedDiscussion(discussion);
    setShowDiscussionModal(true);
  };

  const closeDiscussionModal = () => {
    setShowDiscussionModal(false);
    setSelectedDiscussion(null);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getTimeAgo = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = now - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    }
  };

  // Sample replies for the selected discussion
  const sampleReplies = [
    {
      id: 1,
      discussionId: 2,
      content: "Closures can lead to memory leaks if not handled properly. When a function references variables from its outer scope, those variables are retained in memory even after the outer function has completed. This is beneficial for creating private variables, but can cause issues in large applications if closures are created in loops or event handlers without proper cleanup.",
      author: {
        id: 'instructor',
        name: 'John Smith (Instructor)',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
      createdAt: '2023-10-26T11:32:00',
      isInstructor: true
    },
    {
      id: 2,
      discussionId: 2,
      content: "Thank you for the explanation! So if I understand correctly, I should be careful when creating closures in loops or when attaching event listeners that might be removed later?",
      author: {
        id: 2,
        name: 'Michael Brown',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
      createdAt: '2023-10-27T11:20:00',
      isInstructor: false
    }
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Discussions</h1>
        <p className="text-gray-600">Monitor and respond to student questions across all your courses</p>
      </div>

      {/* Filters and Actions */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search discussions..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Course Filter */}
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
          >
            <option value="all">All Courses</option>
            {instructorCourses.map(course => (
              <option key={course.id} value={course.id.toString()}>
                {course.title}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="unanswered">Unanswered</option>
            <option value="answered">Answered</option>
          </select>
        </div>

        <Link
          to="/instructor/discussions/announcement"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
          Create Announcement
        </Link>
      </div>

      {/* Discussions List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Discussion
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center focus:outline-none" 
                    onClick={() => handleSort('replies')}
                  >
                    Replies
                    {sortBy === 'replies' && (
                      <span className="ml-1">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center focus:outline-none" 
                    onClick={() => handleSort('views')}
                  >
                    Views
                    {sortBy === 'views' && (
                      <span className="ml-1">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center focus:outline-none" 
                    onClick={() => handleSort('lastActivity')}
                  >
                    Last Activity
                    {sortBy === 'lastActivity' && (
                      <span className="ml-1">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDiscussions.length > 0 ? (
                filteredDiscussions.map((discussion) => (
                  <tr key={discussion.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => viewDiscussion(discussion)}>
                    <td className="px-6 py-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full object-cover" src={discussion.student.avatar} alt={discussion.student.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{discussion.title}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            by {discussion.student.name} • {getTimeAgo(discussion.createdAt)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {discussion.courseName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {discussion.replies}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {discussion.views}
                    </td>
                    <td className="px-6 py-4">
                      {discussion.status === 'unanswered' ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Unanswered
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Answered
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {getTimeAgo(discussion.lastActivity)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-sm text-gray-500">
                    No discussions found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Discussion View Modal */}
      {showDiscussionModal && selectedDiscussion && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white rounded-lg max-w-4xl w-full mx-4 p-6 overflow-y-auto max-h-screen">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Discussion Thread</h2>
              <button onClick={closeDiscussionModal} className="text-gray-400 hover:text-gray-500">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-4 p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full object-cover" src={selectedDiscussion.student.avatar} alt={selectedDiscussion.student.name} />
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-gray-900">{selectedDiscussion.student.name}</p>
                    <p className="text-sm text-gray-500">{formatTimestamp(selectedDiscussion.createdAt)}</p>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mt-1">{selectedDiscussion.title}</h3>
                  <div className="mt-2 text-sm text-gray-700">
                    <p>{selectedDiscussion.content}</p>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Course: {selectedDiscussion.courseName}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium text-gray-900 mb-2">Replies</h3>
              {selectedDiscussion.replies > 0 ? (
                sampleReplies
                  .filter(reply => reply.discussionId === selectedDiscussion.id)
                  .map(reply => (
                    <div key={reply.id} className={`p-4 mb-3 rounded-lg ${reply.isInstructor ? 'bg-indigo-50 border border-indigo-100' : 'bg-gray-50 border border-gray-100'}`}>
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <img className="h-8 w-8 rounded-full object-cover" src={reply.author.avatar} alt={reply.author.name} />
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex justify-between">
                            <p className="text-sm font-medium text-gray-900">
                              {reply.author.name}
                              {reply.isInstructor && (
                                <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                                  Instructor
                                </span>
                              )}
                            </p>
                            <p className="text-sm text-gray-500">{formatTimestamp(reply.createdAt)}</p>
                          </div>
                          <div className="mt-1 text-sm text-gray-700">
                            <p>{reply.content}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-gray-500 italic">No replies yet.</p>
              )}
            </div>

            <div className="mt-4 border-t pt-4">
              <h3 className="font-medium text-gray-900 mb-2">Your Reply</h3>
              <textarea
                className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                rows="4"
                placeholder="Type your response here..."
              ></textarea>
              <div className="flex justify-end mt-2">
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Post Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscussionsPage; 