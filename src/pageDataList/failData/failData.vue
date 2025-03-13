<script setup lang="ts">
import { ref } from 'vue';
import { onReady } from '@dcloudio/uni-app';

interface ErrorItem {
  id: number;
  title: string;
  description: string;
}

// 响应式数据
const errorList = ref<ErrorItem[]>([]);
const loading = ref(false);
const page = ref(1);
const pageSize = 10;

// 初始化加载数据
const loadData = async (page: number) => {
  loading.value = true;

  // 模拟接口请求
  setTimeout(() => {
    const newData: ErrorItem[] = Array.from({ length: pageSize }, (_, i) => ({
      id: Date.now() + i,
      title: `操作失败 ${(page - 1) * pageSize + i + 1}`,
      description: '这里显示具体的错误描述信息，可以显示多行内容'
    }));

    if (page === 1) {
      errorList.value = newData;
    } else {
      errorList.value = [...errorList.value, ...newData];
    }

    loading.value = false;
  }, 1000);
};

// 加载更多
const loadMore = () => {
  if (loading.value) return;
  page.value += 1;
  loadData(page.value);
};

// 删除项目
const deleteItem = (index: number) => {
  uni.showModal({
    title: '提示',
    content: '确定要删除这条记录吗？',
    success: (res) => {
      if (res.confirm) {
        errorList.value.splice(index, 1);
        uni.showToast({ title: '删除成功', icon: 'success' });
      }
    }
  });
};


// 初始化加载
onReady(() => {
  loadData(1);
});
</script>

<template>
  <!-- 失败列表 -->
  <scroll-view scroll-y @scrolltolower="loadMore">
    <view class="error-list">
      <!-- 空状态 -->
      <view v-if="errorList.length === 0" class="empty-container">
        <text class="empty-text">暂无失败记录</text>
      </view>

      <!-- 列表内容 -->
      <view v-for="(item, index) in errorList" :key="item.id" class="error-item">
        <view class="item-left">
          <text class="error-title">{{ item.title }}</text>
          <text class="error-desc">{{ item.description }}</text>
        </view>

        <!-- 删除按钮 -->
        <view class="item-right" @click="deleteItem(index)">
          <uni-icons type="trash" size="24" color="#999" />
        </view>
      </view>
      <!-- 加载状态 -->
      <view v-if="loading" class="loading-container">
        <uni-icons type="spinner-cycle" size="24" color="#007AFF" class="loading-icon" />
        <text class="loading-text">加载中...</text>
      </view>
    </view>
  </scroll-view>
</template>

<style lang="scss">
.error-list {
  border-radius: 12rpx;
  padding: 30rpx;
}

.error-item {
  display: flex;
  align-items: center;
  margin: 20rpx 0;
  padding: 30rpx;
  border-radius: 25rpx;
  background-color: #fff;


  &:last-child {
    border-bottom: none;
  }
}

.item-left {
  flex: 1;
  margin-right: 20rpx;
}


.error-title {
  font-size: 32rpx;
  color: #333;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.error-desc {
  font-size: 28rpx;
  color: #666;
  line-height: 1.5;
}

.item-right {
  padding: 20rpx;
}

.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100rpx 0;
}


.empty-text {
  color: #999;
  font-size: 28rpx;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30rpx 0;
}

.loading-icon {
  animation: rotate 1s linear infinite;
  margin-right: 10rpx;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  color: #007AFF;
  font-size: 28rpx;
}
</style>
