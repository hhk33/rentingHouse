<template>
  <div class="container flex">
    <div class="carousel">
      <el-carousel type="card" height="240px">
        <el-carousel-item >
          <img src="~/assets/img/apartment_1.jpg" alt="">
        </el-carousel-item>
        <el-carousel-item >
          <img src="~/assets/img/apartment_2.jpg" alt="">
        </el-carousel-item>
        <el-carousel-item >
          <img src="~/assets/img/apartment_3.jpg" alt="">
        </el-carousel-item>
        <el-carousel-item >
          <img src="~/assets/img/apartment_4.jpg" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import {} from 'vue'
</script>

<style lang="scss" scoped>
.flex {
  justify-content: center;
}
.carousel {
  width: 1000px;
  img {
    width: 480px;
  }
}
</style>