import { ref } from "vue"

// 定义消息类型
type WebSocketMessage = string | ArrayBuffer

// 响应式数据
const isConnected = ref(false)
const messages = ref<WebSocketMessage[]>([])
const messageInput = ref('')
let socketTask: UniApp.SocketTask | null = null

// 初始化WebSocket
const initWebSocket = () => {
  socketTask = uni.connectSocket({
    url: 'ws://www.boyun.tech:55533',
    complete: () => {} // 可选完成回调
  })

  // 监听事件
  socketTask.onOpen(() => {
    isConnected.value = true
    console.log('WebSocket连接成功')
  })

  socketTask.onMessage((res: UniApp.OnSocketMessageCallbackResult) => {
    messages.value.push(res.data)
    console.log('收到消息:', res.data)
  })

  socketTask.onError((err) => {
    console.error('WebSocket错误:', err)
    isConnected.value = false
  })

  socketTask.onClose(() => {
    console.log('WebSocket连接关闭')
    initWebSocket()
    isConnected.value = false
  })
}

// 发送消息
export const sendMessage = (message: string) => {
  if (!isConnected.value || !socketTask) {
    uni.showToast({ title: '未连接', icon: 'none' })
    initWebSocket()
    return
  }

  socketTask.send({
    data: message,
    success: () => {
      console.log('消息发送成功:', message)
      messageInput.value = ''
    },
    fail: (err) => {
      console.error('消息发送失败:', err)
    }
  })
}

// 关闭连接
export const closeConnection = () => {
  let options: UniApp.CloseSocketOptions = {code:1000}
  if (socketTask) {
    socketTask.close(options)
    socketTask = null
  }
}
