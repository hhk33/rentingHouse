<template>
  <div class="show-box">
    <span class="subheading">我们的建议</span>
    <p class="heading">品质好房</p>
    <div class="category">
      <div class="btn active">整租</div>
      <div class="btn">合租</div>
      <div class="btn">公寓</div>
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElScrollbar } from 'element-plus'

let scrollbarVal: number = 0 // 滚动条当前位置
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()

// 拖动滚动条
const scrollDrag = (el: MouseEvent) => {
  const startX: number = el.pageX + scrollbarVal
  document.onmousemove = e => {
    scrollbarRef.value?.setScrollLeft(startX - e.pageX)
  }
  document.onmouseup = () => {
    scrollbarVal = scrollbarRef.value!.wrapRef!.scrollLeft
    document.onmousemove = null
    document.onmouseup = null
  }
}
</script>

<style lang="scss" scoped>
.category {
  display: flex;
  justify-content: right;
  align-items: center;
  position: absolute;
  right: 0;
  top: 30px;
  .btn {
    width: 80px;
    height: 40px;
    line-height: 40px;
  }
}
.scrollbar {
  width: 100%;
  margin-top: 30px;
  .scrollbar-content {
    display: flex;
    margin-top: 20px 10px;
    .scrollbar-item {
      .content {
        width: 283px;
        height: 316px;
        border-radius: 4px;
        background: url('@/assets/img/recommand.png') no-repeat;
        background-size: contain;
        .info {
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
      .houseInfo {
        margin: 14px 10px;
        font-size: 20px;
      }
      .price {
        margin-left: 10px;
        font-size: 18px;
        color: red;
        .unit {
          font-size: 14px;
        }
      }
    }
    .scrollbar-item + .scrollbar-item {
      margin-left: 50px;
    }
  }
}
</style>