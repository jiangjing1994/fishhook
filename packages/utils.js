import { debounce, throttle, get, cloneDeep, filter, isEqual } from 'lodash'

export function uuid(before = '', after = '') {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const charsLen = chars.length
  let uuid = []
  const len = 16
  for (let i = 0; i < len; i++) {
    uuid[i] = chars[0 | (Math.random() * charsLen)]
  }
  return before + uuid.join('') + after
}

export function toRawType(val) {
  return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase()
}

export function isFun(val) {
  return toRawType(val) === 'function'
}

export function isBool(val) {
  return toRawType(val) === 'boolean'
}

export function isUndef(val) {
  return toRawType(val) === 'undefined'
}

export function isString(val) {
  return toRawType(val) === 'string'
}

export function isObject(val) {
  return toRawType(val) === 'object'
}

export function arrayReplace(arr1, arr2) {
  arr1.splice(0, arr1.length, ...arr2)
}

export { debounce, throttle, get, cloneDeep, filter, isEqual }
