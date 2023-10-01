<template>
  <div class="container">
    <van-form
      ref="formDom"
      :model="form"
      label-width="120px"
      onsubmit="return false"
    >
      <van-field
        v-model="form.location"
        placeholder="请输入地点"
        label="地点"
        required
        :rules="rules.location"
      />
      <van-field
        v-model="form.title"
        placeholder="请输入标题"
        label="标题"
        :rules="rules.title"
      />
      <van-field
        v-model="form.scope"
        placeholder="请输入征集范围"
        label="征集范围"
        :rules="rules.scope"
      />
      <van-field
        v-model="form.number"
        label="征集人数"
        placeholder="请输入征集人数"
        type="number"
        :min="1"
        :rules="rules.number"
      />
      <van-field
        v-model="form.publisher"
        placeholder="请输入发布单位"
        label="发布单位"
        :rules="rules.publisher"
      />
      <van-field
        readonly
        clickable
        name="datetimePicker"
        v-model="form.dateStart"
        label="开始时间"
        placeholder="点击选择开始时间"
        @click="showPicker1 = true"
        :rules="rules.date"
      />
      <van-popup v-model:show="showPicker1" position="bottom">
        <van-date-picker
          type="year-month-time"
          title="选择日期"
          v-model="currentDateStart"
          :min-date="minDate"
          :max-date="maxDate"
          :columns-type="columnsType"
          @confirm="onConfirmStart"
          @cancel="showPicker1 = false"
        />
      </van-popup>

      <van-field
        readonly
        clickable
        name="datetimePicker"
        value="currentDateEnd"
        v-model="form.dateEnd"
        label="截止时间"
        placeholder="点击选择截止时间"
        @click="showPicker2 = true"
        :rules="rules.date"
      />
      <van-popup v-model:show="showPicker2" position="bottom">
        <van-date-picker
          type="datetime"
          v-model="currentDateEnd"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="onConfirmEnd"
          @cancel="showPicker2 = false"
        />
      </van-popup>

      <van-field
        v-model="form.hours"
        label="志愿时长"
        placeholder="请输入志愿时长"
        type="number"
        :min="1"
        :rules="rules.hours"
      />
      <van-field
        v-model="form.contact"
        placeholder="请输入联系人"
        label="联系人"
        :rules="rules.contact"
      />
      <van-field
        v-model="form.phone"
        label="联系方式"
        placeholder="请输入联系方式"
        type="tel"
        required
        :rules="rules.phone"
      />
      <van-field
        v-model="form.rule"
        placeholder="请输入活动规则"
        label="活动规则"
        type="textarea"
      />
      <van-field
        v-model="form.description"
        placeholder="请输入活动说明"
        label="活动说明"
        type="textarea"
      />
      <van-uploader
        v-model="fileList"
        multiple
        upload-text="选择活动宣传图"
        max-count="1"
        accept="image/*"
        preview-full-image
        :after-read="afterRead"
      />
      <van-button round block @click="onsubmit" type="info" native-type="submit"
        >提交</van-button
      >
    </van-form>
  </div>
</template>

<script setup lang="ts">
import { uploadImgData,AddActive } from '@/api/ServerAPI'
import { showSuccessToast, showFailToast } from 'vant'
let form = reactive({
  location: '',
  scope: '',
  number: null,
  // publisher: '',自定义发布方
  dateStart: '',
  dateEnd: '',
  hours: null,
  contact: '',
  phone: '',
  description: '',
  img: '',
  title: '',
  rule: '',
})
let rules = {
  location: [{ required: true, message: '请填写地点' }],
  title: [{ required: true, message: '请填写标题' }],
  scope: [{ required: true, message: '请填写征集范围' }],
  number: [
    { required: true, message: '请填写征集人数' },
    { type: 'number', message: '征集人数必须为数字' },
    { min: 1, message: '征集人数必须大于等于1' },
  ],
  publisher: [{ required: true, message: '请填写发布单位' }],
  date: [{ required: true, message: '请选择活动日期' }],
  hours: [
    { required: true, message: '请填写志愿时长' },
    { type: 'number', message: '志愿时长必须为数字' },
    { min: 1, message: '志愿时长必须大于等于1' },
  ],
  contact: [{ required: true, message: '请填写联系人' }],
  phone: [
    { required: true, message: '请填写联系方式' },
    {
      pattern: /^1[0-9]{10}$/,
      message: '请输入正确的手机号码',
    },
  ],
}
let fileList = ref([])
let showPicker1 = ref(false)
let showPicker2 = ref(false)
let minDate = new Date(2020, 0, 1)
let maxDate = new Date(2025, 10, 1)
let currentDateStart = ref(['2023', '01', '01'])
let currentDateEnd = ref(['2023', '01', '01'])
let columnsType = ['year', 'month', 'day']
const onSubmit = () => {}
// form
const formDom = ref(null)
const onsubmit = () => {
  //@ts-ignore
  formDom.value
    .validate()
    .then(() => {
      const option = {
        img: form.img,
        title: form.title, // 标题
        scope: form.scope, // 范围
        place: form.location, // 地址
        number: form.number, // 人数
        contact: form.contact, // 联系人
        contact_way: form.phone, // 联系方式
        detail: form.description, // 描述
        rule: form.rule, //规则
        duration: form.hours, //志愿时长
        start: form.dateStart, // 起始时间
        end: form.dateEnd, //截止时间
      }
      AddActive(option)
        .then((res) => {
          // 上传图片和返回消息处理
          showSuccessToast('发布成功')
        })
        .catch((error) => {
          showFailToast('发布失败')
        })
      // location.reload()
    })
    .catch(() => {})
}
const onConfirmStart = ({ selectedValues }: any) => {
  form.dateStart =
    selectedValues[0] +
    '年' +
    selectedValues[1] +
    '月' +
    selectedValues[2] +
    '日'
  showPicker1.value = false
}
const onConfirmEnd = ({ selectedValues }: any) => {
  form.dateEnd =
    selectedValues[0] +
    '年' +
    selectedValues[1] +
    '月' +
    selectedValues[2] +
    '日'
  showPicker2.value = false
}
// 上传图片
const afterRead = async (file) => {
  // base64
  const base64 = file.content
  uploadImgData(base64)
    .then((res) => {
      form.img = ''
      form.img = res.image

      file.status = 'true'
      file.message = '上传成功'
    })
    .catch(() => {
      file.status = 'false'
      file.message = '上传失败'
    })
  file.status = 'uploading'
  file.message = '上传中...'
}
</script>

<style scoped lang="scss">
.container {
  margin: 5px;
}
.van-button {
  background-image: linear-gradient(to right, #bc95c6 0%, #7dc4cc 100%);
}
</style>
@/api/ServerAPI@/api/ServerAPI
