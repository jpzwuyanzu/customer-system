<template>
  <div style="padding-top:10px;">
    <div class="chatlist row mb10" v-for="(item,index) in 100" :key="index" style="padding:5px;border-bottom: 1px solid #efefef;">
      <div class="mr5">
        <el-avatar :size="35" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
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
          你好在吗？ 有个问题需要您协助处理
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  const value = ref('')
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