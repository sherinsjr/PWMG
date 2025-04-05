import PropTypes from 'prop-types';
import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
  getItemFromLocalStorage,
  setItemToLocalStorage,
} from '../utils/localStorage.jsx';

// Create an AuthContext to manage authentication state
const AuthContext = React.createContext(null);

export default function AuthProvider({ children }) {
  const [token, setToken] = React.useState(
    getItemFromLocalStorage('authtoken')
  );
  const navigate = useNavigate();

  // Function to sign in the user
  const signIn = (token, client, callback) => {
    return AuthChecker.signIn(() => {
      setItemToLocalStorage('authtoken', token);
      setItemToLocalStorage('user', client);
      setToken(token);
      callback();
    });
  };

  // Function to sign out the user
  const signOut = (callback) => {
    return AuthChecker.signOut(() => {
      localStorage.removeItem('authtoken');
      localStorage.removeItem('user');
      setToken(null);
      navigate('/login');
      callback();
    });
  };

  // AuthChecker to manage authentication status
  const AuthChecker = {
    isAuthenticated: !!token, // Set initial authentication status based on token
    signIn(callback) {
      AuthChecker.isAuthenticated = true;
      setTimeout(callback, 100); // Simulate async operation
    },
    signOut(callback) {
      AuthChecker.isAuthenticated = false;
      setTimeout(callback, 100);
    },
  };

  const value = { token, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use the AuthContext
export function useAuth() {
  return React.useContext(AuthContext);
}

// RequireAuth component to protect routes
export function RequireAuth({ children }) {
  const auth = useAuth();
  const location = useLocation();
  const token = getItemFromLocalStorage('authtoken');

  // Update auth state with token from local storage if available
  if (token) auth.token = token;

  // If not authenticated, redirect to login
  if (!auth.token) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};
