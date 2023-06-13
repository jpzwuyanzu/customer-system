<template>
  <div class="p10">
    <div v-for="(item,index) in 100" :key="index">
      <div class="left_user">
        <div class="rowC mb10">
          <el-avatar class="mr10" :size="30"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
          <div class="mr10 fw f14">
            用户一号
          </div>
          <div class="mr10 f12 cr999">11:46:36</div>
        </div>
        <div class="chatting">
          您好，在吗？
        </div>
      </div>
      <div class="right_user">
        <div class="rowC mb10" style="flex-direction: row-reverse;">
          <el-avatar class="mr10" :size="30"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
          <div class="mr10 fw f14">
            客服
          </div>
          <div class="mr10 f12 cr999">12:11:15</div>
        </div>
        <div class="chatting">
          在的，请问有什么事情，能帮助到您的
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  
  const count = ref(0)
</script>
<style lang="scss" scoped>
  .left_user {
    margin-bottom: 10px;

    .chatting {
      background-color: #fff;
      display: inline-block;
      padding: 10px;
      border-radius: 12px;
      border-top-left-radius: 0px;
      margin-left: 10px;
    }
  }

  .right_user {
    text-align: right;
    margin-bottom: 10px;

    .chatting {
      background-color: #fff;
      display: inline-block;
      padding: 10px;
      border-radius: 12px;
      border-top-right-radius: 0px;
      margin-right: 10px;
    }

  }
</style>