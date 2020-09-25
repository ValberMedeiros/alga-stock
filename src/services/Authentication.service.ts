import http from "../Utils/http";

export interface User {
  _id: string
  user: string
  email: string
  role: 'admin' | 'costumer'
  token: string
  createdAt: string
  updatedAt: string
}

export const signInUser = (user: string, pass: string) =>
  http
    .post<User>('/authentication/login', { user, pass })
    .then(res => res.data)