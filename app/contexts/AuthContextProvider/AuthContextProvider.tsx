"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthState, authReducer } from "@/app/reducer/authReducer ";
import { createContext, useReducer, ReactNode, useEffect } from "react";
import { Account, Register } from "@/app/types/User";
import api from "@/app/utils/api";
import { LOCAL_STORAGE_TOKEN_NAME } from "../Constants/constants";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

interface LoginData {
  success: boolean;
  accessToken?: string;
  message?: string;
}

interface AuthContextTypes {
  authState: AuthState;
  login: (
    account: Account
  ) => Promise<{ success: boolean; token?: string; data?: LoginData; message?: string }>;
  logout: () => void;
  register: (
    register: Register
  ) => Promise<{ success: boolean; token?: string; data?: LoginData; message?: string }>;
}

const defaultValue: AuthContextTypes = {
  authState: {
    isAuthenticated: false,
    user: null,
  },
  login: () => Promise.resolve({ success: false }),
  logout: () => {},
  register: () => Promise.resolve({ success: false }),
};
// Tạo Context
export const AuthContext = createContext<AuthContextTypes>(defaultValue);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  // Load User (-- Khi đăng nhập hoặc đăng xuất isAuthenticated sẽ thay đổi --)
  const loadUser = async () => {
    try {
      const response = await api.get("/auth");
      console.log({ response });
      if (response.data.success) {
        dispatch({ type: "LOGIN", payload: { isAuthenticated: true, user: response.data.user } });
      }
    } catch {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      dispatch({ type: "LOGOUT" });
    }
  };

  // useEffect
  useEffect(() => {
    console.log("Auth state trong AuthContext cập nhật:", authState);
  }, [authState]);

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)) {
      loadUser();
    }
  }, []);
  //Login
  const login = async (
    account: Account
  ): Promise<{ success: boolean; token?: string; data?: LoginData; message?: string }> => {
    try {
      const response = await api.post("/auth/login", account);
      console.log({ response });
      // Lưu token vào local storage
      if (response.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
        // Gọi loadUser ngay sau khi đăng nhập thành công
        await loadUser();
      }

      // Trả về data
      return response.data;
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || error.message };
    }
  };
  //Logout
  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch({ type: "LOGOUT" });
  };

  // Register
  const register = async (register: Register): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await api.post("/auth/register", register);
      console.log({ response });
      return response.data;
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || error.message };
    }
  };

  const authContextValue = { authState, login, logout, register };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};
