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
		<button @click="userMsg()">微信登录</button>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import {
		imgSeverAPI
	} from '../../api/imgSeverAPI.js'
	export default {
		data() {
			return {
				nickname: "",
				phone: "",
				avatar: "https://th.bing.com/th/id/OIP.xA5QX2crc3fR5d0DIH-oDQAAAA?pid=ImgDet&rs=1",
				aImg:'',
				toastErr: {
					type: 'error',
					icon: false,
					title: '失败主题',
					message: "缺少必填项，请检查填写内容并补全",
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
				}
			}
		},
		methods: {
			...mapMutations(['setToken', 'setInfo']),
			//获取头像
			async onChooseAvatar(e) {
				// this.avatar = e.detail.avatarUrl
				// 将头像上传到后端
				const self = this
				const imgSever = async () => {
					const res = await imgSeverAPI(e.detail.avatarUrl)
					console.log(res)
					self.aImg = res.replace(/^"(.*)"$/, "$1");
				}
				await imgSever()
				this.avatar = `http://127.0.0.1:3000/uploads/${this.aImg}`
				console.log(this.avatar)
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
			//未注册用户新增
			userMsg() {
				const self = this;
				uni.request({
					url: 'http://127.0.0.1:3000/userMsg',
					method: 'POST',
					data: {
						avatar: this.avatar,
						userName: this.nickname,
						phone: this.phone,
					},
					success(res) {
						let token = res.data.token;
						let info = res.data.info;
						self.setToken(token);
						self.setInfo(info);
						// 数据存储完成后执行跳转
						uni.switchTab({
							url: '/pages/my/my'
						});
					},
					fail(err) {
						console.error(err)
						self.showToast(self.toastErr)
					}
				});
			}
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
</style>