import type { Fun, RegionIdReuse } from "./global"

/**
 * 获取网关编号
 */
export type GetGatewayId = RegionIdReuse

/**
 * 返回网关编号
 */
export type onGetGatewayId = {
  data_collector_id: string // 网关编号
}

/**
 * 获取添加网关
 */
export type PostGtewayId = Fun &{
    serial: string, // 采集器序号
    type: string, // 采集器类型
    sim: string,  // SIM卡号
    collectorId: string // 采集器编号
}
