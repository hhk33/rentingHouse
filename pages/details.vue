<template>
  <div>
  <client-only>
    <div class="swiper-content">
        <DetailsSwiper :houseId="houseRec.houseId" :houseImg="houseImg"/>
    </div>
    <div class="flex-box">
      <div class="content">
        <h1 class="title">{{ houseRec.title }}</h1>
        <h3 class="subtitle">基本信息</h3>
        <div class="info">
          <div class="line">
            <span>面积：{{ houseRec.area }}㎡</span>
            <span>朝向：{{ houseRec.direct }}</span>
          </div>
          <div class="line">
            <span>维护：{{ houseRec.maintenanceTime }}</span>
            <span>入住：2024-01-10</span>
          </div>
          <div class="line">
            <span>楼层：{{ houseRec.floor }}层/{{ houseRec.totalFloor }}层</span>
            <span>电梯：{{ houseRec.elevator === '00' ? '无电梯' : '有电梯' }}</span>
          </div>
          <div class="line">
            <span>用电：{{ houseRec.electricity === '00' ? '民电' : '商电' }}</span>
            <span>用水：{{ houseRec.water === '00' ? '民水' : '商水' }}</span>
          </div>
          <div class="line">
            <span>采暖：{{ houseRec.heating === '00' ? '自采暖' : '集中供暖' }}</span>
            <!-- <span>租期：1年以内</span> -->
          </div>
          <!-- <div class="line">
            <span>看房：需提前预约</span>
          </div> -->
        </div>
        <h3 class="subtitle">配套设施</h3>
        <div class="info icon-content">
          <Icon class="icon-item" img="washing" name="洗衣机" :size="20" :disabled="houseRec.facilities[0] === '0'"/>
          <Icon class="icon-item" img="air-conditioning" name="空调" :size="20" :disabled="houseRec.facilities[1] === '0'"/>
          <Icon class="icon-item" img="wardrobe" name="衣柜" :size="20" :disabled="houseRec.facilities[2] === '0'"/>
          <Icon class="icon-item" img="tv" name="电视" :size="20" :disabled="houseRec.facilities[3] === '0'"/>
          <Icon class="icon-item" img="refrigerator" name="冰箱" :size="20" :disabled="houseRec.facilities[4] === '0'"/>
          <Icon class="icon-item" img="heater" name="热水器" :size="20" :disabled="houseRec.facilities[5] === '0'"/>
          <Icon class="icon-item" img="bed" name="床" :size="20" :disabled="houseRec.facilities[6] === '0'"/>
          <Icon class="icon-item" img="heating" name="暖气" :size="20" :disabled="houseRec.facilities[7] === '0'"/>
          <Icon class="icon-item" img="wifi" name="宽带" :size="20" :disabled="houseRec.facilities[8] === '0'"/>
          <Icon class="icon-item" img="gas" name="天然气" :size="20" :disabled="houseRec.facilities[9] === '0'"/>
        </div>
        <h3 class="subtitle">房源图片</h3>
        <div class="info">
            <DetailsImg :houseImg="houseImg"/>
        </div>
        <h3 class="subtitle">费用详情</h3>
        <div class="info flex pay-content">
          <div class="pay-item">
            <p>付款方式</p>
            <p>{{ rentUnitList[houseRec.rentUnit] }}</p>
          </div>
          <div class="pay-item">
            <p>租金<span class="gray"> (元/月)</span></p>
            <p class="red">{{ houseRec.rent }}</p>
          </div>
          <div class="pay-item">
            <p>押金<span class="gray"> (元)</span></p>
            <p>{{ houseRec.rent }}</p>
          </div>
          <div class="pay-item">
            <p>服务费<span class="gray"> (元/月)</span></p>
            <p>{{ houseRec.rent * 0.1 }}</p>
          </div>
        </div>
        <h3 class="subtitle">地址与交通</h3>
        <div class="info">
          <DetailsMap :location="`${houseRec.cityId}${houseRec.districtId}`" :village="`${houseRec.village}`"/>
        </div>
        <h3 class="subtitle">其他推荐</h3>
        <div class="info">
          <Recommend :size="16" :num="6"/>
        </div>
      </div>
      <div class="contact">
        <div class="house-info">
          <img :src="houseRec.houseImg.split('&')[0]" alt="">
          <h1 class="title">{{ houseRec.title }}</h1>
          <p class="area gray">{{ houseRec.desc }} | {{ houseRec.area }}㎡ | {{ houseRec.direct }} </p>
          <p class="red">{{ houseRec.rent }} 元/月</p>
          <el-icon
            class="star"
            size="20"
            v-show="!isCollect"
            @click="handleCollectHouse(true)"
          >
            <Star />
          </el-icon>
          <el-icon
            class="star"
            size="20"
            color="#ffd700"
            v-show="isCollect"
            @click="handleCollectHouse(false)"
          >
            <StarFilled/>
          </el-icon>
        </div>
        <div>
          <div class="contacter flex">
            <img class="apt-img" :src="houseRec.avatar">
            <div>
              <h4>{{ houseRec.nickname }}</h4>
              <span>{{ houseRec.institutionName }}</span>
            </div>
          </div>
          <div class="flex">
            <div class="btn primary-btn" @click="showPhone=true" >{{showPhone ? houseRec.phone:'电话咨询'}}</div>
            <div class="btn active" @click="toChat">在线咨询</div>
          </div>
        </div>
      </div>
    </div>
  </client-only>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { reqGetHouseRec } from '@/api/details'
import { reqIsCollect, reqCollectHouse } from '@/api/user'
import useStore from '@/composables/store'

let showPhone = ref<boolean>(false)
const userStore = useStore.user()
const route = useRoute()

const rentUnitList = {
  '00': '月付',
  '01': '季付',
  '02': '年付'
}

let houseRec = ref<any>({
  houseImg: '',
  title: '',
  desc: '',
  area: '',
  direct: '',
  rent: '',
  maintenanceTime: '',
  floor: '',
  totalFloor: '',
  elevator: '',
  electricity: '',
  water: '',
  heating: '',
  facilities: '',
  cityId: '',
  districtId: '',
  village: ''
})
let houseImg = ref('')

const getHouseRec = async () => {
  let houseId = route.query.houseId
  let res: any = await reqGetHouseRec(houseId)
  if (res.code === 200) {
    houseRec.value = res.data
    houseImg.value = res.data.houseImg
  }
}

let isCollect = ref(false)
const handleIsCollect = async () => {
  let res: any = await reqIsCollect(route.query.houseId)
  if (res.code === 200) {
    isCollect.value = res.data
  }
}

const handleCollectHouse = async flag => {
  let res: any = await reqCollectHouse(route.query.houseId)
  if (res.code !== 200) {
    ElMessage.error('收藏失败')
  } else {
    isCollect.value = flag
  }
}

watch(()=>userStore.userInfo.nickname, ()=>{
  if (userStore.userInfo.nickname) {
    handleIsCollect()
  }
}, { deep: true })

const toChat = () => {
  navigate('/message', { to: 'broker' + houseRec.value.brokerId })
}

onMounted(() => {
  setTimeout(() => {
    getHouseRec()
    if (userStore.userInfo.nickname) {
      handleIsCollect()
    }
  }, 0)
})
</script>

<style lang="scss" scoped>
.swiper-content {
  width: 1000px;
  margin: 0 auto;
  padding-top: 100px;
}
.flex-box {
  display: flex;
}
.content {
  padding: 40px 0 40px 180px;
  .title {
    color: $textColor;
  }
  .subtitle {
    margin: 40px 0 20px 0;
    color: $gray;
  }
  .info {
    width: 720px;
    margin-left: 120px;
    padding-bottom: 30px;
    border-bottom: 1px solid $grayLine;
    .line {
      margin: 20px;
      span {
        display: inline-block;
        width: 300px;
      }
    }
  }
  .icon-content {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    .icon-item {
      width: 130px;
      height: 125px;
    }
  }
  .pay-content {
    font-size: 16px;
    .pay-item {
      margin: 0 40px;
      p + p {
        margin-top: 30px;
      }
    }
  }
}
.contact {
  position: sticky;
  top: 110px;
  width: 320px;
  height: 400px;
  margin: 40px 0 0 60px;
  .house-info {
    padding: 10px;
    box-shadow: 0 0 4px #cacaca;
    border-radius: 5px;
    img {
      width: 100%;
      height: 80px;
      object-fit: cover;
    }
    .title {
      font-size: 18px;
      color: $textColor;
    }
    .area {
      margin:10px 0 5px 0;
      font-size: 14px;
    }
    .star {
      transform: scale(1.2);
      margin: -40px 10px 0 0;
      float: right;
    }
  }
  .contacter {
    margin: 50px 20px 0 0;
    .apt-img {
      width: 40px;
      height: 40px;
      margin-right: 20px;
    }
  }
  .btn {
    width: 150px;
    height: 40px;
    margin-top: 20px;
    line-height: 40px;
    border-radius: 2px;
  }
}
</style>