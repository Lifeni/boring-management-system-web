/// <reference types="@sveltejs/kit" />

interface IBaseMessage {
  message: string
}

interface IDataMessage<T> {
  message: string
  data: T
}

interface ILoginRequest {
  username: string
  password: string
}

interface ILoginResponse {
  userId: number
  role: number
  userName: string
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

type FeatureItem = {
  name: string
  url: string
}
