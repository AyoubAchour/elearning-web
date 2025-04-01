import axios from 'axios';

const API_URL = 'http://localhost:3000';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication API
export const registerUser = async (userData) => {
  try {
    // Convert fullName to name for backend compatibility
    const backendUserData = {
      name: userData.fullName || userData.name,
      email: userData.email,
      password: userData.password
    };
    
    const response = await api.post('/register', backendUserData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post('/logout');
    return response.data;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const updateUserProfile = async (userData) => {
  try {
    const response = await api.put('/profile', userData);
    return response.data;
  } catch (error) {
    console.error('Profile update error:', error);
    throw error.response?.data || error;
  }
};

// Categories API
export const fetchCategories = async () => {
  try {
    const response = await api.get('/categorie');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Courses API
export const fetchAllCourses = async () => {
  try {
    const response = await api.get('/course');
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

export const searchCourses = async (query, categoryId = null) => {
  try {
    // Base URL for search endpoint
    let url = '/course/search';
    
    // Add query parameters if provided
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (categoryId) params.append('categoryId', categoryId);
    
    // Append parameters to URL if any exist
    const queryString = params.toString();
    if (queryString) url += `?${queryString}`;
    
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error searching courses:', error);
    throw error;
  }
};

export const fetchPopularCourses = async (limit = 8) => {
  try {
    const response = await api.get('/course');
    // Sort by enrolledCount (most enrolled first)
    const sortedCourses = response.data.sort((a, b) => b.enrolledCount - a.enrolledCount);
    // Return only the specified number of courses
    return sortedCourses.slice(0, limit);
  } catch (error) {
    console.error('Error fetching popular courses:', error);
    throw error;
  }
};

export const fetchCourseById = async (id) => {
  try {
    const response = await api.get(`/course/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching course with ID ${id}:`, error);
    throw error;
  }
};

// Subscription Plans API
export const fetchPlans = async () => {
  try {
    const response = await api.get('/planabonnement');
    return response.data;
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    throw error;
  }
};

export const createCheckoutSession = async (planId, apprenantId) => {
  try {
    const response = await api.post('/checkout', { 
      planId, 
      apprenantId 
    });
    return response.data;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

// Professor/Instructor API
export const fetchProfessorById = async (id) => {
  try {
    const response = await api.get(`/professeur/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching professor with ID ${id}:`, error);
    throw error;
  }
};

export default api; 