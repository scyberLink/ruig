/* eslint-disable require-jsdoc */
import fetcher from './SharedFetcher'
import Fetcher from './Fetcher'
import IAnyObject from './models/IAnyObject'

export const isActivePath = (routeName: string) => {
  const path = window.location.pathname
  const splitted = path.split('/')
  for (let i = 0; i < splitted.length; i++) {
    const segment = splitted[i]
    const routing = routeName.split('/')[1]
    if (segment === routing) {
      return 'active'
    }
  }
  return null
}


export function objectEquals (obj1: IAnyObject, obj2: IAnyObject) {
  // Check if both object are strictly equal
  if (obj1 === obj2) {
    return true
  }

  // Check if either object is null or not
  if (
    typeof obj1 !== 'object' ||
    obj1 == null ||
    typeof obj2 !== 'object' ||
    obj2 == null
  ) {
    return false
  }

  // Get the keys of both objects
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  // Check if the number of keys is the same
  if (keys1.length !== keys2.length) {
    return false
  }

  // Iterate through the keys and recursively check for equality
  for (const key of keys1) {
    if (!keys2.includes(key) || !objectEquals(obj1[key], obj2[key])) {
      return false
    }
  }
  return true
}

export function encodeQuery (object = {}) {
  return btoa(JSON.stringify(object))
}

export async function getDataUrl (data: Blob) {
  return await new Promise((resolve, reject) => {
    try {
      const reader = new FileReader()
      reader.readAsDataURL(data)
      reader.onloadend = () => {
        const uri = reader.result
        resolve(uri)
      }
    } catch (err) {
      reject(err)
    }
  })
}

export async function getDataUrlFromUrl (url: string) {
  return await new Promise((resolve, reject) => {
    async function runner () {
      try {
        const imo = {
          url,
          method: 'GET'
        }
        const idata = await fetcher.fetch(imo, Fetcher.RETURN_BLOB)
        const uri = await getDataUrl(idata)
        resolve(uri)
      } catch (err) {
        reject(err)
      }
    }
    runner()
  })
}

export const getCurrentUrl = (includeHostName = false) => {
  const url = window.location.href
  if (includeHostName) {
    return url
  }
  const noScheme = url?.split('//')[1]
  const pathWithoutShemeAndHostname = noScheme?.split('/')[1]
  return `../${pathWithoutShemeAndHostname}`
}
