<template>
	<view class="page-container">
		<view class="maxBox">
			<petCards>
				<image class="petImg" v-if="pet.petImg" :src="`http://127.0.0.1:3000/uploads/${pet.petImg}`"></image>
				<view class="petText">
					<view class="headText">
						<text class="petName">{{pet.name}}</text>
						<u-icon name="woman" color="#2979ff" size="18" v-if="pet.radio=='woman'"></u-icon>
						<u-icon name="man" color="#c76300" size="18" v-else></u-icon>
					</view>
					<text class="petVariety">{{pet.variety}}</text>
				</view>
				<!-- 点击修改信息 -->
				<view class="list-dot">
					<navigator :url="`../new/new?id=${id}`" hover-class="none">
						<u-icon name="list-dot" color="#aa0000" size="22"></u-icon>
					</navigator>
				</view>

			</petCards>
		</view>

		<view class="history">
			<view class="head">
				<text>历史记录</text>
				<u-gap height="80" bgColor="#bbb"></u-gap>
			</view>
			<view v-if="recordList.length<=0" class="historyNull">
				<u-empty text="没有记录" mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png">
				</u-empty>
			</view>
			<!-- 组件传值（父->子），将表单id传入historyList作为触发事件参数 -->
			<historyList v-else v-for="i in recordList" :key="i._id" :recordId="i._id">
				<view class="time">
					<text>{{i.time}}</text>
					<text>{{i.items}}</text>
				</view>
				<u-icon name="arrow-right" color="#000000" size="16"></u-icon>
			</historyList>
		</view>
	</view>
</template>

<script>
	import petCards from '../components/petCards.vue'
	import historyList from '../components/historyList.vue'
	import {
		findPetAPI
	} from '../../../api/pet.js'
	import {
		getStateAPI
	} from '../../../api/register.js'
	export default {
		components: {
			petCards,
			historyList
		},
		created() {
			// 监听事件
			uni.$on('reloadGetPet', () => {
				this.idFind(this.id); // 执行特定操作
			});
		},
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
		mounted() {
			this.idFind(this.id)
			this.stateRegister(this.id)
		},
		data() {
			return {
				id: '',
				pet: {},
				petImg: '',
				recordList: [],
			};
		},
		methods: {
			idFind(id) {
				const postPet = async () => {
					const res = await findPetAPI(id)
					this.pet = res
				}
				postPet()
			},
			stateRegister(id) {
				const getState = async () => {
					const res = await getStateAPI(id)
					this.recordList = res
				}
				getState()
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
		min-height: 50%;
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
		}

		.historyNull {
			padding-top: 40px;
		}
	}

	.time {
		font-size: 25rpx;

		text {
			margin-right: 15px;
		}
	}
</style>