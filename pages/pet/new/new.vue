<template>
	<view class="page-container">
		<form @submit="formSubmit" enctype="multipart/form-data">
			<view class="info">
				<view class="items">
					<text>头像：</text>
					<image name="avatar" class="petAvatar" :src="avatar" @click="chooseImage"></image>
				</view>

				<view class="items">
					<text>名称：</text>
					<input maxlength="6" :value="formdata.name" name="name" class="right-align-input"
						placeholder="请输入姓名" />
				</view>

				<view class="items">
					<text>品种：</text>
					<input maxlength="8" :value="formdata.variety" name="variety" class="right-align-input"
						placeholder="请输入品种" />
				</view>

				<view class="items">
					<text>性别：</text>
					<radio-group name="radio">
						<radio :checked="formdata.radio=='man'" class="radio" value="man">
							<u-icon name="man" color="#c76300" size="18"></u-icon>
						</radio>
						<radio :checked="formdata.radio=='woman'" class="radio" value="woman">
							<u-icon name="woman" color="#2979ff" size="18"></u-icon>
						</radio>
					</radio-group>
				</view>

				<view class="items">
					<text>生日：</text>
					<picker name="date" mode="date" :value="valueDate" start="2010-01-01" end="2030-12-31"
						@change="onChange">
						<view class="picker">
							{{valueDate}}
						</view>
					</picker>
				</view>

				<view class="items">
					<text>绝育情况：</text>
					<switch :checked="formdata.sterilization" name="sterilization" color="#FFCC33"
						style="transform:scale(0.7)" />
				</view>

				<view class="items">
					<text>疫苗接种：</text>
					<switch :checked="formdata.vaccine" name="vaccine" color="#FFCC33" style="transform:scale(0.7)" />
				</view>
			</view>
			<view class="submit">
				<button form-type="submit">提交信息</button>
			</view>
		</form>
	</view>
</template>

<script>
	import avatar from '../../../uni_modules/uview-ui/libs/config/props/avatar.js';
	import {
		imgSeverAPI
	} from '../../../api/imgSeverAPI.js'
	import {
		pushPetAPI,
		findPetAPI,
		revisePetAPI
	} from '../../../api/pet.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import store from '../../../store/index.js'
	export default {
		onShow() {
			uni.setNavigationBarColor({
				frontColor: '#000000',
				backgroundColor: '#f5f5f5'
			});
		},
		computed: {
			...mapState({
				userInfo: state => state.user.userInfo
			})
		},
		data() {
			return {
				id: '',
				avatar: 'https://img1.baidu.com/it/u=1500683741,296612413&fm=253&fmt=auto&app=138&f=JPEG?w=344&h=300',//展示的头像
				petAvatar: '',//这是上传的图片
				oldAvatar: '',//原头像
				valueDate: '2021-01-01',
				formdata: {},
				numImage: 0
			};
		},
		onLoad: function(options) {
			// options.id 包含传递的参数值
			this.id = options.id
		},
		mounted() {
			this.idFind(this.id)
		},
		methods: {
			idFind(id) {
				if (id) {
					const postPet = async () => {
						const res = await findPetAPI(id)
						this.formdata = res
						this.avatar = `http://127.0.0.1:3000/uploads/${res.petImg}`
						this.oldAvatar = res.petImg
						this.valueDate = res.petDate
					}
					postPet()
				}

			},
			onChange(e) {
				this.valueDate = e.mp.detail.value;
			},
			chooseImage() {
				uni.chooseImage({
					count: 1, // 一次只能选择一张图片
					success: (res) => {
						this.avatar = res.tempFilePaths[0]; // 将选择的图片路径存储在avatar变量中
						// 触发检查
						this.numImage = 1
					},
				});
			},
			async formSubmit(e) {
				// 阻止表单默认提交行为
				e.preventDefault();
				const self = this;

				//判断是否调用图片上传，避免重复上传
				if (this.numImage) {
					//引用imgSever上传图片
					const imgSever = async () => {
						console.log(this.avatar)
						const res = await imgSeverAPI(this.avatar)
						self.petAvatar = res.replace(/^"(.*)"$/, "$1");
					}
					await imgSever()
					this.formdata = {
						...e.detail.value,
						"avatar": this.petAvatar,
						"phone": this.userInfo.phone
					}
					//重新归零
					this.numImage = 0
					
					
				} else {
					this.formdata = {
						...e.detail.value,
						"avatar": this.oldAvatar,
						"phone": this.userInfo.phonev
					}
				}


				//通过判断选择调用的是新增接口还是修该接口，判断条件为页面是否传入id
				if (this.id) {
					const revisePet = async () => {
						const res = await revisePetAPI(this.formdata, this.id,this.oldAvatar)
						uni.navigateBack({
							delta: 1, // 返回的页面数，这里是返回上一页面
							success() {
								// 由于navigateBack的返回不会触发生命周期函数。返回成功后，触发上一页的特定函数
								uni.$emit('reloadGetPet');
							}
						});
					}
					revisePet()
				} else {
					const pushPet = async () => {
						const res = await pushPetAPI(this.formdata)
						uni.navigateBack({
							delta: 1, // 返回的页面数，这里是返回上一页面
							success() {
								// 由于navigateBack的返回不会触发生命周期函数。返回成功后，触发上一页的特定函数
								uni.$emit('reloadGetPet');
							}
						});
					}
					await pushPet()
				}

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

		.info {
			position: absolute;
			left: 5%;
			top: 10px;
			height: 85%;
			width: 90%;
			background-color: white;
			border-radius: 10px;
			padding: 0 15px;
			box-sizing: border-box;

			.items {
				height: 10%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 30rpx;
				text {
					width: 30%;
				}
			}

			.radio {
				margin-left: 5px;
			}

			.time {
				height: 50%;
				width: 50%;
				background-color: #f0ad4e;
				color: white;
				font-size: 30rpx;
			}
		}


		.petAvatar {
			border-radius: 100%;
			display: block;
			width: 46px;
			height: 46px;
		}


		.right-align-input {
			text-align: right;
		}

		.submit {
			width: 100%;
			height: 12%;
			position: fixed;
			bottom: 0;
			/* 与视口底部的距离为0，即固定在底部 */
			left: 0;

			/* 与视口左侧的距离 */
			/* 其他样式属性 */
			button {
				width: 90%;
				margin-left: 5%;
				background-color: $uni-color-error;
				color: white;
				border-radius: 10px;
				font-size: 30rpx;
			}
		}
	}
</style>