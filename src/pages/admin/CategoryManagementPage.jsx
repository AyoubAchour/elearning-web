import React, { useState } from 'react';

const CategoryManagementPage = () => {
  // Sample categories data
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Web Development',
      slug: 'web-development',
      description: 'Learn web development technologies including HTML, CSS, JavaScript, React, Angular, Vue, and backend technologies.',
      courseCount: 42,
      isActive: true,
      icon: '🌐',
      createdAt: '2023-01-10'
    },
    {
      id: 2,
      name: 'Data Science',
      slug: 'data-science',
      description: 'Explore data analysis, machine learning, statistics, and visualization techniques for making data-driven decisions.',
      courseCount: 28,
      isActive: true,
      icon: '📊',
      createdAt: '2023-01-15'
    },
    {
      id: 3,
      name: 'UI/UX Design',
      slug: 'ui-ux-design',
      description: 'Master user interface and user experience design principles to create engaging digital products.',
      courseCount: 22,
      isActive: true,
      icon: '🎨',
      createdAt: '2023-01-20'
    },
    {
      id: 4,
      name: 'Mobile Development',
      slug: 'mobile-development',
      description: 'Build native and cross-platform mobile applications for iOS and Android platforms.',
      courseCount: 18,
      isActive: true,
      icon: '📱',
      createdAt: '2023-01-25'
    },
    {
      id: 5,
      name: 'Cloud Computing',
      slug: 'cloud-computing',
      description: 'Learn about cloud infrastructure, services, and deployment models from leading providers.',
      courseCount: 15,
      isActive: false,
      icon: '☁️',
      createdAt: '2023-02-01'
    }
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    isActive: true,
    icon: ''
  });
  const [errors, setErrors] = useState({});
  const [isAddMode, setIsAddMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const icons = ['🌐', '📊', '🎨', '📱', '☁️', '🔐', '🤖', '📈', '📷', '🎮', '🎬', '📚'];

  const openEditModal = (category) => {
    setIsAddMode(false);
    setSelectedCategory(category);
    setCategoryForm({
      name: category.name,
      description: category.description,
      isActive: category.isActive,
      icon: category.icon
    });
    setIsEditModalOpen(true);
    setErrors({});
  };

  const openAddModal = () => {
    setIsAddMode(true);
    setSelectedCategory(null);
    setCategoryForm({
      name: '',
      description: '',
      isActive: true,
      icon: '🌐'
    });
    setIsEditModalOpen(true);
    setErrors({});
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedCategory(null);
  };

  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedCategory(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCategoryForm({
      ...categoryForm,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleIconSelect = (icon) => {
    setCategoryForm({
      ...categoryForm,
      icon
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!categoryForm.name.trim()) {
      newErrors.name = 'Category name is required';
    }
    
    if (!categoryForm.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (categoryForm.description.length > 200) {
      newErrors.description = 'Description must be 200 characters or less';
    }
    
    if (!categoryForm.icon) {
      newErrors.icon = 'Please select an icon';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createSlug = (name) => {
    return name.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const saveCategory = () => {
    if (!validateForm()) {
      return;
    }
    
    if (isAddMode) {
      // Create new category
      const newCategory = {
        id: Math.max(...categories.map(c => c.id), 0) + 1,
        name: categoryForm.name,
        slug: createSlug(categoryForm.name),
        description: categoryForm.description,
        isActive: categoryForm.isActive,
        icon: categoryForm.icon,
        courseCount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setCategories([...categories, newCategory]);
    } else {
      // Update existing category
      const updatedCategories = categories.map(category => 
        category.id === selectedCategory.id ? {
          ...category,
          name: categoryForm.name,
          description: categoryForm.description,
          isActive: categoryForm.isActive,
          icon: categoryForm.icon,
          slug: categoryForm.name !== selectedCategory.name ? createSlug(categoryForm.name) : category.slug
        } : category
      );
      
      setCategories(updatedCategories);
    }
    
    closeEditModal();
  };

  const deleteCategory = () => {
    // In a real app, you might want to check if there are courses in this category
    // and handle that case (archive instead of delete, move courses, etc.)
    const updatedCategories = categories.filter(category => category.id !== selectedCategory.id);
    setCategories(updatedCategories);
    closeDeleteModal();
  };

  const toggleCategoryStatus = (categoryId) => {
    const updatedCategories = categories.map(category => 
      category.id === categoryId ? { ...category, isActive: !category.isActive } : category
    );
    setCategories(updatedCategories);
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Category Management</h1>
          <p className="text-gray-600">Create, edit and manage course categories</p>
        </div>
        <button
          onClick={openAddModal}
          className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Category
        </button>
      </div>

      {/* Search and filters */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Categories grid */}
      {filteredCategories.length > 0 ? (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Courses
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
              {filteredCategories.map((category) => (
                <tr key={category.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
                        <span className="text-xl">{category.icon}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{category.name}</div>
                        <div className="text-sm text-gray-500">{category.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-md truncate">{category.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{category.courseCount} courses</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {category.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => toggleCategoryStatus(category.id)}
                      className={`mr-2 ${
                        category.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                      }`}
                    >
                      {category.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => openEditModal(category)}
                      className="text-blue-600 hover:text-blue-900 mr-2"
                    >
                      Edit
                    </button>
                    {category.courseCount === 0 && (
                      <button
                        onClick={() => openDeleteModal(category)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600">No categories found matching your search.</p>
        </div>
      )}

      {/* Edit/Add Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white rounded-lg max-w-md w-full mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{isAddMode ? 'Add New Category' : 'Edit Category'}</h2>
              <button onClick={closeEditModal} className="text-gray-400 hover:text-gray-500">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={categoryForm.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="3"
                  value={categoryForm.description}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                ></textarea>
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">{categoryForm.description.length}/200 characters</p>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Icon
                </label>
                <div className="grid grid-cols-6 gap-2 mb-2">
                  {icons.map(icon => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => handleIconSelect(icon)}
                      className={`h-10 w-10 flex items-center justify-center text-xl rounded-md ${
                        categoryForm.icon === icon ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-100 border border-gray-300'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
                {errors.icon && (
                  <p className="mt-1 text-sm text-red-600">{errors.icon}</p>
                )}
              </div>
              
              <div className="mb-6 flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={categoryForm.isActive}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                  Active Category
                </label>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveCategory}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {isAddMode ? 'Create Category' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedCategory && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white rounded-lg max-w-md w-full mx-4 p-6">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900">Delete Category</h2>
            </div>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete the category "{selectedCategory.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={deleteCategory}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagementPage; 