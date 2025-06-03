<script lang="ts" setup>
import { getGatewayId } from "@/services/AddGateway";
import { useReginStore } from "@/stores";
import { onLoad } from "@dcloudio/uni-app";
import { ref, reactive, computed } from "vue";

const query = defineProps<{ code?: string }>();
const regionStore = useReginStore()
// 表单数据
const formData = reactive({
  name: "",
  type: "",
  code: "",
  location: "",
  verify: "",
  sim: ""
});

// 错误信息
const errors = reactive({
  type: "",
  code: "",
  verify: "",
  sim: ""
});

// 设备类型列表
const deviceTypes = ref([
  "4G-LORA",
  "NB-485",
  "有线-485",
  "4G-485",
]);

const validateType = () => {
  if (!formData.type) {
    errors.type = "请选择设备类型";
    return false;
  }
  errors.type = "";
  return true;
};

const validateCode = () => {
  if (!formData.code) {
    errors.code = "设备编号不能为空";
    return false;
  }
  // 设备编号格式校验：字母和数字组合
  const codeRegex = /^[A-Za-z0-9]+$/;
  if (!codeRegex.test(formData.code)) {
    errors.code = "设备编号只能包含字母和数字";
    return false;
  } else if (formData.code.length !== 8) {
    errors.code = "设备编号长度必须为8位";
    return false;
  }

  errors.code = "";
  return true;
};

const validateVerify = () => {
  // 验证码不能为空
  if (!formData.verify) {
    errors.verify = "设备编号不能为空";
    return false;
  }
  // 验证码校验
  const codeRegex = /^[A-Za-z0-9]+$/;
  if (!codeRegex.test(formData.verify)) {
    errors.verify = "验证码只能包含字母和数字";
    return false;
  } else if (formData.verify.length !== 6) {
    errors.verify = "验证码长度必须为6位";
    return false;
  }
  errors.verify = "";
  return true;
}
const validateSim = () => {
  // sim卡号校验
  if (!formData.sim) {
    errors.sim = "SIM卡号不能为空";
    return false;
  }
  errors.sim = "";
  return true;
}
// 清除特定字段的错误
const clearError = (field: "type" | "code" | "verify" | "sim") => {
  errors[field] = "";
};

// 设备类型序号
const TypeSerial = ref<string>()
// 设备类型选择变更
const onTypeChange = (e: any) => {
  const index = e.detail.value;
  TypeSerial.value = index
  formData.type = deviceTypes.value[index];
  validateType();
};

// 计算表单是否有效
const isFormValid = computed(() => {
  if (TypeSerial.value === '2') {
    return true
  } else if (TypeSerial.value === '3') {
    return (
      formData.sim &&
      !errors.sim
    );
  } else {
    return (
      formData.type &&
      formData.code &&
      formData.verify &&
      formData.sim &&
      !errors.verify &&
      !errors.type &&
      !errors.code &&
      !errors.sim
    );
  }
});

// 验证整个表单
const validateForm = () => {
  const typeValid = validateType();
  const codeValid = validateCode();
  const verifyValid = validateVerify();
  const simValid = validateSim();
  if (TypeSerial.value === '2') {
    return true
  } else if (TypeSerial.value === '3') {
    return simValid;
  } else {
    return typeValid && codeValid && verifyValid && simValid;
  }
};

// 提交表单
const submitForm = () => {
  if (validateForm()) {
    // 模拟提交成功
    uni.showToast({
      title: '成功'
    })
  }
};
// 编号数字补零
function pad(num: string, n: number) {
  let len = num.toString().length;
  while (len < n) {
    num = "0" + num;
    len++;
  }
  return num;
}
// 获取设备序号
const getGatewayIdData = async () => {
  // 模拟获取设备序号
  const res = await getGatewayId({ cmd: 'get_collector_highest_id', regionid: regionStore.regionId! });
  if (res.state === "0000") {
    formData.name = regionStore.regionId + pad((Number(res.Table![0].data_collector_id.substring(6, 10)) + 1).toString(), 4);
    formData.code = query.code?.substring(7) || "";
  }
};
// 页面加载完成后，获取设备序号
onLoad(() => {
  getGatewayIdData();
});
</script>
<template>
  <view class="device-add-page">
    <!-- 表单内容 -->
    <view class="form-container">
      <view class="form-group">
        <view class="form-item">
          <view class="form-label">
            <text>设备序号</text>
          </view>
          <view class="form-input-wrapper">
            <input class="form-input" :disabled="true" type="text" v-model="formData.name" />
          </view>
        </view>

        <view class="form-item">
          <view class="form-label">
            <text>设备类型</text>
            <text class="required">*</text>
          </view>
          <view class="form-input-wrapper" :class="{ 'error': errors.type }">
            <picker class="form-picker" :range="deviceTypes" @change="onTypeChange">
              <view class="picker-value">
                {{ formData.type || '请选择设备类型' }}
              </view>
            </picker>
            <view class="picker-arrow">
              <uni-icons type="bottom" size="14" color="#999"></uni-icons>
            </view>
          </view>
          <view v-if="errors.type" class="error-message">{{ errors.type }}</view>
        </view>

        <view v-if="TypeSerial !== '2' && TypeSerial !== '3'">
          <view class="form-item">
            <view class="form-label">
              <text>设备编号</text>
              <text class="required">*</text>
            </view>
            <view class="form-input-wrapper" :class="{ 'error': errors.code }">
              <input class="form-input" type="text" v-model="formData.code" placeholder="请输入设备编号" @blur="validateCode"
                @focus="clearError('code')" />
            </view>
            <view v-if="errors.code" class="error-message">{{ errors.code }}</view>
          </view>

          <view class="form-item">
            <view class="form-label">
              <text>验证码</text>
              <text class="required">*</text>
            </view>
            <view class="form-input-wrapper" :class="{ 'error': errors.verify }">
              <input class="form-input" type="text" v-model="formData.verify" placeholder="请输入设备编号"
                @blur="validateVerify" @focus="clearError('verify')" />
            </view>
            <view v-if="errors.verify" class="error-message">{{ errors.verify }}</view>
          </view>
        </view>
        <view class="form-item" v-if="TypeSerial !== '2'">
          <view class="form-label">
            <text>SIM卡号</text>
            <text class="required">*</text>
          </view>
          <view class="form-input-wrapper" :class="{ 'error': errors.sim }">
            <input class="form-input" type="text" v-model="formData.sim" placeholder="请输入设备编号" @blur="validateSim"
              @focus="clearError('sim')" />
          </view>
          <view v-if="errors.sim" class="error-message">{{ errors.sim }}</view>
        </view>

        <view class="form-item">
          <view class="form-label">
            <text>设备位置</text>
          </view>
          <view class="form-input-wrapper">
            <input class="form-input" type="text" v-model="formData.location" placeholder="请输入设备位置（选填）" />
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
  </view>
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

.form-group {
  background-color: #ffffff;
  border-radius: 12rpx;
  padding: 20rpx 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.form-item {
  margin-bottom: 30rpx;
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
  border-color: #3a86ff;
}
</style>
