<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <client-only>
      <ThreeScreen
        ref="screenRef"
        v-if="roomData.length > 0"
        :roomData="roomData"
        @setLoadingFalse="setLoadingFalse"
        @getTheta="handelGetTheta"
      />
    </client-only>
    <ThreeHouseInfo
      v-if="houseRec.title"
      class="house-info"
      :houseRec="houseRec"
    />
    <ThreeDrawer
      v-if="roomData.length > 0"
      class="house-drawer"
      :roomData="roomData"
      @changeRoom="handelChangeRoom"
    />
    <ThreeGlobal
      v-if="houseRec.globalImg && roomData.length > 0"
      class="house-global"
      :globalImg="houseRec.globalImg"
      :viewCorrect="houseRec.viewCorrect"
      :theta="theta"
      :roomData="roomData"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqGetVrData } from '@/api/vr'
import { reqGetHouseRec } from '@/api/details'
import { useRoute } from 'vue-router'

// 全屏 loading
const fullscreenLoading = ref(false)

const setLoadingFalse = () => {
  fullscreenLoading.value = false
}

const screenRef = ref()
const handelChangeRoom = enName => {
  screenRef.value.changeRoom(enName)
}

let roomData = ref<any>([])
const getVrData = async () => {
  let res = await reqGetVrData()
  if (res.code === 200) {
    res.data.forEach(item => {
      let posList = item.position.split(';')
      let eulerList = item.euler.split(';')
      let spriteList = item.sprite ? item.sprite.split(';') : []
      roomData.value.push({
        name: item.room,
        enName: item.enRoom,
        position: { x: Number(posList[0]), y: Number(posList[1]), z: Number(posList[2]) },
        euler: { x: eulerList[0], y: eulerList[1] * Math.PI, z: eulerList[2] },
        frontImg: item.frontImg,
        backImg: item.backImg,
        leftImg: item.leftImg,
        rightImg: item.rightImg,
        upImg: item.upImg,
        downImg: item.downImg,
        sprite: spriteList.length > 0 ?
         spriteList.map(item => (
          {
            dest: item.split(':')[0],
            angle: item.split(':')[1]
          }
        ))
        : [],
        globalPosition: item.globalPosition
      })
    })
  }
}

const route = useRoute()
let houseRec = ref<any>({})
const getHouseRec = async () => {
  let res = await reqGetHouseRec(route.query.houseId)
  if (res.code === 200) {
    houseRec.value = res.data
  }
}

let theta = ref(0)
const handelGetTheta = angle => {
  theta.value = angle
}

onMounted(() => {
  fullscreenLoading.value = true
  setTimeout(() => {
    getVrData()
    getHouseRec()
  }, 0)
})
</script>

<style lang="scss" scoped>
.house-info {
  position: absolute;
  top: 30px;
  left: 50px;
}
.house-drawer {
  position: absolute;
  top: 0;
  right: 0;
}
.house-global {
  position: absolute;
  bottom: 30px;
  left: 50px;
}
</style>