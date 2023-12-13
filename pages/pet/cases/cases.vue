<template>
	<view class="page-container">
		<view class="maxBox">
			<petCards>
				<image class="petImg" v-if="casesList.pet.petImg"
					:src="`http://127.0.0.1:3000/uploads/${casesList.pet.petImg}`">
				</image>
				<view class="petText">
					<view class="headText">
						<text class="petName">{{casesList.pet.name}}</text>
						<u-icon name="woman" color="#2979ff" size="18" v-if="casesList.pet.radio=='woman'"></u-icon>
						<u-icon name="man" color="#c76300" size="18" v-else></u-icon>
					</view>
					<text class="petVariety">{{casesList.pet.variety}}</text>
				</view>
			</petCards>
		</view>

		<view class="history">
			<view class="head">
				<text>{{casesList.time}}</text>
				<text>{{casesList.items}}</text>
			</view>
			<div class="cases">
				<div class="conclusion">
					<text>诊断结果：</text>
					<text>{{casesList.cases}}</text>
				</div>
				<div class="treat">
					<text>医疗消费：</text>
					<div class="treat-box" v-for="i in casesList.commodity" :key="i._id">
						<text>{{i.name}}</text>
						<text class="price">￥{{i.price}}</text>
					</div>
				</div>
			</div>
		</view>
	</view>
</template>

<script>
	import {
		mounted
	} from 'vue'
	import {
		postIdFind
	} from '../../../api/register.js'
	import petCards from '../components/petCards.vue'
	export default {
		components: {
			petCards,
		},
		mounted() {
			this.idFind()
		},
		onLoad: function(options) {
			// options.id 包含传递的参数值
			this.id = options.id
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
				casesList: {}
			}
		},
		methods: {
			idFind() {
				const idFindAPI = async () => {
					const res = await postIdFind(this.id)
					this.casesList = res
				}
				idFindAPI()
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
		display: flex;
		flex-direction: column;
		/* 垂直排列子元素 */
		align-items: stretch;
		/* 让子元素在垂直方向上自动拉伸以填充容器 */
		width: 100%;

		.list-dot {
			margin-left: 45%;
		}

		.petImg {
			width: 100rpx;
			height: 100rpx;
			border-radius: 100px;
			margin-left: 22px;
		}
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

	.history {
		position: absolute;
		top: 130px;
		box-sizing: border-box;
		border-radius: 10px;
		width: 90%;
		min-height: 25%;
		background-color: white;

		.head {
			border-radius: 10px 10px 0 0;
			box-sizing: border-box;
			height: 40px;
			padding: 0 20px;
			display: flex;
			align-items: center;
			font-size: 26rpx;
			color: #ffffff;
			background-color: #8f8f94;

			text {
				margin-right: 20px;
			}
		}

		.cases {
			padding: 20px;

			text {
				display: block;
				margin-bottom: 10px;
			}

			.conclusion {
				margin-bottom: 50px;
			}

			.treat {
				.treat-box {
					display: flex;
					align-items: center;
					justify-content: space-between;
					.price{
						color: red;
					}
				}
			}

		}
	}
</style>