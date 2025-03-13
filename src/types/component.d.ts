/**
 * declare module '@vue/runtime-core'
 *   现调整为
 * declare module 'vue'
 */
import 'vue'
import BYdevice from '@/components/BYdevice.vue'
import BYdoorlocks from '@/components/BYdoorlocks.vue'
import BYexhibitList from '@/components/BYexhibitList.vue'
declare module 'vue' {
  export interface GlobalComponents {
    BYdevice:typeof BYdevice
    BYdoorlocks:typeof BYdoorlocks
    BYexhibitList:typeof BYexhibitList
  }
}
