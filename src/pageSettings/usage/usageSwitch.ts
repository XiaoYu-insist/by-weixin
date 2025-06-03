import type { onUsageListRes } from "@/types/usage";


export const operationDataName = (id:string,data:onUsageListRes)=>{
  switch(id)
  {
      case "0":
      return "添加["+data.operate_description+"]采集器";

      case "1":
      return "修改["+data.operate_description+"]LED屏";

      case "2":
      return "人充充值["+data.operate_description+"]元";

      case "3":
      return "户费清零["+data.operate_description+"]元";

      case "4":
      return "户费扣除["+data.operate_description+"]元";

      case "5":
      return "区域余额清零";

      case "6":
      return "清除门锁绑定关系";

      case "7":
      return "修改门锁显示权限";

      case "8":
      return "修改电表:"+data.operate_description;

      case "9":
      return "修改用户信息:"+data.operate_description;

      case "10":
      return "清除所有公众号绑定";

      case "11":
      return "人工发送公众号提醒";

      case "12":
      return "修改LED屏信息";

      case "13":
      return "修改热表信息:"+data.operate_description;

      case "14":
      return "修改热表底度:"+data.operate_description;

      case "15":
      return "修改水表信息:"+data.operate_description;

      case "16":
      return "修改水表底度:"+data.operate_description;

      case "17":
      return "修改气表信息:"+data.operate_description;;

      case "18":
      return "修改气表底度:"+data.operate_description;

      case "19":
      return "修改采集器信息";

      case "20":
      return "删除["+data.operate_description+"]采集器";

      case "21":
      return "打开["+data.operate_description+"]电子合同";

      case "22":
      return "修改房屋信息";

      case "23":
      return "办理入住合同";

      case "24":
      return "修改入住合同";

      case "25":
      return "签约电子合同";

      case "26":
      return "结束入住合同";

      case "27":
      return "续签电子合同";

      case "28":
      return "修改共享设备";

      case "29":
      return "删除共享设备";

      case "30":
      return "发布物业消息";

      case "31":
      return "删除["+data.operate_description+"]LED屏";

      case "32":
      return "用户忘记密码";

      case "33":
      return "修改用户权限"+data.operate_description;

      case "34":
      return "新增用户权限:"+data.operate_description;

      case "35":
      return "删除楼栋号码";

      case "36":
      return "修改楼栋号码";

      case "37":
      return "删除电价标准";

      case "38":
      return "新增电价标准";

      case "39":
      return "删除水价标准";

      case "40":
      return "删除热价标准";

      case "41":
      return "删除气价标准";

      case "42":
      return "修改电价标准";

      case "43":
      return "修改水价标准";

      case "44":
      return "修改热价标准";

      case "45":
      return "修改气价标准";

      case "46":
      return "增加水价标准";

      case "47":
      return "增加热价标准";

      case "48":
      return "增加气价标准";

      case "49":
      return "增加楼栋号码";

      case "50":
      return "修改区域信息";

      case "51":
      return "删除用户账号";

      case "52":
      return "人工停电";

      case "53":
      return "人工送电";

      case "54":
      return "人工停水";

      case "55":
      return "人工停热";

      case "56":
      return "人工送水";

      case "57":
      return "人工送热";

      case "58":
      return "修改头像";

      case "59":
      return "人工提现";

      case "60":
      return "应急送电";

      case "61":
      return "应急送水";

      case "62":
      return "应急送热";

      case "63":
      return "人工停热";

      case "64":
      return "修改电表底度:"+data.operate_description;

      case "65":
      return "云豆充值:"+data.operate_description;

      case "66":
      return "修改永久密码";

      case "67":
      return "修改时间密码";

      case "68":
      return "清除密码任务";

      case "69":
      return "发送永久密码";

      case "70":
      return "发送临时密码";

      case "71":
      return "增加共享设备";

      case "72":
      return "登录到系统";

      case "73":
        return  "添加补贴";

      case "74":
        return  "修改补贴";

          case "75":
            return  "删除补贴";

          case "76":
            return  "新增用户";

          case "77":
            return  "用户切换不同物业标准";

          case "78":
            return  "添加物业标准";

          case "79":
            return  "修改物业标准";

          case "80":
            return  "删除物业标准";

          case "81":
            return  "人工催总费用";

          case "82":
            return  "人工催房租";

          case "83":
            return  "添加用户限流";

          case "84":
            return  "修改用户限流";

          case "85":
            return  "删除用户限流";

          case "86":
            return  "清除网关限流";

          case "87":
            return "操作合并户号";

          case "88":
            return "批量设置用户";

          case "89":
            return "查看视频监控";

          case "90":
            return "查看视频监控";

          case "91":
            return "电脑统一关机";

          case "92":
            return "电脑单一关机";
          case "93":
            return "绑定区域告警";
          case "94":
            return "删除区域告警";
          case "95":
            return "添加公司部门";
          case "96":
            return "修改公司部门";
          case "97":
            return "删除公司部门";
          case "98":
            return "修改用户信息";
          case "99":
            return "清空用户信息";
          case "100":
            return "添加公摊";
          case "101":
            return "删除用户绑定微信";
          case "102":
            return "添加宿舍管理";
          case "103":
            return "修改宿舍管理";
          case "104":
            return "删除宿舍管理";
  }
}
