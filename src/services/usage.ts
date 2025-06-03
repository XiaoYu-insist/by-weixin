import type { onUsageListRes, usageListAsk } from "@/types/usage"
import { http } from "@/utils/http"

/**
 *
 * @param data
 */
export const getUsageAPI = (data:usageListAsk)=>{
  return http<onUsageListRes[]>({
    method:'GET',
    url:'/WeChat_Api/operatorLog',
    data
  })
}
