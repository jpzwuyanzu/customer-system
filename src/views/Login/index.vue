<template>
  <div class="login_form_page_container">
    <div class="login_form_container">
      <a-form class="cusTomerForm">
        <h1 class="fw" style="color: #3f3f3f;font-size: 30px;">electron 客服系统</h1>
        <div class="f14" style="margin-bottom: 60px;color: #707c97;">
          简单轻松，一步上云，立刻登录到后台
        </div>
        <a-form-item v-bind="validateInfos.username">
          <a-input v-model:value="modelRef.username" style="border: solid 1px #707c97;  font-size: 18px;height: 56px;"
            placeholder="请输入用户名" @blur="validate('username', { trigger: 'blur' }).catch(() => {})" />
        </a-form-item>
        <a-form-item v-bind="validateInfos.password">
          <a-input v-model:value="modelRef.password" style="border: solid 1px #707c97;  font-size:18px;height: 56px;"
            placeholder="请输入密码" @blur="validate('password', { trigger: 'blur' }).catch(() => {})" />
        </a-form-item>
        <a-form-item style="width: 100%">
          <div class="loginBrn_part">
            <a-button type="primary" v-preventReClick="2000" style="font-family: PingFangSC;font-size:16px;background-color:#296dfe;width: 374px;  height: 56px;
            " @click.prevent="loginNow">立刻登录</a-button>
            <!-- <a-button style="margin-left: 10px" @click="resetFields">Reset</a-button> -->
          </div>
        </a-form-item>
        <a-form-item class="tc">
          <el-checkbox v-model="checked" label="记住密码" size="large" />
        </a-form-item>
      </a-form>
    </div>
    <div>
      <el-image style="width: 614px; height:734px;" :src="filter.getFile('Maskgroup.jpg')" fit="cover" />
    </div>
  </div>
</template>
<script setup lang="ts">
  // import { reactive, toRaw, ref } from 'vue'
  // import { Form, message } from 'ant-design-vue';
  import { reactive, ref } from 'vue'
  import { Form, } from 'ant-design-vue';
  import type { ILogin } from "./../../types/interface";
  import { setStorage, setCookieItem } from '@/utils/common'
  import { useRouter } from 'vue-router'
  const appRouter = useRouter();
  const useForm = Form.useForm;
  const checked = ref(true)

  const modelRef = reactive < ILogin > ({
    username: '',
    password: '',
  })

  const ruleRef = reactive < any > ({
    username: [
      {
        required: true,
        message: '请输入用户名称'
      },
      {
        min: 3,
        max: 10,
        message: '用户名称长度限制为3-10位',
        trigger: 'blur'
      }
    ],
    password: [
      {
        required: true,
        message: '请输入密码',
      },
      {
        min: 5,
        max: 10,
        message: '用户密码长度限制为5-10位',
        trigger: 'blur'
      }
    ]
  })

  const { validate, validateInfos } = useForm(modelRef, ruleRef);
  const loginNow = async () => {
    setStorage('local', 'token', '123132')

    if (checked.value) {
      setCookieItem('user_pwd', '123456') //保存账号密码的 由于没有登录接口暂时做一半
    }

    appRouter.push('/')
    // try {
    //   const values = await validate()
    //   const resp = await appStore.dispatch('user/saveUserInfoAction', toRaw(modelRef));
    //   if(resp.code === 200) {
    //     //登录成功，跳转到首页
    //     appRouter.push('/')
    //   }
    // } catch (error) {
    //   console.log(error)
    //   message.error('用户名或密码错误')
    // }
  }

</script>
<style scoped lang="scss">
  .login_form_page_container {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #ecf5ec;

    .login_form_container {
      width: 875px;
      height: 734px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      background: #fff;
      border-top-left-radius: 30px;
      border-bottom-left-radius: 30px;
      padding: 20px;

      /* box-shadow: 2px 1px 2px #fff; */
      .cusTomerForm {
        width: 80%;
      }
    }
  }

  .loginBrn_part {
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
</style>