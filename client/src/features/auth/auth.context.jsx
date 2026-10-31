import { createContext, useState, useEffect } from "react";
import { login, register, getMe } from "./services/auth.service";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Refresh ke baad existing login check karo
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getMe();
        setUser(response.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

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

  const handleLogin = async ({ username, password }) => {
    try {
      setLoading(true);

      const response = await login({ username, password });

      console.log("Login response:", response);

      setUser(response.user);

      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getMe = async()=>{

  }

  return (
    <AuthContext.Provider
      value={{ user, loading, handleRegister, handleLogin, getMe }}
    >
      {children}
    </AuthContext.Provider>
  );
}