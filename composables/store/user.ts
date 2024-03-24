import { defineStore } from 'pinia'
import { UserInfo } from '~/types/login'

export const user = defineStore('user', {
  state: () => ({
    dialogVisible: false,
    userInfo: {
      nickname: '',
      avatar: '',
      userId: 0,
      status: '00'
    }
  }),
  actions: {
    setDialogVisible(val: boolean) {
      this.dialogVisible = val
    },
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
    },
    clearUserInfo() {
      this.userInfo = {
        nickname: '',
        avatar: '',
        userId: 0,
        status: '00'
      }
    }
  },
})