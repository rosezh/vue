/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'

const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)//创建一个对象，让创建的这个对象原型指向参数arrayProto

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  // 保存数组的原方法
  const original = arrayProto[method]
  // 调用Object.defineProperty()重新定义修改数组的方法
  def(arrayMethods, method, function mutator (...args) {//...args这里的参数为调用push/pop传入的参数
    // 执行数组的原始方法
    const result = original.apply(this, args)
    // 获取数组对象的ob 对象
    const ob = this.__ob__
    // 存储数组新增的元素 
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
    // notify change
    ob.dep.notify()
    return result
  })
})
