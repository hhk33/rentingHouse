<template>
  <div>
    <div class="flex keywordList">
      <p
        :class="['keyword', { 'keyword-active': word === item}]"
        v-for="item in keywordList"
        :key="item"
        @click="word = item"
      >
        {{ item }}
      </p>
    </div>
    <div class="map">
      <client-only>
        <baidu-map
          class="bm-view"
          :ak=ak
          v="3.0"
          type="API"
          :center="center"
          :zoom="zoom"
          :min-zoom="12"
          :map-click="false"
        >
          <bm-overlay pane="labelPane" class="sample" @draw="draw">
            <div ref="overlayRef">{{ props.village }}</div>
          </bm-overlay>
          <bm-local-search
            v-if="props.location"
            :keyword="props.location + word"
            :location="props.location"
            :panel="false"
            >
          </bm-local-search>
          <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
        </baidu-map>
      </client-only>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { BaiduMap, BmNavigation, BmLocalSearch, BmOverlay, useGeocoder } from 'vue-baidu-map-3x'

const props = defineProps(['location', 'village'])

const keywordList = ['公交', '地铁', '学校', '医院', '银行', '餐饮', '购物']
let word = ref('地铁')

let zoom = ref<number>(17)
let center = ref({ lng: 120.11288323904017, lat: 30.28716127860655 })
const ak: string = 'gWsRtf6ezDnGhsza10atWCW9Q5HFynpp'

const overlayRef = ref()
const draw = ({ el, BMap, map }) => {
  const offsetWidth = overlayRef.value.offsetWidth
  const pixel = map.pointToOverlayPixel(new BMap.Point(center.value.lng, center.value.lat))
  el.style.left = pixel.x - offsetWidth / 2 + 'px'
  el.style.top = pixel.y - 25 + 'px'
}

const getCenter = async () => {
  let geocoder = await useGeocoder()
  geocoder.getPoint( props.location + props.village, res => {
    nextTick(() => {
      center.value = { lng: res.lng, lat: res.lat }
    })
  })
}

watch(() => props.location, () => {
  getCenter()
})

onMounted(()=>{
  setTimeout(() => {
    getCenter()
  }, 0)
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

.sample {
  position: absolute;
  display: inline-block;
  white-space: nowrap;
  height: 30px;
  line-height: 30px;
  background: rgba(58,126,255,.9);
  color: #fff;
  text-align: center;
  padding: 6px 10px;
  font-size: 14px;
  border-radius: 2px;
}

.sample::after {
  content: '';
  position: relative;
  width: 0;
  height: 0;
  left: 0;
  top: 10px;
  border-top: 10px solid rgba(58,126,255,.9);
  border-right: 10px solid transparent;
  border-left: 10px solid transparent;
  border-bottom: 10x solid transparent;
}

.keywordList {
  margin: 0px 0 20px 0;
  .keyword {
    margin-right: 20px;
    color: $gray;
    cursor: pointer;
  }
  .keyword-active {
    color: black;
  }
  .keyword-active::after {
    content: '';
    display: block;
    position: absolute;
    margin-top: 5px;
    width: 32px;
    height: 4px;
    background: $primary;
  }
}
</style>