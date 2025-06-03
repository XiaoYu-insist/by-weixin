import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 创建 pinia 实例
const pinia = createPinia()
// 使用持久化存储插件
pinia.use(persist)
pinia.use(piniaPluginPersistedstate) //pinia插件的安装配置（千万别忘了这步！！！）

// 默认导出，给 main.ts 使用
export default pinia

// 模块统一导出
export * from './modules/region'
export * from './modules/wxOpenid'
export * from './modules/recordParameter'
