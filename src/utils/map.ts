const role = {
  0: '管理员',
  1: '教师',
  2: '学生'
}

const roleMap = (num: number): string => role[num]

export { roleMap }
