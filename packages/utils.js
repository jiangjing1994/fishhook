import { debounce, throttle, get, cloneDeep, filter, isEqual, set } from 'lodash'
/**
 * @param {string} path
 * @returns {Boolean}
 */
export const isExternal = (path) => {
  return /^(https?:|mailto:|tel:)/.test(path)
}
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
export function findComponentUpward(context, componentName, componentNames) {
  if (typeof componentName === 'string') {
    componentNames = [componentName]
  } else {
    componentNames = componentName
  }

  let parent = context.$parent
  let name = parent.$options.name
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent
    if (parent) name = parent.$options.name
  }
  return parent
}
/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data, id, parentId, children) {
  let config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children',
  }

  var childrenListMap = {}
  var nodeIds = {}
  var tree = []

  for (let d of data) {
    let parentId = d[config.parentId]
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = []
    }
    nodeIds[d[config.id]] = d
    childrenListMap[parentId].push(d)
  }

  for (let d of data) {
    let parentId = d[config.parentId]
    if (nodeIds[parentId] == null) {
      tree.push(d)
    }
  }

  for (let t of tree) {
    adaptToChildrenList(t)
  }

  function adaptToChildrenList(o) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]]
    }
    if (o[config.childrenList]) {
      for (let c of o[config.childrenList]) {
        adaptToChildrenList(c)
      }
    }
  }
  return tree
}

export function single(pre, obj) {
  // 全部 value 将扁平到此对象中
  const singleObj = {}

  // 递归处理的函数映射集
  const process = {
    String(prefix, obj) {
      singleObj[prefix] = obj
    },
    Array(prefix, obj) {
      singleObj[prefix] = obj
    },
    Boolean(prefix, obj) {
      singleObj[prefix] = obj
    },

    Object(prefix, obj) {
      for (let i in obj) {
        if (prefix) {
          process[typeOf(obj[i])](`${prefix}_${i}`, obj[i])
        } else {
          process[typeOf(obj[i])](`${i}`, obj[i])
        }
      }
    },
    Number(prefix, obj) {
      singleObj[prefix] = obj
    },
    Undefined() {},
    Null() {},
  }

  process[typeOf(obj)](pre, obj)

  return singleObj
}

// 判断对象类型
export function typeOf(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1)
}

export { debounce, throttle, get, set, cloneDeep, filter, isEqual }
