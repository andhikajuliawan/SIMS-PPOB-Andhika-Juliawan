import { Navigate, Outlet } from 'react-router';
import { useAppSelector } from '../features/hooks.ts';
import { selectAuth } from '../features/auth/authSlice.ts';

function ProtectedRoute() {
  const { isAuthenticated } = useAppSelector(selectAuth);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
