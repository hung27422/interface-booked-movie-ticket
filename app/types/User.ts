export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
}
export interface Account {
  username?: string;
  password?: string;
}
export interface Register {
  fullName: string;
  username: string;
  password: string;
  confirmPassword?: string;
  email: string;
  phone: string;
}
