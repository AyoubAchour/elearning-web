import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated, isAdmin } from '../../utils/auth';

const AdminRoute = () => {
  const location = useLocation();
  const isAuth = isAuthenticated();
  const userIsAdmin = isAdmin();

  if (!isAuth) {
    // Redirect to login page with the return url
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (!userIsAdmin) {
    // Redirect to home page if not an admin
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute; 