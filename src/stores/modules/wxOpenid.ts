import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const useCodeStore = defineStore(
  'Codes',
  () => {
    // 会员信息
    const code = ref<any>()

    // 保存会员信息，登录时使用
    const setCodes = (val: any) => {
      code.value = val
    }

    // 清理会员信息，退出时使用
    const clearCodes = () => {
      code.value = undefined
    }

    // 记得 return
    return {
      code,
      setCodes,
      clearCodes,
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
