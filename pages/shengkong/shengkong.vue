<template>
	<view class="">
		<view class="status_bar">
		</view>
		<!-- 这里是状态栏 -->
		<uni-nav-bar title="省控线" backgroundColor='#b50e03' color='#fff461' left-text="返回" @clickLeft="clickBack"/>
		<view class="content">
			<view class="top">
				<!-- · 2022年湖南省高考省控线 -->
			</view>
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular=true class="swiper">
				<swiper-item >
						<image src="https://www.hneeb.cn/hnxxg/uploadfiles/202206/20220624115614636001.png" mode=""></image>
				</swiper-item>
			<swiper-item >
					<image src="https://www.hneeb.cn/hnxxg/uploadfiles/202206/20220624115659422001.png" mode=""></image>
			</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			// 点击了返回
			clickBack() {
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.status_bar {
		height: calc(var(--status-bar-height));
		width: 100%;
		background-color: #b50e03;
	}
	.content{
		box-sizing: border-box;
		overflow: hidden;
		// image{
		// 	width: 100%;
		// 	// height: 500px;
		// }
		swiper {
			width: 100%;
			height: 500rpx;
		
				swiper-item {
					image {
						height: 100%;
						width: 100%;
					}
				}
		}
		.top{
			// margin: auto auto;
			width: 100%;
			box-sizing: border-box;
			// text-align: center;
			padding: 40rpx;
		}
	}
</style>
