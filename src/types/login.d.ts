import type { Fun } from "./global";

/**
 * 提交微信小程序参数
 */
export type Subwxlogin = Fun & {
  openid:stiring; // 微信小程序 获取
}


/**
 * 账号密码登陆
 */

export type SubAccountlogin = Fun &{
  phone:string, // 账号 （手机号）
  pass:strin    // 密码
}
