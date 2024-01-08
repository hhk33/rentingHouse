<template>
  <div class="map">
    <client-only>
      <baidu-map
        class="bm-view"
        :ak=ak
        v="3.0"
        type="API"
        :center="center"
        :zoom="zoom"
        :scroll-wheel-zoom="true"
        @zoomend="handleZoom"
        @dragend="handleDragend"
      >
      <!-- 区域气泡 -->
      <div v-show="true">
        <SearchMapZoneOverlay
          v-for="item in bubbleContent.bubbleList"
          :key="item.fullSpell"
          :position="{lng: item.longitude, lat: item.latitude}"
          :text="item"
          @mouseover='selectZone(item)'
          @mouseleave='cancelZone'
          @click ="handleClickBubble(item)"
        >
        </SearchMapZoneOverlay>
      </div>
      <!-- 行政区划 -->
      <BmBoundary
        v-show="showBoundary"
        :name="zoneBoundary"
        :strokeWeight="2"
        strokeColor="blue"
        fillColor="skyblue"
        :fillOpacity="0.4"
      >
      </BmBoundary>
      </baidu-map>
      <SearchMapController/>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { BaiduMap, BmBoundary } from 'vue-baidu-map-3x'
import { location, xihuData } from '@/content/house_data'

let zoom = ref<number>(12)
let center = ref({ lng: 120.11288323904017, lat: 30.28716127860655 })
const ak: string = 'gWsRtf6ezDnGhsza10atWCW9Q5HFynpp'
let zoneBoundary = ref<string>('')
let showBoundary = ref<boolean>(false)

let bubbleContent = ref<any>(location)
// 地图更改缩放级别结束时触发
const handleZoom = (e: any) => {
  const { target } = e
  if(target.getZoom() >= 14.5) {
    bubbleContent.value = xihuData
  } else {
    bubbleContent.value = location
  }
}
// 停止拖拽地图时触发
const handleDragend = (e: any) => {
  const { target } = e
  console.log(target.getBounds())
}
// 鼠标进入区域气泡，出现区域规划
const selectZone = (item: any) => {
  zoneBoundary.value = item.posCity + item.name + ''
  showBoundary.value = true
}
// 鼠标离开区域气泡，隐藏区域规划
const cancelZone = () => {
  zoneBoundary.value = ''
  showBoundary.value = false
}
// 点击区域气泡
const handleClickBubble = (item: any) => {
  center.value = {
    lng: item.longitude,
    lat: item.latitude
  }
  zoom.value = 14.5
  bubbleContent.value = xihuData
}

onMounted(()=>{
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
  height: 600px;
  margin-bottom: 10px;
}
.bm-view {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>