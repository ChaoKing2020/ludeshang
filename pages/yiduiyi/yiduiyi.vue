<template>
	<view class="">
		<view class="status_bar">
		</view>
		<!-- 这里是状态栏 -->
		<uni-nav-bar title="专家一对一" backgroundColor='#b50e03' color='#fff461' left-text="返回" @clickLeft="clickBack"/>
	<view class="content">
		请有意愿参加高考志愿填报“专家一对一”辅导的考生或家长，直接拨打咨询电话：13574085983（刘老师），预约面对面交流时间，了解一对一辅导流程和价格。
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
		},
		onLoad() {
			setTimeout(()=> {
			    uni.hideLoading();
			}, 2000);
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
		// background-color: $uni-bg-color-grey;
		box-sizing: border-box;
		width: 100%;
		padding: 40rpx 40rpx;
		height: 100%;
		text-indent: 2em;
	}
</style>
