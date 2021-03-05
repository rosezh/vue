import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// vue构造函数
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)//
}
// 设置vue实例的成员Vue.property.
initMixin(Vue)//注册vm的_init()方法，初始化vm
stateMixin(Vue) //注册vm的$data,$props,$set,$delete,$watch,实例方法
eventsMixin(Vue)//注册vm的$on，$once，$off，$emit
lifecycleMixin(Vue)//注册vm的_update(),$forceUpdate,$destroy
// 混入render
renderMixin(Vue)//$nextTick

export default Vue

// 使用vue构造函数，而不使用类的原因
// 


