
import { BaseManager } from '../layers/view/application/components/base/BaseComponent'
import { DAY } from './constants'
import { NullException } from './exceptions/NullException'
import { IAnyObject } from './models/IAnyObject'

export function splitStringIntoChunks(str: string, chunkSize: number) {
  const chunks: string[] = []
  let i = 0
  while (i < str.length) {
    chunks.push(str.slice(i, i + chunkSize))
    i += chunkSize
  }
  return chunks
}

export function getDefinedValuesFrom(object: { [key: string]: any }) {
  const definedValues: { [key: string]: any } = {}
  for (const key in object) {
    const value = object[key]
    if (value != null && value != undefined) {
      definedValues[key] = value
    }
  }
  return definedValues
}

export function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function sumField(objArr: { [key: string]: any }[], ...field: string[]) {
  if (!objArr || (Array.isArray(objArr) && objArr.length <= 0)) {
    return 0
  }
  let sum = 0
  for (const obj of objArr) {
    let theValue = getObjectField(obj, field)
    if (theValue) {
      if (typeof theValue === 'string') {
        theValue = parseInt(theValue)
      }
      if (typeof theValue === 'number') {
        sum += theValue
      }
    }
  }
  return sum
}

export function getObjectField(obj: { [key: string]: any }, fields: string[]): any {
  const f = [...fields]
  if (f.length <= 0 || !obj) {
    return obj
  }
  const leftMostFieldName = f.shift()
  if (!leftMostFieldName) {
    return obj
  }
  return getObjectField(obj[leftMostFieldName], f)
}

export function getDayRegex(dateOrDateString?: string | Date) {
  let date: Date
  if (dateOrDateString instanceof Date) {
    date = dateOrDateString
  } else if (typeof dateOrDateString === 'string') {
    date = new Date(dateOrDateString)
  } else {
    date = new Date()
  }

  /* const dayRegex = `^(${date.getDate()})[-./](0?${
      date.getMonth() + 1
      })[-./](${date.getFullYear()})$`; */

  const dayRegex = `^(${date.getMonth() + 1})[-./](0?${date.getDate()})[-./](${date.getFullYear()})$`
  return dayRegex
}

export const shallowRemoveDuplicates = (arr: any[]): any[] => {
  const unique = new Set()
  const filtered = arr?.filter((item) => {
    if (item && !unique.has(item)) {
      unique.add(item)
      return true
    }
    return false
  })
  return filtered
}

export const getDaysDifference = (firstDate: Date | string, secondDate: Date | string): number => {
  if (firstDate instanceof Date) {
    /* empty */
  } else {
    firstDate = new Date(firstDate)
  }

  if (secondDate instanceof Date) {
    /* empty */
  } else {
    secondDate = new Date(secondDate)
  }
  const diffInMillis = Math.abs(firstDate.getTime() - secondDate.getTime())
  //conver the time difference in millis to days
  const diffInDays = Math.floor(diffInMillis / DAY)
  return diffInDays
}

export const hasDatePassedSpecifiedDays = (targetDate: Date | string, days: number): boolean => {
  const currentDate = new Date()
  if (targetDate instanceof Date) {
    /* empty */
  } else {
    targetDate = new Date(targetDate)
  }
  const targetTime = targetDate.getTime() + days * DAY
  const targetDateTime = new Date(targetTime)

  return targetDateTime <= currentDate
}

export const getDateByAddedDaysToDate = (days: number, targetDate?: Date | string): Date => {
  if (!targetDate) {
    targetDate = new Date()
  } else if (targetDate instanceof Date) {
    /* empty */
  } else {
    targetDate = new Date(targetDate)
  }
  const targetTime = targetDate.getTime() + days * DAY
  const targetDateTime = new Date(targetTime)

  return targetDateTime
}

export const getRemainingDays = (previousDate: Date | string): number => {
  const currentDate = new Date()
  if (!(previousDate instanceof Date)) {
    previousDate = new Date(previousDate)
  }
  const diffInMillis = previousDate.getTime() - currentDate.getTime()

  if (diffInMillis <= 0) {
    return 0
  }
  //convert the time difference in millis to days
  const remainingDays = Math.ceil(diffInMillis / DAY)
  return remainingDays
}

export const getCutoffDateBySpecifiedDays = (days: number) => {
  /* const cutoffDate = new Date();
    const cutoffDateT = new Date();
    cutoffDateT.setDate(cutoffDate.getDate() - days);
    return cutoffDateT; */
  const currentDate = new Date()
  const targetDate = new Date(currentDate.getTime() - days * DAY)
  return targetDate
}

export const mongooseModelQueryObjectForPassDateByDays = (days: number, path: string) => {
  const cutoffDate = getCutoffDateBySpecifiedDays(days)
  const query = { [path]: { $gte: cutoffDate } }
  return query
}

export const mongooseModelQueryObjectForExpirationDateFromToday = (path: string) => {
  const expirationDate = new Date()
  const query = { [path]: { $lte: expirationDate } }
  return query
}

export const mongooseModelQueryObjectForTodayDoc = (path: string) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Set the time to the beginning of the day

  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1) // Set the time to the beginning of the next day

  const query = {
    [path]: {
      $gte: today, // Greater than or equal to today's date
      $lt: tomorrow, // Less than tomorrow's date
    },
  }
  return query
}

export const didMonthStartedToday = () => {
  const today = new Date()
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

  return today.getTime() === startOfMonth.getTime()
}

export const snakeCase = (camelCase: string): string => {
  return camelCase.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`).substring(1)
}

export const appendChildren = (parent: BaseManager | null, ...children: HTMLElement[]) => {
  if (!parent) {
    throw new NullException()
  }
  for (const child of children) {
    parent.getShadowWrapper().appendChild(child)
  }
  return parent
}

export const removeLastChild = (parent: BaseManager | null) => {
  if (!parent) {
    throw new NullException()
  }
  const removedChild = parent.getShadowWrapper().removeChild(parent.getShadowWrapper().lastChild as ChildNode)

  return removedChild
}

export const cssString = (styleObject: IAnyObject) => {
  const definedValues = getDefinedValuesFrom(styleObject)
  const styleKeys = Object.keys(definedValues)
  const styleValues = Object.values(definedValues)
  let styleString = ''
  for (let i = 0; i < styleKeys.length; i++) {
    const styleKey = styleKeys[i]
    const styleValue = styleValues[i]
    styleString = styleString.concat(`${styleKey}: ${styleValue};`, '\n')
  }
  return styleString.trim()
}

export const spreadTo = (parentObj: IAnyObject, objToSpread: IAnyObject) => {
  if (!objToSpread || !parentObj) {
    return parentObj
  }
  const keys = Object.keys(objToSpread)
  const values = Object.values(objToSpread)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const value = values[i]
    parentObj[key] = value
  }
  return parentObj
}

export async function createDragImage(element: HTMLElement): Promise<HTMLImageElement> {
  const rect = element.getBoundingClientRect()
  const offsetX = rect.left - window.pageXOffset
  const offsetY = rect.top - window.pageYOffset
  const blob = await elementToBlob(element)
  const url = URL.createObjectURL(blob)
  const img = new Image()
  img.src = url
  img.width = rect.width
  img.height = rect.height
  img.style.position = 'absolute'
  img.style.left = `${offsetX}px`
  img.style.top = `${offsetY}px`
  return img
}

export async function elementToBlob(element: HTMLElement): Promise<Blob> {
  const svgString = new XMLSerializer().serializeToString(element)
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml' })
  return (await createImageBitmap(svgBlob)) as any as Blob
}

export const getDefaultExportFromString = (code: string): string | null => {
  try {
    const defaultExportRegex = /export\s+default\s+(.*?);/s
    const match = defaultExportRegex.exec(code)

    if (match && match[1]) {
      return match[1].trim()
    } else {
      return null
    }
  } catch (error) {
    console.error('Error getting default export from code string:', error)
    return null
  }
}
