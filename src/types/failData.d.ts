import type { Fun } from "./global"



/**
 * 获取失败设备数据
 */
export type failListAsk = Fun & {
  regionid:string,
}

/**
 * 返回失败设备数据
 */
export type failListRes = {
  block_num: string,
  device_id: string,
  device_type: string,
  room_num: string,
  task_id: string,
  user_id: string,
  user_name: string,
  task_ids?: string,
  icon?: string,

}
