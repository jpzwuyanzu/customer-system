<template>
  <el-scrollbar :wrap-style="{ width: '100%' }">
    <el-affix :offset="0">
      <div style="padding:16px;z-index: 2;" :class="Store.counter.themeMode ? 'zt_night' : 'bgfff'">
        <el-input v-model="input1" placeholder="搜索" class="zdy_input" clearable :prefix-icon="Search" :minlength="50" />
      </div>
    </el-affix>
    <div class="chatlist" :class="selec_index == index ? 'cur' : ''" v-for="(item, index) in contacts" :key="index"
      @click="selectContacts(item, index)" @contextmenu.prevent="rightClick(index)">
      <el-popover :offset="0" :visible="item.rightprevent" placement="bottom-end" :width="130" trigger="click"
        :show-arrow="false">
        <template #reference>
          <div class="row">
            <div class="mr10">
              <el-avatar :size="40" :src="item.avatar" />
            </div>
            <div class="ow w">
              <div class="between mb5">
                <div class="f14 fw mb5 svh mr5">
                  {{ item.name }}
                </div>
                <div class="f12 cr999">
                  {{ item.time }}
                </div>
              </div>
              <div class="between">
                <div class="f12 svh cr666 mr5" style="width: 1000%;">
                  {{ item.news }}
                </div>
                <div class="tipsnum">
                  {{ item.tipsnum }}
                </div>
              </div>
            </div>
          </div>
        </template>
        <div class="cr707c97 popover_rightcn">
          <div class=" rowC crpr">
            <el-icon class="mr10">
              <Upload />
            </el-icon>
            置顶
          </div>
          <div class="rowC crpr">
            <el-icon class="mr10">
              <Finished />
            </el-icon>标记已读
          </div>
          <div class="rowC crpr">
            <el-icon class="mr10">
              <DeleteFilled />
            </el-icon>删除
          </div>
        </div>
      </el-popover>

    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import useStore from '@/store';
import Mock from 'mockjs';
const Store = ref(useStore())
let input1 = ref<any>('')
let selec_index = ref<any>(-1)
let Mockdata = Mock.mock({
  'list|100': [{
    'id|+1': 1,
    avatar: '@image()',
    name: "@cname",
    time: "@datetime(HH:mm:ss)",
    // time: "@datetime(yyyy-MM-dd HH:mm:ss)",
    news: "@ctitle",
    'tipsnum|1-100': 0,
    rightprevent: false,
  }],
})
let contacts = ref<any>(Mockdata.list)

const selectContacts = (_obj: any, index: any) => {
  selec_index.value = index
  rightClick(index)
}

const rightClick = (index: any) => {
  selec_index.value = index
  Store.value.counter.switch_LeftSideObj(contacts.value[index])
  if (contacts.value[index].rightprevent) {
    return contacts.value[index].rightprevent = false
  }
  for (let i in contacts.value) {
    contacts.value[i].rightprevent = false
  }
  return contacts.value[index].rightprevent = true
}


</script>
<style lang="scss" scoped>
.chatlist {
  cursor: pointer;
  padding: 12px;
}

.chatlist:hover {
  background: #F2F2F3;
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
  background-color: #296dfe !important;
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

.popover_rightcn {
  .crpr {
    padding: 10px;
  }

  .crpr:hover {
    background-color: #F2F2F3;
    border-radius: 5px;
  }
}
</style>