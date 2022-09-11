<template>
	<view class="content">
		<!-- 搜索 -->
	<view class="searchview">
		<input class="search" placeholder-style="color:#aaa;font-weight:400" placeholder="搜索">
		</input>
		<text class="x">取消</text>
		<image src="../../static/img/search@2x.png" mode="widthFix" class="searchicon"></image>
	</view>
	<!-- 学校区 -->
	<view class="schoolmain">
	<view class="school_item">
			<view class="school_item_l">
				<view class="img">
					<image src="../../static/img/keda.jpg" mode=""></image>
				</view>
			</view>
			<view class="school_item_r">
				<view class="school_item_r_top">
					<text class="name">北京大学</text>
					<text class="address">北京市</text>
				</view>
				<view class="school_item_r_bottom">
					<text>985</text>
					<text>211</text>
					<text>双一流</text>
					<text>综合</text>
					<text>研究生点</text>
				</view>
			</view>
		</view>
	<view class="school_item">
			<view class="school_item_l">
				<view class="img">
					<image src="../../static/img/keda.jpg" mode=""></image>
				</view>
			</view>
			<view class="school_item_r">
				<view class="school_item_r_top">
					<text class="name">北京大学</text>
					<text class="address">北京市</text>
				</view>
				<view class="school_item_r_bottom">
					<text>985</text>
					<text>211</text>
					<text>双一流</text>
					<text>综合</text>
					<text>研究生点</text>
				</view>
			</view>
		</view>
	<view class="school_item">
			<view class="school_item_l">
				<view class="img">
					<image src="../../static/img/keda.jpg" mode=""></image>
				</view>
			</view>
			<view class="school_item_r">
				<view class="school_item_r_top">
					<text class="name">北京大学</text>
					<text class="address">北京市</text>
				</view>
				<view class="school_item_r_bottom">
					<text>985</text>
					<text>211</text>
					<text>双一流</text>
					<text>综合</text>
					<text>研究生点</text>
				</view>
			</view>
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
			
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		box-sizing: border-box;
	}
	// 搜索
	.searchview {
		position: relative;
		box-sizing: border-box;
		padding: 0 32rpx;
		width: 100%;
		height: 100%;
		border-bottom: 1px solid $uni-border-color;

		.search {
			// position: absolute;
			height: 70rpx;
			width: 100%;
			background: #F3F4F6;
			border-radius: $uni-border-radius-base;
			margin-top: 30rpx;
			box-sizing: border-box;
			padding-left: 60rpx;
			margin-bottom: 30rpx;
		}

		.searchicon {
			position: absolute;
			margin-right: 15rpx;
			width: 40rpx;
			top: 50%;
			transform: translate(0,-85%);
			left: 40rpx;
		}

		.x {
			position: absolute;
			display: block;
			margin-right: 15rpx;
			top: 40%;
			transform: translateY(-50%);
			right: 40rpx;
			color: #aaa;
			font-weight: 400
		}
	}
	
	// 学校
		// .apply {}
		.schoolmain {
			width: 100%;
		
			.school_item {
				display: flex;
				width: 100%;
				height: 128rpx;
				padding: 0rpx 32rpx;
				box-sizing: border-box;
				align-items: center;
		    border-bottom: 1px solid $uni-border-color;
				.school_item_l {
					position: relative;
					height: 96rpx;
					width: 96rpx;
					margin-right: 32rpx;
		.img{
		width: 96rpx;
		height: 96rpx;
		border-radius: 50%;
		overflow: hidden;
	}
					image {
						width: 96rpx;
						height: 96rpx;
					}
				}
		
				.school_item_r {
					width: 100%;
					.school_item_r_top {
						display: flex;
						justify-content: space-between;
						.name {
							// display: inline-block;
							line-height: 50rpx;
							font-weight: 500;
							font-size: 30rpx;
							color: $uni-text-color;
							letter-spacing: -0.62px;
						}
						.address{
							color: rgba(39,40,50,0.40);
							font-size: $uni-font-size-sm;
						}
					}
				.school_item_r_bottom{
					// width: 100%;
					font-size: 24rpx;
					width: 542rpx;
					// overflow:hidden; 
					// white-space: nowrap;
					// text-overflow: ellipsis;
					color:$uni-text-color-grey;
					 text{
						 margin-right: 10rpx;
					 }
					 text:nth-child(1){
						 color: $uni-color-warning;
					 }
					 text:nth-child(2){
						 color: $uni-color-primary;
					 }
					 text:nth-child(3){
						 color: $uni-color-success;
					 }
				}
				}
			}
		}
</style>
