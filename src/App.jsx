import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/layout/AdminLayout';
import InstructorLayout from './components/layout/InstructorLayout';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import SubscribePage from './pages/SubscribePage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import LogoutPage from './pages/LogoutPage';
import CourseContentPage from './pages/CourseContentPage';
import EnrollmentSuccessPage from './pages/EnrollmentSuccessPage';
import MyCoursesPage from './pages/MyCoursesPage';
import PrivateRoute from './components/common/PrivateRoute';
import QuizPage from './pages/QuizPage';
import CertificatePage from './pages/CertificatePage';
import ApplyInstructorPage from './pages/ApplyInstructorPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminRoute from './components/common/AdminRoute';
import InstructorRoute from './components/common/InstructorRoute';
import InstructorApplicationsPage from './pages/admin/InstructorApplicationsPage';
import SubscriptionsPage from './pages/admin/SubscriptionsPage';
import StatisticsPage from './pages/admin/StatisticsPage';
import CourseReviewPage from './pages/admin/CourseReviewPage';
import CategoryManagementPage from './pages/admin/CategoryManagementPage';
import UserFeedbackPage from './pages/admin/UserFeedbackPage';
import UserManagementPage from './pages/admin/UserManagementPage';

// Instructor Pages
import InstructorDashboardPage from './pages/instructor/InstructorDashboardPage';
import InstructorCoursesPage from './pages/instructor/MyCoursesPage';
import CreateCoursePage from './pages/instructor/CreateCoursePage';
import EditCoursePage from './pages/instructor/EditCoursePage';
import CourseAnalyticsPage from './pages/instructor/CourseAnalyticsPage';
import StudentsPage from './pages/instructor/StudentsPage';
import DiscussionsPage from './pages/instructor/DiscussionsPage';
import CreateAnnouncementPage from './pages/instructor/CreateAnnouncementPage';
import AnalyticsPage from './pages/instructor/AnalyticsPage';
import EarningsPage from './pages/instructor/EarningsPage';
import SettingsPage from './pages/instructor/SettingsPage';
import CourseQuizzesPage from './pages/instructor/CourseQuizzesPage';
import CreateQuizPage from './pages/instructor/CreateQuizPage';
import QuizResultsPage from './pages/instructor/QuizResultsPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication routes without MainLayout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        
        {/* Admin routes with AdminLayout */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="instructor-applications" element={<InstructorApplicationsPage />} />
            <Route path="subscriptions" element={<SubscriptionsPage />} />
            <Route path="statistics" element={<StatisticsPage />} />
            <Route path="course-review" element={<CourseReviewPage />} />
            <Route path="categories" element={<CategoryManagementPage />} />
            <Route path="feedback" element={<UserFeedbackPage />} />
            <Route path="users" element={<UserManagementPage />} />
          </Route>
        </Route>
        
        {/* Instructor routes with InstructorLayout */}
        <Route element={<InstructorRoute />}>
          <Route path="/instructor" element={<InstructorLayout />}>
            <Route index element={<InstructorDashboardPage />} />
            <Route path="courses" element={<InstructorCoursesPage />} />
            <Route path="courses/create" element={<CreateCoursePage />} />
            <Route path="courses/:courseId" element={<EditCoursePage />} />
            <Route path="courses/:courseId/content" element={<div>Course Content Editor</div>} />
            <Route path="courses/:courseId/analytics" element={<CourseAnalyticsPage />} />
            <Route path="students" element={<StudentsPage />} />
            <Route path="discussions" element={<DiscussionsPage />} />
            <Route path="discussions/announcement" element={<CreateAnnouncementPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="earnings" element={<EarningsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="quizzes" element={<CourseQuizzesPage />} />
            <Route path="quizzes/create" element={<CreateQuizPage />} />
            <Route path="quizzes/:quizId/edit" element={<CreateQuizPage />} />
            <Route path="quizzes/:quizId/results" element={<QuizResultsPage />} />
          </Route>
        </Route>
        
        {/* Main application routes with MainLayout */}
        <Route path="/" element={<MainLayout />}>
          {/* Public routes */}
          <Route index element={<HomePage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/:courseId" element={<CourseDetailsPage />} />
          <Route path="subscribe" element={<SubscribePage />} />
          
          {/* Protected routes */}
          <Route element={<PrivateRoute />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="my-courses" element={<MyCoursesPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="payment-success" element={<PaymentSuccessPage />} />
            <Route path="enrollment-success" element={<EnrollmentSuccessPage />} />
            <Route path="courses/:courseId/content" element={<CourseContentPage />} />
            <Route path="courses/:courseId/quiz" element={<QuizPage />} />
            <Route path="courses/:courseId/certificate" element={<CertificatePage />} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<div>Page not found</div>} />
        </Route>
        <Route path="/apply-instructor" element={<ApplyInstructorPage />} />
      </Routes>
    </Router>
  );
}

export default App;