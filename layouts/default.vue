<template>
  <div >
    <div
      class="header header-shadow"
      :style="{background: `rgba(255, 255, 255, ${opacity})`}"
      v-show="route.path !== '/realSee'"
    >
      <img src="@/assets/img/logo.png" @click="navigate('/')">
      <div class="list">
        <div class="search" v-show="opacity === 1">
          <el-input
            v-model="searchVal"
            :prefix-icon="Search"
            @keyup.enter="navigate('/search', {'search': searchVal})"
          />
        </div>
        <div class="details flex">
          <div class="btn">我要租房</div>
          <div class="btn" @click="navigate('/proprietor')">我要出租</div>
          <div  v-if="userInfo.avatar" class="btn" @click="toMessage">我的消息</div>
          <div class="login flex">
            <el-dropdown v-if="userInfo.avatar">
              <div class="flex" style="cursor: pointer;">
                <el-avatar :size="28" :src="userInfo.avatar" />
                <span class="username">{{ userInfo.nickname }}</span>
              </div>
              <template #dropdown>
                <el-dropdown-menu >
                  <el-dropdown-item @click="navigate('/user')">个人中心</el-dropdown-item>
                  <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <div v-else class="btn active" @click="setDialogVisible(true)">登录</div>
          </div>
        </div>
        <div class="operation">
          <el-dropdown>
            <el-icon :size="28"><Operation /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>我要租房</el-dropdown-item>
                <el-dropdown-item>我要出租</el-dropdown-item>
                <el-dropdown-item>联系我们</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <slot />
    <Login />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Search } from '@element-plus/icons-vue'
import useStore from '@/composables/store'
import { getUserInfo, userLogout } from '~/api/user'
import { getToken, getRefreshToken, removeToken, removeRefreshToken } from '~/utils/token'
import { storeToRefs } from 'pinia'

const userStore = useStore.user()
const { userInfo } = storeToRefs(userStore)
const { setDialogVisible, clearUserInfo } = userStore
const route = useRoute()

let searchVal = ref('')

const opacity = ref(0.2)
// 根据页面滚动，改变顶部导航栏透明度
const handleScroll = () => {
  if (route.path !== '/'){
    opacity.value = 1
    return
  }
  const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop
  if (scrollTop > 80) {
    let num = 1 - (400 - scrollTop) / 400
    opacity.value = num >= 1 ? 1 : num
  } else {
    opacity.value = 0.2
  }
}
// 监听路由变化，改变导航栏样式
watch(() => route.path, () =>{
  if (route.path !== '/'){
    opacity.value = 1
  }
}, { immediate: true })

const handleGetUserInfo = async () => {
  if (getToken()) {
    const res = await getUserInfo()
    if (res.code === 200) {
      userStore.setUserInfo(res.data)
    }
  }
}

const handleLogout = async () => {
  const res = await userLogout(getRefreshToken())
  if (res.code === 200) {
    removeToken()
    removeRefreshToken()
    clearUserInfo()
  }
}

const toMessage = () => {
  // 验证登录状态
  navigate('/message')
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  setTimeout(handleGetUserInfo, 0)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  width: 100%;
  height: $headerHigh;
  display: flex;
  align-items: center;
  justify-content:space-between;
  background-color: rgba($color: #ffffff, $alpha: 0.2);
  z-index: 99;
  img {
    width: 80px;
    margin: 5px 50px 0 $headerLeft;
    cursor: pointer;
  }
  .list {
    display: flex;
    align-items: center;
    .search {
      width: 25vw;
      height: 30px;
      background-color: transparent;
    }
    .login {
      width: 130px;
      margin: 0 40px;
      .btn {
        width: 75px;
        height: 40px;
        line-height: 40px;
        border: 40px;
      }
      .username {
        margin-left: 10px;
      }
    }
    .operation {
      margin: 0 40px;
    }
  }
}
.header-shadow {
  box-shadow: 0px 0px 5px $gray;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.details {
  display: flex;
}
.operation {
  display: none;
}

:deep(.el-tooltip__trigger:focus-visible) {
  outline: unset;
}

// @media screen and (min-width: 824px){
//   .details {
//     display: flex;
//   }
//   .operation {
//     display: none;
//   }
// }

// @media screen and (max-width: 824px) {
//   .details {
//     display: none;
//   }
//   .operation {
//     display: block;
//   }
// }
</style>