import { createContext, useState, useContext } from "react";
import { setupProfile } from "./services/setupProfile.service";
import { AuthContext } from "../auth/auth.context";

export const SetupProfileContext = createContext();

export function SetupProfileProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(AuthContext);

  const handleSetupProfile = async (formData) => {
    try {
      setLoading(true);

      const response = await setupProfile(formData);

      // Update global AuthContext user
      updateUser(response.user);

      return response;
    } catch (error) {
      console.error("Profile setup failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <SetupProfileContext.Provider
      value={{ handleSetupProfile, loading }}
    >
      {children}
    </SetupProfileContext.Provider>
  );
}