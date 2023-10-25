<template>
  <div class="content">
    <div class="letter-item flex" v-for="item in city" :key="item.letter">
      <div class="letter">
        <h2>{{ item.letter }}</h2>
      </div>
      <div class="box">
        <div class="province-item flex" v-for="province in item.local" :key="province.province">
          <div class="triangle"></div>
          <h4 class="title">{{ province.province }}</h4>
            <a class="city" v-for="city in province.city" :key="city">{{ city }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import city from '@/content/city.json'
</script>

<style lang="scss" scoped>
.content {
  margin: 20px 0 100px 0;
  border: 1px solid $frenchGray;
  border-radius: 5px;
  .letter-item {
    width: 100%;
    background-color: $grayBackground;
    .letter {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 55px;
      height: 100%;
      h2 {
        font-size: 24px;
        color: $gray;
      }
    }
  }
  .letter-item + .letter-item {
    border-top: 1px solid $frenchGray;
  }
  .letter-item:hover {
    background-color: $primary;
    h2 {
      color: #ffffff;
    }
  }
  .box {
    flex: 1;
    background-color: #ffffff;
    .province-item {
      height: 55px;
      .triangle {
        position: absolute;
        border: 5px solid transparent;
      }
      .title {
        width: 60px;
        margin-left: 40px;
        font-size: 18px;
      }
      .city {
        margin-left: 20px;
      }
    }
    .province-item:hover {
      background-color: $grayBackground;
      .triangle {
        border-left-color: $primary;
      }
    }
  }
}
</style>