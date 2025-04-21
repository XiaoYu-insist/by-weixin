import type { CollectorState, deviceFailState, incomeInfo, onCollectorState, onDeviceFailState, onIncomeInfo, onRegionInfo, onRegionUserState, RegionId, RegionInfo, RegionMonthIncomeInfo, RegionStaff, RegionUserState } from "@/types/region"
import { http } from "@/utils/http"

/**
 * 获取区域id
 * @param data 参数
 */
export const regionStaff = (data:RegionId)=>{
  return http<RegionStaff[]>({
    method:'GET',
    url:'/WeChat_Api/login',
    data
  })
}

/**
 * 获取区域信息
 * @param data 参数
 */
export const getRegionInfo = (data:RegionInfo)=>{
  return http<onRegionInfo[]>({
    method:'GET',
    url:"/WeChat_Api/index",
    data
  })
}

/**
 * 获取区域当月收入数据
 * @param data 参数
 */
export const getRegionMoneyIncomeInfo = (data:RegionMonthIncomeInfo)=>{
  return http({
    method:'GET',
    url:"/WeChat_Api/index",
    data
  })
}


/**
 * 获取区域收入数据
 * @param data 参数
 */
export const getRegionIncomeInfo = (data:incomeInfo)=>{
  return http<onIncomeInfo[]>({
    method:'GET',
    url:"/WeChat_Api/index",
    data
  })
}

/**
 * 获取设备运行情况
 * @param data 参数
 */
export const getRegionUserState = (data:RegionUserState) =>{
  return http<onRegionUserState[]>({
    method:'GET',
    url:'/WeChat_Api/deviceStatus',
    data
  })
}

/**
 * 获取采集器情况和数量
 * @param data 参数
 */
export const getCollectorState = (data:CollectorState)=>{
  return http<onCollectorState[]>({
    method:'GET',
    url:'/WeChat_Api/deviceStatus',
    data
  })
}


/**
 * 获取设备失败情况和数量
 * @param data 参数
 */
export const getDeviceFailCount = (data:deviceFailState)=>{
  return http<onDeviceFailState[]>({
    method:'GET',
    url:'/WeChat_Api/deviceStatus',
    data
  })
}

