import type { Fun } from "./global"

export type tenantsName = 'db'|'sb'|'rb'|'all'|'qf'

export type tenantListAsk = Fun & PageParams & {
  regionid: string
  devicename: tenantsName,
}

export type tenantListRes = {
  block_num:string,
  room_num:string,
  user_balance:string,
  user_id:string,
  user_name:string,
  user_state:string,
  user_states:string,
  icon:string,
  watthour_meter_id?:string,
  watthour_meter_state?:string,
  water_meter_id?:string,
  water_meter_state?:string,
  hot_meter_id?:string,
  hot_meter_state?:string,
}
