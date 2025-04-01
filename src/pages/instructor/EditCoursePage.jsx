import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditCoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Course data state
  const [courseData, setCourseData] = useState({
    title: '',
    category: '',
    price: '',
    level: '',
    description: '',
    outcomes: [''],
    requirements: [''],
    thumbnail: null,
    status: ''
  });
  
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [activeSection, setActiveSection] = useState('basic');
  const [errors, setErrors] = useState({});
  
  // Mock categories
  const categories = [
    { id: 'web-dev', name: 'Web Development' },
    { id: 'mobile-dev', name: 'Mobile Development' },
    { id: 'data-science', name: 'Data Science' },
    { id: 'design', name: 'Design' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'business', name: 'Business' },
  ];
  
  // Fetch course data (simulated)
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // In a real application, you would fetch the course data from your API
        // For now, we'll simulate a delay and return mock data
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Find the course in our sample data
        let mockCourse = {
          id: parseInt(courseId),
          title: 'React Fundamentals',
          category: 'web-dev',
          price: '49.99',
          level: 'beginner',
          description: 'A comprehensive introduction to React including hooks, state management, and component architecture.',
          outcomes: [
            'Build modern, responsive applications with React',
            'Understand React Hooks and functional components',
            'Master state management techniques',
            'Create reusable, maintainable components'
          ],
          requirements: [
            'Basic HTML, CSS, and JavaScript knowledge',
            'Understanding of ES6+ features'
          ],
          thumbnailUrl: 'https://via.placeholder.com/400x300?text=React+Course',
          status: 'active'
        };
        
        if (courseId === '2') {
          mockCourse = {
            id: 2,
            title: 'Advanced JavaScript',
            category: 'web-dev',
            price: '59.99',
            level: 'intermediate',
            description: 'Dive deep into JavaScript with advanced concepts like closures, prototypes, and async programming.',
            outcomes: [
              'Master advanced JavaScript patterns and techniques',
              'Understand the JavaScript runtime and event loop',
              'Learn effective asynchronous programming',
              'Implement advanced design patterns'
            ],
            requirements: [
              'Solid understanding of JavaScript fundamentals',
              'Experience with web development'
            ],
            thumbnailUrl: 'https://via.placeholder.com/400x300?text=JavaScript+Course',
            status: 'active'
          };
        }
        
        // Update our state with the fetched data
        setCourseData({
          title: mockCourse.title,
          category: mockCourse.category,
          price: mockCourse.price,
          level: mockCourse.level,
          description: mockCourse.description,
          outcomes: mockCourse.outcomes,
          requirements: mockCourse.requirements,
          thumbnail: null, // We don't have the actual file, just the URL
          thumbnailUrl: mockCourse.thumbnailUrl,
          status: mockCourse.status
        });
        
        setThumbnailPreview(mockCourse.thumbnailUrl);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching course data:', error);
        setErrors({ general: 'Failed to load course data. Please try again.' });
        setIsLoading(false);
      }
    };
    
    fetchCourseData();
  }, [courseId]);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value
    });
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  // Handle array fields (outcomes and requirements)
  const handleArrayChange = (index, field, value) => {
    const newArray = [...courseData[field]];
    newArray[index] = value;
    
    setCourseData({
      ...courseData,
      [field]: newArray
    });
  };
  
  // Add new item to array fields
  const handleAddItem = (field) => {
    setCourseData({
      ...courseData,
      [field]: [...courseData[field], '']
    });
  };
  
  // Remove item from array fields
  const handleRemoveItem = (field, index) => {
    const newArray = [...courseData[field]];
    newArray.splice(index, 1);
    
    setCourseData({
      ...courseData,
      [field]: newArray
    });
  };
  
  // Handle file inputs
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    
    if (files && files[0]) {
      setCourseData({
        ...courseData,
        [name]: files[0]
      });
      
      // For thumbnail, show preview
      if (name === 'thumbnail') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setThumbnailPreview(reader.result);
        };
        reader.readAsDataURL(files[0]);
      }
      
      // Clear error for this field
      if (errors[name]) {
        setErrors({
          ...errors,
          [name]: null
        });
      }
    }
  };
  
  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    
    if (!courseData.title.trim()) {
      newErrors.title = 'Course title is required';
    }
    
    if (!courseData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!courseData.price.trim()) {
      newErrors.price = 'Price is required';
    } else if (isNaN(parseFloat(courseData.price))) {
      newErrors.price = 'Price must be a valid number';
    }
    
    if (!courseData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    // Check if at least one non-empty outcome exists
    const validOutcomes = courseData.outcomes.filter(item => item.trim() !== '');
    if (validOutcomes.length === 0) {
      newErrors.outcomes = 'At least one learning outcome is required';
    }
    
    // Check if at least one non-empty requirement exists
    const validRequirements = courseData.requirements.filter(item => item.trim() !== '');
    if (validRequirements.length === 0) {
      newErrors.requirements = 'At least one requirement is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to the first error
      const firstError = Object.keys(errors)[0];
      const element = document.getElementById(firstError);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you would submit the form data to your API here
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to the courses page
      navigate('/instructor/courses');
    } catch (error) {
      console.error('Error updating course:', error);
      setErrors({
        ...errors,
        submit: 'Failed to update course. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  return (
    <div className="pb-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Course</h1>
        <p className="text-gray-600">Update your course details</p>
      </div>
      
      {/* Navigation Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <button
              className={`inline-block py-4 px-4 text-sm font-medium ${
                activeSection === 'basic'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
              }`}
              onClick={() => setActiveSection('basic')}
            >
              Basic Information
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block py-4 px-4 text-sm font-medium ${
                activeSection === 'details'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
              }`}
              onClick={() => setActiveSection('details')}
            >
              Course Details
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block py-4 px-4 text-sm font-medium ${
                activeSection === 'media'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
              }`}
              onClick={() => setActiveSection('media')}
            >
              Media
            </button>
          </li>
        </ul>
      </div>
      
      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Basic Information Section */}
        <div className={activeSection === 'basic' ? 'block' : 'hidden'}>
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Course Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={courseData.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="e.g., Complete Web Development Bootcamp"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={courseData.category}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white`}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-500">{errors.category}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price ($) *
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={courseData.price}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="e.g., 49.99"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-500">{errors.price}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty Level
              </label>
              <select
                id="level"
                name="level"
                value={courseData.level}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="all-levels">All Levels</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={courseData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="draft">Draft</option>
                <option value="active">Published</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Course Details Section */}
        <div className={activeSection === 'details' ? 'block' : 'hidden'}>
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">Course Details</h2>
            
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={courseData.description}
                onChange={handleChange}
                rows="5"
                className={`w-full px-3 py-2 border ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="Provide a detailed description of your course"
              ></textarea>
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What students will learn *
              </label>
              {courseData.outcomes.map((outcome, index) => (
                <div key={`outcome-${index}`} className="flex mb-2">
                  <input
                    type="text"
                    value={outcome}
                    onChange={(e) => handleArrayChange(index, 'outcomes', e.target.value)}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., Build a responsive website using HTML, CSS, and JavaScript"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('outcomes', index)}
                    className="ml-2 px-3 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100"
                    disabled={courseData.outcomes.length === 1}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
              {errors.outcomes && (
                <p className="mt-1 text-sm text-red-500">{errors.outcomes}</p>
              )}
              <button
                type="button"
                onClick={() => handleAddItem('outcomes')}
                className="mt-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Learning Outcome
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Requirements *
              </label>
              {courseData.requirements.map((requirement, index) => (
                <div key={`requirement-${index}`} className="flex mb-2">
                  <input
                    type="text"
                    value={requirement}
                    onChange={(e) => handleArrayChange(index, 'requirements', e.target.value)}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., Basic knowledge of HTML and CSS"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('requirements', index)}
                    className="ml-2 px-3 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100"
                    disabled={courseData.requirements.length === 1}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
              {errors.requirements && (
                <p className="mt-1 text-sm text-red-500">{errors.requirements}</p>
              )}
              <button
                type="button"
                onClick={() => handleAddItem('requirements')}
                className="mt-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Requirement
              </button>
            </div>
          </div>
        </div>
        
        {/* Media Section */}
        <div className={activeSection === 'media' ? 'block' : 'hidden'}>
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">Media</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Thumbnail {courseData.thumbnailUrl ? '(Current)' : '*'}
              </label>
              
              {thumbnailPreview && (
                <div className="mb-3">
                  <img
                    src={thumbnailPreview}
                    alt="Course thumbnail preview"
                    className="w-full max-w-md rounded-lg border border-gray-300"
                  />
                </div>
              )}
              
              <div className="mt-2">
                <label className="block w-full px-4 py-2 border border-gray-300 rounded-md cursor-pointer bg-white hover:bg-gray-50 text-center">
                  <span className="text-indigo-600">Choose a new thumbnail</span>
                  <input
                    type="file"
                    name="thumbnail"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <p className="mt-1 text-sm text-gray-500">
                  Recommended size: 1280 x 720 pixels (16:9 ratio)
                </p>
              </div>
              {errors.thumbnail && (
                <p className="mt-1 text-sm text-red-500">{errors.thumbnail}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Form actions */}
        <div className="flex justify-between space-x-4">
          <button
            type="button"
            onClick={() => navigate('/instructor/courses')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          
          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>
        
        {/* General error message */}
        {errors.general && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
            {errors.general}
          </div>
        )}
        {errors.submit && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
            {errors.submit}
          </div>
        )}
      </form>
    </div>
  );
};

export default EditCoursePage; 