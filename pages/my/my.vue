<template>
	<view>
		<u-toast ref="uToast"></u-toast>
		<view class="dataCard" v-if="status">
			<button class="loginButton" @click="wxLogin()">
				<img class="hadePhoto" :src="userInfo.userImg" mode="aspectFit"></img>
			</button>
			<view class="headText">
				<text class="userName">{{userInfo.userName}}</text></br>
				<text class="userId">ID：{{userInfo.phone}}</text>
			</view>
		</view>
		<view class="dataCard" v-else>
			<!-- <navigator url="/pages/login/login" hover-class="none"> -->
			<button class="loginButton" @click="wxLogin()">
				<img class="hadePhoto" :src="imgOff" mode="aspectFit"></img>
			</button>
			<!-- </navigator> -->
			<view class="headText">
				<text class="userName">点击头像登录</text></br>
				<text class="userId">为您提供最专业的宠物医疗服务</text>
			</view>
		</view>
		<view class="order">

		</view>
		<view class="group">
			<u-cell-group>
				<u-cell title="个人资料" isLink url="../myProfile/myProfile"></u-cell>
				<u-cell title="宠物管理" isLink url="../pet/pet"></u-cell>
				<u-cell title="我的预约" isLink url="../index/index"></u-cell>
				<u-cell title="缴费记录" isLink url="../order/order"></u-cell>
			</u-cell-group>
		</view>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import store from '../../store/index.js'
	export default {
		data() {
			return {
				imgOff: "https://th.bing.com/th/id/OIP.xA5QX2crc3fR5d0DIH-oDQAAAA?pid=ImgDet&rs=1",
				toastErr: {
					type: 'error',
					icon: false,
					title: '失败主题',
					message: "请先登录再进行其他操作",
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
				}
			}
		},
		computed: {
			...mapState({
				token: state => state.user.token,
				status: state => state.user.status,
				userInfo: state => state.user.userInfo
			})
		},
		created() {
			uni.$on('toastLogin', () => {
				this.showToast(this.toastErr); // 执行特定操作
			});
		},
		methods: {
			...mapMutations(['setToken', 'setInfo']),
			wxLogin() {
				const self = this;
				//获取微信登录请求的code 
				wx.login({
					success(res) {
						if (res.code) {
							//发起网络请求，将code兑换openid 
							wx.request({
								url: 'http://127.0.0.1:3000/wxlogin',
								method: 'POST',
								data: {
									code: res.code
								},
								success(res) {
									if (res?.data?.code == '0000') {
										let token = res.data.token;
										let info = res.data.info;
										self.setToken(token);
										self.setInfo(info);
									} else {
										uni.navigateTo({
											url: '/pages/login/login'
										})
									}
								}
							})
						} else {
							console.log('登录失败！' + res.errMsg)
						}
					}
				})
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
			
		}
	}
</script>

<style lang="scss">
	.dataCard {
		box-sizing: content-box;
		height: 5rem;
		margin-top: 1rem;
		display: flex;
		flex-direction: row;
		align-items: center;

		.loginButton {
			padding: 0;
			margin-left: 2rem;
			margin-right: 2rem;
			box-sizing: content-box;
			height: 3.5rem;
			width: 3.5rem;
		}

		.hadePhoto {
			box-sizing: content-box;
			height: 100%;
			width: 100%;
		}

		.userName {
			font-size: 40rpx;
			font-weight: bold;
		}

		.userId {
			font-size: 28rpx;
			color: $uni-main;
		}
	}

	.partition {
		width: 100%;
		margin-top: 1rem;
		height: 2rem;
	}

	.order {
		background-color: pink;
		margin-top: 1rem;

		width: 90%;
		margin-left: 5%;
		height: 3rem;
		border-radius: 10rpx;
	}

	.group {
		margin-top: 2rem;
		width: 90%;
		margin-left: 5%;
	}
</style>