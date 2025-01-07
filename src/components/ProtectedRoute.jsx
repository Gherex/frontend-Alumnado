import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = sessionStorage.getItem('authToken');

  return token ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
