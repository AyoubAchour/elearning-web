import React, { useState, useEffect, useMemo } from 'react';
import SearchBar from '../components/courses/SearchBar';
import CourseCard from '../components/home/CourseCard';
import { searchCourses, fetchCategories } from '../services/api';
import { debounce } from 'lodash';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryList, setCategoryList] = useState(['All']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
        
        // Create categories list including "All"
        const categoryNames = ['All', ...categoriesData.map(cat => cat.titre)];
        setCategoryList(categoryNames);
        
        // Initial search without parameters
        const coursesData = await searchCourses();
        setCourses(coursesData);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get category ID from category name
  const getCategoryId = (categoryName) => {
    if (categoryName === 'All') return null;
    const category = categories.find(cat => cat.titre === categoryName);
    return category ? category._id : null;
  };

  // Get category name from category ID
  const getCategoryName = (categoryId) => {
    if (!categoryId) return 'Uncategorized';
    
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.titre : 'Uncategorized';
  };

  // Debounced search function
  const debouncedSearch = useMemo(
    () => debounce(async (query, category) => {
      try {
        setLoading(true);
        const categoryId = getCategoryId(category);
        const results = await searchCourses(query, categoryId);
        setCourses(results);
        setError(null);
      } catch (err) {
        console.error('Error searching courses:', err);
        setError('Failed to search courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    }, 500),
    [categories]
  );

  // Handle search input change
  const handleSearchChange = (value) => {
    setSearchQuery(value);
    debouncedSearch(value, selectedCategory);
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    debouncedSearch(searchQuery, category);
  };

  // Map courses to CourseCard format
  const mappedCourses = useMemo(() => {
    return courses.map(course => ({
      id: course._id,
      image: course.image || 'https://via.placeholder.com/300x200?text=No+Image',
      title: course.nom,
      lessons: course.modules?.length || 0,
      students: course.enrolledCount || 0,
      level: course.level || 'Beginner',
      rating: course.averageRating || 0,
      category: getCategoryName(course.categorieId)
    }));
  }, [courses, categories]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Section */}
      <SearchBar 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get choice of your courses
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Browse through our extensive collection of high-quality courses
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <p className="text-red-500 text-xl mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {categoryList.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-8 py-3 rounded-full transition-all duration-200 text-base font-medium shadow-sm hover:shadow ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-blue-100'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Results Count */}
            <div className="mb-8 text-gray-600">
              <p className="text-lg">
                Showing {mappedCourses.length} {mappedCourses.length === 1 ? 'course' : 'courses'}
                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {mappedCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  {...course}
                />
              ))}
            </div>

            {/* No Results Message */}
            {mappedCourses.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-600 text-xl mb-4">
                  No courses found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    debouncedSearch('', 'All');
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CoursesPage; 