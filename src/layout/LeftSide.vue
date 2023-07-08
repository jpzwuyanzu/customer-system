<template>
  <el-scrollbar :wrap-style="{ width: '100%' }" :class="Store.counter.themeMode ? 'zt_night' : ''">
    <el-affix :offset="0">
      <div style="padding:16px;z-index: 2;" :class="Store.counter.themeMode ? 'zt_night' : 'bgfff'">
        <el-input v-model="search_val" @input="search_fun" placeholder="搜索" class="zdy_input" clearable
          :prefix-icon="Search" :minlength="50" />
      </div>
    </el-affix>
    <div v-for="(item, index) in contacts" :key="index">
      <div class="chatlist" :class="selec_index == index ? 'cur' : ''" @click="selectContacts(item, index)"
        @contextmenu.prevent="rightClick(index)" v-show="item.show">
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
                    {{ timeDisplayMode(item.time) }}
                  </div>
                </div>
                <div class="between">
                  <div class="f12 svh cr666 mr5" style="width: 100%;">
                    {{ item.news }}
                  </div>
                  <div class="tipsnum" v-if="item.tipsnum != 0">
                    {{ item.tipsnum }}
                  </div>
                  <el-icon style="margin-left: 5px;" v-if="item.istop">
                    <Upload />
                  </el-icon>
                </div>
              </div>
            </div>
          </template>
          <div class="cr707c97 popover_rightcn">
            <div class="rowC crpr" @click="topping(index)" v-if="!item.istop">
              <el-icon class="mr10">
                <Upload />
              </el-icon>
              置顶
            </div>
            <div class="rowC crpr" @click="offTopping(index)" v-else>
              <el-icon class="mr10">
                <Upload />
              </el-icon>
              取消置顶
            </div>
            <div class="rowC crpr" @click="read(index)">
              <el-icon class="mr10">
                <Finished />
              </el-icon>标记已读
            </div>
            <div class="rowC crpr" @click="del(index)">
              <el-icon class="mr10">
                <DeleteFilled />
              </el-icon>删除
            </div>
          </div>
        </el-popover>

      </div>
    </div>

  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import useStore from '@/store';
import Mock from 'mockjs';
import { timeDisplayMode } from '@/utils/common'
import { ElMessageBox } from 'element-plus'
const Store = ref(useStore())
let search_val = ref<any>('')
let selec_index = ref<any>(-1)
let Mockdata = Mock.mock({
  'list|100': [{
    'id|+1': 1,
    avatar: '@image()',
    name: "@cname",
    time: "@datetime(yyyy-MM-dd HH:mm:ss)",
    news: "@ctitle",
    'tipsnum|1-100': 0,
    rightprevent: false,
    istop: false,
    show: true,
  }],
})
let contacts = ref<any>(Mockdata.list)


const closeright = () => {
  //关闭所有的鼠标右键弹窗
  for (let i in contacts.value) {
    contacts.value[i].rightprevent = false
  }
}

const selectContacts = (_obj: any, index: any) => {
  selec_index.value = index
  Store.value.counter.switch_LeftSideObj(contacts.value[index])
  contacts.value[index].tipsnum = 0
  closeright()
}

const rightClick = (index: any) => {
  selec_index.value = index
  Store.value.counter.switch_LeftSideObj(contacts.value[index])
  if (contacts.value[index].rightprevent) {
    return contacts.value[index].rightprevent = false
  }
  closeright()
  return contacts.value[index].rightprevent = true
}
const topping = (index: any) => {
  //置顶
  contacts.value[index].istop = true
  let obj = contacts.value[index]
  contacts.value.splice(index, 1);
  contacts.value.unshift(obj)
  closeright()
}

const offTopping = (index: any) => {
  //取消置顶
  let top_arr = [] //置顶的数组
  let not_top_arr = [] //没有置顶的数组
  let obj = contacts.value[index] //被取消置顶的
  obj.istop = false
  contacts.value.splice(index, 1); //删除取消置顶的
  // contacts.value.unshift(obj)
  for (let i in contacts.value) {
    let arr = contacts.value[i]
    if (arr.istop) {
      top_arr.push(arr)
    }
  }
  for (let i in contacts.value) {
    let arr = contacts.value[i]
    if (!arr.istop) {
      not_top_arr.unshift(arr)
    }
  }
  not_top_arr.unshift(obj)
  contacts.value = [...top_arr, ...not_top_arr]
  closeright()
}

const read = (index: any) => {
  contacts.value[index].tipsnum = 0
  closeright()
}

const search_fun = () => {
  //搜索
  if (search_val.value == '') {
    for (let i in contacts.value) {
      contacts.value[i].show = true
    }
  } else {
    for (let i in contacts.value) {
      contacts.value[i].show = false
    }
  }
  for (let i in contacts.value) {
    let arr = contacts.value[i]
    if (arr.name.includes(search_val.value)) {
      contacts.value[i].show = true
    }
  }
}



const del = (index: any) => {
  (ElMessageBox as any)({
    title: '提示',
    message: '您确定要删除与 ‘' + contacts.value[index].name + '’ 所有的历史对话记录吗？',
    showCancelButton: true,
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    beforeClose: (action: any, _instance: any, done: any) => {
      if (action === 'confirm') {
        contacts.value.splice(index, 1);
        done()
      } else {
        done()
      }
    }
  })
}


</script>
<style lang="scss" scoped>
.zt_night .chatlist:hover {
  background: #333;
}

.chatlist {
  cursor: pointer;
  padding: 12px;
}

.chatlist:hover {
  background: #F2F2F3;
}

.tipsnum {
  background-color: #ff3366;
  border-radius: 10px;
  text-align: center;
  padding: 2px 8px;
  font-size: 12px;
  display: inline-block;
  color: #fff;
}

// .tipsnum {
//   background-color: #ff3366;
//   border-radius: 100%;
//   text-align: center;
//   padding: 5px 0;
//   font-size: 12px;
//   display: inline-block;
//   min-width: 24px;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
//   color: #fff;
// }
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