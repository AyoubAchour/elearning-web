/**
 * Check if a user is currently logged in
 * @returns {boolean} True if a user is logged in
 */
export const isAuthenticated = () => {
  const localUser = localStorage.getItem('currentUser');
  const sessionUser = sessionStorage.getItem('currentUser');
  
  return !!(localUser || sessionUser);
};

/**
 * Get the currently logged in user's data
 * @returns {Object|null} The current user object or null if not logged in
 */
export const getCurrentUser = () => {
  const localUser = localStorage.getItem('currentUser');
  const sessionUser = sessionStorage.getItem('currentUser');
  
  if (localUser) {
    return JSON.parse(localUser);
  } else if (sessionUser) {
    return JSON.parse(sessionUser);
  }
  
  return null;
};

/**
 * Log out the current user
 */
export const logout = () => {
  localStorage.removeItem('currentUser');
  sessionStorage.removeItem('currentUser');
};

/**
 * Add a subscription to user profile
 * @param {Object} subscriptionData - The subscription data to save
 */
export const addSubscription = (subscriptionData) => {
  const user = getCurrentUser();
  
  if (!user) return false;
  
  // Add subscription info to user data
  const updatedUser = {
    ...user,
    subscription: {
      ...subscriptionData,
      startDate: new Date().toISOString(),
      isActive: true
    }
  };
  
  // Save updated user data
  if (localStorage.getItem('currentUser')) {
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  } else {
    sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
  }
  
  return true;
};

/**
 * Check if user has an active subscription
 * @returns {boolean} True if user has an active subscription
 */
export const hasActiveSubscription = () => {
  const user = getCurrentUser();
  return !!(user && user.subscription && user.subscription.isActive);
};

/**
 * Get user's enrolled courses
 * @returns {Array} Array of enrolled course IDs
 */
export const getEnrolledCourses = () => {
  const user = getCurrentUser();
  return (user && user.enrolledCourses) || [];
};

/**
 * Enroll user in a course
 * @param {string} courseId - The course ID to enroll in
 * @returns {boolean} True if enrollment was successful
 */
export const enrollInCourse = (courseId) => {
  const user = getCurrentUser();
  
  if (!user) return false;
  
  // Initialize enrolledCourses array if it doesn't exist
  const enrolledCourses = user.enrolledCourses || [];
  
  // Check if already enrolled
  if (enrolledCourses.includes(courseId)) return true;
  
  // Add course to enrolled courses
  const updatedUser = {
    ...user,
    enrolledCourses: [...enrolledCourses, courseId],
    enrollmentDates: {
      ...(user.enrollmentDates || {}),
      [courseId]: new Date().toISOString()
    }
  };
  
  // Save updated user data
  if (localStorage.getItem('currentUser')) {
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  } else {
    sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
  }
  
  return true;
}; 