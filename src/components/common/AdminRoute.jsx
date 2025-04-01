import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminRoute = () => {
  const location = useLocation();
  const { currentUser, isAuthenticated, loading } = useAuth();
  const userIsAdmin = currentUser?.isAdmin === true;

  // If auth is still loading, we could show a loading spinner
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
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