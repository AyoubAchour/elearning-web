import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CourseAnalyticsPage = () => {
  const { courseId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [courseData, setCourseData] = useState(null);
  const [timeRange, setTimeRange] = useState('30days');
  const [analyticsData, setAnalyticsData] = useState(null);
  
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // In a real app, you would fetch from an API
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock course data based on courseId
        const mockCourse = {
          id: parseInt(courseId),
          title: courseId === '1' ? 'React Fundamentals' : 
                 courseId === '2' ? 'Advanced JavaScript' : 
                 courseId === '3' ? 'Python for Beginners' : 
                 'Data Science with Python',
          studentsEnrolled: courseId === '1' ? 64 : 
                            courseId === '2' ? 42 : 
                            courseId === '3' ? 50 : 0,
          completionRate: courseId === '1' ? 78 : 
                          courseId === '2' ? 65 : 
                          courseId === '3' ? 82 : 0,
          rating: courseId === '1' ? 4.8 : 
                  courseId === '2' ? 4.7 : 
                  courseId === '3' ? 4.6 : 0,
          revenue: courseId === '1' ? 1280 : 
                   courseId === '2' ? 840 : 
                   courseId === '3' ? 1000 : 0,
          thumbnail: `https://via.placeholder.com/150x100?text=${courseId === '1' ? 'React' : 
                                                               courseId === '2' ? 'JS' : 
                                                               courseId === '3' ? 'Python' : 'DataSci'}`,
          // Analytics specific data
          enrollmentsByDay: [
            // Last 30 days of enrollment data (simulated)
            ...Array(30).fill().map((_, i) => ({
              date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
              count: Math.floor(Math.random() * 5)  // 0-4 enrollments per day
            }))
          ],
          revenueByDay: [
            // Last 30 days of revenue data (simulated)
            ...Array(30).fill().map((_, i) => ({
              date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
              amount: Math.floor(Math.random() * 100)  // $0-$99 revenue per day
            }))
          ],
          lessonCompletions: [
            { lesson: 'Introduction', completions: courseId === '1' ? 62 : courseId === '2' ? 40 : courseId === '3' ? 48 : 0 },
            { lesson: 'Basic Concepts', completions: courseId === '1' ? 58 : courseId === '2' ? 38 : courseId === '3' ? 45 : 0 },
            { lesson: 'Intermediate Concepts', completions: courseId === '1' ? 54 : courseId === '2' ? 35 : courseId === '3' ? 42 : 0 },
            { lesson: 'Advanced Topics', completions: courseId === '1' ? 50 : courseId === '2' ? 32 : courseId === '3' ? 40 : 0 },
            { lesson: 'Project Work', completions: courseId === '1' ? 45 : courseId === '2' ? 28 : courseId === '3' ? 38 : 0 },
            { lesson: 'Final Assessment', completions: courseId === '1' ? 42 : courseId === '2' ? 25 : courseId === '3' ? 35 : 0 }
          ],
          studentsByCountry: [
            { country: 'United States', count: courseId === '1' ? 25 : courseId === '2' ? 18 : courseId === '3' ? 20 : 0 },
            { country: 'India', count: courseId === '1' ? 12 : courseId === '2' ? 8 : courseId === '3' ? 10 : 0 },
            { country: 'United Kingdom', count: courseId === '1' ? 8 : courseId === '2' ? 5 : courseId === '3' ? 7 : 0 },
            { country: 'Canada', count: courseId === '1' ? 6 : courseId === '2' ? 4 : courseId === '3' ? 5 : 0 },
            { country: 'Germany', count: courseId === '1' ? 5 : courseId === '2' ? 3 : courseId === '3' ? 4 : 0 },
            { country: 'Other', count: courseId === '1' ? 8 : courseId === '2' ? 4 : courseId === '3' ? 4 : 0 }
          ],
          ratingDistribution: {
            5: courseId === '1' ? 42 : courseId === '2' ? 25 : courseId === '3' ? 30 : 0,
            4: courseId === '1' ? 18 : courseId === '2' ? 12 : courseId === '3' ? 15 : 0,
            3: courseId === '1' ? 3 : courseId === '2' ? 4 : courseId === '3' ? 3 : 0,
            2: courseId === '1' ? 1 : courseId === '2' ? 1 : courseId === '3' ? 2 : 0,
            1: courseId === '1' ? 0 : courseId === '2' ? 0 : courseId === '3' ? 0 : 0
          }
        };
        
        setCourseData(mockCourse);
        
        // Calculate derived analytics data
        const totalEnrollments = mockCourse.enrollmentsByDay.reduce((sum, day) => sum + day.count, 0);
        const totalRevenue = mockCourse.revenueByDay.reduce((sum, day) => sum + day.amount, 0);
        
        // Last 7 days data
        const last7DaysEnrollments = mockCourse.enrollmentsByDay.slice(-7).reduce((sum, day) => sum + day.count, 0);
        const last7DaysRevenue = mockCourse.revenueByDay.slice(-7).reduce((sum, day) => sum + day.amount, 0);
        
        setAnalyticsData({
          totalEnrollments,
          totalRevenue,
          last7DaysEnrollments,
          last7DaysRevenue,
          averageRating: mockCourse.rating
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching course data:', error);
        setIsLoading(false);
      }
    };
    
    fetchCourseData();
  }, [courseId]);
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Course Analytics</h1>
          <p className="text-gray-600">Performance insights for {courseData.title}</p>
        </div>
        <Link 
          to="/instructor/courses" 
          className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Back to Courses
        </Link>
      </div>
      
      {/* Filter Controls */}
      <div className="mb-6">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              timeRange === '7days' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-300`}
            onClick={() => setTimeRange('7days')}
          >
            7 Days
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium ${
              timeRange === '30days' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
            } border-t border-b border-gray-300`}
            onClick={() => setTimeRange('30days')}
          >
            30 Days
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium ${
              timeRange === '90days' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
            } border-t border-b border-gray-300`}
            onClick={() => setTimeRange('90days')}
          >
            90 Days
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              timeRange === 'all' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-300`}
            onClick={() => setTimeRange('all')}
          >
            All Time
          </button>
        </div>
      </div>
      
      {/* Course Summary */}
      <div className="mb-8 bg-white rounded-xl shadow overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-6">
            <img 
              src={courseData.thumbnail} 
              alt={courseData.title} 
              className="w-32 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{courseData.title}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">{courseData.studentsEnrolled}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Completion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{courseData.completionRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Average Rating</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-gray-900 mr-1">{courseData.rating}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(courseData.revenue)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts and Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Enrollments Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Student Enrollments</h3>
          
          <div className="h-64 flex items-center justify-center">
            {/* Simple chart visualization using bars */}
            <div className="w-full h-48 flex items-end justify-between px-4">
              {courseData.enrollmentsByDay.slice(-7).map((day, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="w-8 bg-indigo-500 rounded-t" 
                    style={{ height: `${day.count ? (day.count / 5) * 100 : 0}%`, minHeight: day.count ? '8px' : '0' }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-1">{day.date.slice(-2)}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center text-sm text-gray-500 pt-4 border-t">
            <span>Last 7 days: {analyticsData.last7DaysEnrollments} new students</span>
            <span>Total: {courseData.studentsEnrolled} students</span>
          </div>
        </div>
        
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue</h3>
          
          <div className="h-64 flex items-center justify-center">
            {/* Simple chart visualization using bars */}
            <div className="w-full h-48 flex items-end justify-between px-4">
              {courseData.revenueByDay.slice(-7).map((day, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="w-8 bg-green-500 rounded-t" 
                    style={{ height: `${day.amount ? (day.amount / 100) * 100 : 0}%`, minHeight: day.amount ? '8px' : '0' }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-1">{day.date.slice(-2)}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center text-sm text-gray-500 pt-4 border-t">
            <span>Last 7 days: {formatCurrency(analyticsData.last7DaysRevenue)}</span>
            <span>Total: {formatCurrency(courseData.revenue)}</span>
          </div>
        </div>
      </div>
      
      {/* Student Engagement and Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Lesson Completions */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Lesson Completion Rates</h3>
          
          <div className="space-y-3">
            {courseData.lessonCompletions.map((lesson, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{lesson.lesson}</span>
                  <span className="text-gray-500">
                    {lesson.completions} / {courseData.studentsEnrolled} students
                    ({Math.round((lesson.completions / courseData.studentsEnrolled) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-indigo-600 h-2.5 rounded-full" 
                    style={{ width: `${(lesson.completions / courseData.studentsEnrolled) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Student Demographics */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Student Demographics</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Top Countries</h4>
              <div className="space-y-2">
                {courseData.studentsByCountry.map((country, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-36 font-medium text-sm">{country.country}</div>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(country.count / courseData.studentsEnrolled) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-16 text-right text-sm text-gray-500">{country.count} ({Math.round((country.count / courseData.studentsEnrolled) * 100)}%)</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Rating Distribution</h4>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = courseData.ratingDistribution[rating];
                  const totalRatings = Object.values(courseData.ratingDistribution).reduce((a, b) => a + b, 0);
                  const percentage = totalRatings > 0 ? Math.round((count / totalRatings) * 100) : 0;
                  
                  return (
                    <div key={rating} className="flex items-center">
                      <div className="w-6 text-sm font-medium">{rating}</div>
                      <div className="flex items-center w-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <div className="flex-1 ml-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${rating >= 4 ? 'bg-green-500' : rating === 3 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-16 text-right text-sm text-gray-500">{count} ({percentage}%)</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Improve Your Course</h3>
          <p className="text-gray-600 mb-4">Based on analytics, consider updating lesson content to increase completion rates.</p>
          <Link 
            to={`/instructor/courses/${courseId}`}
            className="text-indigo-600 font-medium hover:text-indigo-700 inline-flex items-center"
          >
            Edit Course
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">View Student Feedback</h3>
          <p className="text-gray-600 mb-4">Read student reviews and comments to understand their experience better.</p>
          <button 
            className="text-indigo-600 font-medium hover:text-indigo-700 inline-flex items-center"
          >
            View Reviews
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Download Reports</h3>
          <p className="text-gray-600 mb-4">Export detailed analytics reports for offline analysis.</p>
          <button 
            className="text-indigo-600 font-medium hover:text-indigo-700 inline-flex items-center"
          >
            Export Data
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseAnalyticsPage; 