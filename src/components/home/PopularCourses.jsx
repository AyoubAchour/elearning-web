import React from 'react';
import figmaCourse from '../../assets/images/figma-course.png';
import pythonCourse from '../../assets/images/python-course.png';
import guitarCourse from '../../assets/images/guitar-course.png';
import flutterCourse from '../../assets/images/flutter-course.png';
import ionicCourse from '../../assets/images/ionic-course.png';
import sportsCourse from '../../assets/images/sports-course.png';
import marketingCourse from '../../assets/images/marketing-course.png';
import productCourse from '../../assets/images/product-course.png';
import CourseCard from './CourseCard';

const PopularCourses = () => {
  const courses = [
    {
      image: figmaCourse,
      title: "Learn Figma - UI/UX Design Essential Training",
      lessons: 6,
      students: 198,
      level: "Beginner",
      rating: 4
    },
    {
      image: pythonCourse,
      title: "Python For Beginners - Learn Programming",
      lessons: 21,
      students: 99,
      level: "Advanced",
      rating: 3
    },
    {
      image: guitarCourse,
      title: "Acoustic Guitar And Electric Guitar Started",
      lessons: 8,
      students: 301,
      level: "Average",
      rating: 5
    },
    {
      image: flutterCourse,
      title: "Mobile App Development With Flutter & Dart",
      lessons: 15,
      students: 215,
      level: "Beginner",
      rating: 2
    },
    {
      image: ionicCourse,
      title: "Ionic React: Mobile Development With Ionic",
      lessons: 15,
      students: 67,
      level: "Advanced",
      rating: 5
    },
    {
      image: sportsCourse,
      title: "Sports Management: The Essentials Course",
      lessons: 26,
      students: 156,
      level: "Average",
      rating: 1
    },
    {
      image: marketingCourse,
      title: "How To Market Yourself As A Consultant",
      lessons: 33,
      students: 64,
      level: "Beginner",
      rating: 3
    },
    {
      image: productCourse,
      title: "Become A Product Manager | Learn The Skills",
      lessons: 5,
      students: 134,
      level: "Advanced",
      rating: 4
    }
  ];

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-blue-900">Popular Course</h2>
        <a href="/courses" className="text-blue-600 hover:text-blue-800">See all</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </section>
  );
};

export default PopularCourses;
