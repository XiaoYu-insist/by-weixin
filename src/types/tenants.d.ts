import type { Fun, PageParams, RegionIdReuse } from "./global"
import type { tenantListRes } from "./tenantsLIst"

/**
 * 获取区域信息
 */
export type SeatchRegionList = Fun & {
  tels:string, // 手机号
  names:string, // 搜索信息
  regionid:string // 区域编号
}
/**
 * 获取用户信息
 */
export type SeatchUserList = SeatchRegionList


/**
 * 返回区域数据
 */
export type onSearchRegionList = {
  region_id:string, // 区域id
  bind_power:string, // 区域权限
  region_name:string // 区域名称
}

/**
 * 返回用户数据
 */
export type onSearchUserList = {
  user_id:string,  // 用户id
  user_name:string, // 用户名称
  user_phone:string, // 用户手机
  block_num:string, //楼栋名称
  room_num:string //用户房号
}

/**
 * 获取租户页面全部用户
 */

export type AllUsersList = RegionIdReuse & PageParams


/**
 * 返回租户页面全部用户
 */

export type onAllUsersList = tenantListRes &{
  locker_id:string,
  locker_state:string
}

/**
 * 获取租户页面全部用户数量
 */

export type AllUsersCount = RegionIdReuse


/**
 * 返回租户页面全部用户数量
 */

export type onAllUsersCount = {
  Column1:string // 数量
}
