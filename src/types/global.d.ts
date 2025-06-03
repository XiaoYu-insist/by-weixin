/**
 * 通用
 * 所有接口都要接入函数
 */
export type Fun = {
  cmd: string; // 获取函数;
  [key: string]: any; // 允许其他任意属性
}

/**
 * 通用
 * 获取区域id
 */

export type RegionIdReuse = Fun &{
  regionid:string // 区域id
}

/** 通用分页参数类型 */
export type PageParams = {
  /** 页码：默认值为 0 */
  page?: number
  /** 页大小：默认值为 100 */
  pageSize?: number
  /** 跳过页数：默认值为0 */
  pass?: number
  /** 页数：默认值为0 */
  total?: number
}

/**
 * 设备信息
 */
 export interface DeviceInfo {
  Name: string; //名称
  DeviceId: string; // 编号
  CollectorId: string; // 采集器编号
  Icon: string; // icon图标
  Speed: number; // 倍率
  Price: number; // 价格
  Coll: number; // 底度
  Type: string; // 类型
  Collect: string; // 采集类型
  State: string; // 状态
}
