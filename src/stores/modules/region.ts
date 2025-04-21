import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const useReginStore = defineStore(
  'region',
  () => {
    // token
    const token = ref<string>()
    // 区域id
    const regionId = ref<string>()
    // 账户权限
    const authority = ref<string>()
    // 用户名称
    const regionName = ref<string>()
    // 用户登录手机
    const regionPhone = ref<string>()
    //
    const setToken = (val: string) => {
      token.value = val
    }
    //
    const setRegionId = (val: string) => {
      token.value = val
    }
    //
    const setAuthority = (val: string) => {
      token.value = val
    }
    //
    const setRegionName = (val: string) => {
      token.value = val
    }
    // 清理信息，退出时使用
    const clearAll = () => {
      token.value = undefined
      regionId.value = undefined
      authority.value = undefined
      regionName.value = undefined
      regionPhone.value = undefined
    }

    // 记得 return
    return {
      token,
      regionId,
      authority,
      regionName,
      regionPhone,
      setToken,
      setRegionId,
      setAuthority,
      setRegionName,
      clearAll,
    }
  },
  {
    persist: {
      // 调整为兼容多端的API
      storage: {
        setItem(key, value) {
          uni.setStorageSync(key, value) // [!code warning]
        },
        getItem(key) {
          return uni.getStorageSync(key) // [!code warning]
        },
      },
    },
  },
)
