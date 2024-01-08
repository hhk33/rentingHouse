<template>
  <div>
    <client-only>
      <el-dialog
        v-model="dialogVisible"
        width="400"
        center
        align-center
      >
        
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">
              Confirm
            </el-button>
          </span>
        </template>
      </el-dialog>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import useStore from '~/composables/store'
import { storeToRefs } from 'pinia'
const userStore = useStore.user()
const { dialogVisible } = storeToRefs(userStore)
</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>