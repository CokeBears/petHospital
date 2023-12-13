<!-- 注册 -->
<script setup>
import { ElMessage } from 'element-plus'
import { postEnroll } from '@/apis/loginAPI'
import { ref } from 'vue'
const id = ref('')
const password = ref('')
const enroll = async () => {
    if (id.value.length == 11 && password.value.length >= 6) {
        const res = await postEnroll(id.value, password.value)
        //1001注册成功
        if (res.data == 1001) {
            // router.push('/')
            ElMessage({
                message: '注册成功，请返回登录页登录',
                type: 'success',
            })
        } else {
            ElMessage('该手机号已绑定账号！')
        }
    } else {
        ElMessage('手机号或密码不符合规范，密码需大于6位')
    }
}
</script>

<template>
    <div class="login-box">
        <p>Registration page</p>
        <div class="user-box">
            <input type="text" name="phone" placeholder="请输入手机号" v-model="id">
        </div>
        <div class="user-box">
            <input type="password" name="password" placeholder="请输入密码" required="" v-model="password">
        </div>
        <div class="enroll">
            <router-link to="/login">返回登录</router-link>
        </div>

        <div class="buttonBox">
            <el-button class="but" type="primary" @click="enroll()">注册</el-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
body {
    background-color: #ececec;
}

.login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30rem;
    padding: 3.5rem;
    transform: translate(-50%, -70%);

    p {
        margin-bottom: 45px;
        text-align: center;
        font-size: 25px;
        font-weight: bold;
    }

    .user-box {
        position: relative;
    }

    .user-box input {
        box-sizing: border-box;
        width: 100%;
        padding: 10px 15px;
        margin-bottom: 25px;
        border: none;
        border-radius: 20px;
        outline: none;
    }

    .enroll {
        display: flex;
        justify-content: flex-end;
        padding: 0 12px;
    }

    .buttonBox {
        margin-top: 20px;

        .but {
            width: 100%;
            height: 38px;
            border-radius: 20px;
        }
    }

}
</style>