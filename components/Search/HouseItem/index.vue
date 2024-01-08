<template>
  <div class="flex house-item">
    <img src="@/assets/img/recommand.png" alt="">
    <div class="info">
      <h4 class="title">整租·上亿SOHO 1室0厅 西南</h4>
      <p class="desc">余杭-良渚-上亿SOHO / 80.00㎡ /西南 / 1室0厅1卫</p>
      <div class="tags flex">
        <p class="tag">新上</p>
        <p class="tag">近地铁</p>
        <p class="tag">随时看房</p>
        <p class="tag">精装</p>
        <p class="tag">押一付一</p>
        <p class="tag">VR看房</p>
      </div>
      <p class="source">自如</p>
    </div>
    <p class="price">2800 元/月</p>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
  .house-item {
    width: 100%;
    height: 180px;
    margin: 10px;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 10px;

    img {
      width: 180px;
      height: 140px;
      border-radius: 10px;
      box-shadow: 0 0 4px 0 #cacaca;
    }

    .info {
      flex: 1;
      margin-left: 20px;
      .title {
        margin: 10px 0;
        font-size: 20px;
      }

      .desc {
        font-size: 14px;
        color: $gray;
        font-weight: bold;
      }

      .tags {
        height: 40px;
        line-height: 40px;
        margin: 10px 0 5px 0;

        .tag {
          display: inline-block;
          height: 30px;
          line-height: 30px;
          padding: 0 16px;
          margin-right: 20px;
          text-align: center;
          border-radius: 30px;
          background-color: $btnActive;
          color: $primary;
          font-size: 14px;
        }
      }

      .source {
        color: $gray;
      }
    }

    .price {
      margin-top: -80px;
      font-size: 20px;
      font-weight: bold;
      color: red;
    }
  }
</style>