<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue';
import PaymentCard from './components/PaymentCard.vue';
import DeviceRun from './components/DeviceRun.vue';
import Electroanalysis from './components/Electroanalysis.vue';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import PageSkeleton from './components/PageSkeleton.vue';
const finis = ref(false)
onLoad(() => {
  finis.value = true
})
</script>

<template>
  <CustomNavbar />
  <scroll-view class="viewport" scroll-y enable-back-to-top v-if="finis">
    <view class="main-content">
      <!-- 收款卡片 -->
      <PaymentCard />
      <!-- 设备运行情况 -->
      <DeviceRun />
      <!-- 用电分析卡片 -->
      <Electroanalysis />
    </view>
  </scroll-view>
  <PageSkeleton v-else />
</template>

<style lang="scss">
.main-content {
  flex: 1;
  padding: 30rpx;
  overflow-y: auto;
}
</style>
