<script lang="ts" setup>
import BYdevice from "@/components/BYdevice.vue";
import { ref } from "vue";
const currentNav = ref(0);
const navItems = ref([
  "电表",
  "水表",
  "热表",
  "门锁",
]);

</script>
<template>
  <view class="pages">
    <!-- 左侧导航栏 -->
    <view class="side-nav">
      <view v-for="(item, index) in navItems" :key="index" class="nav-item" :class="{ active: currentNav === index }"
        @click="currentNav = index">
        <text>{{ item }}</text>
      </view>
    </view>

    <!-- 主内容区域 -->
    <view class="main-content">
      <view v-for="item, index in navItems" :key="index">
        <BYdevice v-if="index === currentNav && currentNav !== 3" :type="currentNav" />
      </view>
      <BYdoorlocks v-if="currentNav === 3" />
    </view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  background-color: #f8f9fa;
}

.pages {
  display: flex;
  height: 100%;

  // 左侧 一级菜单
  .side-nav {
    width: 120rpx;
    height: 100%;
    background-color: #ffffff;
    border-right: 1px solid #eeeeee;
    padding: 20rpx 0;

    .nav-item {
      height: 100rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #666666;
    }

    .nav-item.active {
      color: #4caf50;
      background-color: #f8f9fa;
    }
  }

  //中心 二级菜单
  .main-content {
    flex: 1;
    padding: 30rpx;
    overflow-y: auto;
  }
}
</style>
