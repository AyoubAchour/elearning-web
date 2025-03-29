import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';

const PrivateRoute = () => {
  const location = useLocation();
  const isAuth = isAuthenticated();

  if (!isAuth) {
    // Redirect to login page with the return url
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute; 