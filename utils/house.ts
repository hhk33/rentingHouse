import * as THREE from 'three'
import type { VrData } from '@/type/vr'

export class Room {
  name: string = ''
  cube: THREE.Mesh

  constructor(
    roomData: VrData,
  ){
    this.name = roomData.room
    const geometry = new THREE.BoxGeometry(10, 10, 10)
    geometry.scale(1, 1, -1)

    const arr = [`leftImg`, `rightImg`, `upImg`, `downImg`, `backImg`, `frontImg`]
    const boxMaterials: THREE.MeshBasicMaterial[] = []

    arr.forEach(item => {
      const texture = new THREE.TextureLoader().load(roomData[item])
      boxMaterials.push(new THREE.MeshBasicMaterial({ map: texture }))
    })

    this.cube = new THREE.Mesh(geometry, boxMaterials)

    const position = new THREE.Vector3(roomData.position.x, roomData.position.y, roomData.position.z)
    const euler = new THREE.Euler(roomData.euler.x, roomData.euler.y, roomData.euler.z)
    this.cube.position.copy(position)
    this.cube.rotation.copy(euler)
  }
}

export class Sprite {
  spriteCanvas: THREE.Sprite
  constructor(
    position = { x: 0, y: 0, z: 0 },
    spriteItem: any
  ) {
    const map = new THREE.TextureLoader().load('img/icon/tip.png')
    const material = new THREE.SpriteMaterial({ map })
    this.spriteCanvas = new THREE.Sprite(material)

    const { angle, dest } = spriteItem
    const xPos = position.x + Math.cos( angle * Math.PI / 180 ) * 4
    const zPos = position.z + Math.sin( angle * Math.PI / 180 ) * 4
    this.spriteCanvas.scale.set(0.25, 0.25, 0)
    this.spriteCanvas.position.set(xPos, 0, zPos)
    this.spriteCanvas.name = dest
  }
}