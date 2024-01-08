import { defineStore } from 'pinia'

export const user = defineStore('user', {
  state: () => ({
    dialogVisible: false,
  }),
  actions: {
    setDialogVisible(val: boolean) {
      this.dialogVisible = val
    },
  },
})