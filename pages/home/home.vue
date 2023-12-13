<template>
	<view>
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" autoplay="true" interval="10000"
				duration="500">
				<swiper-item>
					<image
						src="https://th.bing.com/th/id/R.280eccc7b57785c5da8625a66e3f641b?rik=tS6x6b%2byPpMUew&pid=ImgRaw&r=0"
						mode="scaleToFill"></image>
				</swiper-item>
				<swiper-item>
					<image src="https://i0.hdslb.com/bfs/archive/a7d0d6c66b09ec73f54454258c7aeb671db24fb4.jpg"
						mode="scaleToFill"></image>
				</swiper-item>
				<swiper-item>
					<image src="https://cf.dtcj.com/b0276add-a604-4a07-97ea-397203890a55.jpg" mode="scaleToFill">
					</image>
				</swiper-item>
			</swiper>
		</view>
		<view class="register-button">
			<!-- <navigator url="/pages/register/register" hover-class="navigator-hover"> -->
				<u-button class="register" color="#00afa1" type="primary" size="large" text="预约问诊 / 洗美护理"
					throttleTime="1500" @click="toRegister()"></u-button>
			<!-- </navigator> -->
		</view>
		<u-divider></u-divider>
		<view class="introduce">
			<text class="introduceText">医师介绍</text>
			<doctor v-for="i in doctorList" :key="i">
				<!-- 插槽 -->
				<image class="doctor-img" :src="i.src" lazy-load="true" mode="aspectFill"></image>
				<view class="textBox">
					<text class="doctor-name">{{i.name}}</text>
					<text class="doctor-posts">{{i.posts}}</text>
					<text class="doctor-introduce">{{i.introduce}}</text>
				</view>
			</doctor>
		</view>
	</view>
</template>

<script>
	import doctor from './components/doctor.vue'
	export default {
		components: {
			doctor
		},
		data() {
			return {
				scrollTop: 0,
				doctorList: [{
					src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fci.xiaohongshu.com%2F30fc28ca-469f-39e7-330d-d8d36cb8f1bb%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fci.xiaohongshu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1700362070&t=1d1f2428d1435a7237797546a9b9ee0a',
					name: '邹杰',
					posts: '血液科主任医师、教授',
					introduce: '邹杰主任拥有逾十年的宠物医疗经验，是一位备受尊敬的兽医专家。他在小动物医学领域取得博士学位，致力于提供杰出的宠物医疗护理。'
				}, {
					src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fci.xiaohongshu.com%2F0d8ac70e-2bfa-71c4-fef0-e0024ab48bae%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fci.xiaohongshu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1700362070&t=a5d823ca6cbe11887ac95944a33e7d48',
					name: '张泉',
					posts: '骨科主任医师、副教授',
					introduce: '张泉主任拥有丰富的从业经验，为宠物健康领域贡献了多年的专业才能。作为资深的宠物医生，他在解决各种宠物健康问题方面经验丰富，专业水平卓越。'
				}]
			};
		},
		computed: {
			capsuleStyle() {
				if (this.scrollTop >= 8 * uni.upx2px(1)) {
					return {
						top: uni.upx2px(1) + 'px',
						opacity: 0,
					};
				} else {
					return {
						top: uni.upx2px(1) + this.scrollTop + 'px',
						opacity: 1,
					};
				}
			},
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods:{
			toRegister(){
				uni.navigateTo({
					url:'/pages/register/register'
				})
			},
		}
	};
</script>

<style lang="scss">
	swiper {
		z-index: 1;
		position: relative;
		height: 15rem;
		overflow: hidden;
		border-bottom-left-radius: 50% 2rem;
		border-bottom-right-radius: 50% 2rem;

		swiper-item {
			transform: translateY(-20px);

			image {
				width: 100%;
			}
		}
	}

	.register-button {
		padding: 1rem;
	}



	.introduce {
		.introduceText {
			margin-left: 5%;
		}

		.doctor-img {
			height: 100%;
			width: 30%;
		}

		.textBox {
			width: 70%;
			.doctor-name {
				display: block;
				padding-left: 10px;
				margin-top: 8px;
				font-weight: bold;
				font-size: 32rpx;
			}

			.doctor-posts {
				display: block;
				padding-left: 10px;
				margin-top: 8px;
				font-size: 22rpx;
			}

			.doctor-introduce {
				display: block;
				padding-left: 10px;
				margin-top: 8px;
				font-size: 25rpx;
			}
		}
	}
</style>