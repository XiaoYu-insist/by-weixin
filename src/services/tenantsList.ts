import type { tenantListAsk, tenantListRes } from "@/types/tenantsLIst"
import { http } from "@/utils/http"

export const tenantList = (data:tenantListAsk)=>{
  return http<tenantListRes[]>({
    method:'GET',
    url:'/WeChat_Api/deviceStatus',
    data
  })
}


