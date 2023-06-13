<template>
  <a-layout class="row" :class="themeMode?'zt_night':''">
    <div class="nav_left">
      <!-- 最左边的导航栏 -->
      <div class="mb40">
        <el-image style="width: 35px;" src="/src/assets/images/left_nav/1.png" fit="cover" />
      </div>
      <div class="mb40">
        <el-image style="width: 35px;" src="/src/assets/images/left_nav/2.png" fit="cover" alt="消息通知" />
      </div>
      <div class="mb40">
        <el-image style="width: 35px;" v-show="!themeMode" src="/src/assets/images/left_nav/3.png" fit="cover"
          alt="日间与夜间模式的切换" @click="switch_themeMode" />
        <el-image style="width: 35px;" v-show="themeMode" src="/src/assets/images/left_nav/3_on.png" fit="cover"
          alt="日间与夜间模式的切换" @click="switch_themeMode" />
      </div>
      <div class="mb40">
        <el-image style="width: 35px;" src="/src/assets/images/left_nav/4.png" fit="cover" alt="设置" />
      </div>
      <div class="my_avatar">
        <el-popover placement="right" :width="130" trigger="click" :popper-style="zdy_popover">
          <template #reference>
            <el-avatar shape="square" :size="35"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
          </template>
          <div class="p10 cr707c97">
            <div class="mb10 rowC crpr">
              <el-icon class="mr10">
                <Switch />
              </el-icon>切换账号
            </div>
            <div class="rowC crpr">
              <el-image class="mr10" style="width:20px;" src="/src/assets/images/power.png" fit="cover" alt="设置" />
              登出
            </div>
          </div>
        </el-popover>
      </div>
    </div>
    <div style="width: 252px;" class="LeftSide_bgfff">
      <LeftSide />
    </div>
    <a-layout>
      <a-layout-header :style="headerStyle" class="cn_color">
        <div class="between">
          <div class="rowC">
            <el-avatar :size="40" class="mr10"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
            <div class="">
              <div class="f14">当幸福来敲门</div>
              <div class="f12 zycr">上次在线5小时前</div>
            </div>
          </div>
          <el-image @click="right_type=!right_type" style="width: 30px;" src="/src/assets/images/Calendar.png"
            fit="cover" />
        </div>
      </a-layout-header>
      <el-scrollbar>
        <a-layout-content class="cn_color">
          <!-- 路由缓存需要缓存的组件 -->
          <router-view v-slot="{ Component }" :key="$route.fullPath">
            <Transition name="slide-fade" mode="out-in" appear>
              <keep-alive>
                <component :is="Component" :key="$route.name" v-if="$route.meta.keepalive" />
              </keep-alive>
            </Transition>
            <Transition name="slide-fade" mode="out-in" appear>
              <component :is="Component" :key="$route.name" v-if="!$route.meta.keepalive" />
            </Transition>
          </router-view>
        </a-layout-content>
      </el-scrollbar>
      <a-layout-footer :style="footerStyle" class="bgfff">
        <div class="between">
          <div>
            <el-image style="width:30px;" @click="dialogTableVisible=true" class="mr10" src="/src/assets/images/quickReply.png"
            fit="cover" />
          </div>
          <div class="ztInputDiv">
            <!-- <input placeholder="输入消息" class="not_input_css w" style="height:40px;" /> -->
            <el-input v-model="input1" placeholder="输入消息" clearable :minlength="3200" />
            <el-image style="width: 30px;" src="/src/assets/images/expression.png" fit="cover" />
          </div>
          <el-image style="width: 30px;" src="/src/assets/images/send.png" fit="cover" />
        </div>
      </a-layout-footer>
    </a-layout>
    <div class="right_cn" v-show="right_type">
      <RightSide />
    </div>
  </a-layout>


  <el-dialog v-model="dialogTableVisible" width="65%" :modal="false" :draggable="true" :show-close="false" top="20vh">
      <div class="p10 pb0">
        <div class="fw f16 mb15">
          模版列表
        </div>
        <div class="between">
          <div class="ztInputDiv" style="border-radius:8px;width:90%;">
            <el-input v-model="input1" placeholder="输入内容" clearable :minlength="3200" />
          </div>
          <el-button type="primary" color="#296dfe" class="f14">新增</el-button>
        </div>
        <div>
          <div class="f16 mb15 cr707c97 fw" style="border-bottom: 1px solid #707c97;padding:15px 0;">
            模版内容
          </div>
          <div class="template_list" v-for="(item,index) in 6" :key="index">
            <div class="mr20">
              {{index+1}}
            </div>
            <div class="w mr20">
              <el-input class="w"
              v-model="textarea"
              :rows="2"
              type="textarea"
              placeholder="请输入内容"
            />
            </div>
            <div>
              <div class="mb10">
                <el-button type="success" size="small" class="f14">保存</el-button>
              </div>
              <div>
                <el-popconfirm title="确认要删除吗？">
                  <template #reference>
                    <el-button type="primary" size="small" color="#ff3366" class="f14">删除</el-button>
                  </template>
                </el-popconfirm>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  </el-dialog>
 


</template>
<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import useStore from '@/store';
  import LeftSide from './LeftSide.vue'
  import RightSide from './RightSide.vue'

  import { h } from 'vue'
  import { ElNotification } from 'element-plus'

  const Store = useStore()
  // import { useRoute } from 'vue-router'
  // import SideBar from "./sideBar.vue";
  // import type { CSSProperties } from 'vue';
  const mode_value = ref(false)
  const right_type = ref(true)
  const dialogTableVisible = ref(false)
  

  const activeIndex = ref('1')
  const input1 = ref()
  var themeMode = ref(Store.counter.themeMode)
  var zdy_popover = ref({})
  const switch_themeMode = () => {
    Store.counter.switch_themeMode()
    themeMode.value = Store.counter.themeMode
    zdy_popoverf()
  }
  const zdy_popoverf = () => {
    //切换主题模式
    if (themeMode.value) {
      zdy_popover.value = {
        backgroundColor: '#1D1E22',
        border: 0,
        minWidth: '0',
      }
    } else {
      zdy_popover.value = {
        backgroundColor: '#fff',
        border: 0,
        minWidth: '0',
      }
    }
  }

  onMounted(() => {
    zdy_popoverf() //切换主题
    //来消息的提示
    let tipsTxt = '<div class="rowC"><div class="mr10"><img style="width:50px" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" /></div><div><div class="f16 fw"> 天使爱美丽</div><div class="f12"> 请等一哈，我查一下啊</div></div></div>'
    ElNotification({
      dangerouslyUseHTMLString: true,
      message: tipsTxt,
      duration: 5000,
      onClick: (event) => handleClick(event),
    })
  })

  const handleClick = (event) => {
    var notificationEl = event.target.closest('.el-notification');
    console.log(notificationEl);
  };

  // const handleSelect = (key: string, keyPath: string[]) => {
  //   console.log(key, keyPath)
  // }

  const topHeaderStyle: any = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 0,
    backgroundColor: '#108ee9',
  };
  const headerStyle: any = {
    height: 64,
    lineHeight: '1.6',
    padding: '10px 20px',
  };

  const siderStyle: any = {
    textAlign: 'center',
  };

  const footerStyle: any = {
    padding: '10px 20px',
  };
</script>


<style lang="scss" scoped>
  .template_list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(112, 124, 151, 0.1);
    padding: 12px 0;
    /* margin-bottom: 15px;
    padding-bottom: 15px; */
  }
  .template_list:last-child{
    border:0;
    padding-bottom: 0;
  }

  .ztInputDiv {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(188, 189, 194, 0.2);
    padding: 0px 15px 0px 20px;
    border-radius: 100px;
    width: 100%;
    margin-right: 10px;

    :deep(.el-input__wrapper) {
      background: none;
      border: 0;
      height: 40px;
      box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
    }
  }

  .right_cn {
    background-color: #fff;
    width: 300px;
  }

  .LeftSide_bgfff {
    background-color: #fff;
    box-shadow: 23.9px 5.6px 50px 0 rgba(0, 0, 0, 0.02), 35.1px 0 70px 0 rgba(86, 128, 248, 0.05), 14px 0 25px 0 rgba(86, 128, 248, 0.03);
  }

  .cn_color {
    background-color: #f7f8fc;
    overflow-x: hidden;
  }


  .zt_night {
    .nav_left {
      background-color: #1d1e22;
      color: #ffffff;
    }

    .right_cn {
      background-color: #222328;
    }

    .bgfff {
      background-color: #1d1e22;
      color: #ffffff;
    }

    .LeftSide_bgfff {
      background-color: #222328;
      color: #ffffff;
    }

    .cn_color {
      /* color: #fff; */
      background-color: #1d1e22;
      color: #ffffff;
    }


    .ztInputDiv {
      background-color: #141517;
    }
    :deep(.el-input__wrapper) {
      background-color: #141517;
      border: 0;
      box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
    }

    :deep(.el-input__inner) {
      color: #ffffff;
    }
  }





  .nav_left {
    text-align: center;
    position: relative;
    padding: 40px 0;
    width: 70px;
    background-color: #E9E9ED;

    .my_avatar {
      position: absolute;
      bottom: 20px;
      left: 0;
      width: 100%;
      text-align: center;
    }
  }

  .dawn {
    background-color: #fff;
    color: #000;
  }

  .night {
    background-color: #001529;
    color: #fff;
  }

  .flex-grow {
    flex-grow: 1;
  }

  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }

  #components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
  }

  .site-layout .site-layout-background {
    background: #fff;
  }

  .ant-layout {
    height: 100%;
  }

  .site-layout .site-layout-background {
    background: #fff;
  }

  :deep(.ant-layout-sider-children) {
    overflow: auto !important;
  }

  .content-container {
    display: flex;
    width: 100%;
    flex-direction: column;
    max-width: calc(100% - 80px);
    min-width: calc(100% - 200px);
    /* width: calc(100% - 80px); */
  }

  /*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
</style>