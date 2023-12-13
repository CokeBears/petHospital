<!-- 预约项 -->
<script setup>

</script>

<template>
    <div class="item-box">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.item-box{
    display:flex;
    align-items:center;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    height: 80px;
    padding:0 20px;
    margin-bottom: 10px;
    padding-right:80px;
    border-radius:10px;
    background-color: #ececec;
}
</style>