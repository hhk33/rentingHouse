<template>
  <div class="flex img-box">
    <el-image
      v-for="(url, index) in srcList"
      :key="url"
      class="img"
      :src="url"
      :zoom-rate="1.2"
      :max-scale="5"
      :min-scale="1"
      :preview-src-list="srcList"
      :initial-index="index"
      fit="cover"
    />
  </div>
</template>

<script setup lang="ts">
const srcList = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg'
]
</script>

<style lang="scss" scoped>
.img-box {
  flex-wrap: wrap;
  .img {
  width: 200px;
  height: 140px;
  margin: 0 0 20px 20px;
}
}
</style>