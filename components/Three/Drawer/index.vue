<template>
  <div class="drawer flex">
    <div class="arrow" @click="showDrawer = !showDrawer">
      <el-icon v-show="!showDrawer"><DArrowLeft /></el-icon>
      <el-icon v-show="showDrawer"><DArrowRight /></el-icon>
    </div>
    <div class="content" v-show="showDrawer">
      <div class="room-lsit">
        <el-scrollbar>
          <div
            v-for="item in props.roomData"
            :key="item.enName"
            :class="['room-item', { 'active' : item.enName === nowRoom }]"
            @click="handleChangeRoom(item.enName)"
          >
            <img class="room-img" :src="item.frontImg" alt="">
            <p class="room-name">{{ item.name }}</p>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useStore from '@/composables/store'

const props = defineProps(['roomData'])
const emits = defineEmits(['changeRoom'])

let showDrawer = ref(false)

const vrStore = useStore.vr()
let nowRoom = ref(vrStore.nowRoom)
const handleChangeRoom = (room: string) => {
  if (nowRoom.value !== room) {
    nowRoom.value = room
    emits('changeRoom', room)
  }
}

watch(() => vrStore.nowRoom, newVal => {
  nowRoom.value = newVal
})
</script>

<style lang="scss" scoped>
.drawer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .arrow {
    height: 80px;
    line-height: 80px;
    padding: 0 2px;
    border-radius: 20px 0 0 20px;
    background-color: #ffffff88;
  }
  .content {
    width: 260px;
    height: 100%;
    border-radius: 5px 0 0 5px;
    background-color: #ffffff88;
    .room-lsit {
      height: 100%;
      padding: 10px;
      box-sizing: border-box;
      .room-item {
        margin: 15px 0;
        padding: 5px;
        box-sizing: border-box;
        background-color: #ffffffce;
        border-radius: 4px;
        cursor: pointer;
        .room-img {
          width: 100%;
          height: 120px;
          border-radius: 4px;
          object-fit: cover;
        }
        .room-name {
          font-size: 14px;
          color: black;
          text-align: center;
        }
      }
      .active {
        border: 2px solid rgba(58,126,255,.9);
      }
    }
  }
}
</style>