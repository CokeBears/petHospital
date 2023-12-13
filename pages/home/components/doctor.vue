<template>
	<view class="maxBox">
		<slot></slot>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.maxBox{
		display: flex;
		box-sizing: border-box;
		margin-top: 10px;
		margin-left: 10px;
		margin-right: 10px;
		height: 160px;
		background-color: #f5f5f5;
	}
</style>