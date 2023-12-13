<template>
	<view>
		<!-- 先查找该账号下的宠物信息。如果没有信息则返回空提示，有则渲染信息 -->
		<view class="page-container">
			<view class="maxBox">
				<view class="petNull" v-if="petList.length<=0">
					<view class="img">
						<image class="logo" src="/static/logo.png"></image>
					</view>
					<view class="text-area">
						<text class="title">阿宠没有找到你的宝贝档案</text>
						<text class="prompt">请点击下方按钮添加你的宠物</text>
					</view>
				</view>


				<petCards v-else v-for="i in petList" :key="i._id">
					<!-- 带参跳转 宠物id -->
					<navigator :url="`./history/history?id=${i._id}`" hover-class="none">
						<image class="petImg" :src="`http://127.0.0.1:3000/uploads/${i.petImg}`"></image>
					</navigator>
					<view class="petText">
						<view class="headText">
							<text class="petName">{{i.name}}</text>
							<u-icon name="woman" color="#2979ff" size="18" v-if="i.radio=='woman'"></u-icon>
							<u-icon name="man" color="#c76300" size="18" v-else></u-icon>
						</view>
						<text class="petVariety">{{i.variety}}</text>
					</view>
					<view class="close" @click="show = true,id = i._id,petImg=i.petImg">
						<u-icon name="close" color="#aa0000" size="18"></u-icon>
					</view>
					<u-modal :closeOnClickOverlay="true" :show="show" :title="title" :content='content'
						buttonReverse="false" showCancelButton="true" @cancel="cancel" @confirm="confirm(id,petImg)"
						@close="cancel"></u-modal>
				</petCards>

				<navigator url="./new/new" hover-class="none">
					<view class="push">
						<text>添加宠物</text>
					</view>
				</navigator>
			</view>

		</view>
	</view>
</template>

<script>
	import petCards from './components/petCards.vue'
	import {
		deletePetAPI,
		getPetAPI
	} from '../../api/pet.js'

	export default {
		components: {
			petCards
		},
		onShow() {
			uni.setNavigationBarColor({
				frontColor: '#000000',
				backgroundColor: '#f5f5f5'
			});
		},
		data() {
			return {
				id: '',
				petImg: '',
				petState: 1,
				show: false,
				title: '删除资料',
				content: '你确认删除该项资料吗？此操作将无法复原',
				petList: []
			};
		},
		mounted() {
			this.getPet()
		},
		created() {
			// 监听事件
			uni.$on('reloadGetPet', () => {
				this.getPet(); // 执行特定操作
			});
		},
		methods: {
			//取消
			cancel() {
				this.show = false;
			},
			//确认，删除数据
			//接收形参id，通过id查找宠物信息并删除
			confirm(id, avatar) {
				const deletePet = async () => {
					const res = await deletePetAPI(id, avatar)
					await this.getPet()
					this.show = false;
				}
				deletePet()
			},
			//查找数据库宠物信息
			getPet() {
				const getPets = async () => {
					const res = await getPetAPI()
					this.petList = res
				}
				getPets()
			},

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

	.petNull {
		position: relative;
		top: -25%;

		.img {
			text-align: center;

			.logo {
				// text-align: center;
				right: 50%;
				height: 150rpx;
				width: 150rpx;
				margin-bottom: 30rpx;
			}
		}

		.text-area {
			text-align: center;
		}

		.title {
			display: block;
			font-size: 35rpx;
			margin-bottom: 5px;
		}

		.prompt {
			display: block;
			font-size: 25rpx;
			color: #8f8f94;
			margin-bottom: 20px;
		}
	}

	.maxBox {
		position: absolute;
		top: 10px;
		display: flex;
		flex-direction: column;
		/* 垂直排列子元素 */
		align-items: stretch;
		/* 让子元素在垂直方向上自动拉伸以填充容器 */
		width: 100%;

		.close {
			margin-left: 45%;
		}

		.petImg {
			width: 100rpx;
			height: 100rpx;
			border-radius: 100px;
			margin-left: 22px;
		}

		.push {
			border-style: none;
			width: 90%;
			height: 80rpx;
			margin-left: 5%;
			border-radius: 15px;
			background-color: white;
			color: #c76300;
			font-size: 30rpx;
			text-align: center;
			line-height: 80rpx;
		}

		.petText {
			margin-left: 15px;

			.headText {
				display: flex;
				align-items: center;

				.petName {
					display: block;
					margin-right: 2px;
				}
			}

			.petVariety {
				margin-top: 3px;
				display: block;
				font-size: 25rpx;
				color: #8f8f94;
			}
		}
	}
</style>