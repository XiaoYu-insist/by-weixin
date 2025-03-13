<script lang="ts" setup>
import { ref } from "vue";

const landlords = ref([
  {
    id: 1,
    name: "张先生",
    phone: "138****1234",
    address: "北京市朝阳区建国路88号",
    status: "活跃",
    propertyCount: "2025-1-5",
    rentedCount: "2015-10-15",
  },
  {
    id: 2,
    name: "李女士",
    phone: "139****5678",
    address: "北京市海淀区中关村大街1号",
    status: "活跃",
    propertyCount: "2021-8-3",
    rentedCount: "2002-8-2",
  },
  {
    id: 3,
    name: "王先生",
    phone: "137****9012",
    address: "北京市西城区西长安街1号",
    status: "不活跃",
    propertyCount: "1357-5-2",
    rentedCount: "1682-51-8",
  },
]);


const handleMessage = (landlord: any) => {
  uni.showToast({
    title: '权限配置查看',
    icon: "none"
  })
};
const handleDel = (landlords: any) => {
  uni.showModal({
    title: '删除用户',
    content: `是否删除当前${landlords.phone}房东`,
    showCancel: true,
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: '删除成功',
          icon: 'success'
        })
      }
    }
  })
}
</script>
<template>
  <scroll-view class="content" scroll-y>
    <view class="section">
      <view class="landlord-list">
        <view v-for="(landlord, index) in landlords" :key="index" class="landlord-card ">
          <view class="landlord-info">
            <image class="avatar" src="@/static/images/user.png" mode="aspectFill"></image>
            <view class="info-content">
              <view class="name-row">
                <text class="name">{{ landlord.phone }}</text>
              </view>
              <text class="phone">{{ landlord.phone }}</text>
            </view>
            <view class="action-buttons">
              <uni-icons type="gear" size="24" color="#2196F3" @tap="handleMessage(landlord)" />
              <uni-icons type="close" color="#FF454A" size="24" @tap="handleDel(landlord)" />
            </view>
          </view>
          <view class="property-info">
            <view class="property-stat">
              <text class="property-count">{{ landlord.propertyCount }}</text>
              <text class="property-label">起始日期</text>
            </view>
            <view class="property-stat">
              <text class="property-count">{{ landlord.rentedCount }}</text>
              <text class="property-label">结束日期</text>
            </view>
          </view>

        </view>
      </view>
    </view>
  </scroll-view>
</template>



<style lang="scss">
page {
  height: 100%;
  background-color: #f8f9fa;
}

.content {
  flex: 1;
  overflow: auto;

  .section {
    padding: 30rpx;

    .landlord-card {
      background-color: #ffffff;
      border-radius: 16rpx;
      padding: 30rpx;
      margin-bottom: 20rpx;
      border-bottom: 1px solid #f0f0f0;

      .landlord-info {
        display: flex;
        gap: 20rpx;
        margin-bottom: 20rpx;

        .avatar {
          width: 100rpx;
          height: 100rpx;
          border-radius: 50%;


        }

        .info-content {
          flex: 1;

          .name-row {
            display: flex;
            align-items: center;
            gap: 20rpx;
            margin-bottom: 10rpx;

            .name {
              font-size: 16px;
              font-weight: 500;
              color: #333333;
            }
          }

          .phone {
            font-size: 14px;
            color: #666666;
            margin-bottom: 6rpx;
          }

        }

        .action-buttons {
          display: grid;
          grid-template-columns: 1fr;
          gap: 30rpx;
          margin-right: 20rpx;
        }
      }

      .property-info {
        display: flex;
        align-items: center;
        gap: 30rpx;

        .property-stat {
          display: flex;
          flex-direction: column;
          gap: 6rpx;

          .property-count {
            font-size: 16px;
            font-weight: 500;
            color: #333333;
          }

          .property-label {
            font-size: 12px;
            color: #999999;
          }
        }
      }



    }
  }
}
</style>
