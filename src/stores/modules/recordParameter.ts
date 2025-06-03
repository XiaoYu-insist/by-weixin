import { defineStore } from 'pinia'
import { ref } from 'vue'

interface parameters {
  type: number;
  starttime: string;
  endtime: string;
  states?: number;
}
/**
 * 页面参数
 * type : 0 显示器日期, 1 日期消失
 * starttime : 开始时间
 * endtime : 结束时间
 * states : 选择按钮 为空：当月收入  0:今日收入和充值  1:操作
 */

// 定义 Store
export const useRecordStore = defineStore(
  'Records',
  () => {
    // 按钮信息
    const recordBut = ref<parameters>()
    // 保存按钮信息
    const setRecordBut = (val: parameters) => {
      recordBut.value = val
    }

    // 清理按钮信息
    const clearRecordBut = () => {
      recordBut.value = undefined
    }

    // 记得 return
    return {
      recordBut,
      setRecordBut,
      clearRecordBut,
    }
  }
)
