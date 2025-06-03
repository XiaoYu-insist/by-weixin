import type { onCollectorStateData } from "@/types/collector"
import type { CollectorState } from "@/types/region"
import { http } from "@/utils/http"


export const getCollectorAPi = (data:CollectorState)=>{
  return http<onCollectorStateData[]>({
    method:'GET',
    url:'/WeChat_Api/deviceStatus',
    data
  })
}
