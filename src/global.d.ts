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
  roleId: number
  userName: string
  roleName: string
}

interface ICourseResponse {
  courseId: number
  courseName: string
  teacherId: number
  courseTime: string
  classRoom: string
  courseWeek: number
  courseType: string
  collegeId: number
  collegeName: number
  score: number
}

interface IStudentResponse {
  userId: number
  userName: string
  sex: string
  birthYear: string
  grade: string
  collegeId: number
  collegeName: string
}

interface ITeacherResponse {
  userId: number
  userName: string
  sex: string
  birthYear: string
  degree: string
  title: string
  grade: string
  collegeId: number
  collegeName: string
}

interface ICollegeResponse {
  collegeId: number
  collegeName: string
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

interface IResetPasswordByAdminRequest {
  password: string
}

interface IAddStudentRequest {
  userId: number
  userName: string
  sex: string
  birthYear: string
  grade: string
  collegeId: number
}

interface IEditStudentRequest {
  userName: string
  sex: string
  birthYear: string
  grade: string
  collegeId: number
}

interface IAddTeacherRequest {
  userId: number
  userName: string
  sex: string
  birthYear: string
  degree: string
  title: string
  grade: string
  collegeId: number
}

interface IEditTeacherRequest {
  userName: string
  sex: string
  birthYear: string
  degree: string
  title: string
  grade: string
  collegeId: number
}

interface IAddCourseRequest {
  courseId: number
  courseName: string
  teacherId: number
  courseTime: string
  classRoom: string
  courseWeek: number
  courseType: string
  collegeId: number
  score: number
}

interface IEditCourseRequest {
  courseName: string
  teacherId: number
  courseTime: string
  classRoom: string
  courseWeek: number
  courseType: string
  collegeId: number
  score: number
}

type ModalStore = {
  subscribe: (this: void, run: Subscriber<Toast>, invalidate?: Invalidator<Toast>) => Unsubscriber
  toggle: () => void
  open: (type?: string, color?: Colors) => void
  close: () => void
}

type UserInfo = {
  name: string
  id: string
  role: RoleInfo
}

type CollegeInfo = {
  name: string
  id: string
}

type RoleInfo = {
  name: string
  id: string
}

type CourseInfo = {
  id: string
  name: string
  teacher: string
  time: string
  room: string
  week: string
  type: string
  college: string
  score: string
}

type StudentInfo = {
  id: string
  name: string
  sex: string
  birth: string
  grade: string
  college: CollegeInfo
}

type TeacherInfo = {
  id: string
  name: string
  sex: string
  birth: string
  degree: string
  title: string
  grade: string
  college: CollegeInfo
}

type Colors = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'

type Modal = {
  isOpen: boolean
  type?: string
  color?: Colors
}

type Toast = {
  title: string
  body: string
  color?: Colors
  type?: 'ok' | 'error' | 'info' | ''
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
  icon: string
}
