const role = {
  0: '管理员',
  1: '教师',
  2: '学生'
}

export const roleMap = (num: number): string => role[num]

const week = {
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六',
  7: '星期天'
}

export const weekMap = (num: number): string => week[num]
