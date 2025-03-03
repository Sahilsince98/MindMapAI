import { create } from "zustand";
import axios from "axios";
const API_URL =import.meta.env.VITE_APP_PORT;

interface User {
  name: string;
  email: string;
}
interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    name: string,
    age: string,
    gender: string,
    grade: string,
    school: string,
    cityCountry: string,
    preferredLanguage: string,
    email: string,
    password: string,
    hobbies: string,
    interests: string,
    futureGoals: string
  ) => Promise<void>;
  signOut: () => void;
}
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
  signIn: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const emailPassword = {
        email: email,
        password: password,
      };
      const user = await axios.post(`${API_URL}/login`, emailPassword, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(user)
      if (!user) {
        throw new Error("Invalid credentials");
      }
      const token = user.data.token;
      localStorage.setItem("token", token);
      set({
        token,
        user: { name: user.data.name, email: user.data.email },
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  signUp: async (
    name: string,
    age: string,
    gender: string,
    grade: string,
    school: string,
    cityCountry: string,
    preferredLanguage: string,
    email: string,
    password: string,
    hobbies: string,
    interests: string,
    futureGoals: string
  ) => {
    set({ loading: true, error: null });
    const newUser = {
      name,
      email,
      hobbies,
      interests,
      futureGoals,
      password,
      age,
      gender,
      grade,
      school,
      cityCountry,
      preferredLanguage,
    };
    try {
      const response = await axios.post(`${API_URL}/register`, newUser, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response,"response")
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  signOut: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    set({ user: null, token: null });
  },
}));
