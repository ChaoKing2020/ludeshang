<template>
	<view class="">
		<view class="status_bar">
		</view>
		<!-- 这里是状态栏 -->
		<uni-nav-bar title="关于我们" backgroundColor='#b50e03' color='#fff461' left-text="返回" @clickLeft="clickBack"/>
	<view class="content">
		<view class="text1">
			湖南省录德尚信息咨询工作室，是一家专业提供高考相关咨询、高考志愿填报辅导及推荐服务的机构，拥有研究生学历的团队成员十余人。录德尚志愿填报专家系湖南某大学教授，上海交通大学博士，美国普林斯顿大学访问学者，长期从事IT教育和高考志愿研究，拥有丰富的填报经验。录德尚工作室将为广大考生或家长提供优质的个性化高考志愿填报服务。
		</view>
		<view class="text">
			另请注意：VIP智能填报服务需要购买一张298元的VIP卡，即可享受普通类和艺术类的专业组志愿智能推荐。如需“专家一对一”精准辅导推荐的考生或家长，请直接拨打咨询电话：13574085983（刘老师），预约面对面交流时间，了解一对一辅导流程和价格。
		</view>
		
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
		.text1{
			text-indent: 2em;
		}
		.text{
			// color: $uni-text-color-grey;
			// font-size: 26rpx;
			margin-top: 20rpx;
			text-indent: 2em;
		}
	}
</style>
