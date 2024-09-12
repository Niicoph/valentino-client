import { Navigate } from 'react-router-dom';


function ProtectedRoute({userSession , children}) {
  
  if (!userSession) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
