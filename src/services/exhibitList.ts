import type { onOrderLog, OrderLog } from "@/types/exhibitList"
import { http } from "@/utils/http"


/**
 *
 * @param data 参数
 */
export const getOrderLog = (data:OrderLog) => {
  return http<onOrderLog[]>({
    method:'GET',
    url:'/WeChat_Api/index',
    data
  })
}
