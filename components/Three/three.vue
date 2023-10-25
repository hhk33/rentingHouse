<template>
  <div>
    <div class="content" ref="contentRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight - 70,
}

let dataList = [
  {
    image: 'living_room',
    position: { x: 0, y: 0, z: 0 },
    tip: [
      {
        position: { x: 0, y: -15, z: 80 },
        image: 'kitchen'
      },
      {
        position: { x: 53, y: -37, z: 70 },
        image: 'living_room_out'
      }
    ]
  },
  // {
  //   image:'living_room_out',
  //   position: { x: 0, y:0, z: 100 },
  //   tip:[]
  // },
  {
    image: 'kitchen',
    position: { x: 0, y: 0, z: 200 },
    tip: [
      {
        position: { x: 70, y: 0, z: 130 },
        image: 'living_room'
      }
    ]
  }
]

const contentRef = ref<HTMLElement>()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 0.1
// 创建控制器
let controls: OrbitControls

const geometry = new THREE.SphereGeometry(100, 50, 50)
const texture = new THREE.TextureLoader().load(`./images/living_room.jpg`)
const material = new THREE.MeshBasicMaterial({ map: texture })
const sphere = new THREE.Mesh(geometry, material)
sphere.geometry.scale(1, 1, -1)
scene.add(sphere)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)

window.addEventListener('resize', () => {
  // 更新窗口大小
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight - 70
  // 更新相机
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  // 更新渲染器
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// 渲染函数
const render = () => {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}


onMounted( () => {
  // 添加轨道控制台
  controls = new OrbitControls(camera, contentRef.value)
  // 增加阻尼效果
  controls.enableDamping = true
  contentRef.value?.appendChild(renderer.domElement)
  render()
})
</script>

<style lang="scss" scoped>
.content {
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
}
</style>