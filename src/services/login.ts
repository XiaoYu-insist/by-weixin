import type { SubAccountlogin, Subwxlogin } from "@/types/login"
import { http } from "@/utils/http"

/**
 * 使用微信登陆
 * @param data openid 查询
 */
export const postOpenidLoginAPI = (data:Subwxlogin)=>{
  return http({
    method:'POST',
    url:'/WeChat_Api/login',
    data
  })
}

export const postSubAccountloginAPI =(data:SubAccountlogin)=>{
  return http({
    method:'POST',
    // url:'/WeChat_Api/login',
    url:'http://www.boyun.club/Comm_Api/api_data.ashx',
    data
  })
}
