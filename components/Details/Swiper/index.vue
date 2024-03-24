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
      <img :src="srcList[0]" />
      <div class="vr" @click="toRealSee"></div>
    </swiper-slide>
    <swiper-slide>
      <img :src="srcList[1]" />
    </swiper-slide>
    <swiper-slide>
      <img :src="srcList[2]" />
    </swiper-slide>
    <swiper-slide>
      <img :src="srcList[3]" />
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
      <img :src="srcList[0]" />
    </swiper-slide>
    <swiper-slide>
      <img :src="srcList[1]" />
    </swiper-slide>
    <swiper-slide>
      <img :src="srcList[2]" />
    </swiper-slide>
    <swiper-slide>
      <img :src="srcList[4]" />
    </swiper-slide>
  </swiper>
</div>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

  const props = defineProps(['houseId', 'houseImg'])
  const srcList = computed(() => {
    return props.houseImg.split('&')
  })

  const thumbsSwiper = ref(null)
  const setThumbsSwiper = (swiper:any) => {
    thumbsSwiper.value = swiper
  }
  const modules = [FreeMode, Navigation, Thumbs]

  const toRealSee = () => {
    navigate('/realSee',
      { houseId: props.houseId }
    )
  }
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
    position: relative;
    display: flex;
    justify-content: center;
    img {
      width: 540px;
      height: 300px;
      object-fit: cover;
    }
    .vr {
      position: absolute;
      bottom: -10px;
      left: 140px;
      width: 100px;
      height: 100px;
      background: url('@/assets/img/vr.png') no-repeat;
      background-size: contain;
      cursor: pointer;
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