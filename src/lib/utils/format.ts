import { weekMap } from './maps'

const getTime = (date: Date) => ({
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  day: date.getDate(),
  week: date.getDay()
})

export const dateFormat = (date: Date, divider?: string): string => {
  if (date.getTime() === 0) {
    return ''
  }
  const { year, month, day } = getTime(date)
  return divider ? `${year}${divider}${month}${divider}${day}` : `${year} 年 ${month} 月 ${day} 日`
}

export const dateFormatInput = (date: Date): string => {
  if (date.getTime() === 0) {
    return ''
  }
  const { year, month, day } = getTime(date)
  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`
}

export const dateFormatWeek = (date: Date): string => {
  const { year, month, day, week } = getTime(date)
  return `${year} 年 ${month} 月 ${day} 日，${weekMap(week)}`
}
