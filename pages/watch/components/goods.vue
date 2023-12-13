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
		align-items: center;
		justify-content: space-between;
		border-radius:10px;
		box-sizing: border-box;
		height: 80px;
		background-color: white;
		margin-bottom: 10px;
		padding-left:20px;
		padding-right: 26px;
	}
</style>