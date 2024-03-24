<template>
  <div class="show-box">
    <span class="subheading">我们的建议</span>
    <p class="heading">品质好房</p>
    <div class="btn-list">
      <div class="btn active" style="width: 100px;" @click="clickMore">查看更多</div>
    </div>
    <el-scrollbar ref="scrollbarRef" class="scrollbar">
      <div class="scrollbar-content" @mousedown.stop.prevent="scrollDrag">
        <div
          v-for="item in houseList"
          :key="item.houseId"
          class="scrollbar-item"
          @click.stop.prevent="toDetail(item.houseId)"
        >
          <div class="content" :style="{background: `url(${item.houseImg.split('&')[0]}) no-repeat`, backgroundSize: `cover`}">
            <div class="info">
              <p class="tip"><el-icon><Location /></el-icon>{{ item.area }}m² | {{ item.direct }}</p>
              <p class="tip"><el-icon><House /></el-icon>{{ item.districtId }} · {{ item.village }}</p>
              <div class="tag-list">
                <p class="tag" v-show="isNewHouse(item.updateTime)">新上</p>
                <p class="tag" v-show="item.decorationStatus === '02'">精装</p>
                <p class="tag" v-show="item.elevator === '01'">有电梯</p>
              </div>
            </div>
          </div>
          <p class="houseInfo">{{ item.title }}</p>
          <p class="price">{{ item.rent }} <span class="unit">元/月</span></p>
        </div>
      </div>
    </el-scrollbar>
    <div class="btn-list">
      <div class="btn active" @click="clickArrowLeft">
        <el-icon><ArrowLeftBold /></el-icon>
      </div>
      <div class="btn active" @click="clickArrowRight">
        <el-icon><ArrowRightBold /></el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElScrollbar } from 'element-plus'
import { reqGetScrollbar } from '@/api/info'
import gsap from 'gsap'

let scrollbarVal: number = 0 // 滚动条当前位置
let scrolling: boolean = false // 是否正在滚动
let allowClick: boolean = true // 是否允许点击
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()

// 拖动滚动条
const scrollDrag = (el: MouseEvent) => {
  scrolling = true
  const startX: number = el.pageX + scrollbarVal
  let firstTime = new Date().getTime()
  document.onmousemove = e => {
    if (scrolling) {
      let nowTime = new Date().getTime()
      if (nowTime - firstTime > 200) {
        allowClick = false
      }
      scrollbarRef.value?.setScrollLeft(startX - e.pageX)
    }
  }
  document.onmouseup = () => {
    scrollbarVal = scrollbarRef.value!.wrapRef!.scrollLeft
    document.onmousemove = null
    document.onmouseup = null
    scrolling = false
    setTimeout(() => {
      allowClick = true
    }, 100)
  }
}

const itemWidth = 344

// 左按钮
const clickArrowLeft = () => {
  const scrollLeft = scrollbarRef.value!.wrapRef!.scrollLeft
  const moveLength = scrollLeft % itemWidth < itemWidth / 3
    ? itemWidth + (scrollLeft % itemWidth)
    : scrollLeft % itemWidth

  if (scrollLeft > 0) {
    gsap.to(
      scrollbarRef.value!.wrapRef!,
      {
        scrollLeft: scrollLeft - moveLength < 0 ? 0 : scrollLeft - moveLength,
        duration: 0.5,
      }
    )
  }
}

// 右按钮
const clickArrowRight = () => {
  const scrollWidth = scrollbarRef.value!.wrapRef!.scrollWidth
  const scrollLeft = scrollbarRef.value!.wrapRef!.scrollLeft
  const moveLength = scrollLeft % itemWidth > 2 * itemWidth / 3
    ? 2 * itemWidth - (scrollLeft % itemWidth)
    : itemWidth - (scrollLeft % itemWidth)

  if (scrollLeft < scrollWidth) {
    gsap.to(
      scrollbarRef.value!.wrapRef!,
      {
        scrollLeft: scrollLeft + moveLength > scrollWidth ? scrollWidth : scrollLeft + moveLength,
        duration: 0.5,
      }
    )
  }
}

// 更多
const clickMore = () => {
  navigate('/search', { 'search': '' })
}

const toDetail = (id: number) => {
  if (!scrolling && allowClick) {
    navigate('/details', { 'houseId': id })
  }
}

let houseList = ref([])
const getScrollbar = async () => {
  let res = await reqGetScrollbar()
  if (res.code === 200) {
    houseList.value = res.data
  }
}

const isNewHouse = date => {
  const inputDate = new Date(date.replace(/-/g, '/'))
  const currentDate = new Date()
  currentDate.setMonth(currentDate.getMonth() - 2)
  return inputDate > currentDate
}

onMounted(() => {
  setTimeout(() => {
    getScrollbar()
  }, 0)
})

</script>

<style lang="scss" scoped>
.scrollbar {
  width: 100%;
  height: 420px;
  margin: 10px 0 50px 0;
  .scrollbar-content {
    display: flex;
    margin-top: 20px 10px;
    scroll-behavior: smooth;
    transition: all 1s;
    .scrollbar-item {
      .content {
        width: 300px;
        height: 316px;
        margin: 20px 22px;
        border-radius: 4px;
        background-size: cover;
        transition: all 0.5s;
        .info {
          display: none;
          padding-top: 210px;
          margin-left: 10px;
          .tip {
            font-size: 14px;
            color: #ffffff;
          }
          .tag-list {
            display: flex;
            width: 100%;
            .tag {
              height: 34px;
              padding: 0 15px;
              line-height: 34px;
              border-radius: 34px;
              text-align: center;
              color: $primary;
              background-color: $btnActive;
            }
            .tag + .tag {
              margin-left: 10px;
            }
          }
        }
      }
      .content:hover {
        transform: scale(1.05);
        .info {
          display: block;
        }
      }
      .houseInfo {
        margin: 14px 20px;
        font-size: 19px;
      }
      .price {
        margin-left: 20px;
        font-size: 18px;
        color: red;
        .unit {
          font-size: 14px;
        }
      }
    }
  }
}
</style>