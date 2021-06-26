const navLinks = {
  0: [
    { name: '主页', url: '/' },
    { name: '课程', url: '/课程' },
    { name: '教师', url: '/教师' },
    { name: '学生', url: '/学生' },
    { name: '用户', url: '/用户' }
  ],
  1: [
    { name: '主页', url: '/' },
    { name: '教的课程', url: '/课程' }
  ],
  2: [
    { name: '主页', url: '/' },
    { name: '所有课程', url: '/课程' },
    { name: '已选课程', url: '/课程?筛选=已选课程' },
    { name: '已修完课程', url: '/课程?筛选=已修完课程' }
  ],
  default: [{ name: '主页', url: '/' }]
}

export const getNav = (num: number): Array<NavItem> => navLinks[num] || navLinks['default']
