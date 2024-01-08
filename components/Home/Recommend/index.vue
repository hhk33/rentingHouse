<template>
  <div class="show-box">
    <span class="subheading">我们的建议</span>
    <p class="heading">品质好房</p>
    <div class="btn-list">
      <div class="btn active" style="width: 100px;" @click="clickMore">查看更多</div>
    </div>
    <el-scrollbar ref="scrollbarRef" class="scrollbar">
      <div class="scrollbar-content" @mousedown="scrollDrag">
        <div v-for="item in 10" :key="item" class="scrollbar-item">
          <div class="content">
            <div class="info">
              <p class="tip"><el-icon><Location /></el-icon>86.00m² | 南</p>
              <p class="tip"><el-icon><House /></el-icon>杭州 · 余杭</p>
              <div class="tag-list">
                <div class="tag">近地铁</div>
                <div class="tag">押一付一</div>
                <div class="tag">有电梯</div>
              </div>
            </div>
          </div>
          <p class="houseInfo">整租 · 竹海水韵2室2厅</p>
          <p class="price">2700 <span class="unit">元/月</span></p>
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
import { ref } from 'vue'
import { ElScrollbar } from 'element-plus'

let scrollbarVal: number = 0 // 滚动条当前位置
let scrolling: boolean = false // 是否正在滚动
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()

// 拖动滚动条
const scrollDrag = (el: MouseEvent) => {
  scrolling = true
  const startX: number = el.pageX + scrollbarVal
  document.onmousemove = e => {
    if (scrolling) {
      scrollbarRef.value?.setScrollLeft(startX - e.pageX)
    }
  }
  document.onmouseup = () => {
    scrollbarVal = scrollbarRef.value!.wrapRef!.scrollLeft
    scrolling = false
    document.onmousemove = null
    document.onmouseup = null
  }
}

// 左按钮
const clickArrowLeft = () => {

}

// 右按钮
const clickArrowRight = () => {
  
}

// 更多
const clickMore = () => {
  
}

</script>

<style lang="scss" scoped>
.scrollbar {
  width: 100%;
  height: 420px;
  margin: 10px 0 50px 0;
  .scrollbar-content {
    display: flex;
    margin-top: 20px 10px;
    .scrollbar-item {
      .content {
        width: 300px;
        height: 316px;
        margin: 20px 22px;
        border-radius: 4px;
        background: url('@/assets/img/recommand.png') no-repeat;
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
        font-size: 20px;
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