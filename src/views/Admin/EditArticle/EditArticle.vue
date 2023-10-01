<template>
  <div class="container">
    <!-- 头部 -->
    <div class="header">
      <div class="header_center"></div>
      <div class="header_setting">
        <button class="save_draft" @click="saveArticleDraft">保存草稿</button>
        <button class="preview" @click="">预览</button>
        <button class="publish" @click="publishArticle">发布</button>
      </div>
    </div>
    <div class="main">
      <RichText
        ref="RichTextComp"
        class="content"
        :imgSrc="imgSrc"
        :abstract="abstract"
      />
      <div class="sidebar">
        <div class="selectImg">
          <span class="selectImg_title">选择封面</span
          ><button
            class="selectImg_ts"
            ref="selectImg_tsDom"
            @click="openOverlay"
          >
            <span v-if="isShowImg">选择特色图片</span>
            <img v-else class="preSiderImg" :src="imgSrc" alt="" />
          </button>
        </div>
        <div class="abstract">
          <span class="abstract_title">简介</span
          ><textarea class="abstract_content" v-model="abstract"></textarea>
        </div>
      </div>
      <div
        class="overlay"
        ref="overlayDom"
        @dragover.prevent
        @drop="handleDrop"
      >
        <div class="modal">
          <h2>特色图片</h2>
          <button class="cancel_button" @click="closeOverlay">x</button>
          <button class="confirm_button" @click="setImg_ts">
            设置特色图片
          </button>
          <div class="upload">
            <h2>拖文件至此可上传</h2>
            <span class="and">或</span>
            <input
              type="file"
              accept="image/*"
              ref="inputDom"
              class="upload_button"
              @change="updateImg"
            />
            <span type="text" @click="uploadImg" class="file-input-trigger"
              >选择文件</span
            >
            <img v-if="isShow" :src="imgSrc" class="preImg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { uploadImgData } from '@/api/ServerAPI'
import { compressionFile, fileToDataURL } from '@/utils/util'
// 照片
const imgSrc = ref('')
// 摘要
const abstract = ref('')
const isShow = ref(false)
const isShowImg = ref(true)
const RichTextComp = ref()
const inputDom = ref()
const overlayDom = ref()
const selectImg_tsDom = ref()

const msgMap = {
  sucMsg: '上传成功',
  errMsg: '上传失败',
}
onMounted(() => {})
// 保存草稿
const saveArticleDraft = () => {
  RichTextComp.value.updateArticleDraftData()
}
// 发布
const publishArticle = () => {
  RichTextComp.value.publishArticleData()
}
const handleDrop = (event) => {
  event.preventDefault()
  const file = event.dataTransfer.files[0]
  handleUploadImg(file)
}
const handleUploadImg = async (file) => {
  let fileName = file.name
  let preBase64 = await fileToDataURL(file)
  // 0.5是压缩图片的参数，越小压缩越多画质越差
  const base64 = await compressionFile(fileName, preBase64, 0.5)
  const res = await uploadImgData(base64)
  imgSrc.value = res.image
  isShow.value = true
}
// 处理本地图片
const updateImg = async (e: any) => {
  let file = e.target.files[0]
  handleUploadImg(file)
}
// 开启上传图片
const uploadImg = () => {
  inputDom.value.click()
}
// 打开遮罩层
const openOverlay = () => {
  overlayDom.value.style.display = 'flex'
}
// 关闭遮罩层
const closeOverlay = () => {
  overlayDom.value.style.display = 'none'
}
// 设置特色图
const setImg_ts = () => {
  isShowImg.value = false
  closeOverlay()
}
</script>

<style scoped lang="scss">
.container {
  margin: 0 auto;
  .header {
    width: 100vw;
    height: 10px;
    // background-color: red;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .header_center {
      width: 80%;
    }
    .header_setting {
      display: flex;
      justify-content: center;
      width: 20%;
      .save_draft {
        height: 8px;
        margin-right: 5px;
        background-color: #fff;
        color: #000;
        border-style: none;
        border-radius: 5%;
        cursor: pointer;
      }
      .save_draft:hover {
        background-color: rgb(248, 247, 249);
      }
      .preview {
        height: 8px;
        width: 10px;
        margin-right: 5px;
        border-radius: 5%;
        cursor: pointer;
        border-style: none;
        background-color: #fff;
        color: #000;
      }
      .preview:hover {
        background-color: rgb(248, 247, 249);
      }
      .publish {
        height: 8px;
        width: 10px;
        outline-color: transparent;
        border-radius: 5%;
        background-color: rgb(82, 63, 109);
        color: #fff;
        cursor: pointer;
      }
    }
  }
  .main {
    display: flex;
    justify-content: start;
    .content {
      width: 85vw;
    }
    .sidebar {
      width: 15vw;
      // background-color: red;
      .selectImg {
        display: flex;
        flex-direction: column;
        .preSiderImg {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
        .selectImg_title {
          height: 15px;
          line-height: 15px;
          padding-left: 5px;
        }
        .selectImg_title:hover {
          background-color: #f0f0f0;
        }

        .selectImg_ts {
          height: 20px;
          width: 14vw;
          margin: 0 auto;
          margin-top: 3px;
          border-style: none;
          cursor: pointer;
        }
        .selectImg_ts:hover {
          background-color: #dddddd;
        }
      }
      .abstract {
        display: flex;
        flex-direction: column;
        .abstract_title {
          height: 15px;
          line-height: 15px;
          padding-left: 5px;
          width: 12vw;
        }
        .abstract_content {
          width: 14vw;
          margin-top: 3px;
          height: 20px;
          margin: 0 auto;
        }
      }
    }
    .overlay {
      position: relative;
      display: none; /* 初始时隐藏遮罩层 */
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.5); /* 半透明背景 */
      justify-content: center;
      align-items: center;
      .cancel_button {
        font-size: 12px;
        position: absolute;
        top: 8vh;
        right: 10vw;
        border-style: none;
        background-color: #fff;
        cursor: pointer;
      }
      .confirm_button {
        cursor: pointer;
        position: absolute;
        bottom: 10vh;
        right: 10vw;
        background-color: #a3b745;
        border: none;
        border-radius: 3px;
        color: #fff;
        padding: 3px 5px;
      }
      // .cancel_button:hover{
      //   color: ;
      // }
      .modal {
        background-color: #fff;
        padding: 20px;
        width: 90vw;
        height: 90vh;
        border-radius: 5px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
        .upload {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          .and {
            margin: 3px 0;
          }
          .upload_button {
            display: none;
          }
          /*美化自定义按钮*/
          .file-input-trigger {
            padding: 2px 5px;
            border-radius: 5px;
            border: 1px solid #3888c7;
            background-color: #3888c7;
            outline: none;
            color: #fff;
            cursor: pointer;
          }
          .preImg {
            width: 70%;
            height: 70%;
            padding: 5px;
            border-radius: 5%;
            object-fit: contain;
            margin: 0 auto;
            border: 0;
          }
        }
      }
      #closeButton {
        margin-top: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
