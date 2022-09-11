<template>
	<view class="">
		<view class="status_bar">
		</view>
		<!-- 这里是状态栏 -->
		<uni-nav-bar title="我的志愿表" backgroundColor='#b50e03' color='#fff461' left-text="返回" @clickLeft="clickBack" />
	<view  class="content">
		<scroll-view scroll-y="true" class="scroll_y" @scrolltolower='ReachBottom'>
			<view class="campus_item" v-for='(item,index) in zhiyuanList' :key='index' v-if='zhiyuanList[0].A'>
				<view class="campus_item_top">
					<view class="time">
						{{item.C}} 
					</view>
					<view class="left">
						<view class="schoolimg">
							<image src="../../static/img/keda.png" mode=""></image>
						</view>
						<text class="chong" v-if='color==0'>冲{{item.A.A}}</text>
						<text class="wen" v-else-if='color==1'>稳{{item.A.A}}</text>
						<text class="bao" v-else-if='color==2'>保{{item.A.A}}</text>
					</view>
					<view class="right">
						<view class="schoolname">
							{{item.A.B}} 
						</view>
						<view class="num">
							<text>招生代码</text>
							<text>{{item.A.A}}</text>
							<text>{{item.A.H}}</text>
							<text>-{{item.A.I}}</text>
							<!-- <text>{{item.A.D}}</text> -->
						</view>
						<view class="plan">
							<text>21年计划招生</text>
							<text>{{(item.A.E)[0]}}人</text>
						</view>
						<view class="grades">
							<text>投档线</text>
							<text>{{item.A.G}}分</text>
						
						</view>
					</view>
				</view>
				<view class="subject">
					<view class="expand_item" >
						<view class="expand_item_top">
							<view class="top">
								<view class="schoolname">
									{{item.B[1]}}-{{item.B[0]}}
								</view>
								
							</view>
							<view class="left">
								<view class="num">
									<text>2021年</text>
									<text>专业代码 {{item.B[0]}}</text>
									<text>招生{{item.B[3]}}人</text>
									<text>学制 </text>
									<text>{{item.B[2]}}</text>
									<text>学费 {{item.B[4]}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="bottom" v-else>
				------没有查到欸-------
			</view>
			<view class="bottom" v-if="bottom">
				------我是有底线的-------
			</view>
		</scroll-view>
	</view>
	</view>
</template>

<script>
	// import {formatDate} from'../../util/formatDate.js'
	export default {
		data() {
			return {
				zhiyuanList:[],
			}
		},
		onLoad(){
			this.zhiyuanList=uni.getStorageSync('zhiyuanList');
			// this.getTime()
		},
		methods: {
			// getTime(){
			// 	// console.log(this.zhiyuanList)
			// 	this.zhiyuanList.forEach(item=>{
			// 		// console.log(item.C)
					
			// 	})
			// },
			ReachBottom(){
			},
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
	.content {
		background-color: $uni-bg-color-grey;
		box-sizing: border-box;
		width: 100%;
		// padding: 40rpx 40rpx;
		height: 100%;

		.campus_item {
			box-sizing: border-box;
			background-color: #FFFFFF;
			margin: 25rpx 20rpx;
			margin-bottom: 0;
			padding: 20rpx 30rpx;
			border-radius: $uni-border-radius-base;

			.campus_item_top {
				box-sizing: border-box;
				// margin-bottom: 20rpx;
				display: flex;
				line-height: 45rpx;
                position: relative;
				// 时间
                .time{
					position: absolute;
					// top: 10rpx;
					right: 0;
					font-size:26rpx;
					color: $uni-text-color-placeholder;
				}

				// 左边区域
				.left {
					width: 100rpx;
					margin-right: 30rpx;

					.schoolimg {
						width: 100rpx;
						height: 100rpx;
					}

					text {
						color: #fff;
						font-size: 26rpx;
						display: block;
						text-align: center;
						padding: 6rpx 3rpx;
						margin-top: 30rpx;
						border-radius: 8rpx;
						background-color: #ff9620;
					}

					.wen {
						background-color: $uni-color-primary;
					}

					.bao {
						background-color: $uni-color-success;
					}
				}

				// 右边区域
				.right {
					.schoolname {
						font-size: 32rpx;
						font-weight: 600;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
                        width: 319rpx;
						// overflow: hidden;
						// text-overflow: ellipsis;
						// white-space: nowrap;
					}

					.num {
						margin-top: 10rpx;
						font-size: 30rpx;
						// color: $uni-text-color-placeholder;

						text:nth-child(1) {
							color: $uni-text-color-placeholder;
						}

						text:nth-child(2) {
							margin-left: 10rpx;
						}


						text:nth-child(3) {
							margin-left: 30rpx;
						}

						text:nth-child(3),
						text:nth-child(4),
						text:nth-child(5) {
							color: $uni-text-color-placeholder;
						}
					}

					.plan {
						font-size: 30rpx;
						color: $uni-text-color-placeholder;

						text:nth-child(2) {
							margin-left: 10rpx;
							color: #000;
						}
					}

					.grades {
						font-size: 30rpx;
						color: $uni-text-color-placeholder;

						text:nth-child(2),
						text:nth-child(4) {
							margin-left: 10rpx;
							color: #000;
						}

						text:nth-child(3) {
							margin-left: 30rpx;
						}
					}

				}
			}

			.btn_line {
				margin-top: 20rpx;
				display: flex;
				justify-content: flex-end;
				border-bottom: 1px dashed $uni-border-color;
				border-top: 1px dashed $uni-border-color;
				padding: 20rpx 0;
				color: rgba(39, 40, 50, 0.6);

				.btn {
					box-sizing: border-box;
					border: 1px solid $uni-color-error;
					color: $uni-color-error;
					height: 60rpx;
					line-height: 60rpx;
					margin: 0;

					.iconfont {
						margin-left: 5rpx;
					}
				}
			}

			.subject {
				box-sizing: border-box;
			}
		}

		// 滚动
		.scroll_y {
			// margin-top: 160rpx;
			height: 100vh;
			width: 100%;
		}

		// 折叠展开项
		.expand_item {
			box-sizing: border-box;
			padding: 30rpx 0;
			background-color: #FFFFFF;
			border-bottom: 1px solid $uni-border-color;

			.expand_item_top {
				// margin-top: 10rpx;
				box-sizing: border-box;
				// margin-bottom: 20rpx;
				display: flex;
				line-height: 45rpx;
				flex-wrap: wrap;

				// 头部区域
				.top {
					width: 100%;
					display: flex;
					justify-content: space-between;

					.zy {
						font-size: 26rpx;
						color: $uni-text-color-placeholder;
					}

					.schoolimg {
						text-align: center;
						// margin: auto;
						padding: 10rpx 10rpx;
						box-sizing: border-box;
						border-radius: $uni-border-radius-sm;
						border: 1px solid $uni-color-error;
						height: 50rpx;
						background-color: #fff;
						font-size: 20rpx;
						line-height: 30rpx;
						letter-spacing: 10rpx;
						color: $uni-color-error;
					}

					.schoolimg_active {
						background-color: $uni-color-error;
						color: #fff;
					}
				}

				// 左边区域
				.left {
					font-size: 24rpx;

					.schoolname {
						font-size: 32rpx;

					}

					.num {
						margin-top: 10rpx;
						// font-size: 30rpx;
						color: $uni-text-color-placeholder;

						text:nth-child(2) {
							margin-left: 10rpx;
						}

						text:nth-child(3),
						text:nth-child(5) {
							margin-left: 30rpx;
						}

						text:nth-child(4) {
							margin-left: 10rpx;
						}

						text:nth-child(6) {
							margin-left: 10rpx;
						}

					}

					.plan {
						// font-size: 30rpx;
						color: $uni-text-color-placeholder;

						text:nth-child(2),
						text:nth-child(3),
						text:nth-child(5) {
							margin-left: 10rpx;
						}

						text:nth-child(4) {
							margin-left: 30rpx;
							// color: #000;
						}
					}

					.grades {
						margin-left: 88rpx;
						color: $uni-text-color-placeholder;

						text:nth-child(2),
						text:nth-child(4) {
							margin-left: 10rpx;
							// color: #000;
						}

						text:nth-child(3) {
							margin-left: 30rpx;
						}
					}

				}
			}

			.btn_line {
				margin-top: 20rpx;
				display: flex;
				justify-content: flex-end;
				border-bottom: 1px dashed $uni-border-color;
				border-top: 1px dashed $uni-border-color;
				padding: 20rpx 0;
				color: rgba(39, 40, 50, 0.6);

				.btn {
					box-sizing: border-box;
					border: 1px solid $uni-color-error;
					color: $uni-color-error;
					height: 60rpx;
					line-height: 60rpx;
					margin: 0;

					.iconfont {
						margin-left: 5rpx;
					}
				}
			}

			.subject {
				box-sizing: border-box;
				background-color: pink;
				padding: 40rpx 30rpx;
			}
		}

		.bottom {
			width: 100%;
			text-align: center;
			height: 50px;
			line-height: 50px;
		}
	}
</style>
