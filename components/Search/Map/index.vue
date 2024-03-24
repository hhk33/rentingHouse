<template>
  <div class="map">
    <client-only>
      <baidu-map
        class="bm-view"
        ref="MapRef"
        :ak=ak
        v="3.0"
        type="API"
        :center="center"
        :zoom="zoom"
        :min-zoom="10"
        :scroll-wheel-zoom="true"
        @ready="handleMapReady"
        @zoomend="handleZoom"
        @dragend="handleDragend"
      >
      <!-- 区域气泡 -->
      <div v-if="bubbleContent.length > 0">
        <SearchMapZoneOverlay
          v-for="item in bubbleContent"
          :key="item.uuid"
          :position="{lng: item.loc[0], lat: item.loc[1]}"
          :text="item"
          @mouseover='selectZone(item)'
          @mouseleave='cancelZone'
          @click ="handleClickBubble(item)"
        >
        </SearchMapZoneOverlay>
      </div>
      <!-- 行政区划 -->
      <BmBoundary
        v-if="bubbleContent.length > 0 && showBoundary"
        :name="zoneBoundary"
        :strokeWeight="2"
        strokeColor="blue"
        fillColor="skyblue"
        :fillOpacity="0.4"
      >
      </BmBoundary>
      </baidu-map>
      <SearchMapController
        ref="filterRef"
        :pageInfo="pageInfo"
        @loadPageInfo="loadPageInfo"
        @searchWithOptions="searchWithOptions"
      />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { BaiduMap, BmBoundary } from 'vue-baidu-map-3x'
import { search, getHouseRecs } from '~/api/map'

let zoom = ref<number>(12)
let center = ref({ lng: 120.10139394631173, lat: 30.31757413000221 })
const ak: string = 'gWsRtf6ezDnGhsza10atWCW9Q5HFynpp'
let zoneBoundary = ref<string>('')
let showBoundary = ref<boolean>(false)

let pageNum = 1
let pageSize = 5

let bubbleContent = ref<any>([])
let pageInfo = ref<any>({})

let Me: number, Se: number, be: number, de: number = 0

const filterRef = ref()
const handleSearch = () => {
  const params: any = {}
  for (let option in filterRef.value.form) {
    const obj = filterRef.value.form[option]
    if ( typeof obj === 'object'&& obj !== null && Array.isArray(obj) ) {
      params[option] = filterRef.value.form[option].join(',')
    }
    else {
      params[option] = filterRef.value.form[option]
    }
  }
  params['priceMin'] = filterRef.value.form.priceRange.minn
  params['priceMax'] = filterRef.value.form.priceRange.maxn
  params['pageNum'] = pageNum
  params['pageSize'] = pageSize
  return params
}

const mapSearch = async (e: any) => {
  pageNum = 1
  let params = handleSearch()
  const { target } = e
  params.maxLng = target.getBounds().Me
  Me = params.maxLng
  params.minLng = target.getBounds().Se
  Se = params.minLng
  params.maxLat = target.getBounds().be
  be = params.maxLat
  params.minLat = target.getBounds().de
  de = params.minLat
  params.zoom = zoom.value
  params.pageNum = pageNum
  params.pageSize = pageSize
  search(params).then((res: any) => {
    if (res.code === 200) {
      bubbleContent.value = res.data.list
      pageInfo.value = res.data.pageInfo
    }
  })
}

const searchWithOptions = () => {
  pageNum = 1
  let params = handleSearch()
  params.maxLng = Me
  params.minLng = Se
  params.maxLat = be
  params.minLat = de
  params.zoom = zoom.value
  params.pageNum = pageNum
  params.pageSize = pageSize
  search(params).then((res: any) => {
    if (res.code === 200) {
      bubbleContent.value = res.data.list
      pageInfo.value = res.data.pageInfo
    }
  })
}

const handleMapReady = () => {
  zoom.value = 12
}

// 地图更改缩放级别结束时触发
const handleZoom = (e: any) => {
  zoom.value = e.target.getZoom()
  mapSearch(e)
}

// 停止拖拽地图时触发
const handleDragend = (e: any) => {
  mapSearch(e)
}

// 鼠标进入区域气泡，出现区域规划
const selectZone = (item: any) => {
  zoneBoundary.value = item.title
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
    lng: item.loc[0],
    lat: item.loc[1]
  }
  if (zoom.value < 13) {
    zoom.value = 13.1
  } else if (zoom.value < 15) {
    zoom.value = 15.1
  }
}

// 无限滚动
const loadPageInfo = async () => {
  pageNum++
  let params = handleSearch()
  params.maxLng = Me
  params.minLng = Se
  params.maxLat = be
  params.minLat = de
  params.zoom = zoom.value
  params.pageNum = pageNum
  params.pageSize = pageSize
  let res: any = await getHouseRecs(params)
  if (res.code === 200) {
    res.data.forEach((item: any) => {
      pageInfo.value.data.push(item)
    })
  }
}

onMounted(()=>{
  setTimeout(() => {
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
  }, 0)
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