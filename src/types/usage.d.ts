

/**
 * 获取操作记录
 */
export type usageListAsk = RegionIdReuse & {
  start_time:string,
  end_time:string
}

/**
 * 返回操作记录
 */
export type onUsageListRes = {
  importance_degree: string,
  operate_description: string,
  operate_device: string,
  operate_time: string,
  operate_type:string,
  telphone:string,
  user_id: string,
  operationDetails:string
}
