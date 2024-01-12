<template>
  <div class="icon flex-col">

    <div :class="['icon-img', { 'icon-img-disabled': props.disabled }]">
      <svg-icon
        :style="{width: props.size * 2 + 'px', height: props.size * 2 + 'px'}"
        :name="props.img"
      />
    </div>
    <p :class="['icon-name', { 'icon-name-disabled': props.disabled }]" v-show="props.name">{{ props.name }}</p>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@/types/icon'

const props = withDefaults(defineProps<Icon>(), {
  img: 'bed',
  name: '床',
  size: 20,
  disabled: false
})
</script>

<style lang="scss" scoped>
.icon {
  height: 60px;
  width: 60px;
  align-items: center;
  .icon-name {
    font-size: 14px;
  }
  .icon-name-disabled {
    color: $gray;
    text-decoration: line-through;
  }
  .icon-img{
    display: block;
    margin-bottom: 14px;
  }
  .icon-img-disabled {
    fill: $gray;
  }
}
</style>