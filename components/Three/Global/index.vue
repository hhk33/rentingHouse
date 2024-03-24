<template>
  <div class="global">
    <img class="global-img" :src="globalImg"/>
    <img
      class="view-img"
      src="/img/icon/view.png"
      :style="{
        transform: `rotate(${viewCorrect - theta}deg)`,
        top: `${ top }px`,
        left: `${ left }px`
      }"
      alt="">
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useStore from '@/composables/store'

const props = defineProps(['globalImg', 'viewCorrect', 'theta', 'roomData'])
const globalImg = ref(props.globalImg)
const viewCorrect = ref(props.viewCorrect)

const vrStore = useStore.vr()
const list = props.roomData[0].globalPosition.split(';')
let top = ref(list[0])
let left = ref(list[1])
watch(() => vrStore.nowRoom, () => {
  findRoom()
})

const findRoom = () => {
  props.roomData.forEach(room => {
    if (room.enName === vrStore.nowRoom) {
      const posList = room.globalPosition.split(';')
      top.value = posList[0]
      left.value = posList[1]
    }
  })
}
</script>

<style lang="scss" scoped>
.global {
  position: relative;
  width: 200px;
  height: 240px;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: #ffffff88;
  .global-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .view-img {
    position: absolute;
    width: 50px;
    height: 50px;
    transform-origin: 50% 90%;
  }
}
</style>