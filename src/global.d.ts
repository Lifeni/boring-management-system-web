/// <reference types="@sveltejs/kit" />

interface IBaseMessage {
  message: string
}

interface IDataMessage<T> {
  message: string
  data: T
}

interface IUserResponse {
  userId: number
  role: number
  userName: string
}

interface ILoginRequest {
  username: string
  password: string
}

interface ILogoutRequest {
  id: number
}

interface IResetPasswordRequest {
  userId: number
  oldPassword: string
  newPassword: string
}

type UserInfo = {
  name: string
  id: number
  role: number
}

type RouterItem = {
  name: string
  url: string
}

type UserInfoStore = {
  subscribe: subscribe
  login: () => void
  logout: () => void
}
