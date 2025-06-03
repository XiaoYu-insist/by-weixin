import type { UserAsk, UserRes } from "@/types/Device"
import { http } from "@/utils/http"


export const getUserInfoAPI = (data:UserAsk)=>{
  return http<UserRes[]>({
    method:'GET',
    url:'/WeChat_Api/userOperate',
    data
  })
}

