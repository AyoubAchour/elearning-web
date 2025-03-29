import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
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

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication routes without MainLayout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        
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
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<div>Page not found</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;