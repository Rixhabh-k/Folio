
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/profile-setup",
  withCredentials: true,
});

// Accept FormData directly instead of destructuring individual fields
export async function setupProfile(formData) {
  const response = await api.post("/", formData);

  return response.data;
}
