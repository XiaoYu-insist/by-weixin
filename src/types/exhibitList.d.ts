import type { Fun } from "./global"
import type { onRegionMonthIncomeInfo } from "./region"


/**
 * 获取当天收入
 */
export type OrderLog = Fun &{
  regionid: string, // 区域id
  startDate: string, // 开始时间
  endDate: string, // 结束时间
  condition: string, // 条件
  search:string, // 搜索
}
/**
 * 返回当天收入
 */
export type onOrderLog = onRegionMonthIncomeInfo
