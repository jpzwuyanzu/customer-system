<template>
  <a-layout class="row" :class="themeMode ? 'zt_night' : ''">
    <div class="nav_left">
      <!-- 最左边的导航栏 -->
      <div class="mb40">
        <el-image class="crpr" style="width: 35px;" :src="filter.getFile('left_nav/1.png')" fit="cover" />
      </div>
      <div class="mb40">
        <el-image class="crpr" style="width: 35px;" :src="filter.getFile('left_nav/2.png')" fit="cover" alt="消息通知" />
      </div>
      <div class="mb40">
        <el-image class="crpr" style="width: 35px;" v-show="!themeMode" :src="filter.getFile('left_nav/3.png')"
          fit="cover" alt="日间与夜间模式的切换" @click="switch_themeMode" />
        <el-image class="crpr" style="width: 35px;" v-show="themeMode" :src="filter.getFile('left_nav/3_on.png')"
          fit="cover" alt="日间与夜间模式的切换" @click="switch_themeMode" />
      </div>
      <div class="mb40">
        <el-image class="crpr" style="width: 35px;" :src="filter.getFile('left_nav/4.png')" fit="cover" alt="设置" />
      </div>
      <div class="my_avatar">
        <el-popover placement="right" :width="130" trigger="click" :show-arrow="false" :popper-style="zdy_popover">
          <template #reference>
            <el-avatar shape="square" class="crpr" :size="35"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
          </template>
          <div class="p10 cr707c97">
            <div class="mb10 rowC crpr">
              <el-icon class="mr10">
                <Switch />
              </el-icon>切换账号
            </div>
            <div class="rowC crpr" @click="goout">
              <el-image class="mr10" style="width:20px;" :src="filter.getFile('power.png')" fit="cover" />
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
            <el-avatar :size="40" class="mr10" :src="pinia_counter.LeftSide_obj.avatar" />
            <div class="">
              <div class="f14">{{ pinia_counter.LeftSide_obj.name }}</div>
              <div class="f12 zycr">上次在线时间：{{ timeDisplayMode(pinia_counter.LeftSide_obj.time) }}</div>
            </div>
          </div>
          <el-image class="crpr" v-if="right_type" @click="right_type = !right_type" style="width: 30px;"
            :src="filter.getFile('Calendar.png')" fit="cover" />
          <el-image class="crpr" v-if="!right_type" @click="right_type = !right_type" style="width: 30px;"
            :src="filter.getFile('Calendar_on.png')" fit="cover" />
        </div>
      </a-layout-header>

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

      <a-layout-footer :style="footerStyle" class="bgfff">
        <BottomInput />
      </a-layout-footer>
    </a-layout>
    <!-- animate__fadeOut -->
    <div class="right_cn" :style="{ width: right_type ? '0' : '300px' }">
      <RightSide />
    </div>
  </a-layout>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import useStore from '@/store';
import LeftSide from './LeftSide.vue'
import RightSide from './RightSide.vue'
import BottomInput from './BottomInput.vue'
import { removeStorage, timeDisplayMode } from '@/utils/common'
import { ElNotification, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import { sendMessage } from '@/utils/socket';
 
const iosend = () => {
  //发送
  sendMessage('Hello, Socket.IO!');
}
iosend()

const appRouter = useRouter();
const Store = useStore()
const pinia_counter = ref(Store.counter)
const right_type = ref(true)
const themeMode = ref(pinia_counter.value.themeMode)
const zdy_popover = ref({})
const switch_themeMode = () => {
  pinia_counter.value.switch_themeMode()
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

const goout = () => {
  (ElMessageBox as any)({
    title: '提示',
    message: '您确定要退出到登录界面吗?',
    showCancelButton: true,
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    beforeClose: (action: any, _instance: any, done: any) => {
      if (action === 'confirm') {
        done()
        removeStorage('local')
        appRouter.push('/login')
      } else {
        done()
      }
    }
  })
}
onMounted(() => {
  zdy_popoverf()
  //来消息的提示
  let tipsTxt: any = '<div class="rowC"><div class="mr10"><img style="width:50px" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" /></div><div><div class="f16 fw"> 天使爱美丽</div><div class="f12"> 请等一哈，我查一下啊</div></div></div>';
  (ElNotification as any)({
    dangerouslyUseHTMLString: true,
    message: tipsTxt,
    duration: 500000,
    onClick: (event: any) => handleClick(event),
  })
})

const handleClick = (event: any) => {
  var notificationEl = event.target.closest('.el-notification');
  console.log(notificationEl);
};

// const handleSelect = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
// }
const headerStyle: any = {
  height: 64,
  lineHeight: '1.6',
  padding: '10px 20px',
};
const footerStyle: any = {
  padding: '10px 20px',
};
</script>


<style lang="scss" scoped>
.template_list:hover {
  background-color: #F2F2F3 !important;
  cursor: pointer;
}

.zt_night.template_list:hover {
  background-color: #3D3E42 !important;
  cursor: pointer;
}

.template_list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(112, 124, 151, 0.1);
  padding: 12px 0;
  /* margin-bottom: 15px;
    padding-bottom: 15px; */
}

.template_list:last-child {
  border: 0;
  padding-bottom: 0;
}

.ztInputDiv {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(188, 189, 194, 0.2);
  padding: 0px 15px 0px 10px;
  border-radius: 20px;
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
  transition: all 0.5s;
}

.LeftSide_bgfff {
  background-color: #fff;
  box-shadow: 23.9px 5.6px 50px 0 rgba(0, 0, 0, 0.02), 35.1px 0 70px 0 rgba(86, 128, 248, 0.05), 14px 0 25px 0 rgba(86, 128, 248, 0.03);
}

.cn_color {
  background-color: #f7f8fc;
  overflow: hidden;
  overflow-x: hidden;
}


.zt_night {
  .template_list {
    color: #fff;
  }

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
    background-color: #141517;
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