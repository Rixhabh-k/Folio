import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export async function register({ email, username, password }) {
  try {
    const response = await api.post("/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function login({ username, password }) {
  try {
    const response = await api.post("/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

export const verifyEmail = async (token) => {
  const res = await api.get("/verify-email", { params: { token } });
  return res.data;
};

export const getMe = async () => {
  const response = await api.get("/get-me");
  return response.data;
};

export async function forgetUsername({ email }) {
  try {
    const response = await api.post("/forget-username", {
      email,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function verifyUsername({ email,otp }) {
  try {
    const response = await api.post("/verify-username", {
      email,
      otp
    });
    return response.data;
  } catch (error) {
    return error;
  }
}
