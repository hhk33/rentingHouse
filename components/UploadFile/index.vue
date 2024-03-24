<template>
  <div >
    <el-upload
      :class="{ disabled: noUpload }"
      list-type="picture-card"
      :file-list="faceList"
      :limit="1"
      accept="image/png, image/jpeg, image/jpg"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :on-preview="handlePreview"
      style="margin-right: 20px;"
    >
      <div class="upload-content">
        <el-icon v-if="faceList.length == 0">
          <Plus />
        </el-icon>
        <label>上传{{ props.title }}</label>
      </div>
    </el-upload>
    <client-only>
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import type { UploadFile, UploadProps, UploadRawFile } from 'element-plus'
import { uploadImg } from '@/api/upload'

const props = defineProps({
  title: String,
})

const emit = defineEmits(["getIdImg"])

const faceList = ref([])
const noUpload = ref(false)
const dialogImageUrl = ref("")
const dialogVisible = ref(false)

// 限制文件类型和大小
const beforeUpload: UploadProps['beforeUpload'] = file => {
  if (file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/png') {
    ElMessage.error('图片格式需要为JPG|JPEG|PNG')
    return false
  } else if (file.size / 1024 / 1024 > 10) {
    ElMessage.error('图片大小不能超过10M')
    return false
  }
  // 进行压缩
  afterRead(file)
  return true
}

const afterRead = (file: UploadRawFile) => {
  if (!window.FileReader) {
    return
  }
  const reader = new FileReader()
  // 将file转化为base64
  reader.readAsDataURL(file)
  reader.onloadend = function() {
    const result: string = String(this.result)
    const img = document.createElement("img")
    img.src = result
    // 大小200KB以上进行压缩
    if (file.size < 200 * 1024) {
      base64ToFile(result, file.name)
    } else {
      img.onload = function() {
        const base64Img = compress(img)
        base64ToFile(base64Img, file.name)
      }
    }
  }
}

// 压缩图片
const compress = (file: HTMLImageElement) => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const imgWidth = file.width
  const imgHeight = file.height
  canvas.width = imgWidth
  canvas.height = imgHeight
  context!.drawImage(file, 0, 0, imgWidth, imgHeight)
  const base64 = canvas.toDataURL('image/jpeg', 0.4)
  return base64
}

// 将base64转换为文件
const base64ToFile = async (base64Img: string, filename: string) => {
  const arr = base64Img.split(',')
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  const file = new File([u8arr], filename, { type: 'image/jpeg' })

  let formData = new FormData()
  formData.append('file', file)
  // const url = await useFetch("/api/uploadFile", { method: 'POST', body: formData })
  const res: any = await uploadImg(formData)
  if (res.code == 200) {
    emit('getIdImg', res.data)
  }
}

const handleSuccess = () => {
  //设置为true阻止继续上传
  noUpload.value = true
  return true
}

//删除
const handleRemove = () => {
  emit('getIdImg', '')
  noUpload.value = false
}

// 预览
const handlePreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}
</script>

<style lang="scss" scoped>
:deep(.disabled .el-upload--picture-card) {
  display: none !important;
}

:deep(.el-upload) {
  width: 230px;
}

:deep(.el-upload-list__item) {
  width: 230px;
}

.upload-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: $gray;
}

:deep(.el-dialog) {
  width: 460px;
  background-color: transparent !important;
  box-shadow: none;
  .el-dialog__close {
    color: white;
  }
  .el-dialog__close:hover {
    color: $primary;
  }
  img {
    width: 100%;
  }
}
</style>