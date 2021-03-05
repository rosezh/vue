/* @flow */

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this //指向vue
    }

    // additional parameters
    // 把数组中的第一个元素（plugin）去掉
    const args = toArray(arguments, 1)//1,把第一个参数去掉，因为第一个参数是plugin,不需要
    args.unshift(this)//把this插入数组中的第一项
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    //保存已安装的插件
    installedPlugins.push(plugin)
    return this
  }
}
