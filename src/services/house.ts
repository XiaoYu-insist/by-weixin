import type { getHouseUser, onGetHouseUser } from "@/types/house"
import { http } from "@/utils/http"


/**
 * 获取区域管理人员
 * @param data
 */
export const getHoustUserAPI = (data:getHouseUser) =>{
  return http<onGetHouseUser[]>({
    method:'GET',
    url:'/WeChat_Api/houseUser',
    data
  })
}
