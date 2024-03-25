import React, { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
interface IProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ children }) => {
  const cookies = new Cookies();
  const token = cookies.get('authToken');
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!token) {
    return <Navigate to={'/login'} />;
  } else {
    return <>{children}</>;
  }
};

export default ProtectedRoute;
