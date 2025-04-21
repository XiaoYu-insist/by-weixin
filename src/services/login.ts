import type { Fun } from "@/types/global"
import type { loginsuc, SubAccountlogin } from "@/types/login"
import { http } from "@/utils/http"

type LoginParams = Fun & {
  code: string
}
/**
 * 使用微信登陆
 * @param data openid 查询
 */
export const postOpenidLoginAPI = (data: LoginParams) => {
  return http({
    method: 'GET',
    url: '/WeChat_Api/login',
    data
  })
}

/**
 * 账号密码登录
 * @param data 登录参数
 */
export const postSubAccountloginAPI = (data: SubAccountlogin) => {
  return http<loginsuc>({
    method: 'GET',
    url: '/WeChat_Api/login',
    data
  })
}
