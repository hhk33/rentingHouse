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
import { computed } from 'vue'
const props = defineProps(['houseImg'])

const srcList = computed(() => {
  return props.houseImg.split('&')
})
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