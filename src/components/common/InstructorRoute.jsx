import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated, isInstructor } from '../../utils/auth';

const InstructorRoute = () => {
  const location = useLocation();
  const isAuth = isAuthenticated();
  const userIsInstructor = isInstructor();

  if (!isAuth) {
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