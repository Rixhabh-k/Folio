
import { createContext, useState, useEffect } from "react";
import {
  login,
  register,
  getMe as getMeService,
} from "./services/auth.service";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore user session after page refresh
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getMeService();
        setUser(response.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Register user
  const handleRegister = async ({ username, email, password }) => {
    try {
      setLoading(true);

      return await register({ username, email, password });
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const handleLogin = async ({ username, password }) => {
    try {
      setLoading(true);

      const response = await login({ username, password });

      setUser(response.user);

      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update global user state after profile setup
  const updateUser = (updatedUser) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedUser,
    }));
  };

  // Fetch current authenticated user
  const refreshUser = async () => {
    try {
      const response = await getMeService();
      setUser(response.user);
      return response.user;
    } catch (error) {
      setUser(null);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        handleRegister,
        handleLogin,
        updateUser,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
