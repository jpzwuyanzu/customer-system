<template>

  <el-scrollbar :wrap-style="{width:'100%'}">
    <el-affix :offset="0">
      <div style="padding:16px;z-index: 2;" :class="Store.counter.themeMode?'zt_night':'bgfff'">
        <el-input v-model="input1" placeholder="搜索" class="zdy_input" clearable :prefix-icon="Search" :minlength="50" />
      </div>
    </el-affix>
    <div class="chatlist row" :class="selec_index==index?'cur':''" v-for="(item,index) in 100" :key="index"
      @click="selectContacts(item,index)">
      <div class="mr10">
        <el-avatar :size="40" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
      </div>
      <div class="ow">
        <div class="between mb5">
          <div class="f14 fw mb5 svh mr5">
            用户{{index+1*1000000}}号
          </div>
          <div class="f12 cr999">
            12:30
          </div>
        </div>
        <div class="between">
          <div class="f12 svh cr666 mr5">
            你好在吗？ 有个问题需要您协助处理asdasdsa
          </div>
          <div class="tipsnum">
            {{index+1}}
          </div>
        </div>

      </div>
    </div>
  </el-scrollbar>


</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { Search } from '@element-plus/icons-vue'
  import useStore from '@/store';
  const Store = ref(useStore())
  //Store.counter.themeMode
  var value = ref('')
  var input1 = ref('')
  var selec_index = ref(-1)
  const selectContacts = (obj, index) => {
    selec_index.value = index
  }
</script>
<style lang="scss" scoped>
  .chatlist {
    cursor: pointer;
    padding: 12px;

  }

  .tipsnum {
    background-color: #ff3366;
    border-radius: 100%;
    text-align: center;
    padding: 5px 0;
    font-size: 12px;
    display: inline-block;
    min-width: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #fff;
  }

  .cur {
    background-color: #296dfe;
    color: #fff;

    .cr999 {
      color: #fff;
    }

    .cr666 {
      color: #fff;
    }
  }

  :deep(.zdy_input .el-input__wrapper) {
    background-color: rgba(188, 189, 194, 0.2);
    border: 0;
    box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
  }
</style>