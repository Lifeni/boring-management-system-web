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

interface IStudentResponse {
  userId: number
  userName: string
  sex: string
  birthYear: string
  grade: string
  collegeId: number
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

interface IResetPasswordRequestByAdmin {
  password: string
}

type ModalStore = {
  subscribe: (this: void, run: Subscriber<Toast>, invalidate?: Invalidator<Toast>) => Unsubscriber
  toggle: () => void
  open: () => void
  close: () => void
}

type UserInfo = {
  name: string
  id: number
  role: number
}

type StudentInfo = {
  id: number
  name: string
  sex: string
  birth: string
  grade: string
  college: string
}

type Colors = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'

type Toast = {
  title: string
  body: string
  color?: Colors
  isOpen?: boolean
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
  color: Colors
  text: string
}
