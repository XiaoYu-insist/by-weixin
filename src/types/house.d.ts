import type { RegionIdReuse } from "./global";

/**
 * 获取区域管理人员
 */
export type getHouseUser = RegionIdReuse


/**
 * 返回区域管理人员
 */
export type onGetHouseUser = {
  appuser_phone:string,
  begin_date:string,
  end_date:string
}
