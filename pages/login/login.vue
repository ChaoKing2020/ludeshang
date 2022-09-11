<template>
	<view class="content">
		<view class="img">
			<image src="../../static/img/keda.png" mode=""></image>
		</view>
		<view class="btn" @click="login">
			微信一键登录
		</view>
		<view class="text">
			新用户登录加入会员，享会员权益
		</view>
		<view class="pic">
			<view class="pic_item">
				<image src="../../static/img/xuanke.png" mode=""></image>
				<text>高考选科</text>
			</view><view class="pic_item">
				<image src="../../static/img/luqu.png" mode=""></image>
				<text>测录取率</text>
			</view><view class="pic_item">
				<image src="../../static/img/tongfen.png" mode=""></image>
				<text>同分去向</text>
			</view><view class="pic_item">
				<image src="../../static/img/zhaosheng.png" mode=""></image>
				<text>专家一对一</text>
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
			login() {
	let value = uni.getStorageSync("user")
	let errMsg
	let code
	if (value) {
		uni.switchTab({
			url: '../index/index'
		})
	} else {
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
								uni.setStorageSync("oid", res.data.res.data.openid)
								let Name = uni.getStorageSync(
									"user").nickName
								uni.request({
									url: "https://tcb-4xwmp6nz0f2af8-9dnpa6e65404d.service.tcloudbase.com/dbbase",
									data: {
										openid: res.data.res.data.openid,
										name: Name
									},
									success: (res1) => {
									 uni.setStorageSync("isVIP", res1.data.vip)
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
	}
}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		box-sizing: border-box;
		// padding: 0 40rpx;
		height: 100vh;
		background-color: #eee;
		// font-size: 36rpx;
		// text-align: center;
		overflow: hidden;
		.img{
			height: 300rpx;
			width: 300rpx;
			border-radius: 50%;
			// overflow: hidden;
			margin: auto;
			margin-top: 60%;
		}
		.btn{
			margin: auto;
			margin-top: 100rpx;
			box-sizing: border-box;
			padding: 5px 10px;
			background-color:#c40303;
			color: rgb(252, 250, 244);
			text-align: center;
			border-radius: 50rpx;
			width: 70%;
			line-height: 60rpx;
			letter-spacing:5rpx;
			font-weight: 600;
			
		}
		.text{
			margin: auto;
			margin-top: 100rpx;
			width: 100%;
			text-align: center;
			color: #afafaf;
			font-size: 28rpx;
		}
		.pic{
			
			width: 70%;
			margin: auto;
			margin-top: 40rpx;
			// background-color: pink;
			display: flex;
			justify-content: space-between;
			
			.pic_item{
				height: 110rpx;
				width: 100rpx;
				font-size: 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				image{
					width: 80rpx;
				}
				text{
					margin-top: 10rpx;
					color: #afafaf;
				}
			}
		}
	}
</style>
