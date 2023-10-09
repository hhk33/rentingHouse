<template>
  <div>
    <div class="container" ref="containerRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
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

const containerRef = ref<HTMLElement>()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 0.1
// 创建控制器
let controls: OrbitControls

//创建房间
const createGeometry = (senceData:any) => {
  const geometry = new THREE.SphereGeometry(100, 50, 50)
  const texture = new THREE.TextureLoader().load(`./images/${senceData.image}.jpg`)
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    
   })
  const sphere = new THREE.Mesh(geometry, material)
  // sphere.position.set(senceData.position.x, senceData.position.y, senceData.position.z)
  sphere.geometry.scale(1, 1, -1)
  scene.add(sphere)
  addTipsSprite(senceData.image)
}

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

// 增加精灵图
const addTipsSprite = (name:string) => {
  //创建材质
  const map = new THREE.TextureLoader().load('./images/tip.png')
  let material = new THREE.SpriteMaterial({
    map: map,
    transparent: true
  })

  const tips = name? dataList.filter(item => item.image === name)[0] : dataList[0]
  tips.tip?.forEach(tip => {
    let sprit = new THREE.Sprite(material)
    sprit.scale.set(5, 5, 5)
    sprit.position.set(tip.position.x, tip.position.y, tip.position.z)
    sprit.name = tip.image
    scene.add(sprit)
  })
}

// 切换场景
const changeScene = (name: string) => {
  const senceData = dataList.filter(item => item.image === name)
  if(senceData && senceData.length > 0){
    gsap.to(controls.target, {
      duration: 0,
      x: senceData[0].position.x,
      y: senceData[0].position.y,
      z: senceData[0].position.z,
      onComplete: () => {
        gsap.to(camera.position, {
          duration: 0.5,
          x: senceData[0].position.x + 1,
          z: senceData[0].position.z - 1,
        })
      }
    })
    controls.update()
  }
}

window.addEventListener('click', function(e){
  e.preventDefault()
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()
  mouse.x = (e.clientX / sizes.width) * 2 - 1
  mouse.y = - (e.clientY / sizes.height) * 2 + 1
  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(scene.children)
  console.log(intersects)
  if (intersects.length > 0 && intersects[0].object.type === 'Sprite') {
    changeScene(intersects[0].object.name)
  }
})

// 渲染函数
const render = () => {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

onMounted(()=>{
  // 创建各房间
  dataList.forEach(item => {
    createGeometry(item)
  })
  // 添加轨道控制台
  controls = new OrbitControls(camera, containerRef.value)
  // 增加阻尼效果
  controls.enableDamping = true
  containerRef.value?.appendChild(renderer.domElement)
  render()
})
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
}
</style>