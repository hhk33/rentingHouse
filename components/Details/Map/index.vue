<template>
  <div>
    <div class="map">
      <client-only>
        <baidu-map
          class="bm-view"
          :ak=ak
          v="3.0"
          type="API"
          :center="center"
          :zoom="zoom"
        >
          <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
        </baidu-map>
      </client-only>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { BaiduMap, BmNavigation } from 'vue-baidu-map-3x'

let zoom = ref<number>(17)
let center = ref({ lng: 120.11288323904017, lat: 30.28716127860655 })
const ak: string = 'gWsRtf6ezDnGhsza10atWCW9Q5HFynpp'

onMounted(()=>{
  // 定位
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        center.value = {
          lng: position.coords.longitude,
          lat: position.coords.latitude
        }
        console.log(position.coords.longitude, position.coords.latitude)
      },
      err => {
        console.log(err)
      }
    )
  } else {
    console.log('浏览器不支持Geolocation API')
  }
})
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 300px;
  margin-bottom: 10px;
}
.bm-view {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>