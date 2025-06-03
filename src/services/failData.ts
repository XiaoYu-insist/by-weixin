import type { failListAsk, failListRes } from "@/types/failData"
import { http } from "@/utils/http"

export const failList = (data:failListAsk)=>{
  return http<failListRes[]>({
    method:'GET',
    url:'/WeChat_Api/failData',
    data
  })
}
