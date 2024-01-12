<template>
  <div class="show-box">
    <span class="subheading">正在出售！</span>
    <p class="heading">精品公寓</p>
    <div class="carousel-box flex">
      <el-carousel
        class="carousel"
        :autoplay="false"
        arrow="always"
        height="460px"
        indicator-position="outside"
      >
        <el-carousel-item v-for="item in 3" :key="item">
          <div class="about">
            <p class="title">萍水街地铁口两室一厅押一付一</p>
            <p class="area">二居+ 45.00-60.00㎡</p>
            <p class="price">2680-2690元/月</p>
            <p class="sub-title">房屋设施</p>
            <div class="icon-list flex">
              <Icon class="icon-item" img="refrigerator" name="冰箱" :size="15"/>
              <Icon class="icon-item" img="washing" name="洗衣机" :size="15"/>
              <Icon class="icon-item" img="heater" name="热水器" :size="15"/>
              <Icon class="icon-item" img="gas" name="天然气" :size="15"/>
              <Icon class="icon-item" img="wifi" name="宽带" :size="15"/>
              <Icon class="icon-item" img="air-conditioning" name="空调" :size="15"/>
            </div>
            <div class="apartment-info flex">
              <img class="apt-img" src="~/assets/img/apt.jpg">
              <div>
                <h3>桂晶</h3>
                <span>乐柚公寓</span>
              </div>
              <div class="apt-btn">
                <el-icon><ChatDotRound /></el-icon>
                在线咨询
              </div>
            </div>
          </div>
          <div class="content">
            <img class="img_1" src="~/assets/img/apartment_1.jpg">
            <img class="img_2" src="~/assets/img/apartment_2.jpg">
            <img class="img_3" src="~/assets/img/apartment_3.jpg">
            <img class="img_4" src="~/assets/img/apartment_4.jpg">
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.carousel-box {
  .carousel {
    width: 100%;
    min-width: 500px;
    margin: 40px 0;
    .content {
      position: relative;
      float: right;
      height: 98%;
      img {
        position: absolute;
        right: 0;
        top: 0;
        width: 30px;
        height: 30px;
        border-radius: 10px;
        background-size: cover;
      }
      .img_1 {
        right: 110px;
        width: 590px;
        height: 400px;
      }

      .img_2 {
        right: 130px;
        top: 330px;
        width: 140px;
        height: 110px;
      }
      .img_3 {
        right: 290px;
        top: 330px;
        width: 140px;
        height: 110px;
      }
      .img_4 {
        right: 450px;
        top: 220px;
        width: 280px;
        height: 220px;
      }
    }
    .about {
      float: left;
      width: 35%;
      height: 98%;
      border-radius: 20px;
      margin-left: 6%;
      padding: 20px;
      box-sizing: border-box;
      .title {
        margin: 2px 0 6px 0;
        font-size: 22px;
      }
      .area {
        font-size: 16px;
      }
      .price {
        margin-top: 14px;
        font-size: 20px;
        color: red;
      }
      .sub-title {
        margin: 15px 0;
        color: $gray;
      }
      .icon-list {
        flex-wrap: wrap;
        border-bottom: 1px solid $gray;
        .icon-item {
          margin: 5px 20px 20px 20px;
        }
      }
      .apartment-info {
        margin: 30px 0 0 20px;
        .apt-btn {
          width: 140px;
          height: 40px;
          line-height: 40px;
          margin-left: 100px;
          border-radius: 40px;
          text-align: center;
          background-color: $primary;
          color: #ffffff;
        }
      }
    }
  }
}
</style>