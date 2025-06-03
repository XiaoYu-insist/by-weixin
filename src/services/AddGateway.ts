import type { GetGatewayId, onGetGatewayId } from "@/types/AddGateway"
import { http } from "@/utils/http"


export const getGatewayId = (data:GetGatewayId) => {
  return http<onGetGatewayId[]>({
    method:'GET',
    url:'/WeChat_Api/CollectorSet',
    data
  })
}
