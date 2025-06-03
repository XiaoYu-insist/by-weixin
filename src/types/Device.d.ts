import type { Fun } from "./global";

/**
 * 获取用户信息
 */
export type UserAsk = Fun & {
  userId:string
}

/**
 * 返回用户信息
 */
export type UserRes = {
  // electric_price_daypart: string // 是否是分时电价
  // 电表
  watthour_meter_id:string // 电表编号
  // electric_collect_id
  // watthour_meter_multiple
  // connection_model
  // watthour_meter_state
  // electric_collector_type
  // electric_price_id
  // electric_price_daypart
  // 水表
  // water_meter_id
  // water_collect_id
  // water_meter_state
  // water_meter_type
  // water_meter_frequency
  // 热表
  // hotmeter_id
  // hot_collect_id
  // hot_meter_state
  // hot_meter_frequency
  // 门锁
  // locker_id
  // locker_type
  // lock_collect_id
  // locker_forever_code
  // user_ckeck_code
}
