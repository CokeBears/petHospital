<template>
	<view class="cards" @click="clickText(recordId)">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: ["recordId"],
		data() {
			return {

			};
		},
		methods: {
			clickText(recordId) {
				uni.navigateTo({
					url: `../../cases/cases?id=${recordId}`
				});
			}
		}
	}
</script>

<style lang="scss">
	.cards {
		width: 96%;
		margin-left: 2%;
		border-radius: 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 25px;
		height: 60rpx;
		background-color: #f5f5f5;
		margin-top: 15px;
	}
</style>