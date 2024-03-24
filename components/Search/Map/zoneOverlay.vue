
<template>
  <BmOverlay
    ref="customRef"
    class="zone"
    pane="labelPane"
    @draw="draw">
    <div :style="{ fontSize: text.title.length > 4 ? 14 : 16 + 'px' }">
      <p>{{text.title}}</p>
      <p>{{text.total}}套</p>
    </div>
  </BmOverlay>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { BmOverlay } from 'vue-baidu-map-3x'

const customRef = ref()
const { text, position } = defineProps(['text', 'position'])

watch(()=>text, ()=>{
  customRef.value.reload()
}, { deep: true })

interface DrawType {
  el: HTMLElement
  BMap: any
  map: any
}
const draw = ({ el, BMap, map }: DrawType) => {
  const { lng, lat } = position
  const pixal = map.pointToOverlayPixel(new BMap.Point(lng, lat))
  el.style.left = pixal.x - 42 + 'px'
  el.style.top = pixal.y - 42 + 'px'
}
</script>

<style lang="scss" scoped>
  .zone {
    transition: background-color .15s ease-in-out;
    display: flex;
    align-items: center;
    width: 84px;
    height: 84px;
    background-color: rgba(58,126,255,0.9);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #fff;
    font-size: 12px;
    text-align: center;
    padding: 10px;
    position: absolute;
    border-radius: 50%;
    box-shadow: 0 0 4px #999;
    box-sizing: border-box;
    &:hover{
      z-index: 1;
      background-color: rgba(240,65,52,.9);
      color: #fff;
    }
    div{
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      white-space: nowrap;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        text-align: center;
        line-height: 20px;
        font-size: 14px;
      }
    }
  }
</style>

