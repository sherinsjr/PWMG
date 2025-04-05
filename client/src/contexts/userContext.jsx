import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { getItemFromLocalStorage } from '../utils/localStorage';

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  // Function to fetch user data from local storage
  const loadUserData = useCallback(() => {
    try {
      const storedUser = getItemFromLocalStorage('user');
      setUser(storedUser || {});
    } catch (error) {
      console.error('Failed to retrieve user data from local storage:', error);
      setUser({});
    }
  }, []);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(() => ({ user, setUser }), [user]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

// Custom hook to access the UserContext
export const useUserData = () => useContext(UserContext);

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContextProvider;
