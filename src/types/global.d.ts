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
