<template>
	<view class="content">
		<view class="campus_item" v-for='item in list' :key='item.id'>
			<view class="campus_item_top">
				<view class="left">
					<view class="schoolimg">
					<image :src="item.img" mode=""></image>	
					</view>
			          <text>冲{{item.possible}}</text>
				</view>
				<view class="right">
					<view class="schoolname">
						{{item.name}}
					</view>
					<view class="num">
						<text>招生代码</text>
						<text>{{item.schoolCode}}</text>
						<text>湖南</text>
						<text>-{{item.schoolType}}-</text>
						<text>{{item.schoolTypse}}</text>
					</view>
					<view class="plan">
						<text>21年计划招生</text>
						<text>{{item.plan}}人</text>
					</view>
					<view class="grades">
						<text>最低分</text>
						<text>{{item.low}}</text>
						<text>最低位次</text>
						<text>{{item.ranking}}</text>
					</view>
				</view>
			</view>
			<view class="btn_line">
				<button type="default" size="mini" plain class="btn" @click="dropDown">可选专业<text class="iconfont icon-xiajiantou"></text></button>
			</view>
			<view class="" v-if='changeDropDown'>
				啊实打实的从
			</view>
		</view>
		
	<view class="campus_item">
		<view class="campus_item_top">
			<view class="left">
				<view class="schoolimg">
				<image src="../../static/logo.png" mode=""></image>	
				</view>
		          <text>冲12%</text>
			</view>
			<view class="right">
				<view class="schoolname">
					湖南工商大学
				</view>
				<view class="num">
					<text>招生代码</text>
					<text>4312</text>
					<text>湖南</text>
					<text>-公办-</text>
					<text>财经</text>
				</view>
				<view class="plan">
					<text>21年计划招生</text>
					<text>4人</text>
				</view>
				<view class="grades">
					<text>最低分</text>
					<text>515</text>
					<text>最低位次</text>
					<text>75000</text>
				</view>
			</view>
		</view>
		<view class="btn_line">
			<button type="default" size="mini" plain class="btn" @click="dropDown">可选专业<text class="iconfont icon-xiajiantou"></text></button>
		</view>
		<view class="" v-if='changeDropDown'>
			啊实打实的从
		</view>
	</view>
	
	<view class="campus_item">
		<view class="campus_item_top">
			<view class="left">
				<view class="schoolimg">
				<image src="../../static/logo.png" mode=""></image>	
				</view>
		          <text>冲12%</text>
			</view>
			<view class="right">
				<view class="schoolname">
					湖南工商大学
				</view>
				<view class="num">
					<text>招生代码</text>
					<text>4312</text>
					<text>湖南</text>
					<text>-公办-</text>
					<text>财经</text>
				</view>
				<view class="plan">
					<text>21年计划招生</text>
					<text>4人</text>
				</view>
				<view class="grades">
					<text>最低分</text>
					<text>515</text>
					<text>最低位次</text>
					<text>75000</text>
				</view>
			</view>
		</view>
		<view class="btn_line">
			<button type="default" size="mini" plain class="btn" @click="dropDown">可选专业<text class="iconfont icon-xiajiantou"></text></button>
		</view>
		<view class="" v-if='changeDropDown'>
			啊实打实的从
		</view>
	</view>
	</view>
</template>

<script>
	import datas from '../../data/dropdown.js'
	export default {
		name:"CampusList",
		data() {
			return {
				changeDropDown:false,
				list:[]
			};
		},
		methods:{
			dropDown(){
				// 发送请求当前院校的数据
				this.list=datas.dropdown()
				console.log(this.list)
				this.changeDropDown=!this.changeDropDown
			}
		}
	}
</script>

<style lang="scss" scoped>
.content{
	margin-top: 0;
	background-color: #eee;
	.campus_item{
		box-sizing: border-box;
		background-color: #FFFFFF;
		margin: 40rpx 30rpx;
	    padding:40rpx 30rpx;
				border-radius: $uni-border-radius-base;
		.campus_item_top{
			box-sizing: border-box;
			// margin-bottom: 20rpx;
			display: flex;
line-height: 45rpx;
		
			// 左边区域
			.left{
				width: 100rpx;
				margin-right:30rpx ;
				.schoolimg{
					width: 100rpx;
					height: 100rpx;
				}
				text{
					color: #fff;
					font-size: 26rpx;
					display: block;
					text-align: center;
					padding: 6rpx 3rpx;
					margin-top: 30rpx;
					border-radius: 8rpx;
					background-color: #ff9620;
				}
			}
			// 右边区域
			.right{
				.schoolname{
					font-size: 32rpx;
				}
				.num{
					margin-top: 10rpx;
					font-size: 30rpx;
					color: #afafaf;
					text:nth-child(2){
						margin-left: 10rpx;
					}
					text:nth-child(3){
						margin-left: 30rpx;
					}
				}
				.plan{
				font-size: 30rpx;
				color: #afafaf;
					text:nth-child(2){
						margin-left: 10rpx;
						color: #000;
					}
				}
				.grades{
					font-size: 30rpx;
					color: #afafaf;
					text:nth-child(2),text:nth-child(4){
						margin-left: 10rpx;
						color: #000;
					}
					text:nth-child(3){
						margin-left: 30rpx;
					}
				}
				
			}
		}
		.btn_line{
			margin-top: 20rpx;
			display: flex;
			justify-content: flex-end;
			.btn{
				box-sizing: border-box;
				border: 1px solid $uni-color-error;
				color: $uni-color-error;
				height: 60rpx;
				line-height: 60rpx;
				margin: 0;
				.iconfont{
					margin-left: 5rpx;
				}
			}
		}
	}

}
</style>
