<template>
  <div class="background">
    <div class="container">
      <div class="flex">
        <div class="list">
          <el-scrollbar height="560px">
            <div
              :class="['item', 'flex', { 'item-active': item.toId === toId }]"
              v-for="item in userList"
              :key="item.toId"
              @click.prevent.stop="toChat(item.toId)"
            >
              <img class="item-avatar" :src="item.avatar" alt="">
              <div>
                <h3 class="item-nickname">{{ item.nickname }}</h3>
                <p class="item-lastmsg">{{ filter(item.msg) }}</p>
              </div>
            </div>
          </el-scrollbar>
        </div>
        <div class="chat">
          <div class="chat-content">
            <el-scrollbar
              ref="scrollbarRef"
              height="432px"
              @scroll="handleScroll"
            >
              <div v-for="item in messageList" :key="item.sendDate + item.from + item.to">
                <div v-if="item.from !== fromId" class="chat-item flex">
                  <img :src="toAvatar" alt="">
                  <p class="chat-p" v-html="newLine(item.msg)"></p>
                </div>
                <div v-if="item.from == fromId" class="chat-item item-right flex">
                  <p class="chat-p chat-p-right" v-html="newLine(item.msg)"></p>
                  <img :src="userStore.userInfo.avatar" alt="">
                </div>
              </div>
            </el-scrollbar>
          </div>
          <div class="chat-input">
            <el-input
              v-model="msg"
              :style="{width: '100%', fontSize: '16px'}"
              resize="none"
              :autosize="{ minRows: 4, maxRows: 4 }"
              type="textarea"
              placeholder="Please input"
            />
            <div class="input-btn" @click="sendMsg">
              <el-icon class="input-icon" color="#ffffff" :size="22"><Promotion /></el-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from 'vue'
import { reqQueryMessageList, reqQueryUserList } from '@/api/message'
import { regGetBrokerById } from '@/api/info'
import useStore from '~/composables/store'
import { useRoute } from 'vue-router'

const route = useRoute()
const userStore = useStore.user()
let msg = ref('')
let socket: WebSocket
let fromId = 'user' + userStore.userInfo.userId
const initSocket = () => {
  try {
    socket = new WebSocket(`ws://localhost:8080/ws/${fromId}`)
    socket.onopen = () => {
      console.log("连接成功")
    }
    socket.onerror = () => {
      console.log("连接错误")
      reConnect()
    }
    socket.onmessage = e => {
      const data = JSON.parse(e.data)
      messageList.value.push(data)
      nextTick(() => {
        scrollbarRef.value.setScrollTop(scrollbarRef.value.wrapRef.scrollHeight)
      })
    }
  }catch (e) {
  }
}

const reConnect = () => {
  initSocket()
}

const sendMsg = () => {
  if(userStore.userInfo.userId){
    let data = {
      toId: toId.value,
      msg: msg.value
    }
    socket.send(JSON.stringify(data))
    messageList.value.push({
      to: toId.value,
      from: fromId,
      msg: msg.value,
      sendDate: new Date().getTime()
    })
    msg.value = ''
    nextTick(() => {
      scrollbarRef.value.setScrollTop(scrollbarRef.value.wrapRef.scrollHeight)
    })
  } else {
    ElMessage.error('请先登录')
    userStore.dialogVisible = true
  }
}

let toId = ref('')
let toAvatar = ref('')
let userList = ref<any[]>([])
const queryUserList = async () => {
  let res: any = await reqQueryUserList(fromId)
  if (res.code === 200) {
    userList.value = res.data
    // 从房源进入
    if (route.query.to) {
      const broker = route.query.to
      const item = userList.value.find((item: any) => item.toId === broker)
      // 存在过聊天记录
      if (item) {
        const index = userList.value.indexOf(item)
        userList.value.splice(index, 1)
        userList.value.unshift(item)
      } else {
        const brokerId = Number(broker.slice(6))
        let res: any = await regGetBrokerById(brokerId)
        if (res.code === 200) {
          userList.value.unshift({
            toId: broker,
            avatar: res.data.avatar,
            msg: '',
            nickname: res.data.nickname
          })
        }
      }
    }
    toId.value = res.data[0].toId
    toAvatar.value = res.data[0].avatar
  }
}

let pageNum = 1
let messageList = ref<any[]>([])
const queryMessageList = async () => {
  let res:any = await reqQueryMessageList(fromId, toId.value, pageNum, 10)
  if (res.code === 200) {
    messageList.value = res.data.reverse()
  }
  nextTick(() => {
    scrollbarRef.value.setScrollTop(scrollbarRef.value.wrapRef.scrollHeight)
  })
}

const filter = computed(() => {
  return (str:string) => {
    if (str.length > 10) {
      return str.substring(0, 10) + '...'
    }
    return str
  }
})

const newLine = computed(() => {
  return (str:string) => {
    return str.replace(/\n/g, '<br/>')
  }
})

const toChat = (id:any) => {
  toId.value = id
  toAvatar.value = userList.value.find((item:any) =>
    item.toId === id
  ).avatar
  pageNum = 1
  queryMessageList()
}

const handleScroll = async (pos: any) => {
  if(pos.scrollTop <= 0) {
    pageNum++
    let res:any = await reqQueryMessageList(fromId, toId.value, pageNum, 10)
    if (res.code === 200) {
      res.data.forEach((item: any) => {
        messageList.value.unshift(item)
      })
    }
  }
}

const scrollbarRef = ref()
onMounted(() => {
  setTimeout(async () => {
    if (userStore.userInfo.userId) {
      fromId = 'user' + userStore.userInfo.userId
      await queryUserList()
      await queryMessageList()
      initSocket()
    } else {
      userStore.dialogVisible = true
    }
    nextTick(() => {
      scrollbarRef.value.setScrollTop(scrollbarRef.value.wrapRef.scrollHeight)
    })
  }, 0)
})

onBeforeUnmount(() => {
  // socket.onclose = () => {
  //   console.log("关闭连接")
  // }
})
</script>

<style lang="scss" scoped>
.background {
  background: linear-gradient(135deg, #D1FAE5 0, #ffffff 55%);
}
.container {
  width: 1060px;
  padding-left: 0;
  margin: 0 auto;
  .list, .chat {
    width: 240px;
    height: 560px;
    margin: 0 5px;
    // border: 1px solid #ccc;
    border-radius: 5px;
  }
  .chat {
    width: 800px;
    display: flex;
    flex-direction: column;
    border: none;
    .chat-content {
      position: relative;
      width: 100%;
      flex: 1;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    .chat-item {
      margin: 10px 20px 30px 20px;
      align-items: flex-start;
      .chat-p {
        max-width: 600px;
        display: inline-block;
        padding: 10px;
        margin: 0 20px;
        // border: 1px solid #ccc;
        background-color: white;
        border-radius: 5px;
      }
      .chat-p-right {
        // border: none;
        background-color: $btnActive;
      }
    }
    .item-right {
      display: flex;
      justify-content: flex-end;
    }
    .chat-input {
      position: relative;
      width: 100%;
      min-height: 106px;
      font-size: 18px;
      :deep(.el-textarea__inner) {
        padding: 10px 120px 10px 10px;
        overflow-y: hidden;
      }
      .input-btn {
        position: absolute;
        width: 80px;
        height: 35px;
        bottom: 10px;
        right: 10px;
        border-radius: 5px;
        background-color: $primary;
      }
      .input-icon {
        margin: 6px 0 0 28px;
      }
    }
  }
  .item {
    width: 90%;
    margin: 0px auto;
    margin-bottom: 20px;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
    cursor: pointer;
    .item-nickname {
      font-size: 16px;
      margin-left: 15px;
    }
    .item-lastmsg {
      height: 22px;
      font-size: 14px;
      margin-left: 15px;
    }
  }
  .item-active {
    box-shadow: 0 0 10px 0 #ccc;
  }
  img {
    width: 42px;
    height: 42px;
    border-radius: 50px;
  }
}
</style>