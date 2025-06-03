

/**
 * 获取采集器
 */
export type CollectorState = RegionIdReuse

/**
 * 返回采集器
 */
export type onCollectorStateData = {
  addr_describe:string, // 采集器名称
  data_collector_id:string, // 采集器ID
  data_collector_sim:string, // 采集器SIM卡号
  data_collector_state:string, // 采集器状态
  data_collector_type:string, // 采集器类型
  serial_port_code:string, // 采集器验证码
  state_change_time:string, // 采集器状态变更时间
}
