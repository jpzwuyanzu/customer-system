<template>
  <a-layout>
    <!-- <a-layout-header :style="topHeaderStyle">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
        @select="handleSelect">
        <el-menu-item>
          LOGO
        </el-menu-item>
        <div class="flex-grow" />
        <el-menu-item>
          <el-icon>
            <Moon />
          </el-icon>
          <span style="margin:0 10px 0 0;">
            夜间模式
          </span>
          <el-switch v-model="mode_value" :active-icon="Check" :inactive-icon="Close" />
        </el-menu-item>
        <el-sub-menu>
          <template #title>
            <el-avatar :size="40" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
            <span style="margin-left: 10px;">
              jeehom
            </span>
          </template>
          <el-menu-item>账号一</el-menu-item>
          <el-menu-item>账号二</el-menu-item>
          <el-menu-item>账号三</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </a-layout-header> -->

    <a-layout>
      <div class="nav_left">
        <!-- 最左边的导航栏 -->
        <div class="mb40">
          <el-image style="width: 35px;" src="/src/assets/images/left_nav/1.png" fit="cover" />
        </div>
        <div class="mb40">
          <el-image style="width: 35px;" src="/src/assets/images/left_nav/2.png" fit="cover" />
        </div>
        <div class="mb40">
          <el-image style="width: 35px;" src="/src/assets/images/left_nav/3.png" fit="cover" />
        </div>
        <div class="mb40">
          <el-image style="width: 35px;" src="/src/assets/images/left_nav/4.png" fit="cover" />
        </div>
        <div class="my_avatar">
          <el-avatar shape="square" :size="35"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
        </div>
      </div>
     
      <div style="width: 252px;" class="bgfff">
        <LeftSide />
      </div>


      <a-layout>
        <a-layout-header :style="headerStyle">
          聊天窗头部信息
        </a-layout-header>

        <el-scrollbar>
          <a-layout-content :style="contentStyle">
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
        <a-layout-footer :style="footerStyle">底部输入框</a-layout-footer>

      </a-layout>
      <a-layout-sider :style="siderStyle">右侧联系人详细信息占位</a-layout-sider>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
  import { ref } from "vue";
  // import { useRoute } from 'vue-router'
  // import SideBar from "./sideBar.vue";
  import LeftSide from './LeftSide.vue'
  import type { CSSProperties } from 'vue';

  const activeIndex = ref('1')
  const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }

  const mode_value = ref(false)

  const topHeaderStyle: any = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 0,
    backgroundColor: '#108ee9',
  };
  const headerStyle: any = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '#7dbcea',
  };

  const contentStyle: any = {
    color: '#000',
    backgroundColor: '#EFF2F9',
  };

  const siderStyle: any = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#3ba0e9',
  };

  const footerStyle: any = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#7dbcea',
  };
</script>
<style lang="scss" scoped>
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