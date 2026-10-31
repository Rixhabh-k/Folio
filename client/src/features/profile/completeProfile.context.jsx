import { createContext, useState } from "react";
import { setupProfile } from "./services/setupProfile.service";

export const SetupProfileContext = createContext();

export function SetupProfileProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSetupProfile = async (formData) => {
    try {
      setLoading(true);
      return await setupProfile(formData);
    } catch (error) {
      console.error("Profile setup failed:", error);
      throw error;
    } finally {
        setLoading(false)
    }
  };


  return (
    <SetupProfileContext.Provider value={{handleSetupProfile}} >
        {children}
    </SetupProfileContext.Provider>
  )
}
