<!-- 登录 -->
<script setup>
import { ElMessage } from 'element-plus'
import router from '@/router';
import { ref } from 'vue'
import { useAdminStore } from '@/stores/admin'

const adminStore = useAdminStore()
const id = ref('')
const password = ref('')
const login = async () => {
    await adminStore.getAdminInfo(id.value, password.value)
    const res = adminStore.admin
    if(res.data.code == 2001){
        router.push('/my')
    }else if(res.data == 2002){
        ElMessage('密码错误！')
    }else{
        ElMessage('未注册账号！')
    }
}
</script>

<template>
    <div class="login-box">
        <p>Pet Hospital Admin</p>
        <div class="user-box">
            <input type="text" name="id" placeholder="请输入账号" v-model="id">
        </div>
        <div class="user-box">
            <input type="password" name="password" placeholder="请输入密码" required="" v-model="password">
        </div>
        <div class="enroll">
            你还没有账号>><router-link to="/enroll" type="">前往注册</router-link>
        </div>

        <div class="buttonBox">
            <el-button class="but" type="primary" @click="login()">登录</el-button>
        </div>
    </div>
</template>

<style lang="scss">
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
        // background: transparent;
    }

    .enroll {
        display: flex;
        justify-content: flex-end;
        padding: 0 12px;

        a {
            color: blue;
        }
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