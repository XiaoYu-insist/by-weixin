<script lang="ts" setup>
import { getRegionUserChart } from "@/services/region";
import { useReginStore } from "@/stores";
import type { onRegionUseChart } from "@/types/region";
import { onPageScroll, onReady } from "@dcloudio/uni-app";
import { ref } from "vue";
const regionStore = useReginStore()
const activeTime = ref("electricity");
// 缺省
const defaultData = ref<boolean>(false)
// loading
const loadings = ref<boolean>(false)
const switchTime = async (time: string) => {
  activeTime.value = time;
  onReuse()
};


let chartData = ref()
let opts = ref({
  color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
  padding: [15, 15, 0, 15],
  enableScroll: false,
  dataLabel: false,
  touchMoveLimit: 60,
  xAxis: {
    disableGrid: true,
    dataLabel: {
      fontSize: 12,
      color: "#666666",
      margin: 10
    },
  },
  yAxis: {
    gridType: "dash",
    dashLength: 2
  },
  extra: {
    area: {
      type: "curve",
      opacity: 0.2,
      addLine: true,
      width: 2,
      gradient: true,
      activeType: "hollow"
    }
  }
});
// 获取区域用量图表数据
const regionUsageData = ref<onRegionUseChart[]>([])
const regionUsageDataDate = async (cmd: string) => {
  chartData.value = null
  loadings.value = true
  defaultData.value = false
  const res = await getRegionUserChart({ cmd, regionid: regionStore.regionId! })
  if (res.state === '0000') {
    regionUsageData.value = res.Table!
  } else {
    regionUsageData.value = 0 as any
    defaultData.value = true
  }
  loadings.value = false
}

onReady(async () => {
  // 页面加载完成后获取数据
  onReuse()
})
const getServerData = () => {
  chartData.value = {
    categories: regionUsageData.value.map((item) => item.date.slice(-2)),
    series: [
      {
        name: "金额",
        data: regionUsageData.value.map((item) => item.money)
      },
      {
        name: "用量",
        data: regionUsageData.value.map((item) => item.amount)
      }
    ]
  };
}
const onReuse = async () => {
  disabledBtu.value = true
  await regionUsageDataDate(activeTime.value);
  if (!defaultData.value) {
    getServerData();
  }
  disabledBtu.value = false
}

// 按钮禁用
const disabledBtu = ref<boolean>(false)

defineExpose({
  getLine: onReuse,
})
</script>
<template>
  <view class="analysis-card">
    <view class="card-header">
      <text class="title">用电分析</text>
      <view class="time-selector" :disabled="true">
        <button class="cutover" :disabled="disabledBtu"
          :class="['time-option', activeTime === 'electricity' ? 'active' : '']"
          @tap="switchTime('electricity')">电</button>
        <button class="cutover" :disabled="disabledBtu" :class="['time-option', activeTime === 'water' ? 'active' : '']"
          @tap="switchTime('water')">水</button>
        <button class="cutover" :disabled="disabledBtu"
          :class="['time-option', activeTime === 'hotwater' ? 'active' : '']" @tap="switchTime('hotwater')">热</button>
      </view>
    </view>
    <view class="chart-container">
      <view class="loading-style" v-if="loadings">
        <wd-loading />
      </view>
      <view v-else class="charts-box">
        <view v-if="defaultData" class="status-tip">
          <wd-status-tip :image-size="{
            height: 60,
            width: 120
          }" image="search" tip="暂无数据" />
        </view>
        <qiun-data-charts v-else type="area" :opts="opts" :chartData="chartData" optsWatch :inScrollView="true"
          :loadingType="0" tooltipShow :ontouch="true" :canvas2d="true" :onmovetip="true" />
      </view>
    </view>
  </view>
</template>
<style lang="scss">
.analysis-card {
  background-color: #ffffff;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 200rpx;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;

    .time-selector {
      display: flex;
      gap: 20rpx;
      background-color: #f5f6fa;
      padding: 4rpx;
      border-radius: 30rpx;

      .cutover {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
      }

      .time-option {
        padding: 10rpx 30rpx;
        font-size: 14px;
        color: #666666;
        border-radius: 30rpx;
      }

      .time-option.active {
        background-color: #ffffff;
        color: #4a90e2;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }

    }
  }

  .chart-container {
    height: 260rpx;
    overflow: hidden;

    .loading-style {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }

    /* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
    .charts-box {
      width: 100%;
      height: 100%;

    }
  }
}
</style>
