<template>
	<view class="">
	<view class="status_bar">
	</view>
	<!-- 这里是状态栏 -->
	<uni-nav-bar :title="titles" backgroundColor='#b50e03' color='#fff461' left-text="返回" @clickLeft="clickBack"/>
	<view class="content">
		<scroll-view scroll-y="true" class="scroll_y" @scrolltolower='ReachBottoms'>
			<view class="campus_item" v-for='(item,index) in viewData' :key='index' v-if='viewData[0].A'>
				<view class="campus_item_top">
					<view class="left">
						<view class="schoolimg">
							<image src="../../static/img/keda.png" mode=""></image>
						</view>
						<text class="chong" v-if='color==0'>冲{{item.M}}</text>
						<text class="wen" v-else-if='color==1'>稳{{item.M}}</text>
						<text class="bao" v-else-if='color==2'>保{{item.M}}</text>
					</view>
					<view class="right">
						<view class="schoolname">
							{{item.B}}
						</view>
						<view class="num">
							<text>招生代码</text>
							<text>{{item.A}}</text>
							<text>{{item.H}}</text>
							<text>-{{item.I}}</text>
						</view>
						<view class="plan">
							<text>21年计划招生</text>
							<text>{{(item.E)[0]}}人</text>
						</view>
						<view class="grades">
							<text>投档线</text>
							<text>{{item.G}}分</text>
							<text>再选科目要求</text>
							<text>{{(item.E)[1]}}</text>
						</view>
					</view>
				</view>
			<view class="btn_line" @click="dropDown(item)">
				<text>专业组代码    {{item.C}}</text>
				<text>可选专业<text class="iconfont icon-xiajiantou"></text></text>
			</view>
				<view class="subject" v-if='item.L'>
					<view class="expand_item" v-for='(i,index1) in item.F' :key='index1'>
						<view class="expand_item_top">
							<view class="top">
								<view class="zyname">
									{{i[1]}}-{{i[0]}}
								</view>
								<view class="schoolimg" @click="tb(item,i,index1)">
									<text class="iconfont icon-jiahao"></text>
									填报
								</view>
							</view>
							<view class="left">
								<view class="num">
									<text>2021年</text>
									<text>专业代码 {{i[0]}}</text>
									<text>招生{{i[3]}}人</text>
									<text>学制 </text>
									<text>{{i[2]}}</text>
									<text>学费 {{i[4]}}</text>
									
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
	import {formatDate} from'../../util/formatDate.js'
	export default {
		data() {
			return {
				dataSet:[],
				nowIndex:0,
				viewData:[],
				page: 1,
				bottom: false,
				titles:''
			}
		},
		onShow(){
			this.viewDataAdd()
		},
		onLoad(option) {
			console.log(option)
			if(option.type==0){
				this.titles="可冲击"
				this.dataSet=uni.getStorageSync("ListChong")
				// console.log(this.dataSet)
			}else if(option.type==1){
				this.titles="较稳妥"
				this.dataSet=uni.getStorageSync("ListWen")
			}else if(option.type==2){
				this.titles="可保底"
				this.dataSet=uni.getStorageSync("ListBao")
			}
			this.dataSet=this.getNewArray(this.dataSet,10)||[]
		},
		methods: {
			// 将长列表分隔成一个个短数组
			getNewArray(array, subGroupLength) {
				let index = 0;
				let newArray = [];
			if (array.length <= subGroupLength) {
					newArray = [array]
				} else {
					while (index < array.length) {
			 		newArray.push(array.slice(index, index += subGroupLength));
					}
				}
				return newArray;
			},
			viewDataAdd() {
					if (this.viewData == []) {
						this.viewData = this.dataSet[0] || []
					} else {
						this.viewData = this.viewData.concat(this.dataSet[this.page - 1])
					}
				this.viewData.forEach(item => {
					if (typeof item.E == 'string') {
						item.E = item.E.split('/')
						item.F = item.F.split(';')
					} else {
						return
					}
				})
				console.log(this.viewData)
			},
			// 触底加载
			ReachBottoms() {
				// 因为第一次触底直接return了,这时候page==0  this.page*10=0
				console.log(this.viewData.length, this.page * 10)
				if (this.viewData.length < this.page * 10) {
					return this.bottom = true
				}
				this.page++;
				this.viewDataAdd()
			
			},
			// 下拉可选专业,获取专业数据
			dropDown(item) {
				item.L = !item.L
				for (let i = 0; i < item.F.length; i++) {
					item.F[i] = item.F[i].split('/')
				}
			},
			tb(data,item,index1){
				uni.showModal({
					title: '提示',
					content: '是否加入志愿表',
					success: function (res) {
						if (res.confirm) {
							// console.log('用户点击确定');
							console.log(data,item,index1)
							let zhiyuan={
								A:data,
								B:item,
								C:formatDate(new Date(),"yyyy-MM-dd hh:mm:ss").slice(0,-3)
							};
							let zhiyuanList=uni.getStorageSync('zhiyuanList');
							if(!zhiyuanList){
								zhiyuanList=[]
								zhiyuanList.push(zhiyuan)
							}else{
								zhiyuanList.push(zhiyuan)
							}
							uni.setStorageSync('zhiyuanList',zhiyuanList);
							uni.showToast({
								title: '添加成功',
								duration: 400
							});
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				});
			},
			// 点击了返回
			clickBack(){
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
			padding: 40rpx 30rpx;
			border-radius: $uni-border-radius-base;

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

				.zyname{
				    width: 78%;
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

