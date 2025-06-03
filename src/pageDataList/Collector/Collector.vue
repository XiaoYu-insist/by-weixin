<script lang="ts" setup>
import { ref } from "vue";
import { getCollectorAPi } from "@/services/collector";
import { useReginStore } from "@/stores";
import { onLoad } from "@dcloudio/uni-app";
import type { onCollectorStateData } from "@/types/collector";
const regionStore = useReginStore()
// 设备设置
const handleSettings = (collector: any) => {
  uni.showActionSheet({
    itemList: ["重新扫描", "设备配置", "设备卡号", "设备信号"],
    success: (res) => {
      uni.showToast({
        title: `选择了${res.tapIndex}操作`,
        icon: "none",
      });
      console.log(res.tapIndex);
    },
  });
};
// 删除设备
const DelDevice = (collector: any) => {
  uni.showModal({
    title: "提示",
    content: `确定删除设备 ${collector.data_collector_id} 吗？`,
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: "删除成功",
          icon: "success",
        });
      }
    },
  });
};
// 暂无数据
const noData = ref(false)
// 采集器数量
const collectorCount = ref(0)
// 在线采集器数量
const onlineCount = ref(0)
// 离线采集器数量
const offlineCount = ref(0)
// 获取采集器数据
const collecterList = ref<onCollectorStateData[]>()
const getCollectorData = async () => {
  const res = await getCollectorAPi({ cmd: 'get_data_collector', regionid: regionStore.regionId! })
  if (res.state === '0000') {
    collectorCount.value = res.count
    collecterList.value = res.Table
    onlineCount.value = res.Table!.filter((item: any) => item.data_collector_state === "1").length
    offlineCount.value = res.Table!.filter((item: any) => item.data_collector_state === "0").length
  } else if (res.state === '4001') {
    noData.value = true
  }
}
// 添加采集器
const handleAddCollector = () => {
  showActions()
};

const show = ref<boolean>(false)
const actions = ref([
  {
    name: '扫码添加'
  },
  {
    name: '人工添加'
  },
])

function showActions() {
  show.value = true
}

function close() {
  show.value = false
}

function select({ item, index }: { item: any; index: number }) {
  if (index === 0) {
    uni.scanCode({
      success: function (res) {
        uni.navigateTo({
          url: `/pageDataList/AddGateway/AddGateway?code=${res.result}`,
        });
      }
    })
  } else if (index === 1) {
    uni.navigateTo({
      url: '/pageDataList/AddGateway/AddGateway'
    })
  }
}


onLoad(() => {
  getCollectorData()
})
</script>
<template>
  <view class="status-tip" v-if="noData">
    <wd-status-tip image="search" tip="暂无数据" />
  </view>
  <scroll-view scroll-y v-else>
    <view class="content">
      <view class="stats-card">
        <view class="stat-item">
          <text class="stat-value">{{ collectorCount || 0 }}</text>
          <text class="stat-label">总数量</text>
        </view>
        <view class="stat-item">
          <text class="stat-value">{{ onlineCount || 0 }}</text>
          <text class="stat-label">在线</text>
        </view>
        <view class="stat-item">
          <text class="stat-value">{{ offlineCount || 0 }}</text>
          <text class="stat-label">离线</text>
        </view>
      </view>
      <view class="section">
        <view v-for="(collector, index) in collecterList" :key="index" class="collector-card">
          <view class="collector-info">
            <image class="device-image" src="@/static/images/Collector.png" mode="aspectFill"></image>
            <view class="info-content">
              <view class="name-row">
                <text class="device-id">设备ID: {{ collector.data_collector_id }}</text>
                <text :class="['status', collector.data_collector_state === '1' ? 'active' : 'inactive']">{{
                  collector.data_collector_state === '1' ? '在线' : '离线' }}
                </text>
                <view class="names">串口：{{ collector.serial_port_code }}</view>
                <view class="names">类型：{{ collector.data_collector_type === '0' ? '4G-LORA网关' :
                  collector.data_collector_type === '0' ? 'NB-485网关' : collector.data_collector_type === '2' ?
                    '网络-485网关' : collector.data_collector_type === '3' ? '4G-485网关' : '未知类型' }}</view>
                <view class="names">SIM：{{ collector.data_collector_sim }}</view>
                <view class="names">名称：{{ collector.addr_describe }}</view>
              </view>

            </view>
          </view>
          <view class="action-buttons">
            <uni-icons type="gear" size="24" color="#2196F3" @tap="handleSettings(collector)" />
            <uni-icons type="trash" size="24" color="#fc5d3c" @tap="DelDevice(collector)" />
          </view>
        </view>
      </view>
    </view>
    <view class="add-button " @tap="handleAddCollector">
      <uni-icons type="plusempty" size="24" color="#FFFFFF" />
    </view>
  </scroll-view>
  <wd-action-sheet v-model="show" :actions="actions" @close="close" @select="select" />
</template>



<style lang="scss">
page {
  height: 100%;
  background-color: #f8f9fa;
}

.status-tip {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .wd-status-tip {
    transform: translateY(-50%);
  }
}

.content {
  flex: 1;
  overflow: auto;
  padding: 30rpx;

  .stats-card {
    background-color: #ffffff;
    border-radius: 16rpx;
    padding: 40rpx;
    display: flex;
    justify-content: space-between;
    margin-bottom: 30rpx;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10rpx;

      .stat-value {
        font-size: 18px;
        font-weight: 600;
        color: #333333;
      }

      .stat-label {
        font-size: 14px;
        color: #999999;
      }
    }
  }

  .section {
    margin-top: 30rpx;

    .collector-card {
      background-color: #ffffff;
      border-radius: 16rpx;
      padding: 30rpx;
      margin-bottom: 20rpx;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

      .collector-info {
        display: flex;
        gap: 20rpx;
        margin-bottom: 20rpx;

        .device-image {
          width: 180rpx;
          height: 180rpx;
          border-radius: 12rpx;
        }

        .info-content {
          flex: 1;

          .name-row {
            margin-bottom: 10rpx;

            .names {
              font-size: 14px;
              font-weight: 500;
              color: #999
            }

            .device-id {
              font-size: 18px;
              color: #666666;
              margin-bottom: 6rpx;
            }

          }
        }
      }


      .action-buttons {
        display: flex;
        justify-content: flex-end;
        gap: 30rpx;
      }

    }
  }
}

.status {
  margin-left: 10rpx;
  font-size: 12px;
  padding: 4rpx 12rpx;
  border-radius: 20rpx;
}

.active {
  background-color: #e8f5e9;
  color: #4caf50;
}

.inactive {
  background-color: #ffebee;
  color: #f44336;
}

.add-button {
  position: fixed;
  right: 40rpx;
  bottom: 140rpx;
  width: 100rpx;
  height: 100rpx;
  background-color: #67b469;
  border-radius: 50rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
}
</style>
