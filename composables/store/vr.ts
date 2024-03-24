import { defineStore } from 'pinia'

export const vr = defineStore('vr', {
  state: () => ({
    nowRoom: 'livingroom'
  }),
  actions: {
    setNowRoom(room) {
      this.nowRoom = room
    }
  },
})