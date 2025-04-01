import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CreateCoursePage = () => {
  const navigate = useNavigate();
  
  const [courseData, setCourseData] = useState({
    title: '',
    category: '',
    price: '',
    level: 'beginner',
    description: '',
    outcomes: [''],
    requirements: [''],
    thumbnail: null,
    previewVideo: null
  });
  
  const [activeSection, setActiveSection] = useState('basic');
  const [errors, setErrors] = useState({});
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
    
    if (!courseData.thumbnail) {
      newErrors.thumbnail = 'Course thumbnail is required';
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to the course content editor
      navigate('/instructor/courses/draft/content');
    } catch (error) {
      console.error('Error creating course:', error);
      setErrors({
        ...errors,
        submit: 'Failed to create course. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="pb-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Course</h1>
        <p className="text-gray-600">Fill in the details to create your new course</p>
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
                <option value="web-development">Web Development</option>
                <option value="mobile-development">Mobile Development</option>
                <option value="data-science">Data Science</option>
                <option value="programming">Programming</option>
                <option value="design">Design</option>
                <option value="business">Business</option>
                <option value="marketing">Marketing</option>
                <option value="other">Other</option>
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-500">{errors.category}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  Course Level
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
                rows={5}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What Students Will Learn *
              </label>
              {courseData.outcomes.map((outcome, index) => (
                <div key={`outcome-${index}`} className="flex mb-2">
                  <input
                    type="text"
                    value={outcome}
                    onChange={(e) => handleArrayChange(index, 'outcomes', e.target.value)}
                    className={`w-full px-3 py-2 border ${
                      errors.outcomes && !outcome.trim() ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    placeholder={`Learning outcome ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('outcomes', index)}
                    className="ml-2 p-2 text-red-600 hover:text-red-800"
                    disabled={courseData.outcomes.length === 1}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddItem('outcomes')}
                className="mt-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Learning Outcome
              </button>
              {errors.outcomes && (
                <p className="mt-1 text-sm text-red-500">{errors.outcomes}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Requirements *
              </label>
              {courseData.requirements.map((requirement, index) => (
                <div key={`requirement-${index}`} className="flex mb-2">
                  <input
                    type="text"
                    value={requirement}
                    onChange={(e) => handleArrayChange(index, 'requirements', e.target.value)}
                    className={`w-full px-3 py-2 border ${
                      errors.requirements && !requirement.trim() ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    placeholder={`Requirement ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('requirements', index)}
                    className="ml-2 p-2 text-red-600 hover:text-red-800"
                    disabled={courseData.requirements.length === 1}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddItem('requirements')}
                className="mt-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Requirement
              </button>
              {errors.requirements && (
                <p className="mt-1 text-sm text-red-500">{errors.requirements}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Media Section */}
        <div className={activeSection === 'media' ? 'block' : 'hidden'}>
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">Media</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Thumbnail *
              </label>
              <div className="flex items-start">
                <div className="flex-1">
                  <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="thumbnail"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                        >
                          <span>Upload a file</span>
                          <input
                            id="thumbnail"
                            name="thumbnail"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 2MB
                      </p>
                    </div>
                  </div>
                  {errors.thumbnail && (
                    <p className="mt-1 text-sm text-red-500">{errors.thumbnail}</p>
                  )}
                </div>
                
                {thumbnailPreview && (
                  <div className="ml-4 flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preview Video (optional)
              </label>
              <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="previewVideo"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                    >
                      <span>Upload a video</span>
                      <input
                        id="previewVideo"
                        name="previewVideo"
                        type="file"
                        className="sr-only"
                        accept="video/*"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    MP4, WebM, Ogg up to 50MB
                  </p>
                </div>
              </div>
              {courseData.previewVideo && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {courseData.previewVideo.name}
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* Form Buttons */}
        <div className="flex justify-between">
          <Link
            to="/instructor/courses"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>
          
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => {
                if (activeSection === 'basic') {
                  setActiveSection('details');
                } else if (activeSection === 'details') {
                  setActiveSection('media');
                }
              }}
              className={`px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 ${
                activeSection === 'media' ? 'hidden' : ''
              }`}
            >
              Next
            </button>
            
            <button
              type="button"
              onClick={() => {
                if (activeSection === 'media') {
                  setActiveSection('details');
                } else if (activeSection === 'details') {
                  setActiveSection('basic');
                }
              }}
              className={`px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 ${
                activeSection === 'basic' ? 'hidden' : ''
              }`}
            >
              Previous
            </button>
            
            <button
              type="submit"
              className={`px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 ${
                activeSection !== 'media' ? 'hidden' : ''
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </span>
              ) : (
                'Create Course'
              )}
            </button>
          </div>
        </div>
        
        {errors.submit && (
          <p className="mt-4 text-sm text-red-500 text-center">{errors.submit}</p>
        )}
      </form>
    </div>
  );
};

export default CreateCoursePage; 