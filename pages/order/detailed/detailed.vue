<template>
	<view class="page-container">
		<view class="maxBox">
			<view class="headerBox">
				<text class="order-time">{{order.time}}</text>

				<text class="order-state">{{order.state}}</text>
			</view>
			<view class="itemsBox">
				<view class="itemsList" v-for="i in order.cart" :key="i._id">
					<text>{{i.name}}</text>
					<text class="items-price">￥{{i.price}}</text>
				</view>
				<u-divider lineColor="#aa5500"></u-divider>
				<view class="itemsList">
					<text>共计：</text>
					<text class="order-totalPrice">￥{{order.totalPrice}}</text>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import {
		findOneOrder
	} from '../../../api/order.js'
	export default {
		onShow() {
			uni.setNavigationBarColor({
				frontColor: '#000000',
				backgroundColor: '#f5f5f5'
			});
		},
		onLoad: function(options) {
			// options.id 包含传递的参数值
			this.id = options.id
		},
		data() {
			return {
				id: '',
				order: {}
			};
		},
		mounted() {
			this.onFindOne()
		},
		methods: {
			onFindOne() {
				const findOneOrderAPI = async () => {
					const res = await findOneOrder(this.id)
					this.order = res
				}
				findOneOrderAPI()
			}
		}
	}
</script>

<style lang="scss">
	.page-container {
		position: absolute;
		width: 100%;
		height: 100%;
		background: #f5f5f5;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.maxBox {
		position: absolute;
		top: 10px;
		width: 94%;
		background-color: white;
		border-radius: 10px;

		.headerBox {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 8px 10px;
			color: #ffffff;
			background-color: #8f8f94;
			border-radius: 10px 10px 0 0;
		}

		.itemsBox {
			box-sizing: border-box;
			padding: 15px 10px;

			.itemsList {
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 10px;

				.items-price {
					color: red;
				}
			}

			.order-totalPrice {
				color: red;
			}
		}
	}
</style>