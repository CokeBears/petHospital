<template>
	<view class="page-container">
		<view class="ordersMax" v-if="orderList.length>0">
			<orders v-for="i in orderList" :key="i._id" :recordId="i._id">
				<text class="order-time">{{i.time}}</text>
				<text class="order-totalPrice">￥{{i.totalPrice}}</text>
				<text class="order-stateF" v-if="i.state=='未支付'">{{i.state}}</text>
				<text class="order-stateT" v-else>{{i.state}}</text>
			</orders>
		</view>
		<u-empty mode="car" icon="http://cdn.uviewui.com/uview/empty/car.png" v-else>
		</u-empty>
	</view>
</template>

<script>
	import {
		findOrder
	} from '../../api/order.js'
	import orders from './components/orders.vue'
	export default {
		components: {
			orders
		},
		onShow() {
			uni.setNavigationBarColor({
				frontColor: '#000000',
				backgroundColor: '#f5f5f5'
			});
		},
		data() {
			return {
				orderList: []
			}
		},
		mounted() {
			this.onFindOrder()
		},
		methods: {
			onFindOrder() {
				const findOrderAPI = async () => {
					const res = await findOrder()
					this.orderList = res
				}
				findOrderAPI()
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

	.ordersMax {
		position: absolute;
		top: 10px;
		width: 98%;

		.order-totalPrice {
			color: red;
		}
		.order-stateF{
			color: red;
		}
		.order-stateT{
			color: green;
		}
	}
</style>