<!-- 个人界面 -->
<script setup>
import router from '@/router';
import {
    Edit
} from '@element-plus/icons-vue'
import { useAdminStore } from '@/stores/admin'
import { onMounted } from 'vue'
const adminStore = useAdminStore()
const renew = adminStore.renew

onMounted(renew)
const revise = () => {
    router.push('/myRevise')
}
</script>

<template>
    <div class="user-box">
        <div class="user-max">
            <div class="user-avatar">
                <img :src="`http://127.0.0.1:3000/uploads/${adminStore.admin.data.admin.avatar}`" alt="">
            </div>
            <div class="user-text">
                <p class="user-name">{{ adminStore.admin.data.admin.name }}</p>
                <p>科室：{{ adminStore.admin.data.admin.division }}</p>
                <p>职务：{{ adminStore.admin.data.admin.position }}</p>
                <p>联系电话：{{ adminStore.admin.data.admin.adminId }}</p>
                <p>授权等级：{{ adminStore.admin.data.admin.power }}</p>
            </div>
        </div>
        <el-button type="primary" :icon="Edit" @click="revise()">点击修改</el-button>
    </div>
</template>

<style lang="scss" scoped>
.user-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 10px;
    padding-right: 100px;
    background-color: white;


    .user-max {
        display: flex;
        box-sizing: border-box;
        width: 100%;

        .user-avatar {
            height: 200px;
            margin-right: 20px;
        }

        .user-text {
            font-size: 15px;
            line-height: 180%;

            .user-name {
                font-size: 20px;
                font-weight: 550;
                margin-bottom: 10px;
            }

        }
    }
}
</style>