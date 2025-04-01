import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const InstructorRoute = () => {
  const location = useLocation();
  const { currentUser, isAuthenticated, loading } = useAuth();
  const userIsInstructor = currentUser?.role === 'instructor';

  // If auth is still loading, we could show a loading spinner
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login page with the return url
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (!userIsInstructor) {
    // Redirect to home page if not an instructor
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default InstructorRoute; 