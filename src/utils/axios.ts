// src/api/axiosInstance.ts
import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

// Create axios instance with base URL from Vite env
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // Make sure VITE_BACKEND_URL is set in .env
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

// Request interceptor to add Authorization token if present
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const msg = error.response?.data?.message || "Something went wrong";
    toast.error(msg);
    return Promise.reject(msg);
  }
);

export default axiosInstance;

// ------------------
// Fetcher for SWR
export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];
    const res = await axiosInstance.get(url, config);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Remove baseUrl from here since axiosInstance already has baseURL
export const endpoints = {
  auth: {
    me: "/profile",
    signIn: "/login",
    logout: "/logout",
  },
  lecture: {
    getAll: "/lectures",
    details: (id: number) => `/lectures/${id}`,
    create: "/lectures",
    update: (id: number) => `/lectures/${id}`,
    delete: (id: number) => `/lectures/${id}`,
  },
  faculty: {
    getAll: "/faculties",
    details: (id: number) => `/faculties/${id}`,
    create: "/faculties",
    update: (id: number) => `/faculties/${id}`,
    delete: (id: number) => `/faculties/${id}`,
  },
  material: {
    getAll: "/materials",
    details: (id: number) => `/materials/${id}`,
    create: "/materials",
    update: (id: number) => `/materials/${id}`,
    delete: (id: number) => `/materials/${id}`,
  },
  student: {
    getAll: "/students",
    details: (id: number) => `/students/${id}`,
    create: "/students",
    update: (id: number) => `/students/${id}`,
    delete: (id: number) => `/students/${id}`,
  },
  assignment: {
    getAll: "/assignments",
    details: (id: number) => `/assignments/${id}`,
    create: "/assignments",
    update: (id: number) => `/assignments/${id}`,
    delete: (id: number) => `/assignments/${id}`,
  },
  quiz: {
    getAll: "/quizzes",
    details: (id: number) => `/quizzes/${id}`,
    create: "/quizzes",
    update: (id: number) => `/quizzes/${id}`,
    delete: (id: number) => `/quizzes/${id}`,
  },
  department: {
    getAll: "/departments",
    details: (id: number) => `/departments/${id}`,
    create: "/departments",
    update: (id: number) => `/departments/${id}`,
    delete: (id: number) => `/departments/${id}`,
  },
  institute: {
    getAll: "/institutes",
    details: (id: number) => `/institutes/${id}`,
    create: "/institutes",
    update: (id: number) => `/institutes/${id}`,
    delete: (id: number) => `/institutes/${id}`,
  },
};