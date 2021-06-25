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

type Toast = {
  title: string
  body: string
  isOpen: boolean
}

type Modal = {
  title: string
  body: string
  size?: string
  action: () => void
  actionText?: string
  actionType?: ButtonColor
  hasInput?: boolean
  inputType?: InputType
  inputPlaceholder?: string
  isOpen: boolean
}

type NavItem = {
  name: string
  url: string
}

type UserInfoStore = {
  subscribe: subscribe
  login: () => void
  logout: () => void
}

type Action = {
  action: () => void
  color: string
  text: string
}
