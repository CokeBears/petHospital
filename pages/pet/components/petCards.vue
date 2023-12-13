<template>
	<view class="cards">
		<slot></slot>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.cards{
		display: flex;
		align-items: center;
		width: 90%;
		height: 180rpx;
		background-color: white;
		border-radius: 10px;
		margin-left: 5%;
		margin-bottom: 15px;
	}
</style>