<template>
	<view class="">
		<scroll-view scroll-y="true" class="scroll_y" @scrolltolower='ReachBottom'>
			<view class="campus_item" v-for='(item,index) in viewData' :key='index' v-if='viewData[0].A'>
				<view class="campus_item_top">
					<view class="left">
						<view class="schoolimg">
							<image src="../static/img/keda.png" mode=""></image>
						</view>
						<text class="bao" v-if='type'>录取率{{item.M}}</text>
						<!-- <text class="wen" v-else-if='color==1'>稳{{item.M}}</text>
						<text class="bao" v-else-if='color==2'>保{{item.M}}</text> -->
					</view>
					<view class="right">
						<view class="schoolname">
							{{item.B}}
						</view>
						<view class="num">
							<text>院校代码</text>
							<text>{{item.A}}</text>
							<text>{{item.H}}</text>
							<text>-{{item.I}}</text>
							<!-- <text>{{item.D}}</text> -->
						</view>
						<view class="plan">
							<text>21年计划招生</text>
							<text :class="zscolor?'redColor':''">{{(item.E)[0]}}人</text>
						</view>
						<view class="grades">
							<text>投档线</text>
							<text :class="zyzcolor?'redColor':''">{{item.G}}分</text>
							<text>再选科目要求</text>
							<text>{{(item.E)[1]}}</text>
						</view>
					</view>
				</view>
				<view class="btn_line" @click="dropDown(item)">
					<text>专业组代码    {{item.C}}</text>
					<text>可选专业<text class="iconfont icon-xiajiantou"></text></text>
				</view>
				<!-- <view :class="{'subject':true,'show':item.L}" v-if=""> -->
					<view class="subject" v-if='item.L'>
					<view class="expand_item" v-for='(i,index1) in item.F' :key='index1'>
						<view class="expand_item_top">
							<view class="top">
								<view class="zyname">
									{{i[1]}}
									<!-- <text class="zy">{{i[0]}}</text> -->
								</view>
								<!-- <view class="schoolimg" @click="tb(item,i,index1)">
									<text class="iconfont icon-jiahao"></text>
									填报
								</view> -->
							</view>
							<view class="left">
								<view class="num">
									<text>2021年</text>
									<text>专业代码 {{i[0]}}</text>
									<text :class="zscolor?'redColor':''">招生{{i[3]}}人</text>
									<text>学制 </text>
									<text>{{i[2]}}</text>
									<text>学费 {{i[4]}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="bottom" v-if="viewData[0].A">
				------我是有底线的-------
			</view>
			<view class="bottom" v-if='viewData.length==0'>
				------请输入信息查询-------
			</view>
		</scroll-view>
		</view>
</template>

<script>
	export default {
		name:"YxList",
		props:{
			schoolList:{
				type:Array,
			},
			type:{
				type:Number,
				default(){
					return 0
				}
			},
			zyzcolor:{
				type:Boolean,
				default(){
					return false
				}
			},
			zscolor:{
				type:Boolean,
				default(){
					return false
				}
			}
		},
		data() {
			return {
				bottom:false,
				viewData:[]
			};
		},
		watch:{
			schoolList:function(newValue,oldValue){
				this.viewData=newValue
			}
		},
		methods:{
			dropDown(e){
				this.viewData.some(function(item){
					if(item._id==e._id){
						return item.L=!item.L
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 滚动
		.scroll_y {
			height: 100%;
			width: 100%;
		}
		// .show{
		// 	display: none !important;
		// }
		.campus_item {
				box-sizing: border-box;
				background-color: #FFFFFF;
				margin: 25rpx 20rpx;
				padding: 40rpx 30rpx;
				border-radius: $uni-border-radius-base;
		        height: 100%;
				.campus_item_top {
					box-sizing: border-box;
					// margin-bottom: 20rpx;
					display: flex;
					line-height: 45rpx;
		
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
					justify-content: space-between;
					border-bottom: 1px dashed $uni-border-color;
					border-top: 1px dashed $uni-border-color;
					padding: 20rpx 0;
					color: rgba(39, 40, 50, 0.6);
		//             .zyz{
					// 	display: inline-block;
					// 	float: left;
					// }
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
		        .zyname{
		            // width: 78%;
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
		.redColor{
			color: $uni-red !important;
		}
		.yellowColor{
			color:$uni-yellow !important;
		}
</style>
