<template>
	<view class="cards">
		<slot></slot>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.cards {
		width: 96%;
		margin-left: 2%;
		border-radius: 10px;
		// display: flex;
		// align-items: center;
		// justify-content: space-between;
		box-sizing: border-box;
		height: 300rpx;
		background-color: white;
		margin-bottom: 15px;
	}
</style>