import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { isAuthenticated, getCurrentUser } from '../utils/auth';
import { extendedCoursesData } from '../data/extendedCoursesData';
import { getQuizResults, isCourseCompleted, generateCertificateId } from '../utils/quizUtils';

const CertificatePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [quizResults, setQuizResults] = useState(null);
  const [certificateId, setCertificateId] = useState('');
  const [user, setUser] = useState(null);
  const [completionDate, setCompletionDate] = useState('');

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      navigate('/login', { state: { from: `/courses/${courseId}/certificate` } });
      return;
    }

    // Get user data
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);

    // Load course data
    const foundCourse = extendedCoursesData.find(c => c.id === parseInt(courseId));
    if (!foundCourse) {
      navigate('/my-courses');
      return;
    }
    setCourse(foundCourse);
    
    // Check if course is completed
    if (!isCourseCompleted(courseId, foundCourse)) {
      navigate(`/courses/${courseId}/content`);
      return;
    }
    
    // Check if quiz is passed
    const results = getQuizResults(courseId);
    if (!results || !results.passed) {
      navigate(`/courses/${courseId}/quiz`);
      return;
    }
    
    setQuizResults(results);
    setCompletionDate(formatDate(results.timestamp));
    
    // Generate certificate ID if not already present
    if (results.certificateId) {
      setCertificateId(results.certificateId);
    } else {
      const newCertId = generateCertificateId(courseId, currentUser.id);
      setCertificateId(newCertId);
    }
    
    setLoading(false);
  }, [courseId, navigate]);

  const formatDate = (dateString) => {
    if (!dateString) return new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real implementation, this would generate a PDF
    alert('Certificate download functionality would be implemented here');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center pt-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-16 pb-12">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Certificate Actions */}
        <div className="flex justify-end space-x-4 mb-6 print:hidden">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Print Certificate
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Download PDF
          </button>
        </div>
        
        {/* Certificate */}
        <div className="bg-white border-8 border-blue-200 rounded-lg p-8 shadow-lg mx-auto max-w-3xl certificate-container">
          <div className="text-center">
            <div className="mb-6">
              <svg className="w-24 h-24 mx-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-serif text-gray-900 mb-2">Certificate of Completion</h1>
            <p className="text-gray-600 mb-8">This certifies that</p>
            
            <h2 className="text-2xl font-bold text-blue-800 border-b-2 border-blue-200 inline-block px-4 pb-1 mb-6">
              {user?.fullName || 'Student Name'}
            </h2>
            
            <p className="text-gray-600 mb-6">has successfully completed the course</p>
            
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              {course?.title}
            </h3>
            
            <div className="flex justify-center items-center space-x-12 mb-8">
              <div className="text-center">
                <p className="text-gray-500 text-sm">Completion Date</p>
                <p className="font-medium">{completionDate}</p>
              </div>
              
              <div className="text-center">
                <p className="text-gray-500 text-sm">Certificate ID</p>
                <p className="font-medium">{certificateId}</p>
              </div>
            </div>
            
            <div className="mb-8">
              <p className="text-gray-600">with a final score of</p>
              <div className="text-3xl font-bold text-blue-600 my-2">{quizResults?.score}%</div>
            </div>
            
            <div className="flex justify-around mt-12 mb-6">
              <div className="text-center">
                <div className="h-0.5 w-40 bg-gray-400 mb-2"></div>
                <p className="text-gray-600">Course Instructor</p>
                <p className="font-medium">{course?.instructor}</p>
              </div>
              
              <div className="text-center">
                <div className="h-0.5 w-40 bg-gray-400 mb-2"></div>
                <p className="text-gray-600">Platform Director</p>
                <p className="font-medium">Dr. Jane Smith</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center text-gray-500 text-sm">
            <p>This certificate verifies the completion of the online course on our platform.</p>
            <p className="mt-1">Verify at: example.com/verify/{certificateId}</p>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .certificate-container {
            border: 8px solid #dbeafe !important;
            padding: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CertificatePage; 