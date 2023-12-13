<template>
	<view class="page-container">
		<u-toast ref="uToast"></u-toast>
		<view class="cartsMax" v-if="cartList.length>0">
			<carts v-for="i in cartList" :key="i._id">
				<view class="textBox">
					<text class="carts-name">{{i.name}}</text>
					<text class="carts-price">￥{{i.price}}</text>
				</view>
				<!-- 点击图表添加项目到cart -->
				<u-icon name="trash-fill" color="#04b3aa" size="26" @click="onDelete(i)"></u-icon>
			</carts>
			<view class="btnBox">
				<text class="total">共计：￥{{totalPrice}}</text>
				<view class="btn">
					<u-button type="primary" text="提交订单" @click="onPushOrder()"></u-button>
				</view>
				<view class="btn">
					<u-button type="primary" :plain="true" text="清空购物车" @click="onClear()"></u-button>
				</view>
			</view>
		</view>
		<u-empty mode="car" icon="http://cdn.uviewui.com/uview/empty/car.png" v-else>
		</u-empty>
	</view>
</template>

<script>
	import {
		findCart,
		pushCart
	} from '../../api/cart.js'
	import {
		pushOrder
	} from '../../api/order.js'
	import carts from './components/carts.vue'
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		computed: {
			...mapState({
				items: state => state.cart.items,
				userInfo: state => state.user.userInfo
			})
		},
		components: {
			carts
		},
		onShow() {
			uni.setNavigationBarColor({
				frontColor: '#000000',
				backgroundColor: '#f5f5f5'
			});
		},
		data() {
			return {
				show: false,
				cartList: [],
				listToast: [{
						type: 'error',
						icon: false,
						title: '失败主题',
						message: "下单失败",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
					},
					{
						type: 'success',
						title: '成功主题(带图标)',
						message: "成功下单,请及时到前台核对付款",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					}
				],
				totalPrice: ''
			};
		},
		mounted() {
			this.findCartList()
		},
		methods: {
			...mapMutations(['deleteItems', 'clearItems']),
			findCartList() {
				const findCartAPI = async () => {
					const res = await findCart()
					this.cartList = res
					let sum = 0;
					this.cartList.forEach((item) => {
						sum += item.price;
					});
					this.totalPrice = sum
				}
				findCartAPI()
			},
			showToast(params) {
				this.$refs.uToast.show({
					...params,
					complete() {
						params.url && uni.navigateTo({
							url: params.url
						})
					}
				})
			},
			onPushCart() {
				const pushCartAPI = async () => {
					const res = await pushCart(this.items)
				}
				pushCartAPI()
			},
			onDelete(i) {
				this.deleteItems(i)
				this.onPushCart()
				this.findCartList()
			},
			onClear() {
				this.clearItems()
				this.onPushCart()
				this.findCartList()
			},
			onPushOrder() {
				const pushOrderAPI = async () => {
					const res = await pushOrder(this.items,this.totalPrice,this.userInfo)
					if(res == 1001){
						this.showToast(this.listToast[1])
						this.onClear()
					}else {
						this.showToast(this.listToast[0])
					}
				}
				pushOrderAPI()
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

	.cartsMax {
		position: absolute;
		top: 10px;
		width: 98%;

		.carts-price {
			margin-left: 10px;
			color: red;
		}
	}

	.btnBox {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 20%;
		background-color: white;
		padding-top: 15px;

		.total {
			margin-left: 5%;
			color: red;
		}

		.btn {
			width: 90%;
			margin-left: 5%;
			margin-top: 20px;
		}
	}
</style>