import { useReginStore } from "@/stores"


// 请求基地址
const baseURL = 'http://www.boyun.club:8080'

const httpInterceptor = {
  invoke(options:UniApp.RequestOptions){
    // 拼接基础地址
    if(!options.url.startsWith('http')){
      options.url = baseURL + options.url
    }
    // 拼接尾部后缀名
    if(!options.url.endsWith('.ashx')){
      options.url = options.url + '.ashx'
    }
    // 设置超时时间
    options.timeout = 10000
    // 添加请求头标识
    options.header ={
      ...options.header
    }
    // 添加 token
    const regionStore = useReginStore()
    const token = regionStore.token
    if(token){
      options.header.token = token
    }
    // options.header.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VyTmFtZSI6IjE1ODgwODM1MDA4IiwiVXNlclB3ZCI6ImExMjM0NTYuIiwiQXBwUG93ZXIiOiIxMjMiLCJSZWdpb24iOiIiLCJleHAiOjM0ODQwNDg0NTQ0fQ.K-bz3ERPeRr46BUGRHoMQZ-RiUlIunoe5HAjKTVpKVg'

  }
}

// 拦截 request 请求
uni.addInterceptor('request', httpInterceptor)
// 拦截 uploadFile 文件上传
uni.addInterceptor('uploadFile', httpInterceptor)


// 传输
type Data<T>={
  state:string,
  count:number
  Table?:T,
  token?:string,
  rows?:T,

}

// 返回 Promise 对象，用于处理返回值类型
export const http = <T>(options:UniApp.RequestOptions)=>{
  return new Promise<Data<T>>((resolve,reject)=>{
    uni.request({
      ...options,
      // 成功 resolve
      success(res) {
        // 提取数据
        // 状态码 200 到300 参考 axios 的设计
        if(res.statusCode >= 200 && res.statusCode < 300){
          // 提取核心数据
          const result = res.data as Data<T>
          if(result.state === '0000'){
              resolve(result as Data<T>)
          } else {
            resolve(result)
          }
          // 状态码 4001 重新登录
        }else if (res.statusCode === 401 ){
          const reginStore = useReginStore()
          reginStore.clearAll()
          uni.navigateTo({ url: '/pages/login/login' })
          reject(res)
        }else {
          // 其他错误 -> 根据后端错误信息轻提示
          uni.showToast({
            title: '请求错误',
            icon: 'none'
          })
        }
        // 添加泛型
      },
      // 失败 reject
      fail(err) {
        // 网络错误
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(err)
      }
    })
  })
}




