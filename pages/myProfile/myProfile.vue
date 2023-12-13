<template>
	<view>
		<u-toast ref="uToast"></u-toast>
		<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
			<image class="avatar" :src="avatar"></image>
		</button>
		<view class="name" style="padding-left: 20rpx;">
			<text class="nameText">昵称</text>
			<input v-model="nickname" type="nickname" class="weui-input" placeholder="请输入昵称" />
		</view>
		<view class="phone" style="padding-left: 20rpx;">
			<text class="phoneText">手机号</text>
			<input v-model="phone" placeholder="请输入手机号" />
		</view>
		<view class="alter">
			<u-button @click="alter()" type="primary" :hairline="true" :plain="true" text="提交修改"
				color="#19be6b"></u-button>
		</view>
		<view class="quit">
			<u-button type="primary" color="#dd6161" text="退出登录" @click="quit"></u-button>
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
				params: {
					type: 'success',
					title: '结束后跳转标签页',
					message: "修改成功",
					url: '/pages/my/my',
					// iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
				},
				nickname: "",
				phone: "",
				avatar: "https://th.bing.com/th/id/OIP.xA5QX2crc3fR5d0DIH-oDQAAAA?pid=ImgDet&rs=1",
			};
		},
		computed: {
			...mapState({
				token: state => state.user.token,
				status: state => state.user.status,
				userInfo: state => state.user.userInfo
			})
		},
		methods: {
			...mapMutations(['clearToken', 'setInfo']),
			async onChooseAvatar(e) {
				// this.avatar = e.detail.avatarUrl
				// 将头像上传到后端
				const self = this
				const imgSever = async () => {
					const res = await imgSeverAPI(e.detail.avatarUrl)
					self.aImg = res.replace(/^"(.*)"$/, "$1");
				}
				await imgSever()
				this.avatar = `http://127.0.0.1:3000/uploads/${this.aImg}`
			},
			quit() {
				this.clearToken();
				uni.switchTab({
					url: '/pages/my/my'
				});
			},
			showToast(params) {
				this.$refs.uToast.show({
					...params,
					complete() {
						params.url && uni.switchTab({
							url: params.url
						})
					}
				})
			},
			// 提交修改后的数据到接口
			alter() {
				const self = this;
				wx.request({
					url: 'http://127.0.0.1:3000/alter',
					method: 'POST',
					header: {
						'token': `${this.token}`, // 在请求头中添加token
						'Content-Type': 'application/json', // 根据需要设置其他头部
					},
					data: {
						userImg: this.avatar,
						userName: this.nickname,
						phone: this.phone
					},
					success(res) {
						// console.log(res.data.code)
						if (res.data.code == '1000') {
							self.setInfo(res.data.user)
							// 数据存储完成后执行跳转
							self.showToast(self.params)
						}
						else{
							console.log('修改失败！号码重复' + res.errMsg)
						}
					}
				})
			}
		},
		created() {
			this.avatar = this.userInfo.userImg,
			this.nickname = this.userInfo.userName,
			this.phone = this.userInfo.phone
		}
	}
</script>

<style lang="scss">
	.avatar-wrapper {
		padding: 0;
		width: 56px !important;
		border-radius: 8px;
		margin-top: 40px;
		margin-bottom: 40px;

		.avatar {
			display: block;
			width: 56px;
			height: 56px;
		}
	}

	.name {
		display: flex;
		margin-bottom: 2rem;

		.nameText {
			width: 60px;
			margin-right: 15px;
		}
	}

	.phone {
		display: flex;
		margin-bottom: 2rem;

		.phoneText {
			width: 70px;
			margin-right: 7px;
		}
	}

	.alter {
		width: 90%;
		margin-left: 5%;
		margin-bottom: 1rem;
	}

	.quit {
		width: 90%;
		margin-left: 5%;
	}
</style>