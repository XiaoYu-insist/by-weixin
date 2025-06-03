import type { Fun, RegionIdReuse } from "./global"



/**
 * 获取区域号
 */
export type RegionId = Fun & {
  phone: string, // 账号（手机号）
}


/**
 * 返回区域权限和区域编号
 */
export type RegionStaff = {
  bind_power:string,
  region_id:string
}

/**
 * 获取区域信息
 */
export type RegionInfo = RegionIdReuse

/**
 * 返回区域信息
 */
export type onRegionInfo = {
  ad:string,
  ems_balance:string,
  gzh:string,
  payment_beans:string,
  region_balance:string, // 区域余额
  region_name:string,  // 区域名称
  user_id:string,  // 用户
  wechat_id:string
}

/**
 * 获取区域当月收入数据
 */
export type RegionMonthIncomeInfo = Fun & {
  regionid: string, // 区域id
  startDate: string, // 月份起
  endDate: string, // 月份止
}

/**
 * 返回区域当月收入数据
 */
export type onRegionMonthIncomeInfo = {
  block_num:string, // 楼栋
  buyer_id: string, // 生成编号
  order_amount: string, // 订单金额
  order_comments:string, // 订单备注
  order_id:string, // 订单id
  order_mode:string, // 订单方式
  order_time:string, // 订单时间
  platform_trade_id:string, // 交易号
  room_num:string, // 房间号
  user_id:string, // 用户id
  user_name:string, // 用户姓名
  icon:string, // 使用icon
  full:string, // 具体详细
}

/**
 *  获取区域收入
 */
export type incomeInfo = RegionInfo

/**
 * 返回区域收入
 */
export type onIncomeInfo={
  count:string,
  money:string
}

/**
 * 获取设备运行情况
 */
export type RegionUserState = RegionIdReuse


/**
 * 返回设备运行情况
 */
export type onRegionUserState = {
  db: string  // 总电表
  qb: string  // 总气表
  qdb: string // 停电数量
  qfs: string // 欠费数量
  qqb: string // 停气数量
  qrb: string // 停热数量
  qsb: string // 停水数量
  rb: string  // 总热表
  sb: string  //总水表
  zhs: string // 总户数
}

/**
 * 获取采集器情况
 */
export type CollectorState = RegionIdReuse

/**
 * 返回采集器情况
 */
type Status = '0' | '1'  // 0 是 通讯，1 是 断开
export type onCollectorState = {
  count:string,
  data_collector_state:Status
}


/**
 * 获取设备失败情况
 */

export type deviceFailState = RegionIdReuse


/**
 * 返回设备失败情况
 */
type deviceType = '0'|'1'|'2'|'3'   // 0 电 ，1 水 ，2 热水 ，3 气
export type onDeviceFailState={
  count:string,
  device_type:deviceType
}


/**
 * 获取区域用量图表
 */
export type RegionUseChart = RegionIdReuse


/**
 * 返回区域用量图表
 */
export type onRegionUseChart = {
  date:string, // 日期
  money:string, // 金额
  amount:string, // 用量
}
