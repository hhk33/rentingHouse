<template>
  <div class="show-box">
    <span class="subheading">正在出售！</span>
    <p class="heading">房东直租</p>
    <el-carousel
      class="carousel"
      :autoplay="false"
      :type="carouselType"
      arrow="always"
      height="400"
    >
      <el-carousel-item v-for="item in 3" :key="item">
        <div class="content">
        </div>
        <div class="about"></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

let carouselType = ref<'card'|''>('card')
const handleResize = () => {
  if (window.innerWidth >= 1024) {
    carouselType.value = 'card'
  } else {
    carouselType.value = ''
  }
}

onMounted(() => {
  // 监听浏览器窗口大小变化
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style lang="scss" scoped>
.about {
  position: relative;
  top: -80px;
  width: 80%;
  height: 150px;
  border-radius: 20px;
  margin: 0px auto;
  background-color: $gray;
}
.carousel {
  width: 100%;
  min-width: 500px;
  margin-top: 40px;
  .content {
    width: 100%;
    height: 100%;
    background: url('@/assets/img/landload.png');
    background-size: cover;
  }
}

</style>