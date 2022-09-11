<template>
	<view class="">

	<view class="status_bar">
	</view>
	<!-- 这里是状态栏 -->
	<uni-nav-bar title="会员" backgroundColor='#b50e03' color='#fff461' left-text="返回" @clickLeft="clickBack"/>
	<view class="content">
		<view class="card">
			<image src="../../static/payBgc.jpg" mode=""></image>
			<view class="user">
				<view class="userInfo">
					<view class="userhead">
						<image :src="img" mode=""></image>
					</view>
					<view class="userinform">
						<text>{{user.nickName}}</text>
						<text>你还不是VIP</text>
					</view>
				</view>
			</view>
		    <view class="topay" @click="topay">
		    	开通VIP尊享权限  <text class="iconfont icon-jiantou"></text>
		    </view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			user:null,	
			img:''
			}
		},
		onShow() {
		this.user=uni.getStorageSync("user")
		this.img=this.user.avatarUrl?this.user.avatarUrl:'../../static/head.png'
		},
		methods: {
			// 点击了返回
			clickBack() {
				uni.navigateBack();
			},
			topay(){
				let op = uni.getStorageSync("oid")
				// console.log(op)
				uni.request({
					url: "https://tcb-4xwmp6nz0f2af8-9dnpa6e65404d.service.tcloudbase.com/pay",
					data:{
						openid: op
					},
					success: (res) => {
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: res.data.orderInfo.timeStamp,
							nonceStr: res.data.orderInfo.nonceStr,
							package: res.data.orderInfo.package,
							signType: res.data.orderInfo.signType,
							paySign: res.data.orderInfo.paySign,
							success: function(ress) {
								uni.request({
									url: "https://tcb-4xwmp6nz0f2af8-9dnpa6e65404d.service.tcloudbase.com/ruku",
									data: {
										openid: op,
									},
									success: (res) => {
										//会员记录已经记录在数据库
										uni.showModal({
											title: '提示',
											content: '支付成功,请重新登录',
											success: function (res) {
												if (res.confirm) {
												uni.getUserProfile({
													desc: '登录',
													success: res => {
														uni.setStorageSync("user", res.userInfo)
														uni.login({
															provider: 'weixin',
															success: (res) => {
																uni.request({
																	url: "https://tcb-4xwmp6nz0f2af8-9dnpa6e65404d.service.tcloudbase.com/suiji",
																	data:{
																		code:res.code
																	},
																	success: res => {
																		uni.setStorageSync("oid",res.data.res.data.openid)
																		let Name = uni.getStorageSync(
																			"user").nickName
																		uni.request({
																			url: "https://tcb-4xwmp6nz0f2af8-9dnpa6e65404d.service.tcloudbase.com/dbbase",
																			data: {
																				openid: res.data.res.data.openid,
																				name: Name
																			},
																			success: (res1) => {
																			 uni.setStorageSync("isVIP", res1
																					.data.vip)
																				uni.switchTab({
																					url: '../index/index'
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
														console.log("错误", err)
													}
												})
												} else if (res.cancel) {
													uni.clearStorage();
													uni.switchTab({
														url: '../index/index'
													})
												}
											}
										});
										
									}
								})
							},
							fail: function(erre) {
								//支付失败
								console.log('fail:' + JSON.stringify(erre));
							}
						});
					}
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
.content{
	    background-color: $uni-bg-color-grey;
		box-sizing: border-box;
		width: 100%;
		padding:  0 30rpx;
		height: 100vh;
}
// 志愿卡
.card{
	margin-top: 30rpx;
	position: relative;
	width: 100%;
	height: 380rpx;
    border-radius: $uni-border-radius-base;
	overflow: hidden;
	
	.user{
		  position: absolute;
		  width: 100%;
		  height: 100%;
		  left: 0;
		  top: 0;
		  
		  .userInfo{
	  position: absolute;
	  left: 50rpx;
	  top: 40rpx;
	  width: 100%;
	  height: 100rpx;
	  // background-color: pink;
	  display: flex;
	   .userhead{
		   width: 100rpx;
		    background-color: red;
		   height: 100rpx;
		    border-radius: $uni-border-radius-circle;
			overflow: hidden;
         image{
			 width: 100%;
			 height: 100%;
		 }
	   }
	   .userinform{
		   margin-left: 20rpx;
		   display: flex;
		   flex-direction:column;
		   justify-content: center;
		   color: #eeee;
		   text:nth-child(1){
			   font-size: 40rpx;
			   // color: #000000;
			   font-weight: 500;
}
	   }
  }
	}
	.topay{
		position: absolute;
		box-sizing: border-box;
		padding: 18rpx 26rpx;
		border-radius: 40rpx;
		background-color: #fcf6f5;
		color:  #b50e03;
		right: 35rpx;
		bottom: 50rpx;
		font-weight: 600;
		.icon-jiantou{
			margin-left: 10rpx;
			font-size: 30rpx;
		}
	}

}	
</style>
