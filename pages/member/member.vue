<template>
	<view class="">
		<view class="status_bar">
		</view>
		<!-- 这里是状态栏 -->
		<uni-nav-bar title="我的" backgroundColor='#b50e03' color='#fff461' @clickLeft="clickBack" />
		<view class="content">
			<!-- 头像 -->
			<view class="top">
				<view class="school_item">
					<view class="it" v-if='user'>
						<view class="school_item_l">
							<view class="img">
								<image :src="user.avatarUrl" mode=""></image>
							</view>
						</view>
						<view class="school_item_r" >
							<view class="school_item_r_top">
								<text class="name">{{user.nickName}}</text>
								<text class="VIPhuiyuan" v-show='isVIP'>尊贵会员</text>
								<text class="huiyuan" v-show='!isVIP'>普通会员</text>
							</view>
							<view class="school_item_r_bottom">
								<text>湖南</text>
								<text>2022</text>
							</view>
						</view>
					</view>
					<view class="login_btn" v-show='!user' @click="logins">
						点击登录
					</view>
				</view>
			</view>
			<!-- 主要内容 -->
			<view class="main">
				<view class="mygrades" @click="togrades">
					<text class="iconfont icon-chengji"></text>修改成绩
				</view>
				<view class="mybelieve" @click="tozhiyuan">
					<text class="iconfont icon-jurassic_form-image"></text>我的志愿表
				</view>
				<view class="about" @click="toabout">
					<text class="iconfont icon-guanyuwomen"></text>关于我们
				</view>
				<view class="myinformation" @click="tcLogin">
					<text class="iconfont icon-xiugaixinxi1"></text>退出登录
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: null,
				isVIP: 0,
			}
		},
		onLoad() {
			this.user = uni.getStorageSync("user")
			this.isVIP = uni.getStorageSync("isVIP")
		},
		onShow() {
			this.isVIP=uni.getStorageSync('isVIP')
			this.user = uni.getStorageSync("user")
		},
		methods: {
			logins(){
							let value = uni.getStorageSync("user")
							if(value){
								uni.navigateTo({
									url: '../index/index'
								})
							}else{
								uni.getUserProfile({
									desc: '登录', 
									success:res=>{
										uni.setStorageSync("user", res.userInfo)
										uni.login({
											provider: 'weixin',
											success: (res)=>{
											  uni.request({
											  	url: "https://tcb-4xwmp6nz0f2af8-9dnpa6e65404d.service.tcloudbase.com/suiji",
											  	data:{
											  		code:res.code
											  	},
												success:res=>{
													uni.setStorageSync("oid", res.data.res.data.openid)
													let name = uni.getStorageSync(
														"user").nickName
														uni.request({
															url: "https://tcb-4xwmp6nz0f2af8-9dnpa6e65404d.service.tcloudbase.com/dbbase",
															data: {
																 openid: res.data.res.data.openid,
																name: name
															},
															success: (res) => {
																uni.setStorageSync("isVIP", res.data.vip)
																this.user = uni.getStorageSync("user")
																	uni.switchTab({
																		url:'../index/index'
																	})
															},
															fail: (err) => {
															}
														})
												}
											  })
											}
										})
										
									},
									fail: (err) => {
										console.log("错误",err)
									}
								})
							}
						},
			
			// 用户点击我的成绩
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
				}else{
					uni.navigateTo({
					url: '../inform/inform'
				})
				}
				
			},
			// 用户点击关于我们
			toabout() {
				uni.navigateTo({
					url: '../about/about'
				})
			

			},
			tcLogin() {
			 uni.showModal({
					title: '提示',
					content: '是否退出',
					confirmColor: "#b50e03",
					success: (res) => {
						if (res.confirm) {
							uni.clearStorage();
							this.user = null;
							uni.showToast({
								title: '退出登录',
								duration: 2000
							});
						} else if (res.cancel) {
						}
					}
				});
			},
			tozhiyuan() {
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
					uni.navigateTo({
					url: '../zhiyuan/zhiyuan'
				})
				}
		 },


		}
	}
</script>

<style lang="scss">
	.status_bar {
		height: calc(var(--status-bar-height));
		width: 100%;
		background-color: #b50e03;
	}

	.content {
		box-sizing: border-box;
		width: 100%;
		padding: 20rpx 30rpx;
		background-color: $uni-bg-color-grey;
		height: 100vh;
		// height: 500px;
	}

	// 头像
	.school_item {
		background-color: #fff;
		display: flex;
		width: 100%;
		height: 200rpx;
		// padding: 20rpx 32rpx;
		// box-sizing: border-box;
		align-items: center;
		border-radius: $uni-border-radius-base;

		// border-bottom: 1px solid $uni-border-color;
		.it {
			width: 100%;
			height: 100%;
			display: flex;
			padding: 32rpx 32rpx;
			box-sizing: border-box;

			.school_item_l {
				position: relative;
				height: 120rpx;
				width: 120rpx;
				margin-right: 32rpx;

				.img {
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
					overflow: hidden;
				}

				image {
					width: 120rpx;
					height: 120rpx;
				}
			}

			.school_item_r {

				// width: 100%;
				.school_item_r_top {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.name {
						// display: inline-block;
						line-height: 50rpx;
						font-weight: 500;
						font-size: 36rpx;
						color: $uni-text-color;
						letter-spacing: -0.62px;
						width: 300rpx;
						white-space:nowrap;
						overflow:hidden;
						text-overflow:ellipsis;
					}

					.address {
						color: rgba(39, 40, 50, 0.40);
						font-size: $uni-font-size-sm;
					}
					.huiyuan {
						margin-right: 60rpx;
						color: #afafaf;
						font-weight: 600;
					}

					.VIPhuiyuan {
						margin-right: 60rpx;
						color:#b50e03;
						font-weight: 600;
					}
				}

				.school_item_r_bottom {
					// width: 100%;
					margin-top: 10rpx;
					font-size: 24rpx;
					width: 542rpx;
					color: $uni-text-color-grey;

					text {
						margin-right: 10rpx;
					}

				
				}
			}

		}

		.login_btn {
			margin-left: 50%;
			// left: 50%;
			transform: translateX(-50%);
			background-color: #fff;
			box-sizing: border-box;
			border: 6rpx solid #b50e03;
			border-radius: 20rpx;
			color: #b50e03;
			text-align: center;
			font-size: 36rpx;
			padding: 20rpx 40rpx;
		}
	}

	// 主体区域
	.main {
		margin-top: 20rpx;
		background-color: #fff;
		border-radius: $uni-border-radius-base;
		box-sizing: border-box;
		padding: 0 32rpx;

		view {
			height: 88rpx;
			width: 100%;
			display: flex;
			align-items: center;
			border-bottom: 1px solid $uni-border-color;

			text {
				color: $uni-color-error;
				font-size: 40rpx;
				margin-right: 20rpx;
			}
		}

		view:last-child {
			border-bottom: none;
			// background-color: pink;
		}
	}
</style>
