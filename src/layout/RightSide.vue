<template>
    <el-scrollbar :wrap-style="{width:'100%'}">
        <el-affix :offset="0">
            <div style="padding:16px;z-index: 2;" :class="Store.counter.themeMode?'zt_night':'bgfff'">
                <div class="mb10 f20 fw">
                    人员信息
                </div>
                <div class="mb10 cr707c97 f12">
                    最近联系
                </div>
                <el-input v-model="input1" placeholder="人员查询" class="zdy_input" clearable :prefix-icon="Search"
                    :minlength="50" />
            </div>
        </el-affix>

        <div class="chatlist between" :class="selec_index==index?'cur':''" v-for="(item,index) in 100" :key="index"
            @click="selectContacts(item,index)">
            <div class="rowC mr10" style="width: 80%;">
                <div class="mr10">
                    <el-avatar :size="40" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                </div>
                <div class="w">
                    <div class="f14 fw mb5 svh">
                        用户{{index+2*18}}号
                    </div>
                    <div class="between cr707c97">
                        <div class="f12">
                            北京
                        </div>
                        <div class="f12">
                            175cm
                        </div>
                        <div class="f12">
                            E罩杯
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <el-button type="primary" color="#296dfe"  round class="f12">发送</el-button>
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
    let input1 = ref<any>('')
    let selec_index = ref<any>(-1)
    const selectContacts = (_item: any, _index: any) => {
       // selec_index.value = index
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

    :deep(.zdy_input .el-input__wrapper ) {
        background-color: rgba(188, 189, 194, 0.2);
        border: 0;
        box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
    }
</style>