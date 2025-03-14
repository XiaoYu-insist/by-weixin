<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";

/**
 * 页面参数
 * type : 0 显示器日期, 1 日期消失
 * states : 选择按钮
 */
const query = defineProps<{
  type: number,
  states?: number
}>()
const billList = ref([
  { time: "2023-06-20 12:23:45", amount: "5" },
  { time: "2023-06-20 12:23:45", amount: "5" },
  { time: "2023-06-20 12:23:45", amount: "5" },
  { time: "2023-06-20 12:23:45", amount: "5" },
  { time: "2023-06-20 12:23:45", amount: "5" },
  { time: "2023-06-20 12:23:45", amount: "5" },
]);
// 工具函数：日期格式化
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 补零
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
// 定义当前日期
const range = ref([formatDate(new Date()), formatDate(new Date())])
// 用于绑定 end 属性的日期，格式为 "YYYY-MM-DD"
const today = ref('')

// 弹出窗口
const showBillDetail = (bill: any) => {
  uni.showModal({
    title: "账单详情",
    content: `充值时间：${bill.time}\n充值金额：${bill.amount}元`,
  });
};
/* 修改日期 */
const maskClick: UniHelper.UniDatetimePickerOnChange = () => {
  data()
}
// 按钮选择
const value = ref(0)
const ranges = ref([
  { value: 0, text: "充值" },
  { value: 1, text: "扣费" },
  { value: 2, text: "使用" },
])

// 按钮选择
const onchange = () => {
  data()
}
// 日期或按钮修改调用
const data = () => {
  console.log(value.value)
  console.log(range.value)
}
// 生命周期
onLoad(() => {
  today.value = formatDate(new Date())
})

</script>

<template>
  <view class="pages">
    <!-- 顶部日期选择 -->
    <view class="header">
      <uni-data-select class="data-select" v-model="value" :localdata="ranges" :clear="false" @change="onchange"
        v-if="query.states"></uni-data-select>
      <uni-datetime-picker v-if="query.type == 0" type="daterange" :clear-icon="false" @change="maskClick" />
    </view>

    <!-- 账单列表 -->
    <scroll-view class="bill-list" scroll-y>
      <view v-for="(item, index) in billList" :key="index" class="bill-item cursor-pointer" @tap="showBillDetail(item)">
        <view class="bill-left">
          <view class="icon-wrapper icon-chongzhijiaofei">
          </view>
          <view class="bill-info">
            <text class="bill-title">电表充值</text>
            <text class="bill-time">{{ item.time }}</text>
          </view>
        </view>
        <view class="bill-amount">
          <text>+{{ item.amount }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  background-color: #f8f9fa;
}

.pages {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.header {
  padding: 20rpx 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .list-opt {
    margin-right: 30rpx;
    color: #27BA9B;
    border: 1px solid #27BA9B;
    background-color: #E9F8F5,
  }

  .data-select {
    width: 120rpx;
  }
}

.date-selector {
  display: flex;
  align-items: center;
  gap: 20rpx;
  background-color: #ffffff;
  padding: 12rpx 24rpx;
  border-radius: 30rpx;
}

.date-selector text {
  font-size: 16px;
  color: #333333;
  font-weight: 500;
}



.bill-list {
  flex: 1;
  padding: 20rpx 30rpx;
  overflow: auto;
}

.bill-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  background-color: #ffffff;
  border-radius: 16rpx;
  margin-bottom: 20rpx;
}

.bill-left {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.icon-wrapper {
  width: 80rpx;
  height: 80rpx;
  border-radius: 40rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 70rpx;
}

.bill-info {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.bill-title {
  font-size: 16px;
  color: #333333;
}

.bill-time {
  font-size: 12px;
  color: #999999;
}

.bill-amount {
  font-size: 16px;
  color: #4caf50;
  font-weight: 500;
}
</style>
