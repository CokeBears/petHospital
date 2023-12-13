<template>
	<view>
		<u-toast ref="uToast"></u-toast>
		<u-sticky bgColor="#fff">
			<view class="search">
				<u-search :showAction="true" actionText="搜索" :animation="true"></u-search>
			</view>
			<view class="tabs">
				<u-tabs :list="list" @change="handleTabChange"></u-tabs>
			</view>
		</u-sticky>
		<!-- 通过list.index发送请求数据 -->
		<view class="commodity">
			<goods v-for="i in goodsList" :key="i">
				<view class="textBox">
					<text class="goods-name">{{i.name}}</text>
					<text class="goods-price">￥{{i.price}}</text>
				</view>
				<!-- 点击图表添加项目到cart -->
				<u-icon name="plus-circle-fill" color="#04b3aa" size="26" @click="increaseCart(i)"></u-icon>
			</goods>
		</view>

		<view class="fab" @click="toCart()">
			<view class="box">
				<image src="../../static/cart.png" mode="widthFix"></image>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import goods from './components/goods.vue'
	import store from '../../store/index.js'
	import isEqual from 'lodash/isEqual';
	import {
		getCommoditySort
	} from '../../api/watch.js'
	import {
		findCart,
		pushCart
	} from '../../api/cart.js'
	export default {
		components: {
			goods
		},
		computed: {
			...mapState({
				items: state => state.cart.items,
			})
		},
		mounted() {
			this.commoditySort(this.list[0].name)
		},
		data() {
			return {
				show: false,
				listToast: [{
						type: 'error',
						icon: false,
						title: '失败主题',
						message: "购物车已存在该项目",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
					},
					{
						type: 'success',
						title: '成功主题(带图标)',
						message: "已添加该项目到购物车",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					}
				],
				list: [{
					name: '洗护',
				}, {
					name: '疫苗'
				}, {
					name: '放射检测'
				}, {
					name: '血液检测'
				}, {
					name: '常规检测'
				}, {
					name: '手术治疗'
				}],
				selectedTabIndex: 0,
				// 数据获取的位置
				goodsList: [],
				type: "error",
				value: 10
			}
		},
		methods: {
			...mapMutations(['setItems']),
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
			commoditySort(name) {
				const commoditySortAPI = async () => {
					const res = await getCommoditySort(name)
					this.goodsList = res
				}
				commoditySortAPI()
			},
			handleTabChange(list) {
				// 使用下标查找对应的数据
				this.commoditySort(this.list[list.index].name)
			},
			toCart() {
				uni.navigateTo({
					url: '/pages/cart/cart'
				})
			},
			// 获取点击的商品并添加到vuex中进行保存，同步vuex中的数据到数据库
			increaseCart(i) {
				// 1.添加商品信息到vuex
				// 只录入未存在的
				const item = this.items.find((index) => i._id === index._id)
				if (!item) {
					this.setItems(i)
					this.showToast(this.listToast[1])
				} else {
					this.showToast(this.listToast[0])
				}
				// 2.同步到数据库i
				const pushCartAPI = async () => {
					const res = await pushCart(this.items)
				}
				pushCartAPI()
			}
		},
	}
</script>

<style lang="scss">
	.search {
		width: 90%;
		margin-left: 5%;
	}

	.tabs {
		width: 96%;
		margin-left: 2%;
	}

	.commodity {
		background-color: #f5f5f5;
		box-sizing: border-box;
		padding-top: 10px;
		padding-bottom: 1px;
		width: 100%;
	}

	.goods-img {
		border-radius: 10px 10px 0 0;
		margin-bottom: 10px;
		height: 70%;
		width: 100%;
	}



	.textBox {

		box-sizing: border-box;

		.goods-name {
			max-width: 230px;
			display: block;
			font-size: 30rpx;
			white-space: nowrap;
			/* 防止文本换行 */
			overflow: hidden;
			/* 隐藏溢出的文本 */
			text-overflow: ellipsis;
			/* 显示省略号 */
		}

		.goods-price {
			margin-top: 3px;
			display: block;
			font-size: 35rpx;
			font-weight: bolder;
			color: red;
		}
	}


	.badge {
		width: 30px;
		position: fixed;
		bottom: 225px;
		right: 6px;
		z-index: 2;
	}

	.fab {
		width: 45px;
		height: 35px;
		background-color: pink;
		/* 设置悬浮球的背景颜色 */
		border-radius: 10px;
		/* 设置悬浮球的形状为圆形 */
		position: fixed;
		/* 使用固定定位 */
		bottom: 200px;
		/* 距离底部的距离 */
		right: 10px;
		/* 距离右侧的距离 */
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.5);
		background-color: rgba(255, 255, 255, 0.8);



		/* 设置父元素的背景透明度为50% */
		/* 设置图标或内容的颜色 */
		image {
			background-color: rgba(255, 255, 255, 0);
			width: 25px;
		}
	}
</style>