<!-- 主页面框架 -->
<script setup>
import Aside from './components/Aside.vue'
import Header from './components/Header.vue'
</script>

<template>
    <div class="layout-header">
        <Header />
    </div>
    <div class="layout">
        <Aside class="layout-aside" />
        <!-- 二级路由出口 -->
        <div class="layout-main">
            <RouterView />
        </div>
    </div>
</template>

<style lang="scss">
.layout-header {
    height: 80px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
}

.layout {
    .layout-aside {
        box-sizing: border-box;
        width: 200px;
        min-height: 500px;
        background-color: #4d4f53;
        position: fixed;
        top: 80px;
        bottom: 0;
        z-index: 2;
    }
    .layout-main{
        margin-top: 80px;
        box-sizing: border-box;
        background-color: #ececec;
        margin-left: 200px;
        padding: 15px;
    }
}
</style>