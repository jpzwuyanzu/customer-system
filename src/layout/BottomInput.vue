<template>
    <div class="between">
        <div>
            <el-popover placement="top-end" :show-arrow="false" :offset="25" :visible="template_visible" :width="50 + '%'"
                trigger="click" :popper-style="zdy_popover">
                <template #reference>
                    <el-image style="width:30px;" @click="template_visible = !template_visible" class="mr10 crpr"
                        :src="filter.getFile('quickReply.png')" fit="cover" />
                </template>
                <div class="p10 pb0">
                    <div class="between mb15">
                        <div class="fw f16">
                            模版列表
                        </div>
                        <div>
                            <el-icon class="crpr" size="25" @click="template_visible = !template_visible">
                                <Close />
                            </el-icon>
                        </div>
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
                        <el-scrollbar class="w" height="50vh">
                            <div class="template_list" @click="template_election(index)"
                                :class="Store.counter.themeMode ? 'zt_night' : ''" v-for="(item, index) in 100"
                                :key="index">
                                <div class="mr10 tc" style="width:40px;">
                                    {{ index + 1 }}
                                </div>
                                <div class="w mr20">
                                    你好啊{{ item }}
                                </div>
                                <div>
                                    <div class="mb10">
                                        <el-button type="success" size="small" class="f14">编辑</el-button>
                                    </div>
                                    <div>
                                        <el-button type="primary" @click="template_del" size="small" color="#ff3366"
                                            class="f14">删除</el-button>
                                    </div>
                                </div>
                            </div>
                        </el-scrollbar>

                    </div>
                </div>
            </el-popover>
        </div>
        <div class="ztInputDiv">
            <el-input v-model="input1" :autosize="{ minRows: 1, maxRows: 4 }" :show-word-limit="false"
                class="not_textarea_css w mr10" type="textarea" placeholder="输入消息" clearable :minlength="5000" />

            <el-popover placement="top-end" :show-arrow="false" :offset="25" :width="50 + '%'" trigger="click"
                :popper-style="zdy_popover">
                <template #reference>
                    <el-image style="width: 30px;" :src="filter.getFile('expression.png')" fit="cover" />
                </template>
                <div class="p10">
                    <Emoji v-model="input1" @add="addEmoji($event)" @delete="deleteEmoji()" />
                </div>
            </el-popover>


        </div>
        <el-image style="width: 30px;" :src="filter.getFile('send.png')" fit="cover" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import useStore from '@/store';
import { ElMessageBox } from 'element-plus'
import useCurrentInstance from "@/utils/useCurrentInstance";
const { proxy } = useCurrentInstance();
const global = proxy
const Store = ref(useStore())
const template_visible = ref(false)
const input1 = ref('')
const zdy_popover = ref({})
zdy_popover.value = {
    backgroundColor: '#1D1E22',
    border: 0,
    minWidth: '0',
}
watch(() => Store.value.counter.themeMode, (newVal) => {
    if (newVal) {
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
);

const addEmoji = (val: any) => {
    // input1.value += global.$string2emoji(val) 
    input1.value += val
}

const deleteEmoji = () => {
    if (input1.value) {
        input1.value = global.$deleteEmoji(input1.value)
    }
}

const template_election = (_index: any) => {
    //模版选择的某一项
    template_visible.value = false
    input1.value = '你好啊'

}
const template_del = () => {
    //模版列表删除
    (ElMessageBox as any)({
        title: '提示',
        message: '您确认要删除该条数据吗？',
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        beforeClose: (action: any, _instance: any, done: any) => {
            if (action === 'confirm') {
                done()
            } else {
                done()
            }
        }
    })
}
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


.zt_night {
    .template_list {
        color: #fff;
    }

    .bgfff {
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
</style>