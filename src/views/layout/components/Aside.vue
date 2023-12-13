<script setup>
import {
    User,
    Document,
    Menu as IconMenu,
    Clock,
    ShoppingCart
} from '@element-plus/icons-vue'
const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
}
//权限
const permissions = 0
</script>


<template>
    <div class="aside-menu">
        <el-menu active-text-color="#7fff00" background-color="#4d4f53" class="el-menu-vertical-demo" default-active="/"
            text-color="#fff" router>
            <el-menu-item index="/my">
                <el-icon>
                    <user />
                </el-icon>
                <span>个人界面</span>
            </el-menu-item>
            <el-menu-item index="/inquiry">
                <el-icon>
                    <document />
                </el-icon>
                <span>问诊功能</span>
            </el-menu-item>
            <el-menu-item index="/historyCases">
                <el-icon>
                    <clock />
                </el-icon>
                <span>历史问诊</span>
            </el-menu-item>
            <el-menu-item index="/items" :disabled="permissions">
                <el-icon>
                    <icon-menu />
                </el-icon>
                <span>医疗管理</span>
            </el-menu-item>

            <el-menu-item index="/order">
                <el-icon>
                    <ShoppingCart />
                </el-icon>
                <span>订单管理</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>


<style lang="scss">
.mb-2 {
    width: 100%;
}
</style>