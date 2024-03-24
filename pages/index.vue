<template>
  <div class="container">
    <HomeHeader />
    <HomeRecommend />
    <HomeLandload />
    <Recommend style="width: 1290px;"/>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Home'
})
</script>

<style lang="scss" scoped>
.container {
  padding-top: 0;
  background: linear-gradient(135deg, $btnActive 0, #ffffff 25%);
}
</style>