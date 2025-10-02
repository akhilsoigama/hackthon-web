import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json ",
  },
});

export default api;

export const fetcher = (url: string) => api.get(url).then(res => res.data);
