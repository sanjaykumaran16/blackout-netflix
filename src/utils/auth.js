// Authentication utilities
const AUTH_KEY = 'netflix_auth';
const VALID_EMAIL = 'demo@netflix.com';
const VALID_PASSWORD = '123456';

export const login = (email, password) => {
  if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    localStorage.setItem(AUTH_KEY, 'true');
    return { success: true };
  }
  return { success: false, error: 'Invalid credentials' };
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const isAuthenticated = () => {
  return localStorage.getItem(AUTH_KEY) === 'true';
};
