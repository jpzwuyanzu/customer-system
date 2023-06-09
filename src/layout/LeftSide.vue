<template>
  <div style="padding:15px;padding-bottom: 0;">
    <el-input v-model="input1"  class="w-50 m-2" size="large" placeholder="搜索" clearable :prefix-icon="Search" :minlength="50" />
  </div>
  <el-scrollbar :wrap-style="{width:'100%'}">
    <div style="padding-top:10px;">
      <div class="chatlist row mb10" v-for="(item,index) in 100" :key="index" style="padding:15px;padding-bottom: 0;">
        <div class="mr10">
          <el-avatar :size="40" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
        </div>
        <div class="ow">
          <div class="between">
            <div class="f14 fw mb5 svh mr5">
              用户{{index+1}}号
            </div>
            <div class="f12 mb5 cr999">
              12:30
            </div>
          </div>
          <div class="f12 svh cr666">
            你好在吗？ 有个问题需要您协助处理asdasdsa
          </div>
        </div>
      </div>
    </div>
  </el-scrollbar>

</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { Search } from '@element-plus/icons-vue'
  const value = ref('')
  const input1 = ref('')

  const options = [
    {
      value: 'Option1',
      label: 'Option1',
    },
  ]

</script>
<style lang="scss" scoped>
  .chatlist {
    cursor: pointer;

    .cur {
      background-color: red;
    }
  }
</style>