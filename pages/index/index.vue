<template>
	<view class="">
		<view class="status_bar">
		</view>
		<!-- 这里是状态栏 -->
		<uni-nav-bar title="录德尚高考志愿填报" backgroundColor='#b50e03' color='#fff461' />
		<view class="content">
			<view class="bgc">
				<view class="top">
					<view class="userInfo">
						<view class="userInfo_left">
							<view class="avatar">
								<image :src="img" mode=""></image>
							</view>
							<view class="grades" @click="togrades">
								<!-- v-if='tngweifen' -->
								<!-- <text>去年同为分：600{{tngweifen}}</text> -->
								<text :class="{'twf':listInform.TWgrade}">文化分 : {{grades}}分</text><text :class="{'twf':tngweifen}" v-if='tngweifen'>去年同位分：{{tngweifen}}分</text><text v-if='artGrades'>专业分 : {{artGrades}}</text>
								<text class="iconfont icon-bianjiqianbi"></text>
							</view>
						</view>

						<view class="huiyuan">
							<image :src="vipimg" mode=""></image>
						</view>
					</view>
					<view class="school">
						<view class="total">
							{{listInform.num}}<text>所</text>
						</view>
						<view class="text">
							<text v-show='listInform.flag'>本科批</text>
							<text v-show='!listInform.flag'>专科批</text>
							<text>|</text>
							<text>适合我的大学</text>
						</view>
					</view>
					<view class="details">
						<view class="charge" @click="toGradesCharge(0)">
							{{listInform.Chong}} <text class='suo'>所</text>
							<view class="one">
								可冲击 <text class="iconfont icon-jiantou"></text>
							</view>
						</view>
						<view class="safe" @click="toGradesCharge(1)">
							{{listInform.Wen}} <text class='suo'>所</text>
							<view class="two">
								较稳妥 <text class="iconfont icon-jiantou"></text>
							</view>
						</view>
						<view class="basic" @click="toGradesCharge(2)">
							{{listInform.Bao}} <text class='suo'>所</text>
							<view class="three">
								可保底 <text class="iconfont icon-jiantou"></text>
							</view>
						</view>
					</view>
					<view class="submit">
						<view @click="member"><text>志愿模拟填报</text></view>
						<view @click="vip"><text>VIP智能填报</text></view>
					</view>
				</view>
			</view>


			<!-- 导航区 -->
			<view class="center">
				<navigator url="../apoint/apoint?type=1" hover-class="none" class="center_item">
					<image src="../../static/img/paiming.png" mode="widthFix"></image>
					<text>一分一档</text>
				</navigator>
				<view class="center_items" @click='clickshengkong'>
					<image src="../../static/img/school.png" mode="widthFix"></image>
					<view>省控线</view>
				</view>
				<view class="center_item" @click='clicktdx'>
					<image src="../../static/img/zhuanyezu.png" mode="widthFix"></image>
					<text>专业组投档线</text>
				</view>
				<view class="center_item" @click='clickzhaosheng'>
					<image src="../../static/img/zhaoshengjihua.png" mode="widthFix"></image>
					<text>招生计划</text>
				</view>
				<view class="center_item" @click='totoutiao(7)'>
					<image src="../../static/img/xuanke.png" mode="widthFix"></image>
					<text>高考选科</text>
				</view>
				<view class="center_item" @click="lql">
					<image src="../../static/img/luqu.png" mode="widthFix"></image>
					<text>测录取率</text>
				</view>
				<view class="center_item" @click="tfqx">
					<image src="../../static/img/tongfen.png" mode="widthFix"></image>
					<text>同分去向</text>
				</view>
				<view class="center_item" @click="ydy">
					<image src="../../static/img/zhaosheng.png" mode="widthFix"></image>
					<text>专家一对一</text>
				</view>
			</view>

			<!-- 轮播图 -->
			<view class="bottom">
				<!-- 轮播图 -->
				<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular='true'
					indicator-color='rgba(255,255,255,0.9)' indicator-active-color='rgba(255,255,255,0.9)'>
					<swiper-item @click="clickswiper(14)">
						<image src="../../static/toutiao/fenshuxian.jpg" mode=""></image>
					</swiper-item>
					<swiper-item @click="clickswiper(5)">
						<image src="../../static/toutiao/caozuo.jpg" mode=""></image>
					</swiper-item>
					<swiper-item @click="clickswiper(6)">
						<image src="../../static/toutiao/chengji.jpg" mode=""></image>
					</swiper-item>
					<swiper-item @click="clickswiper(13)">
						<image src="../../static/toutiao/shijian.jpg" mode=""></image>
					</swiper-item>
				</swiper>
			</view>
			<!-- 新闻资讯 -->
			<view class="newsmain">
				<!-- 排名 -->
				<view class="ranking">
					<view class="Rank" @click="rankingschool">
						<view class="Rank_title">
							院校排名 <text class="iconfont icon-jiantou"></text>
						</view>
						<view class="Rank_main">
							<view class="Rank_item">
								清华大学
							</view>
							<view class="Rank_item">
								北京大学
							</view>
							<view class="Rank_item">
								浙江大学
							</view>
							<view class="Rank_item">
								上海交通大学
							</view>
							<view class="Rank_item">
								南京大学
							</view>
						</view>
					</view>
					<view :class="['Rank','Rank_right']">
						<view class="Rank_title" @click="totoutiao(8)">
							专业排名 <text class="iconfont icon-jiantou"></text>
						</view>
						<view class="Rank_main">
							<view class="" @click="totoutiao(8)">
								工学
							</view>
							<view class="" @click="totoutiao(9)">
								管理学
							</view>
							<view class="" @click="totoutiao(10)">
								艺术学
							</view>
							<view class="" @click="totoutiao(11)">
								文学
							</view>
							<view class="" @click="totoutiao(12)">
								医学
							</view>
						</view>
					</view>
				</view>

				<!-- 高考头条 -->
				<view class="news">
					<view class="news_title">
						<text>高考头条</text>
						<text></text>
					</view>
					<view class="news_main">
						<view class="news_item" @click="totoutiao(0)">
							各批次志愿填报
						</view>
						<view class="news_item" @click="totoutiao(1)">
							志愿填报注意事项
						</view>
						<view class="news_item" @click="totoutiao(2)">
							艺考非"易考"，艺考新规带来哪些变化？
						</view>
						<view class="news_item" @click="totoutiao(3)">
							湖南省2022年普通高等学校招生网上填报志愿工作
						</view>
						<view class="news_item" @click="totoutiao(4)">
							艺考生填报志愿
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import UniStatusBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	export default {
		components: {
			UniStatusBar
		},
		data() {
			return {
				user: null,
				img: '',
				grades: 0,
				artGrades: null,
				listInform: {
					Chong: 0,
					Wen: 0,
					Bao: 0,
					num: 0,
					flag: 1
				},
				isVIP: 0,
				vipimg: '../../static/img/putong.png',
				tngweifen:"",
				
			}

		},
		onLoad() {
			this.isVIP = uni.getStorageSync('isVIP')
			if (this.isVIP == 1) {
				this.vipimg = '../../static/img/huiyuan.png' 
			}
		},
		onShow() {
			this.user = uni.getStorageSync("user")
			this.img = uni.getStorageSync("user").avatarUrl || '../../static/head.png'
			try {
				this.isVIP = uni.getStorageSync('isVIP')
				if (this.isVIP == 1) {
					this.vipimg = '../../static/img/huiyuan.png'
					// console.log("tw:"+uni.getStorageSync('TWgrade'))
					this.tngweifen=uni.getStorageSync('listInform').TWgrade||0
				}
				if (uni.getStorageSync('listInform')) {
					this.grades = uni.getStorageSync('fenshu') || 0;
					this.artGrades = uni.getStorageSync('artfenshu')||0;
					this.listInform = uni.getStorageSync('listInform')
					console.log(this.listInform)
				} else {
					this.artGrades=0;
					this.grades = 0;
					this.listInform = {
						Chong: 0,
						Wen: 0,
						Bao: 0,
						num: 0,
						flag: 1
					}
				}

			} catch (e) {}
		},

		methods: {
			// 找大学
			clickshengkong() {
				uni.navigateTo({
					url: '../shengkong/shengkong'
				})
			},
			// 点击可冲击
			toGradesCharge(type) {
				if (!uni.getStorageSync("user")) {
					uni.showToast({
						title: '请登录',
						duration: 1000,
						icon: 'error'
					});
					setTimeout(() => {
						uni.navigateTo({
							url: '../login/login'
						})
					}, 1000)
				} else {
					uni.navigateTo({
						url: '../danList/danList?type=' + type
					})
				}

			},
			// 点击同分去向
			tfqx() {
				if (!uni.getStorageSync("user")) {
					uni.showToast({
						title: '请登录',
						duration: 1000,
						icon: 'error'
					});
					setTimeout(() => {
						uni.navigateTo({
							url: '../login/login'
						})
					}, 1000)
				} else {
					if (this.isVIP) {
						uni.navigateTo({
							url: '../tfqx/tfqx'
						})
					} else {
						uni.showModal({
							title: '提示',
							content: '此项服务需要购买志愿卡',
							confirmColor: "#b50e03",
							cancelText: '取消',
							confirmText: '去购买',
							success: function(res) {
								if (res.confirm) {
									console.log('用户点击确定');
									uni.navigateTo({
										url: '../pay/pay'
									})
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
				}
			},
			// 点击投档线
			clicktdx() {
				uni.navigateTo({
					url: '../toudanx/toudanx'
				})
			},
			// 点击招生计划
			clickzhaosheng() {
				uni.navigateTo({
					url: '../zhaosheng/zhaosheng'
				})
			},
			member() {
				if (!uni.getStorageSync("user")) {
					uni.showToast({
						title: '请登录',
						duration: 1000,
						icon: 'error'
					});
					setTimeout(() => {
						uni.navigateTo({
						url: '../login/login'
					})
					}, 1000)
				} else {
					if (uni.getStorageSync('Grades')) {
						let {
							address,
							artGrades,
							firstsub,
							grades,
							gxhtype,
							ranking,
							secondsub,
							types,
							place,
							schooltype
						} = uni.getStorageSync('Grades')
						if(uni.getStorageSync('count')==0){
						grades = uni.getStorageSync('fenshu') ;
						artGrades = uni.getStorageSync('artfenshu')
						}
						// console.log("grades:"+grades)
						if (uni.getStorageSync('Grades').types == '普通类') {
							uni.navigateTo({
								url: '../list/list?first=' + firstsub + '&second1=' + secondsub[0] + '&second2=' +
									secondsub[1] + '&grades=' + grades + '&types=' + types+'&vip='+0
							})
						} else if (uni.getStorageSync('Grades').types != '普通类') {
							uni.navigateTo({
								url: '../list/list?first=' + firstsub + '&second1=' + secondsub[0] + '&second2=' +
									secondsub[1] + '&grades=' + grades + '&artGrades=' + artGrades + '&types=' +
									types+'&vip='+0
							})
						}
					} else {
						uni.navigateTo({
							url: '../grades/grades'
						})
					}
				}
			},
			// 跳转到成绩单
			togrades() {
				if (!uni.getStorageSync("user")) {
					uni.showToast({
						title: '请登录',
						duration: 1000,
						icon: 'error'
					});
					setTimeout(() => {
						uni.navigateTo({
							url: '../login/login'
						})
					}, 1000)
				} else {
					uni.navigateTo({
						url: '../grades/grades'
					})
				}
			},
			// 跳转到学校排名
			rankingschool() {
				uni.navigateTo({
					url: '../ranking/ranking'
				})
				
			},

			// 点击vip填报
			vip() {
				if (!uni.getStorageSync("user")) {
					uni.showToast({
						title: '请登录',
						duration: 1000,
						icon: 'error'
					});
					
					setTimeout(() => {
						uni.navigateTo({
						url: '../login/login'
					})
					}, 1000)
				}else{
					if (this.isVIP) {
						if (uni.getStorageSync('Grades')) {
							let {
								address,
								artGrades,
								firstsub,
								grades,
								gxhtype,
								ranking,
								secondsub,
								types,
								place,
								schooltype
							} = uni.getStorageSync('Grades')
							if(uni.getStorageSync('count')==0){
							grades = uni.getStorageSync('fenshu') ;
							artGrades = uni.getStorageSync('artfenshu')
							}
							if (uni.getStorageSync('Grades').types == '普通类') {
								uni.navigateTo({
									url: '../list/list?first=' + firstsub + '&second1=' + secondsub[0] + '&second2=' +
										secondsub[1] + '&grades=' + grades + '&types=' + types+'&vip='+1+'&place='+ place+'&schooltype=' + schooltype
								})
							} else if (uni.getStorageSync('Grades').types != '普通类') {
								uni.navigateTo({
									url: '../list/list?first=' + firstsub + '&second1=' + secondsub[0] + '&second2=' +
										secondsub[1] + '&grades=' + grades + '&artGrades=' + artGrades + '&types=' +
										types+'&vip='+1+'&place='+ place
								})
							}
						} else {
							uni.navigateTo({
								url: '../grades/grades'
							})
						}
					} else {
						uni.showModal({
							title: '提示',
							content: '此项服务需要购买志愿卡',
							confirmColor: "#b50e03",
							cancelText: '取消',
							confirmText: '去购买',
							success: function(res) {
								if (res.confirm) {
									uni.navigateTo({
										url: '../pay/pay'
									})
					
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
				}
				
			

			},
			// 测录取录
			lql() {
				if (!uni.getStorageSync("user")) {
					uni.showToast({
						title: '请登录',
						duration: 1000,
						icon: 'error'
					});
					setTimeout(() => {
						uni.navigateTo({
							url: '../login/login'
						})
					}, 1000)
				} else {
					if (this.isVIP) {
						uni.navigateTo({
							url: '../luqulu/luqulu'
						})
					} else {
						uni.showModal({
							title: '提示',
							content: '此项服务需要购买志愿卡',
							confirmColor: "#b50e03",
							cancelText: '取消',
							confirmText: '去购买',
							success: function(res) {
								if (res.confirm) {
									console.log('用户点击确定');
									uni.navigateTo({
										url: '../pay/pay'
									})

								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
				}
			},

			// 点击一分一段
			clicknav(e) {
				console.log(e.target)
			},
			// 跳转到头条
			totoutiao(type) {
				uni.navigateTo({
					url: '../toutiao/toutiao?type=' + type
				})
			},
			// 专家一对一
			ydy() {
				uni.navigateTo({
					url: '../yiduiyi/yiduiyi'
				})
			},
			// 点击轮播图
			clickswiper(type) {
				uni.navigateTo({
					url: '../toutiao/toutiao?type=' + type
				})
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

	.icon {
		width: 1em;
		height: 1em;
		vertical-align: -0.15em;
		fill: currentColor;
		overflow: hidden;
	}

	.content {
		box-sizing: border-box;
		padding: 0 40rpx;
		height: 100%;
		background-color: #FFFFFF;
		font-size: 36rpx;
		color: #afafaf;
		//background: linear-gradient(#f87869, #fad9d4, #f6f6f6);
		// background: linear-gradient(#d03a28, #f6f6f6);  //我改的地方
		// background-color:#d03a28 ;
	}


	// 头部信息展示
	.bgc {
		margin-left: -40rpx;
		margin-right: -40rpx;
		// margin-bottom: 40rpx;
		// margin-bottom: 40rpx;
		box-sizing: border-box;
		padding: 40rpx 40rpx;
		// background: linear-gradient(#d03a28, #fff); 
		background: linear-gradient(#b50e03, #e3a6a2, #fff);
		// background-color:#d03a28 ;
	}

	.top {
		height: 600rpx;
		width: 100%;
		// background-color: #fcf1ef;
		background-color: #ffffff;
		// background-color: #fffff0;
		// border-style: solid;
		// border-width: 10rpx;
		// border-color: #e6c35c;
		border-radius: 25rpx;
		box-sizing: border-box;
		padding: 30rpx;
		display: flex;
		flex-direction: column;

		.userInfo {
			// background-color: pink;
			flex: 0.8;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.userInfo_left {
				display: flex;
				align-items: center;

				.avatar {

					overflow: hidden;
					width: 94rpx;
					height: 94rpx;
					border-radius: 47rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.grades {
					// 	// background-color:purple;
					// 	// text-align: center;
					margin-left: 20rpx;
					line-height: 94rpx;
					// 	// width: 200rpx;
					font-size: 30rpx;
					color: #afafaf;

					.icon-bianjiqianbi {
						font-size: 40rpx;
						font-weight: 700;
						color: #42ba7a;
					}

					// 	// view:nth-child(2)
					text:nth-child(2) {
						margin-left: 10rpx;
					}
					.twf{
						font-size: 25rpx;
					}
				}
			}

			.huiyuan {
				height: 50rpx;
				width: 50rpx;
				// margin-left:228rpx;
			}
		}

		.school {
			// background-color: pink;
			flex: 1.5;
			text-align: center;

			.total {
				font-size: 100rpx;
				color: #333333;
				font-weight: 900;

				text {
					font-size: 50rpx;
					padding: 10rpx;
					box-sizing: border-box;
				}
			}

			.text {
				font-size: 30rpx;

				text:nth-child(2) {
					margin: 0 10rpx;
				}
			}
		}

		.details {
			// background-color: red;
			flex: 1.3;
			display: flex;
			text-align: center;
			color: #333333;
			font-size: 50rpx;
			font-weight: 900;

			.suo {
				margin-left: 10rpx;
				font-size: 36rpx;
				color: #afafaf;
				font-weight: 400;
			}

			.charge {
				padding-top: 22rpx;
				flex: 1;
				// background-color: pink;
				border-right: 1px solid #f6f6f6;

				.one {
					font-size: 30rpx;
					font-weight: 700;
					color: #ff9620;

					text {
						margin-left: 5rpx;
						font-size: 25rpx;
					}
				}
			}

			.safe {
				flex: 1;
				padding-top: 22rpx;
				border-right: 1px solid #f6f6f6;

				.two {
					font-size: 30rpx;
					font-weight: 700;
					color: #3d9ff6;

					text {
						margin-left: 5rpx;
						font-size: 25rpx;
					}
				}
			}

			.basic {
				flex: 1;
				padding-top: 22rpx;

				// background-color: pink;
				.three {
					font-size: 30rpx;
					font-weight: 700;
					color: #42ba7a;

					text {
						margin-left: 5rpx;
						font-size: 25rpx;
					}
				}
			}
		}

		.submit {
			display: flex;
			flex: 1;
			margin-top: 40rpx;

			view {
				border-radius: 50rpx;
				// background-color: #d03a28;
				background-color: #b50e03;
				color: rgb(252, 250, 244);
				font-weight: 700;
				height: 100%;
				width: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			view:nth-child(1) {
				border-radius: 50rpx 0 0 50rpx;
				// background-color: rgb(252, 250, 244);
				// background-color: #fcf1ef;
				// background-color: #fcf6f5;
				background-color: #faefef;
				// color: #e24a39;
				// color: #d03a28;
				color: #b50e03;
			}

			view:nth-child(2) {
				border-radius: 0 50rpx 50rpx 0;
				// background-color: rgb(252, 250, 244);
				// color: #e24a39;
			}

			// .btn {
			// 	margin-top: 20rpx;
			// 	background-color: #f87869;
			// 	color: #fff;
			// 	font-weight: 700;
			// 	border-radius: 50rpx;
			// }
		}
	}


	// 导航区

	.center {
		// margin-top: 40rpx;
		border-radius: 25rpx;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		// background-color: #fffff0;
		// border-style: solid;
		// border-width: 10rpx;
		// border-color: #e6c35c;
		display: flex;
		padding-top: 20rpx;
		flex-wrap: wrap;
		color: #666;

		.center_item {
			width: 25%;
			// height: 140rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			font-size: 24rpx;
			margin-bottom: 20rpx;

			image {
				width: 80rpx;
			}
		}

		.center_items {
			display: flex;
			width: 25%;
			font-size: 24rpx;
			margin-bottom: 20rpx;
			// margin: auto;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			image {
				width: 80rpx;
			}
		}
	}


	// 底部轮播图

	.bottom {
		margin-top: 40rpx;
		border-radius: 25rpx;
		box-sizing: border-box;
		width: 100%;
		// height: 400rpx;
		background-color: #fff;
		overflow: hidden;

		swiper {

			width: 100%;
			height: 380rpx;

			image {
				height: 100%;
				width: 100%;
			}
		}
	}


	// 新闻区
	.newsmain {
		box-sizing: border-box;
		margin-top: 40rpx;
		width: 100%;

		// 视频
		.video {

			.video_title {
				width: 100%;
				height: 88rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 40rpx;
				color: #333;
				font-weight: 550;
			}

			.video_main {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				.video_item {
					width: 48%;
					text-align: center;
					font-size: $uni-font-size-base;

					// overflow: hidden;
					image {
						border-radius: $uni-border-radius-base;
					}
				}
			}

		}

		// 排名
		.ranking {
			display: flex;
			// height: 300rpx;
			width: 100%;
			box-sizing: border-box;
			color: #666;

			.Rank_right {
				margin-left: 30rpx;
			}

			.Rank {
				// width: 95%;
				flex: 1;
				background-color: #fff;
				border-radius: $uni-border-radius-base;
				overflow: hidden;
				box-sizing: border-box;

				.Rank_title {
					background-color: #b50e03;
					color: rgb(252, 250, 244);
					box-sizing: border-box;
					height: 88rpx;
					display: flex;
					align-items: center;
					padding: 0 20rpx;
					display: flex;
					justify-content: space-between;
				}

				.Rank_main {
					font-size: $uni-font-size-base;
					background-color: $uni-bg-color-grey;

					// display: flex;
					view {
						height: 66rpx;
						line-height: 66rpx;
						// display: flex;
						box-sizing: border-box;
						padding-left: 20rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis
					}
				}
			}


		}



		// 高考新闻

		.news {
			margin-top: 40rpx;

			.news_title {
				width: 100%;
				height: 88rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 40rpx;
				color: #333;
				font-weight: 550;
			}

			.news_main {
				width: 100%;
				color: #666;

				.news_item {
					box-sizing: border-box;
					width: 100%;
					height: 88rpx;
					display: flex;
					align-items: center;
					border-bottom: 1px solid $uni-border-color;
					font-size: $uni-font-size-base;
				}
			}

		}

	}
</style>
