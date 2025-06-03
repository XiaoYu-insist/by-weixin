<script lang="ts" setup>
import { ref, reactive, computed } from 'vue';
const query = defineProps<{ code?: string }>()
// 当前激活的设备类型
const activeDevice = ref('electric');

// 表单数据
const formData = reactive({
  userName: '',
  phone: '',
  address: '',
  remark: '',
  electric: {
    code: '',
    model: '',
    initialReading: '',
    location: ''
  },
  water: {
    code: '',
    model: '',
    initialReading: '',
    location: ''
  },
  heat: {
    code: '',
    model: '',
    initialReading: '',
    location: ''
  }
});

// 错误信息
const errors = reactive({
  userName: '',
  phone: '',
  address: '',
  electricCode: '',
  electricModel: '',
  electricReading: '',
  waterCode: '',
  waterModel: '',
  waterReading: '',
  heatCode: '',
  heatModel: '',
  heatReading: ''
});

// 设备型号列表
const electricModels = ref(['DDS1531', 'DTSD341', 'DDSY1352', 'DTS634', 'DTSY341']);
const waterModels = ref(['LXS-15E', 'LXSY-20E', 'LXSZ-25E', 'LXLC-20E', 'LXLG-25E']);
const heatModels = ref(['SONTEX531', 'SONTEX566', 'SONTEX789', 'ISTA SENSONIC II', 'QUNDIS Q heat 5']);

// 弹窗引用
const messagePopup = ref();
const popupType = ref('success');
const popupMessage = ref('');

// 显示消息提示
const showMessage = (message: string, type: 'success' | 'error' | 'info' | 'warn' = 'success') => {
  popupMessage.value = message;
  popupType.value = type;
  messagePopup.value.open();
};

// 切换设备类型
const toggleDevice = (device: 'electric' | 'water' | 'heat') => {
  activeDevice.value = device;
};

// 用户信息校验方法
const validateUserName = () => {
  if (!formData.userName) {
    errors.userName = '用户姓名不能为空';
    return false;
  }
  if (formData.userName.length < 2 || formData.userName.length > 20) {
    errors.userName = '用户姓名长度应为2-20个字符';
    return false;
  }
  errors.userName = '';
  return true;
};

const validatePhone = () => {
  if (!formData.phone) {
    errors.phone = '联系电话不能为空';
    return false;
  }
  // 手机号格式校验
  const phoneRegex = /^1[3-9]\d{9}$/;
  if (!phoneRegex.test(formData.phone)) {
    errors.phone = '请输入正确的手机号码';
    return false;
  }
  errors.phone = '';
  return true;
};

const validateAddress = () => {
  if (!formData.address) {
    errors.address = '安装地址不能为空';
    return false;
  }
  if (formData.address.length < 5) {
    errors.address = '请输入详细的安装地址';
    return false;
  }
  errors.address = '';
  return true;
};

// 电表设备校验方法
const validateElectricCode = () => {
  if (!formData.electric.code) {
    errors.electricCode = '电表编号不能为空';
    return false;
  }
  // 编号格式校验：字母和数字组合
  const codeRegex = /^[A-Za-z0-9]+$/;
  if (!codeRegex.test(formData.electric.code)) {
    errors.electricCode = '电表编号只能包含字母和数字';
    return false;
  }
  errors.electricCode = '';
  return true;
};

const validateElectricModel = () => {
  if (!formData.electric.model) {
    errors.electricModel = '请选择电表型号';
    return false;
  }
  errors.electricModel = '';
  return true;
};

const validateElectricReading = () => {
  if (!formData.electric.initialReading) {
    errors.electricReading = '初始读数不能为空';
    return false;
  }
  // 读数格式校验：数字
  const readingRegex = /^\d+(\.\d{1,2})?$/;
  if (!readingRegex.test(formData.electric.initialReading)) {
    errors.electricReading = '请输入正确的读数格式';
    return false;
  }
  errors.electricReading = '';
  return true;
};

// 水表设备校验方法
const validateWaterCode = () => {
  if (!formData.water.code) {
    errors.waterCode = '水表编号不能为空';
    return false;
  }
  // 编号格式校验：字母和数字组合
  const codeRegex = /^[A-Za-z0-9]+$/;
  if (!codeRegex.test(formData.water.code)) {
    errors.waterCode = '水表编号只能包含字母和数字';
    return false;
  }
  errors.waterCode = '';
  return true;
};

const validateWaterModel = () => {
  if (!formData.water.model) {
    errors.waterModel = '请选择水表型号';
    return false;
  }
  errors.waterModel = '';
  return true;
};

const validateWaterReading = () => {
  if (!formData.water.initialReading) {
    errors.waterReading = '初始读数不能为空';
    return false;
  }
  // 读数格式校验：数字
  const readingRegex = /^\d+(\.\d{1,3})?$/;
  if (!readingRegex.test(formData.water.initialReading)) {
    errors.waterReading = '请输入正确的读数格式';
    return false;
  }
  errors.waterReading = '';
  return true;
};

// 热表设备校验方法
const validateHeatCode = () => {
  if (!formData.heat.code) {
    errors.heatCode = '热表编号不能为空';
    return false;
  }
  // 编号格式校验：字母和数字组合
  const codeRegex = /^[A-Za-z0-9]+$/;
  if (!codeRegex.test(formData.heat.code)) {
    errors.heatCode = '热表编号只能包含字母和数字';
    return false;
  }
  errors.heatCode = '';
  return true;
};

const validateHeatModel = () => {
  if (!formData.heat.model) {
    errors.heatModel = '请选择热表型号';
    return false;
  }
  errors.heatModel = '';
  return true;
};

const validateHeatReading = () => {
  if (!formData.heat.initialReading) {
    errors.heatReading = '初始读数不能为空';
    return false;
  }
  // 读数格式校验：数字
  const readingRegex = /^\d+(\.\d{1,3})?$/;
  if (!readingRegex.test(formData.heat.initialReading)) {
    errors.heatReading = '请输入正确的读数格式';
    return false;
  }
  errors.heatReading = '';
  return true;
};

// 清除特定字段的错误
const clearError = (field: string) => {
  if (field in errors) {
    errors[field as keyof typeof errors] = '';
  }
};

// 设备型号选择变更
const onElectricModelChange = (e: any) => {
  const index = e.detail.value;
  formData.electric.model = electricModels.value[index];
  validateElectricModel();
};

const onWaterModelChange = (e: any) => {
  const index = e.detail.value;
  formData.water.model = waterModels.value[index];
  validateWaterModel();
};

const onHeatModelChange = (e: any) => {
  const index = e.detail.value;
  formData.heat.model = heatModels.value[index];
  validateHeatModel();
};

// 计算表单是否有效
const isFormValid = computed(() => {
  // 基础用户信息验证
  const userInfoValid = formData.userName &&
    formData.phone &&
    formData.address &&
    !errors.userName &&
    !errors.phone &&
    !errors.address;

  // 至少选择了一种设备
  const hasSelectedDevice = activeDevice.value !== '';

  // 根据选择的设备类型验证对应的设备信息
  let deviceInfoValid: string | boolean = false;

  if (activeDevice.value === 'electric') {
    deviceInfoValid = formData.electric.code &&
      formData.electric.model &&
      formData.electric.initialReading &&
      !errors.electricCode &&
      !errors.electricModel &&
      !errors.electricReading;
  } else if (activeDevice.value === 'water') {
    deviceInfoValid = formData.water.code &&
      formData.water.model &&
      formData.water.initialReading &&
      !errors.waterCode &&
      !errors.waterModel &&
      !errors.waterReading;
  } else if (activeDevice.value === 'heat') {
    deviceInfoValid = formData.heat.code &&
      formData.heat.model &&
      formData.heat.initialReading &&
      !errors.heatCode &&
      !errors.heatModel &&
      !errors.heatReading;
  }

  return userInfoValid && hasSelectedDevice && deviceInfoValid;
});

// 验证当前设备表单
const validateCurrentDeviceForm = () => {
  // 验证用户基本信息
  const userNameValid = validateUserName();
  const phoneValid = validatePhone();
  const addressValid = validateAddress();

  // 根据当前选择的设备类型验证对应的设备信息
  let deviceValid = false;

  if (activeDevice.value === 'electric') {
    const codeValid = validateElectricCode();
    const modelValid = validateElectricModel();
    const readingValid = validateElectricReading();
    deviceValid = codeValid && modelValid && readingValid;
  } else if (activeDevice.value === 'water') {
    const codeValid = validateWaterCode();
    const modelValid = validateWaterModel();
    const readingValid = validateWaterReading();
    deviceValid = codeValid && modelValid && readingValid;
  } else if (activeDevice.value === 'heat') {
    const codeValid = validateHeatCode();
    const modelValid = validateHeatModel();
    const readingValid = validateHeatReading();
    deviceValid = codeValid && modelValid && readingValid;
  }

  return userNameValid && phoneValid && addressValid && deviceValid;
};

// 提交表单
const submitForm = () => {
  if (validateCurrentDeviceForm()) {
    // 模拟提交成功
    showMessage('设备添加成功', 'success');
    setTimeout(() => {
      uni.navigateBack();
    }, 1500);
  } else {
    showMessage('请填写必填项并确保信息正确', 'error');
  }
};
</script>
<template>
  <scroll-view scroll-y class="device-add-page">
    <!-- 表单内容 -->
    <view class="form-container">
      <!-- 用户信息 -->
      <view class="form-section">
        <view class="section-header">
          <text class="section-title">用户信息</text>
        </view>
        <view class="form-group">
          <view class="form-item">
            <view class="form-label">
              <text>用户姓名</text>
              <text class="required">*</text>
            </view>
            <view class="form-input-wrapper" :class="{ 'error': errors.userName }">
              <input class="form-input" type="text" v-model="formData.userName" placeholder="请输入用户姓名"
                @blur="validateUserName" @focus="clearError('userName')" />
            </view>
            <view v-if="errors.userName" class="error-message">{{ errors.userName }}</view>
          </view>

          <view class="form-item">
            <view class="form-label">
              <text>联系电话</text>
              <text class="required">*</text>
            </view>
            <view class="form-input-wrapper" :class="{ 'error': errors.phone }">
              <input class="form-input" type="number" v-model="formData.phone" placeholder="请输入联系电话"
                @blur="validatePhone" @focus="clearError('phone')" />
            </view>
            <view v-if="errors.phone" class="error-message">{{ errors.phone }}</view>
          </view>

          <view class="form-item">
            <view class="form-label">
              <text>安装地址</text>
              <text class="required">*</text>
            </view>
            <view class="form-input-wrapper" :class="{ 'error': errors.address }">
              <input class="form-input" type="text" v-model="formData.address" placeholder="请输入安装地址"
                @blur="validateAddress" @focus="clearError('address')" />
            </view>
            <view v-if="errors.address" class="error-message">{{ errors.address }}</view>
          </view>
        </view>
      </view>

      <!-- 设备选择 -->
      <view class="device-selection">
        <view class="device-buttons">
          <view class="device-button cursor-pointer" :class="{ 'active': activeDevice === 'electric' }"
            @click="toggleDevice('electric')">
            <uni-icons :type="activeDevice === 'electric' ? 'checkbox-filled' : 'circle'" size="20"
              :color="activeDevice === 'electric' ? '#67B469' : '#999'"></uni-icons>
            <text>电表设备</text>
          </view>
          <view class="device-button cursor-pointer" :class="{ 'active': activeDevice === 'water' }"
            @click="toggleDevice('water')">
            <uni-icons :type="activeDevice === 'water' ? 'checkbox-filled' : 'circle'" size="20"
              :color="activeDevice === 'water' ? '#67B469' : '#999'"></uni-icons>
            <text>水表设备</text>
          </view>
          <view class="device-button cursor-pointer" :class="{ 'active': activeDevice === 'heat' }"
            @click="toggleDevice('heat')">
            <uni-icons :type="activeDevice === 'heat' ? 'checkbox-filled' : 'circle'" size="20"
              :color="activeDevice === 'heat' ? '#67B469' : '#999'"></uni-icons>
            <text>热表设备</text>
          </view>
        </view>
      </view>

      <!-- 电表设备信息 -->
      <view v-if="activeDevice === 'electric'" class="form-section">
        <view class="section-header">
          <text class="section-title">电表设备信息</text>
        </view>
        <view class="form-group">
          <view class="form-item">
            <view class="form-label">
              <text>电表编号</text>
              <text class="required">*</text>
            </view>
            <view class="form-input-wrapper" :class="{ 'error': errors.electricCode }">
              <input class="form-input" type="text" v-model="formData.electric.code" placeholder="请输入电表编号"
                @blur="validateElectricCode" @focus="clearError('electricCode')" />
            </view>
            <view v-if="errors.electricCode" class="error-message">{{ errors.electricCode }}</view>
          </view>

          <view class="form-item">
            <view class="form-label">
              <text>电表型号</text>
              <text class="required">*</text>
            </view>
            <view class="form-input-wrapper" :class="{ 'error': errors.electricModel }">
              <picker class="form-picker" :range="electricModels" @change="onElectricModelChange">
                <view class="picker-value">
                  {{ formData.electric.model || '请选择电表型号' }}
                </view>
              </picker>
              <view class="picker-arrow">
                <uni-icons type="bottom" size="14" color="#999"></uni-icons>
              </view>
            </view>
            <view v-if="errors.electricModel" class="error-message">{{ errors.electricModel }}</view>
          </view>

          <view class="form-item">
            <view class="form-label">
              <text>初始读数</text>
              <text class="required">*</text>
            </view>
            <view class="form-input-wrapper" :class="{ 'error': errors.electricReading }">
              <input class="form-input" type="digit" v-model="formData.electric.initialReading" placeholder="请输入初始读数"
                @blur="validateElectricReading" @focus="clearError('electricReading')" />
            </view>
            <view v-if="errors.electricReading" class="error-message">{{ errors.electricReading }}</view>
          </view>

          <view class="form-item">
            <view class="form-label">
              <text>安装位置</text>
            </view>
            <view class="form-input-wrapper">
              <input class="form-input" type="text" v-model="formData.electric.location" placeholder="请输入安装位置（选填）" />
            </view>
          </view>
        </view>
      </view>

      <!-- 水表设备信息 -->
      <view v-if="activeDevice === 'water'" class="form-section">
        <view class="section-header">
          <text class="section-title">水表设备信息</text>
        </view>
        <view class="form-group">
          <view class="form-item">
            <view class="form-label">
              <text>水表编号</text>
              <text class="required">*</text>
            </view>
            <view class="form-input-wrapper" :class="{ 'error': errors.waterCode }">
              <input class="form-input" type="text" v-model="formData.water.code" placeholder="请输入水表编号"
                @blur="validateWaterCode" @focus="clearError('waterCode')" />
            </view>
            <view v-if="errors.waterCode" class="error-message">{{ errors.waterCode }}</view>
          </view>

          <view class="form-item">
            <view class="form-label">
              <text>水表型号</text>
              <text class="required">*</text>
            </view>
            <view class="form-input-wrapper" :class="{ 'error': errors.waterModel }">
              <picker class="form-picker" :range="waterModels" @change="onWaterModelChange">
                <view class="picker-value">
                  {{ formData.water.model || '请选择水表型号' }}
                </view>
              </picker>
              <view class="picker-arrow">
                <uni-icons type="bottom" size="14" color="#999"></uni-icons>
              </view>
            </view>
            <view v-if="errors.waterModel" class="error-message">{{ errors.waterModel }}</view>
          </view>

          <view class="form-item">
            <view class="form-label">
              <text>初始读数</text>
              <text class="required">*</text>
            </view>
            <view class="form-input-wrapper" :class="{ 'error': errors.waterReading }">
              <input class="form-input" type="digit" v-model="formData.water.initialReading" placeholder="请输入初始读数"
                @blur="validateWaterReading" @focus="clearError('waterReading')" />
            </view>
            <view v-if="errors.waterReading" class="error-message">{{ errors.waterReading }}</view>
          </view>

          <view class="form-item">
            <view class="form-label">
              <text>安装位置</text>
            </view>
            <view class="form-input-wrapper">
              <input class="form-input" type="text" v-model="formData.water.location" placeholder="请输入安装位置（选填）" />
            </view>
          </view>
        </view>
      </view>

      <!-- 热表设备信息 -->
      <view v-if="activeDevice === 'heat'" class="form-section">
        <view class="section-header">
          <text class="section-title">热表设备信息</text>
        </view>
        <view class="form-group">
          <view class="form-item">
            <view class="form-label">
              <text>热表编号</text>
              <text class="required">*</text>
            </view>
            <view class="form-input-wrapper" :class="{ 'error': errors.heatCode }">
              <input class="form-input" type="text" v-model="formData.heat.code" placeholder="请输入热表编号"
                @blur="validateHeatCode" @focus="clearError('heatCode')" />
            </view>
            <view v-if="errors.heatCode" class="error-message">{{ errors.heatCode }}</view>
          </view>

          <view class="form-item">
            <view class="form-label">
              <text>热表型号</text>
              <text class="required">*</text>
            </view>
            <view class="form-input-wrapper" :class="{ 'error': errors.heatModel }">
              <picker class="form-picker" :range="heatModels" @change="onHeatModelChange">
                <view class="picker-value">
                  {{ formData.heat.model || '请选择热表型号' }}
                </view>
              </picker>
              <view class="picker-arrow">
                <uni-icons type="bottom" size="14" color="#999"></uni-icons>
              </view>
            </view>
            <view v-if="errors.heatModel" class="error-message">{{ errors.heatModel }}</view>
          </view>

          <view class="form-item">
            <view class="form-label">
              <text>初始读数</text>
              <text class="required">*</text>
            </view>
            <view class="form-input-wrapper" :class="{ 'error': errors.heatReading }">
              <input class="form-input" type="digit" v-model="formData.heat.initialReading" placeholder="请输入初始读数"
                @blur="validateHeatReading" @focus="clearError('heatReading')" />
            </view>
            <view v-if="errors.heatReading" class="error-message">{{ errors.heatReading }}</view>
          </view>

          <view class="form-item">
            <view class="form-label">
              <text>安装位置</text>
            </view>
            <view class="form-input-wrapper">
              <input class="form-input" type="text" v-model="formData.heat.location" placeholder="请输入安装位置（选填）" />
            </view>
          </view>
        </view>
      </view>

      <!-- 按钮信息 -->
      <view class="form-section">
        <view class="section-header">
          <text class="section-title">需求开关</text>
        </view>
        <view class="form-group">
          <view class="form-item">
            <view class="form-label">
              <text>按钮开关</text>
            </view>
            <view class="form-input-wrapper textarea-wrapper">
              <wd-switch v-for="index in 12" :key="index" />
              <textarea class="form-textarea" v-model="formData.remark" placeholder="请输入备注说明（选填）" />
            </view>
          </view>
        </view>
      </view>

      <view class="form-actions">
        <button class="submit-btn cursor-pointer" :disabled="!isFormValid" :class="{ 'btn-disabled': !isFormValid }"
          @click="submitForm">
          提交
        </button>
      </view>
    </view>
  </scroll-view>
</template>

<style>
page {
  height: 100%;
  background-color: #f5f7fa;
}

.device-add-page {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* 导航栏样式 */
.nav-bar {
  display: flex;
  align-items: center;
  height: 90rpx;
  background-color: #ffffff;
  padding: 0 30rpx;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 10;
}

.nav-left {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
}

.nav-title {
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  color: #333333;
}

.nav-right {
  width: 120rpx;
  text-align: right;
}

.save-btn {
  font-size: 14px;
  color: #67B469;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  line-height: normal;
}

.save-btn::after {
  border: none;
}

.save-btn[disabled] {
  color: #999999;
  background: none;
}

/* 表单容器 */
.form-container {
  flex: 1;
  padding: 30rpx;
  overflow-y: auto;
}

.form-section {
  margin-bottom: 30rpx;
}

.section-header {
  margin-bottom: 16rpx;
  padding-left: 20rpx;
  border-left: 6rpx solid #67B469;
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  color: #333333;
}

.form-group {
  background-color: #ffffff;
  border-radius: 12rpx;
  padding: 20rpx 30rpx;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.form-item {
  margin-bottom: 30rpx;
}

.form-item:last-child {
  margin-bottom: 10rpx;
}

.form-label {
  font-size: 14px;
  color: #333333;
  margin-bottom: 16rpx;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.required {
  color: #ff4d4f;
  margin-left: 8rpx;
}

.form-input-wrapper {
  position: relative;
  border: 1px solid #e0e0e0;
  border-radius: 8rpx;
  overflow: hidden;
  transition: all 0.3s;
}

.form-input-wrapper.error {
  border-color: #ff4d4f;
}

.form-input {
  width: 100%;
  height: 80rpx;
  padding: 0 20rpx;
  font-size: 14px;
  color: #333333;
}

.form-picker {
  width: 100%;
  height: 80rpx;
  position: relative;
}

.picker-value {
  height: 80rpx;
  line-height: 80rpx;
  padding: 0 20rpx;
  font-size: 14px;
  color: #333333;
}

.picker-arrow {
  position: absolute;
  right: 20rpx;
  top: 50%;
  transform: translateY(-50%);
}

.textarea-wrapper {
  height: 180rpx;
}

.form-textarea {
  width: 100%;
  height: 160rpx;
  padding: 20rpx;
  font-size: 14px;
  color: #333333;
}

.error-message {
  font-size: 12px;
  color: #ff4d4f;
  margin-top: 8rpx;
  padding-left: 10rpx;
}

/* 设备选择样式 */
.device-selection {
  margin-bottom: 30rpx;
}

.device-buttons {
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  border-radius: 12rpx;
  padding: 20rpx;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.device-button {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 80rpx;
  margin: 0 10rpx;
  border-radius: 8rpx;
  background-color: #f5f7fa;
  transition: all 0.3s;
}

.device-button:first-child {
  margin-left: 0;
}

.device-button:last-child {
  margin-right: 0;
}

.device-button.active {
  background-color: #e6f0ff;
  color: #67B469;
}

.device-button text {
  margin-left: 10rpx;
  font-size: 14px;
}

/* 按钮样式 */
.form-actions {
  margin-top: 60rpx;
  margin-bottom: 40rpx;
}

.submit-btn {
  width: 100%;
  height: 90rpx;
  line-height: 90rpx;
  background-color: #67B469;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  border-radius: 45rpx;
  border: none;
}

.submit-btn::after {
  border: none;
}

.btn-disabled {
  background-color: #cccccc;
  color: #ffffff;
}

.cursor-pointer {
  cursor: pointer;
}

/* 占位符样式 */
input::placeholder,
textarea::placeholder {
  color: #999999;
}

/* 输入框获得焦点样式 */
.form-input:focus,
.form-textarea:focus {
  border-color: #67B469;
}
</style>
