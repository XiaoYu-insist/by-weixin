import { http } from "@/utils/http";
import { ref } from "vue";

/*处理按钮*/
export const loading = ref(false)

/**
 * 用于详细设备后的按钮功能
 * @param DeviceId 设备参数
 * @param butType 按下去按钮参数
 * @param popup 底部弹窗
 */
export const setButtonTypeProcess = (DeviceId:number,butType:number,popup:any)=>{
  switch(butType)
  {
      /* 弹窗 loading */
      case 1:
          // 开启
          loading.value =true
          uni.showToast({
            title:"加载中···",
            mask:true,
            icon:'loading',
          })
          break;
      case 2:
        const res = getDatas()
        console.log(res)
          //关闭
          break;
      case 3:
          // 更新操作
          break;
      case 7:
          // 初始化
          break;
      /* 底部弹窗 */
      case 4:
          // 二维码
          popup.open('center')
          break;
      case 5:
          // 修改
          popup.open('bottom')
          break;
      case 6:
          // 充值
          popup.open('bottom')
          break;
      case 8:
          // 采集器
          popup.open('bottom')
          break;
      case 11:
          // 控制设备
          popup.open('bottom')
          break;
      /* 切换页面 */
      case 9:
          // 设备操作记录
          break;
      case 10:
          // 设备数据记录
          break;
          default:
            console.log("未处理"+butType)
  }
}


// 测试
const getDatas = ()=>{
  return http({
    method:'GET',
    url:'/App_Api/srts',
    data:{cmd:'get_nb_log',par1:'000001'}
  })
}
