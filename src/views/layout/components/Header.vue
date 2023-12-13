<script setup>
import {
    SwitchButton
} from '@element-plus/icons-vue'
import { useAdminStore } from '@/stores/admin'
import { onMounted } from 'vue'
const adminStore = useAdminStore()
const renew = adminStore.renew
const quit = adminStore.clearUserInfo
onMounted(() => renew())
</script>


<template>
    <div class="header">
        <div class="header-logo">
            <img src="https://img1.baidu.com/it/u=1500683741,296612413&fm=253&fmt=auto&app=138&f=JPEG?w=344&h=300" alt="">
            <p>Pet Hospital Admin</p>
        </div>
        <div class="header-user">
            <p class="user-name">欢迎您 {{ adminStore.admin.data.admin.name }}</p>
            <div class="header-quit" @click="quit">
                <el-icon>
                    <SwitchButton />
                </el-icon>
                <p>退出登录</p>
            </div>
        </div>
    </div>
    <div class="isolation">
    </div>
</template>


<style lang="scss">
.header {
    box-sizing: border-box;
    height: 75px;
    background-color: white;
    display: flex;
    color: #000;
    justify-content: space-between;
    padding-right: 50px;

    .header-logo {
        display: flex;
        align-items: center;
        font-size: 25px;
        font-weight: bold;

        img {
            margin-right: 20px;
        }
    }

    .header-user {
        display: flex;
        align-items: center;

        .user-name {
            font-size: 18px;
            font-weight: 550;
        }

        .header-quit {
            margin-left: 60px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            // font-size:5px 5px;
            padding: 5px 10px;
            background-color: #ececec;
            border-radius: 10px;

            p {
                margin-left: 5px;
            }
        }

        // background-color: antiquewhite;
    }
}

.isolation {
    width: 100%;
    height: 5px;
    background-image: linear-gradient(to right, rgb(197, 184, 184), rgb(175, 175, 15));
}
</style>