import React, { useState } from 'react';

const UserFeedbackPage = () => {
  // Sample feedback data
  const [feedbackItems, setFeedbackItems] = useState([
    {
      id: 1,
      user: { id: 101, name: 'Alex Johnson', email: 'alex@example.com', avatar: 'https://i.pravatar.cc/150?img=1' },
      content: 'The course navigation could be improved. It\'s hard to track my progress between different sections.',
      category: 'UI/UX',
      status: 'open',
      priority: 'medium',
      createdAt: '2023-05-12T08:30:00',
      lastUpdated: '2023-05-12T08:30:00',
      likes: 8,
      replies: []
    },
    {
      id: 2,
      user: { id: 102, name: 'Emily Parker', email: 'emily@example.com', avatar: 'https://i.pravatar.cc/150?img=5' },
      content: 'It would be great to have a dark mode option for reducing eye strain during night study sessions.',
      category: 'Feature Request',
      status: 'in-progress',
      priority: 'high',
      createdAt: '2023-05-10T14:45:00',
      lastUpdated: '2023-05-11T09:20:00',
      likes: 24,
      replies: [
        {
          id: 101,
          staff: { id: 1, name: 'Admin User', avatar: 'https://i.pravatar.cc/150?img=12' },
          content: 'Thanks for the suggestion! We are currently working on implementing dark mode in our next update.',
          createdAt: '2023-05-11T09:20:00'
        }
      ]
    },
    {
      id: 3,
      user: { id: 103, name: 'Michael Torres', email: 'michael@example.com', avatar: 'https://i.pravatar.cc/150?img=8' },
      content: 'The video player keeps buffering even with a good internet connection. This is frustrating during important lectures.',
      category: 'Technical Issue',
      status: 'resolved',
      priority: 'critical',
      createdAt: '2023-05-08T11:15:00',
      lastUpdated: '2023-05-09T16:40:00',
      likes: 16,
      replies: [
        {
          id: 102,
          staff: { id: 2, name: 'Tech Support', avatar: 'https://i.pravatar.cc/150?img=15' },
          content: 'We\'ve identified the issue with our video CDN. The problem should be resolved now. Please let us know if you continue experiencing problems.',
          createdAt: '2023-05-09T16:40:00'
        }
      ]
    },
    {
      id: 4,
      user: { id: 104, name: 'Sarah Wilson', email: 'sarah@example.com', avatar: 'https://i.pravatar.cc/150?img=9' },
      content: 'I love the new quiz format! It really helps me test my knowledge effectively.',
      category: 'Appreciation',
      status: 'closed',
      priority: 'low',
      createdAt: '2023-05-07T09:50:00',
      lastUpdated: '2023-05-07T10:15:00',
      likes: 5,
      replies: [
        {
          id: 103,
          staff: { id: 1, name: 'Admin User', avatar: 'https://i.pravatar.cc/150?img=12' },
          content: 'We\'re glad you\'re enjoying the new quiz format! We worked hard to make it more effective for learning.',
          createdAt: '2023-05-07T10:15:00'
        }
      ]
    },
    {
      id: 5,
      user: { id: 105, name: 'David Chen', email: 'david@example.com', avatar: 'https://i.pravatar.cc/150?img=16' },
      content: 'Could we have more advanced exercises in the Python courses? The current ones are too basic for experienced developers.',
      category: 'Content Request',
      status: 'open',
      priority: 'medium',
      createdAt: '2023-05-06T13:20:00',
      lastUpdated: '2023-05-06T13:20:00',
      likes: 13,
      replies: []
    }
  ]);

  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['UI/UX', 'Feature Request', 'Technical Issue', 'Appreciation', 'Content Request', 'Other'];
  const priorities = ['low', 'medium', 'high', 'critical'];
  const statuses = ['open', 'in-progress', 'resolved', 'closed'];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSelectFeedback = (feedback) => {
    setSelectedFeedback(feedback);
    setReplyContent('');
  };

  const handleStatusChange = (feedbackId, newStatus) => {
    setFeedbackItems(prevItems => 
      prevItems.map(item => 
        item.id === feedbackId ? { ...item, status: newStatus, lastUpdated: new Date().toISOString() } : item
      )
    );
    
    if (selectedFeedback && selectedFeedback.id === feedbackId) {
      setSelectedFeedback(prev => ({ ...prev, status: newStatus, lastUpdated: new Date().toISOString() }));
    }
  };

  const handlePriorityChange = (feedbackId, newPriority) => {
    setFeedbackItems(prevItems => 
      prevItems.map(item => 
        item.id === feedbackId ? { ...item, priority: newPriority, lastUpdated: new Date().toISOString() } : item
      )
    );
    
    if (selectedFeedback && selectedFeedback.id === feedbackId) {
      setSelectedFeedback(prev => ({ ...prev, priority: newPriority, lastUpdated: new Date().toISOString() }));
    }
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    
    if (!replyContent.trim() || !selectedFeedback) return;
    
    const newReply = {
      id: Date.now(),
      staff: { id: 1, name: 'Admin User', avatar: 'https://i.pravatar.cc/150?img=12' },
      content: replyContent,
      createdAt: new Date().toISOString()
    };
    
    setFeedbackItems(prevItems => 
      prevItems.map(item => 
        item.id === selectedFeedback.id ? {
          ...item,
          replies: [...item.replies, newReply],
          lastUpdated: new Date().toISOString(),
          status: item.status === 'open' ? 'in-progress' : item.status
        } : item
      )
    );
    
    setSelectedFeedback(prev => ({
      ...prev,
      replies: [...prev.replies, newReply],
      lastUpdated: new Date().toISOString(),
      status: prev.status === 'open' ? 'in-progress' : prev.status
    }));
    
    setReplyContent('');
  };

  // Apply filters and search
  const filteredFeedbackItems = feedbackItems.filter(item => {
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesPriority = priorityFilter === 'all' || item.priority === priorityFilter;
    const matchesSearch = searchTerm === '' || 
      item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesCategory && matchesPriority && matchesSearch;
  });

  // Sort by last updated (newest first)
  const sortedFeedbackItems = [...filteredFeedbackItems].sort((a, b) => 
    new Date(b.lastUpdated) - new Date(a.lastUpdated)
  );

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">User Feedback</h1>
        <p className="text-gray-600">Manage and respond to user feedback</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 h-full">
        {/* Feedback list with filters */}
        <div className="w-full md:w-2/5 lg:w-1/3 flex flex-col">
          {/* Filters and search */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by content or user..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Statuses</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Priorities</option>
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Feedback list */}
          <div className="bg-white rounded-lg shadow-sm overflow-y-auto flex-grow">
            {sortedFeedbackItems.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {sortedFeedbackItems.map(feedback => (
                  <li 
                    key={feedback.id}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedFeedback?.id === feedback.id ? 'bg-blue-50' : ''}`}
                    onClick={() => handleSelectFeedback(feedback)}
                  >
                    <div className="flex items-start">
                      <img src={feedback.user.avatar} alt={feedback.user.name} className="h-10 w-10 rounded-full mr-3" />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">{feedback.user.name}</p>
                          <span className="text-xs text-gray-500">{formatDate(feedback.createdAt).split(',')[0]}</span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{feedback.content}</p>
                        <div className="mt-1 flex items-center">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            feedback.priority === 'low' ? 'bg-green-100 text-green-800' :
                            feedback.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                            feedback.priority === 'high' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {feedback.priority.charAt(0).toUpperCase() + feedback.priority.slice(1)}
                          </span>
                          <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            feedback.status === 'open' ? 'bg-gray-100 text-gray-800' :
                            feedback.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                            feedback.status === 'resolved' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-500'
                          }`}>
                            {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1).replace('-', ' ')}
                          </span>
                          <span className="ml-2 text-xs text-gray-500">
                            {feedback.replies.length} {feedback.replies.length === 1 ? 'reply' : 'replies'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-500">No feedback found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Feedback detail view */}
        <div className="w-full md:w-3/5 lg:w-2/3">
          {selectedFeedback ? (
            <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <img src={selectedFeedback.user.avatar} alt={selectedFeedback.user.name} className="h-12 w-12 rounded-full mr-4" />
                    <div>
                      <h2 className="text-lg font-medium text-gray-900">{selectedFeedback.user.name}</h2>
                      <p className="text-sm text-gray-500">{selectedFeedback.user.email}</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {selectedFeedback.category}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          selectedFeedback.priority === 'low' ? 'bg-green-100 text-green-800' :
                          selectedFeedback.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                          selectedFeedback.priority === 'high' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {selectedFeedback.priority.charAt(0).toUpperCase() + selectedFeedback.priority.slice(1)} Priority
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div>
                      <label htmlFor="status" className="sr-only">Status</label>
                      <select
                        id="status"
                        value={selectedFeedback.status}
                        onChange={(e) => handleStatusChange(selectedFeedback.id, e.target.value)}
                        className={`block pl-3 pr-8 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                          selectedFeedback.status === 'open' ? 'bg-gray-100 border-gray-300 focus:ring-gray-500' :
                          selectedFeedback.status === 'in-progress' ? 'bg-yellow-100 border-yellow-300 focus:ring-yellow-500' :
                          selectedFeedback.status === 'resolved' ? 'bg-green-100 border-green-300 focus:ring-green-500' :
                          'bg-gray-100 border-gray-300 focus:ring-gray-500'
                        }`}
                      >
                        {statuses.map(status => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="priority" className="sr-only">Priority</label>
                      <select
                        id="priority"
                        value={selectedFeedback.priority}
                        onChange={(e) => handlePriorityChange(selectedFeedback.id, e.target.value)}
                        className={`block pl-3 pr-8 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                          selectedFeedback.priority === 'low' ? 'bg-green-100 border-green-300 focus:ring-green-500' :
                          selectedFeedback.priority === 'medium' ? 'bg-blue-100 border-blue-300 focus:ring-blue-500' :
                          selectedFeedback.priority === 'high' ? 'bg-yellow-100 border-yellow-300 focus:ring-yellow-500' :
                          'bg-red-100 border-red-300 focus:ring-red-500'
                        }`}
                      >
                        {priorities.map(priority => (
                          <option key={priority} value={priority}>
                            {priority.charAt(0).toUpperCase() + priority.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Submitted:</span> {formatDate(selectedFeedback.createdAt)}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Last Updated:</span> {formatDate(selectedFeedback.lastUpdated)}
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 border-b border-gray-200 flex-grow overflow-y-auto">
                <div className="mb-6">
                  <p className="text-gray-900 whitespace-pre-line">{selectedFeedback.content}</p>
                  <div className="mt-2 flex items-center">
                    <button type="button" className="inline-flex items-center text-sm text-gray-500">
                      <svg className="h-5 w-5 mr-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                      {selectedFeedback.likes} Likes
                    </button>
                  </div>
                </div>
                
                {/* Replies */}
                {selectedFeedback.replies.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-base font-medium text-gray-900 mb-4">Replies</h3>
                    <ul className="space-y-4">
                      {selectedFeedback.replies.map(reply => (
                        <li key={reply.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-start">
                            <img src={reply.staff.avatar} alt={reply.staff.name} className="h-8 w-8 rounded-full mr-3" />
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <p className="text-sm font-medium text-gray-900">{reply.staff.name} <span className="font-normal text-gray-500">(Staff)</span></p>
                                <p className="text-xs text-gray-500">{formatDate(reply.createdAt)}</p>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{reply.content}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* Reply form */}
              <div className="p-6 bg-gray-50 rounded-b-lg">
                <form onSubmit={handleReplySubmit}>
                  <label htmlFor="reply" className="block text-sm font-medium text-gray-700 mb-2">
                    Reply to this feedback
                  </label>
                  <textarea
                    id="reply"
                    rows="3"
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Type your reply here..."
                  ></textarea>
                  <div className="mt-3 flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      disabled={!replyContent.trim()}
                    >
                      Send Reply
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center h-full flex items-center justify-center">
              <div>
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <h3 className="mt-2 text-base font-medium text-gray-900">Select feedback to view</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Click on a feedback item from the list to view details and respond.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserFeedbackPage; 