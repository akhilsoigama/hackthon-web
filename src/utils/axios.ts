import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json ",
    "Authorization": "Bearer " + Cookies.get("token"),
  },
});

export default api;

export const fetcher = (url: string) => api.get(url).then(res => res.data);
