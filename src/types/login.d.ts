import type { Fun } from "./global";


/**
 * 账号密码登陆
 */
export type SubAccountlogin = Fun & {
  phone: string, // 账号（手机号）
  pass: string   // 密码（修复了拼写错误：strin -> string）
  code?:string // 用于使用code获取小程序openid
}


/**
 *  登录后的数据
 */

export type loginsuc = {
  state:string
  token?:string,
}
