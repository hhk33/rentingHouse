interface xyzType {
  x: number,
  y: number,
  z: number
}

interface spriteType {
  angle: number,
  dest: string
}

export interface VrData {
  room: string
  enRoom: string
  frontImg: string
  backImg: string
  leftImg: string
  rightImg: string
  topImg: string
  bottomImg: string
  position: xyzType
  euler: xyzType
  sprite: spriteType
}