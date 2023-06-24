<template>
  <el-scrollbar ref="scrollbarRef" always @scroll="scroll">
    <div class="p10">
      <div v-for="(item,index) in chatLog" :key="index" :class="Store.counter.themeMode?'zt_night':''">
        <div class="left_user" v-if="item.userTye == 'other'">
          <div class="rowC mb10">
            <el-avatar class="mr10" :size="34" :src="item.avatar" />
            <div class="mr10 fw f14">
              {{item.username}}
            </div>
            <div class="mr10 f12 cr999">{{item.time}}</div>
          </div>
          <div class="chatting" v-if="item.type == 'text'">
            {{item.text}}
          </div>
          <div class="chatting" v-if="item.type == 'img'">
            <el-image style="width:140px" :src="item.text" fit="fill"   :zoom-rate="1.2"
      :preview-src-list="srcList"
      :initial-index="4" :z-index="8999988"/>
          </div>
        </div>
        <div class="right_user" v-if="item.userTye == 'me'">
          <div class="rowC mb10" style="flex-direction: row-reverse;">
            <el-avatar class="mr10" :size="34" v-if="item.avatar" :src="item.avatar" />
            <div class="mr10 fw f14">
              {{item.username}}
            </div>
            <div class="mr10 f12 cr999">{{item.time}}</div>
          </div>
          <div class="chatting">
            {{item.text}}
          </div>
        </div>
      </div>

    </div>
  </el-scrollbar>

</template>
<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import useStore from '@/store';
  import type { ElScrollbar } from 'element-plus'
  const srcList = [
  'https://img1.baidu.com/it/u=3709586903,1286591012&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
]
  const Store = ref(useStore())
  const chatLog = ref<any>([])
  chatLog.value = [
    {
      type: 'text',
      text: '您好，在吗？',
      userTye: 'other',
      avatar: 'https://img1.baidu.com/it/u=3709586903,1286591012&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      time:'2023/6/14 14:16:04',
      username:'当幸福来敲门',
    },
    {
      type: 'text',
      text: '在的，请问有什么事情，能帮助到您的',
      userTye: 'me',
      avatar: '',
      time:'2023/6/14 14:16:04',
      username:'客服',
    },
    {
      type: 'img',
      text: 'https://img1.baidu.com/it/u=3709586903,1286591012&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      userTye: 'other',
      avatar: 'https://img1.baidu.com/it/u=3709586903,1286591012&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      time:'2023/6/14 14:16:04',
      username:'当幸福来敲门',
    },
    {
      type: 'text',
      text: '额，头像很可爱，但是有啥事情',
      userTye: 'me',
      avatar: '',
      time:'2023/6/14 14:16:04',
      username:'客服',
    },
  ]
  const scrollbarRef = ref <any> ()
  const Scroll_bottom = () => {
    scrollbarRef.value!.setScrollTop(9999999999) //自动滚动到底部
  }
  const scroll = ({ scrollTop }: any) => {
    console.log('监听聊天记录的滚动条：' + scrollTop + 'px')
  }

  onMounted(() => {
    Scroll_bottom()
  })

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
      background-color: #296dfe !important;
      color: #fff;
      display: inline-block;
      padding: 10px;
      border-radius: 12px;
      border-top-right-radius: 0px;
      margin-right: 10px;
    }
  }

  .zt_night {
    background: none !important;

    .chatting {
      background-color: #1e1f24;
    }
  }
</style>