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
          v-for="(item, index) in zoneGeoPoints"
          :key="index"
          :position="{lng: item.lng, lat: item.lat}"
          :text="item"
          @mouseover='selectZone(item)'
          @mouseleave='cancelZone'
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
import { zoneGeoPoints } from '@/content/mock'

let zoom = ref<number>(12)
let center = ref({ lng: 119.967111, lat: 31.810886 })
const ak: string = 'gWsRtf6ezDnGhsza10atWCW9Q5HFynpp'
let zoneBoundary = ref<string>('')
let showBoundary = ref<boolean>(false)

// 地图更改缩放级别结束时触发
const handleZoom = (e: any) => {
  console.log('Zoom', e.target.getBounds())
}
// 停止拖拽地图时触发
const handleDragend = (e: any) => {
  console.log('Dragend', e)
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

onMounted(()=>{
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