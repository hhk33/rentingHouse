<template>
  <div class="icon flex-col">
    <img
      class="icon-img"
      :src="imgUrl"
      :style="{width: props.size * 2 + 'px', height: props.size * 2 + 'px'}"
    />
    <p class="icon-name" v-show="props.name">{{ props.name }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  img: string,
  name: string,
  size: number
}>()

const imgUrl = computed(() =>{
    return '/icon/' + props.img + '.png'
  }
)
</script>

<style lang="scss" scoped>
.icon {
  height: 60px;
  width: 60px;
  align-items: center;
  .icon-name {
    font-size: 14px;
  }

  .icon-img{
    display: block;
    margin-bottom: 14px;
  }
}
</style>