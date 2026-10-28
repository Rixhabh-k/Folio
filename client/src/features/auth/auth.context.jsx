import { createContext, useState } from "react";
import { login, register } from "./services/auth.service";

export const AuthContext = createContext()

export function AuthProvider({children}){

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleRegister = async ({username,email,password}) =>{
        setLoading(true)
        try {
            const response = await register({username,email,password})
            setUser(response.user)
            return response
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleLogin = async ({username,password}) =>{
        setLoading(true)
        try {
            const response = await login({username,password})
            setUser(response.user)
            return response
        } catch (error) {
             console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthContext.Provider value={{user, loading,handleRegister,handleLogin}} >
            {children}
        </AuthContext.Provider>
    )
}