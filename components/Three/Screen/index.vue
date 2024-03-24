<template>
  <div class="flex">
    <div class="container" ref="containerRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Room, Sprite } from '@/utils/house'
import gsap from 'gsap'
import useStore from '@/composables/store'

// 创建场景
const scene = new THREE.Scene()
// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 0.1

const props = defineProps(['roomData'])
const emits = defineEmits(['setLoadingFalse', 'getTheta'])

const getCameraRotation = () => {
  const dirx = camera.position.x - controls.target.x
  const dirz = camera.position.z - controls.target.z
  const theta = Math.atan2(dirx, dirz) * 180 / Math.PI
  emits('getTheta', theta)
}

let controls: OrbitControls

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

const containerRef = ref<HTMLElement>()

// 渲染场景
const render = () => {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
  getCameraRotation()
}

const addCude = () => {
  // 创建房间立方体
  for (let i = 0; i < props.roomData.length; i++) {
    const room = new Room(props.roomData[i])
    scene.add(room.cube)
  }
  // 添加精灵图
  for (let i = 0; i < props.roomData.length; i++) {
    let spriteList = props.roomData[i].sprite
    for (let j = 0; j < spriteList.length; j++) {
      const sprite = new Sprite(props.roomData[i].position, spriteList[j])
      scene.add(sprite.spriteCanvas)
    }
  }

  emits('setLoadingFalse')
}

// 监听画面变化，更新渲染界面
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
})

// 监听精灵图的点击事件
window.addEventListener('click', e => {
  //通过raycaster光线投影抓取点击目标
  let raycaster = new THREE.Raycaster()
  let mouse = new THREE.Vector2()
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
  raycaster.setFromCamera(mouse, camera)

  let intersects = raycaster.intersectObjects(scene.children)
  if (intersects.length > 0 && intersects[0].object.type === 'Sprite') {
    changeRoom(intersects[0].object.name)
  }
})

const vrStore = useStore.vr()
const changeRoom = enName => {
  vrStore.setNowRoom(enName)

  props.roomData.forEach(room => {
    if (room.enName === enName) {
      const { x, y, z } = room.position
      gsap.to(camera.position, {
        x: x - (controls.target.x - camera.position.x),
        y: y,
        z: z - (controls.target.z - camera.position.z),
        duration: 1,
      })
      gsap.to(controls.target, {
        x: x,
        y: y,
        z: z,
        duration: 1,
      })
    }
  })
}

defineExpose({
  changeRoom
})

onMounted(() => {
  // 获取数据
  setTimeout(() => {
    // 添加控制器
    controls = new OrbitControls(camera, containerRef.value)
    // 设置控制器阻尼
    controls.enableDamping = true
    controls.enableZoom = false
    containerRef.value?.appendChild(renderer.domElement)
    render()

    addCude()
  }, 0)
})
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

.flex {
  display: flex;
}

.container {
  height: 100vh;
  width: 50vw;
}
</style>