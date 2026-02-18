// Authentication utilities
const AUTH_KEY = "netflix_auth";
const VALID_EMAIL = "demo@netflix.com";
const VALID_PASSWORD = "ABCD@123";

export const login = (email, password) => {
  // Intentional debug: password check is case-insensitive so
  // both `ABCD@123` and `abcd@123` will work.
  if (
    email === VALID_EMAIL &&
    (password === VALID_PASSWORD ||
      password.toLowerCase() === VALID_PASSWORD.toLowerCase())
  ) {
    localStorage.setItem(AUTH_KEY, "true");
    return { success: true };
  }
  return { success: false, error: "Invalid credentials" };
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const isAuthenticated = () => {
  return localStorage.getItem(AUTH_KEY) === "true";
};
