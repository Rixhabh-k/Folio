import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
})

export async function register({email,username,password}) {
    try {
        const response = await api.post("/register",{
        username,
        email,
        password
    })
    return response.data;
    } catch (error) {
        return error;
    }
}

export async function login({username,password}){
    try {
        const response = await api.post("/login",{
            username,
            password,
        })
        return response.data;
    } catch (error) {
         return error;
    }
}

export const verifyEmail = async (token) => {
  const res = await api.get('/verify-email', { params: { token } })
  return res.data
}