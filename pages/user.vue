<template>
  <div class="container">
    <div class="show-box">
      <div class="user flex">
        <img :src="userStore.userInfo.avatar" alt="">
        <h1 class="nickname">{{ userStore.userInfo.nickname }}</h1>
      </div>
      <div class="bottom">
        <div class="option-list">
          <div :class="['option', {'active': contentType === 'collect'}]" @click="changeToCollect">
            我的收藏
          </div>
          <div :class="['option', {'active': contentType === 'editPsword'}]" @click="changeToEditPas">
            修改密码
          </div>
        </div>
        <div class="content">
          <UserCollect v-show="contentType === 'collect'"></UserCollect>
          <UserEditPassword v-show="contentType === 'editPsword'" ref="editPasRef"></UserEditPassword>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useStore from '~/composables/store'

const userStore = useStore.user()
let contentType = ref<'editPsword' | 'collect'>('collect')

const changeToCollect = () => {
  contentType.value = 'collect'
}
const editPasRef = ref()
const changeToEditPas = () => {
  contentType.value = 'editPsword'
  editPasRef.value.clearData()
}

</script>

<style lang="scss" scoped>
.show-box {
  margin-top: -10px;
  margin-bottom: 10px;
  .user{
    height: 120px;
    box-shadow: 0px 0px 5px #cacaca;
    border-radius: 5px;
    img {
      width: 80px;
      margin-left: 30px;
    }
    .nickname {
      font-size: 22px;
      margin: -40px 0 0 30px;
    }
  }
  .bottom {
    display: flex;
    margin-top: 22px;
    .option-list {
      margin-right: 30px;
      .option {
        width: 150px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        margin-bottom: 15px;
        border: 1px solid $grayLine;
        color: $grayText;
        box-sizing: border-box;
      }
      .active {
        color: white;
        background-color: $primary;
        border: none;
      }
    }
    .content {
      flex: 1;
      min-height: 440px;
      border-radius: 5px;
      box-shadow: 0px 0px 5px #cacaca;
    }
  }
}
</style>