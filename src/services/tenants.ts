import type { onSearchRegionList, onSearchUserList, SeatchRegionList, SeatchUserList } from "@/types/tenants";
import { http } from "@/utils/http";


/**
 * 获取区域切换
 * @param data 参数
 */
export const getSearchRegionList = (data:SeatchRegionList)=>{
  return http<onSearchRegionList[]>({
    method:'GET',
    url:"/WeChat_Api/index",
    data
  })
}

/**
 * 获取用户切换
 * @param data 切换
 */
export const getSearcUserList = (data:SeatchUserList) =>{
  return http<onSearchUserList[]>({
    method:'GET',
    url:"/WeChat_Api/index",
    data
  })
}
