<template>
<div class="swiper-box flex">
  <swiper
    :spaceBetween="10"
    :navigation="true"
    :thumbs="{ swiper: thumbsSwiper }"
    :modules="modules"
    :loop="true"
    class="mySwiper2"
  >
    <swiper-slide>
      <img src="@/assets/img/apartment_1.jpg" />
    </swiper-slide>
    <swiper-slide>
      <img src="@/assets/img/apartment_2.jpg" />
    </swiper-slide>
    <swiper-slide>
      <img src="@/assets/img/apartment_3.jpg" />
    </swiper-slide>
    <swiper-slide>
      <img src="@/assets/img/apartment_4.jpg" />
    </swiper-slide>
  </swiper>
  <swiper
    @swiper="setThumbsSwiper"
    :spaceBetween="10"
    :slidesPerView="4"
    :freeMode="true"
    :watchSlidesProgress="true"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide>
      <img src="@/assets/img/apartment_1.jpg" />
    </swiper-slide>
    <swiper-slide>
      <img src="@/assets/img/apartment_2.jpg" />
    </swiper-slide>
    <swiper-slide>
      <img src="@/assets/img/apartment_3.jpg" />
    </swiper-slide>
    <swiper-slide>
      <img src="@/assets/img/apartment_4.jpg" />
    </swiper-slide>
  </swiper>
</div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

  const thumbsSwiper = ref(null)
  const setThumbsSwiper = (swiper:any) => {
    thumbsSwiper.value = swiper
  }
  const modules = [FreeMode, Navigation, Thumbs]
</script>

<style lang="scss" scoped>
.swiper-box {
  margin-top: -20px;
  border-radius: 5px;
}
.mySwiper2 {
  height: 100%;
  width: 800px;
  .swiper-slide {
    display: flex;
    justify-content: center;
    img {
      width: 540px;
      height: 300px;
      object-fit: cover;
    }
  }
  .swiper-button-prev {
    color: $primary;
  }
}
.mySwiper {
  width: 130px;
  box-sizing: border-box;
  margin-left: 20px;

  :deep(.swiper-wrapper) {
    display: flex;
    flex-direction: column;
  }
  .swiper-slide {
    width: 100% !important;
    height: 25%;
    opacity: 0.4;
    img {
      width: 126px;
      height: 70px;
      object-fit: cover;
    }
  }
  .swiper-slide-thumb-active {
    opacity: 1;
  }
  .swiper-slide + .swiper-slide {
    padding-top: 5px;
    box-sizing: border-box;
  }
}
</style>