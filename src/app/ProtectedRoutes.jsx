import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserAuthContext } from '../contexts/UserAuthContext';

function ProtectedRoute({ children }) {
  const { user } = useContext(UserAuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
