"use client";
import { User } from "../types/User";

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

type AuthAction = { type: "LOGIN"; payload: AuthState } | { type: "LOGOUT" };

// Reducer để xử lý hành động
export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
