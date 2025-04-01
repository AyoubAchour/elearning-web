import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from './CourseCard';
import { fetchPopularCourses } from '../../services/api';

const PopularCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await fetchPopularCourses(8); // Get top 8 courses
        setCourses(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
        setError('Failed to load courses. Please try again later.');
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Map backend course data to CourseCard props
  const mapCourseData = (course) => {
    return {
      id: course._id,
      image: course.image || 'https://via.placeholder.com/300x200?text=No+Image',
      title: course.nom,
      lessons: course.modules?.length || 0,
      students: course.enrolledCount || 0,
      level: course.level || 'Beginner',
      rating: course.averageRating || 0
    };
  };

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-blue-900">Popular Course</h2>
        <Link to="/courses" className="text-blue-600 hover:text-blue-800">
          See all
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">{error}</div>
      ) : courses.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No courses available at the moment.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard 
              key={course._id}
              {...mapCourseData(course)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default PopularCourses;
