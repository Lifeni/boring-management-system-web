/// <reference types="@sveltejs/kit" />

interface IBaseMessage {
  message: string
}

interface IDataMessage<T> {
  message: string
  data: T
}

interface LoginRequest {
  username: string
  password: string
}

interface LogoutRequest {
  id: number
}

interface LoginResponse {
  userId: number
  role: number
  userName: string
}

type User = {
  isLogged: boolean
  userInfo: UserInfo
}

type UserInfo = {
  name: string
  id: number
  role: number
}
