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
/**
 * 是否存在指定变量
 * 传入参数d为null、undefined、""时,会报false,
 * 有赋值时，包括0，false 报true;
 */

export function isExitsVariable(d) {
  return !!d || d === 0 || d === false
}

// Find components upward
export function findComponentUpward (context, componentName, componentNames) {
  if (typeof componentName === 'string') {
    componentNames = [componentName];
  } else {
    componentNames = componentName;
  }

  let parent = context.$parent;
  let name = parent.$options.name;
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) name = parent.$options.name;
  }
  return parent;
}

export { debounce, throttle, get, cloneDeep, filter, isEqual }
