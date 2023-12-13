<template>
	<view class="page-container">
		<u-toast ref="uToast"></u-toast>
		<form @submit="formSubmit" @reset="formReset" class="form" v-if="arrayPet!=null">
			<view class="maxBox">
				<view class="list">
					<text>选择宠物</text>
					<view class="uni-list-cell-db">
						<picker name="pet" @change="bindPetChange" :value="arrayPet[indexPet]"
							:range="arrayPet.map(item=>item.name)" class="picker">
							<view class="uni-input">{{arrayPet[indexPet].name}}</view>
						</picker>
						<u-icon name="arrow-right" color="#000000" size="16"></u-icon>
					</view>
				</view>


				<view class="list">
					<text>选择项目</text>
					<view class="uni-list-cell-db">
						<picker name="items" @change="bindItemsChange" :value="arrayItems[indexItems]"
							:range="arrayItems" class="picker">
							<view class="uni-input">{{arrayItems[indexItems]}}</view>
						</picker>
						<u-icon name="arrow-right" color="#000000" size="16"></u-icon>
					</view>
				</view>

				<!-- 就诊时才需要选择医生 -->
				<view class="list" v-if="indexItems==1">
					<text>选择医生</text>
					<view class="uni-list-cell-db">
						<picker name="doctor" @change="bindDoctorChange" :value="arrayDoctor[indexDoctor]._id"
							:range="arrayDoctor.map(item=>`${item.name} ${item.division} ${item.position}`)" class="picker">
							<view class="uni-input">{{arrayDoctor[indexDoctor].name}}</view>
						</picker>
						<u-icon name="arrow-right" color="#000000" size="16"></u-icon>
					</view>
				</view>

				<view class="list">
					<text>预约时间[次日]</text>
					<view class="uni-list-cell-db">
						<picker name="time" @change="bindTimeChange" :value="arrayTime[indexTime]" :range="arrayTime"
							class="picker">
							<view class="uni-input">{{arrayTime[indexTime]}}</view>
						</picker>
						<u-icon name="arrow-right" color="#000000" size="16"></u-icon>
					</view>
				</view>
			</view>
			<button class="submit" form-type="submit">提交预约</button>
		</form>

		<!-- 宠物为空 -->
		<view class="empty" v-else>
			<u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png" text="小宠没有找到你的宠物" width="50%">
			</u-empty>
			<navigator url="../pet/new/new" hover-class="none">
				<view class="push">
					<text>前往新增宠物</text>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import {
		getPetAPI
	} from '../../api/pet.js'
	import {
		pushRegisterAPI
	} from '../../api/register.js'
	import {
		getFind
	} from '../../api/admin.js'
	export default {
		data() {
			return {
				arrayPet: [],
				indexPet: 0,
				arrayItems: ['洗护', '就诊'],
				indexItems: 0,
				arrayDoctor: [],
				doctorList: [],
				indexDoctor: 0,
				arrayTime: ['9:00', '9:30', '10:00', '10:30', '11:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'],
				indexTime: 0,
				formdata: {},
				params: {
					type: 'success',
					title: '结束后跳转标签页',
					message: "预约成功，稍后跳转到主页",
					url: '/pages/home/home',
				},
			};
		},
		mounted() {
			this.getPet()
			this.getDoctor()
		},
		created() {
			// 监听事件
			uni.$on('reloadGetPet', () => {
				this.getPet(); // 执行特定操作
			});
		},
		onShow() {
			uni.setNavigationBarColor({
				frontColor: '#000000',
				backgroundColor: '#f5f5f5'
			});
		},
		methods: {
			bindPetChange: function(e) {
				// console.log('picker发送选择改变，携带值为', e.detail.value)
				this.indexPet = e.detail.value
			},
			bindItemsChange: function(e) {
				this.indexItems = e.detail.value
			},
			bindDoctorChange: function(e) {
				// console.log('picker发送选择改变，携带值为', e.detail.value)
				this.indexDoctor = e.detail.value
			},
			bindTimeChange: function(e) {
				// console.log('picker发送选择改变，携带值为', e.detail.value)
				this.indexTime = e.detail.value
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
			formSubmit: function(e) {
				if (this.indexItems == 0) {
					this.formdata = {
						...e.detail.value,
						'doctor': '0'
					}
				} else {
					this.formdata = e.detail.value
				}
				// 提交数据
				const pushRegister = async () => {
					const res = await pushRegisterAPI(this.formdata)
					if (res == 'OK') {
						this.showToast(this.params)
					}
				}
				pushRegister()
			},
			//查找数据库宠物信息
			getPet() {
				const getPets = async () => {
					const res = await getPetAPI()
					this.arrayPet = res
				}
				getPets()
			},
			getDoctor() {
				const find = async () => {
					const res = await getFind()
					//拿到_id, name, division, position
					this.arrayDoctor = res
				}
				find()
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

		.empty {
			margin-top: 20%;
			width: 100%;
			height: 100%;

			.push {
				border-style: none;
				width: 80%;
				height: 80rpx;
				margin-left: 10%;
				margin-top: 20px;
				border-radius: 15px;
				background-color: white;
				color: #c76300;
				font-size: 30rpx;
				text-align: center;
				line-height: 80rpx;
			}
		}

		.form {
			position: absolute;
			width: 100%;
			height: 100%;
		}

		.maxBox {
			position: relative;
			top: 2%;
			width: 90%;
			height: 85%;
			margin-left: 5%;
			border-radius: 10px;
			background-color: white;
			font-size: 29rpx;

			.list {
				height: 10%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 15px;
				font-size: 30rpx;
				
				text {
					width: 40%;
				}

				.uni-list-cell-db {
					display: flex;
					align-items: center;

					.picker {
						margin-right: 20px;
					}
				}
			}
		}

		.submit {
			position: relative;
			top: 3%;
			width: 90%;
			background-color: $uni-color-error;
			color: white;
			border-radius: 10px;
			font-size: 30rpx;
		}
	}
</style>