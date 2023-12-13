<template>
	<view class="page-container">
		<view class="maxBox">
			<view class="registerNull" v-if="list.length<=0">
				<u-empty mode="history" icon="http://cdn.uviewui.com/uview/empty/history.png" text="暂无预约信息">
				</u-empty>
			</view>

			<registerList v-else v-for="i in list" :key="i._id">
				<u-modal showCancelButton="true" buttonReverse="true" :show="show" :title="title" @confirm="confirm(id)"
					@cancel="cancel()">
					<view class="slot-content">
						<rich-text :nodes="content"></rich-text>
					</view>
				</u-modal>
				<view class="minBox">
					<view class="petBox">
						<view class="petBox-pet">
							<image class="petImg" :src="`http://127.0.0.1:3000/uploads/${i.pet.petImg}`">
							</image>
							<text class="petName">{{i.pet.name}}</text>
						</view>
						<!-- 点击取消预约 -->
						<u-icon @click="show = true,id=i._id" name="close" color="#000000" size="18"></u-icon>
					</view>
					<view class="contentBox">
						<text>
							主人，您为我预约了 {{i.time}} 的 {{i.items}},请详细规划时间，准时到达哦😊
						</text>
					</view>
				</view>

			</registerList>
		</view>

	</view>
</template>

<script>
	import registerList from './components/registerList.vue'
	import {
		getRegisterAPI,
		deleteRegisterAPI
	} from '../../api/register.js'
	export default {
		components: {
			registerList
		},
		data() {
			return {
				id: '',
				list: [],
				show: false,
				title: '标题',
				content: '确认取消该预约吗?此操作将无法恢复'
			}
		},
		onShow() {
			uni.setNavigationBarColor({
				frontColor: '#000000',
				backgroundColor: '#f5f5f5'
			});
		},
		mounted() {
			this.getRegister()
		},
		methods: {
			//查找预约信息
			getRegister() {
				const getRegisters = async () => {
					const res = await getRegisterAPI()
					this.list = res
				}
				getRegisters()
			},
			//确认
			confirm(id) {
				const deleteRegister = async () => {
					const res = await deleteRegisterAPI(id)
					await this.getRegister()
					this.show = false;
				}
				deleteRegister()
			},
			//取消
			cancel() {
				this.show = false
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

		.maxBox {
			position: absolute;
			top: 10px;
			display: flex;
			flex-direction: column;
			/* 垂直排列子元素 */
			align-items: stretch;
			/* 让子元素在垂直方向上自动拉伸以填充容器 */
			width: 100%;

			.registerNull {
				margin-top: 100px;
				height: 100%;
				width: 100%;
			}

			.minBox {
				height: 100%;

				.petBox {
					box-sizing: border-box;
					border-radius: 10px 10px 0 0;
					padding: 0 15px;
					background-color: gainsboro;
					height: 35%;
					display: flex;
					align-items: center;
					width: 100%;
					justify-content: space-between;

					.petBox-pet {
						display: flex;
						align-items: center;
						font-size: 30rpx;
						font-weight: bold;

						.petImg {
							border-radius: 100%;
							display: block;
							width: 40px;
							height: 40px;
							margin-right: 10px;
						}
					}
				}

				.contentBox {
					display: flex;
					align-items: center;
					box-sizing: border-box;
					height: 65%;
					padding: 0 20px;
					text-indent: 20px;
					line-height: 150%;
					font-size: 28rpx;
				}
			}
		}
	}
</style>