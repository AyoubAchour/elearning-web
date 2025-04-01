import React, { createContext, useState, useEffect, useContext } from 'react';
import { loginUser, registerUser, logoutUser, updateUserProfile } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const checkLoggedIn = () => {
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        try {
          setCurrentUser(JSON.parse(userData));
        } catch (err) {
          console.error('Error parsing stored user data:', err);
          localStorage.removeItem('currentUser');
        }
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await registerUser(userData);
      
      // Handle backend response format
      const user = {
        id: response.userId,
        name: response.name,
        email: response.email,
        token: response.token
      };
      
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('token', response.token);
      setCurrentUser(user);
      
      return { user };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await loginUser(credentials);
      
      // Handle backend response format
      const user = {
        id: response.userId,
        name: response.name,
        email: response.email,
        token: response.token
      };
      
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('token', response.token);
      setCurrentUser(user);
      
      return { user };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      await logoutUser();
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
      setCurrentUser(null);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Logout failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await updateUserProfile(userData);
      
      // Handle backend response format
      const updatedUser = {
        ...currentUser,
        name: response.name,
        email: response.email,
        // Add other fields as needed
      };
      
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      
      return { user: updatedUser };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Profile update failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 