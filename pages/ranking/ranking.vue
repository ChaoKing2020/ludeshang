<template>
	<view class="">
		<view class="status_bar">
		</view>
		<!-- 这里是状态栏 -->
		<uni-nav-bar title="院校排名" backgroundColor='#b50e03' color='#fff461' left-text="返回" @clickLeft="clickBack"/>
	<view class="content">
	<view class="title">
		<text>排名</text>
		<text>院校名称</text>
		<text>总得分</text>
	</view>
	<view class="main">
		<scroll-view scroll-y="true" class="scroll_y" @scrolltolower='ReachBottom'>
		<view class="main_item"  v-for='item in viewData' :key='item._id'>
			<view class="">
				{{item.rank}}
			</view>
			<view class="main_item_center">
				<view class="main_item_center_top">
					<text>{{item.school_name}}</text>
				</view>
				<view class="main_item_center_bottom">
				<text>{{item.province}}</text>
				<text>{{item.type}}</text>
				</view>
			</view>
			<view class="main_item_right">
				{{item.grade}}
			</view>
		</view>
		</scroll-view>
	</view>
	</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				viewData:[],
				page:1,
			}
		},
		onLoad() {
			 this.getlist()
		},
		methods: {
			async getlist() {
						// 发送请求当前院校的数据
						const res = await this.$myRequest({
							url: "/yifengyidang",
							data: {
								c:0
								// b首选，c省份,d类型
							}
						})
							// console.log(this.viewData)
							// console.log(res.data.data)
							this.list = this.getNewArray(res.data.data, 30) || []
							this.viewDataAdd()
						
					},
					viewDataAdd() {
						if (this.viewData == []) {
							this.viewData = this.list[0] || []
						} else {
							this.viewData = this.viewData.concat(this.list[this.page - 1])
						}
						console.log(this.viewData)
					},
					// 触底加载
					ReachBottom() {
						// 因为第一次触底直接return了,这时候page==0  this.page*10=0
						if (this.viewData.length < this.page * 30) {
							return this.bottom = true
						}
						this.page++;
						this.viewDataAdd()
					},
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
		// 点击了返回
		clickBack() {
			uni.navigateBack();
		},
			
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
	box-sizing: border-box;
	overflow: hidden;
	// position: relative;
	// padding: 88rpx 0;
	// 头部
	.title{
		// position: fixed;
		width: 100%;
		// top:0;
		left: 0;
		display: flex;
		height: 88rpx;
		background-color: #fff;
		border-bottom: 1px solid $uni-border-color;
		color: $uni-text-color-placeholder;
		line-height: 88rpx;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 30rpx;
		text:nth-child(2){
			width: 60%;
		}
	}
	// 下面的内容
	.main{
		// margin-top: 88rpx;
		box-sizing: border-box;
		padding: 0 30rpx;
		.scroll_y {
			height: calc(100vh - 160rpx);
			width: 100%;
			.main_item{
				height: 160rpx;
				// background-color: red;
				display: flex;
				justify-content: space-between;
				box-sizing: border-box;
				padding: 26rpx 0;
				border-bottom:1px solid $uni-border-color;
				view:nth-child(1){
					color: $uni-color-warning;
					font-size: 36rpx;
				}
				view:nth-child(2){
					width: 60%;
					// display: flex;
				}
				
				.main_item_center{
					width: 100%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.main_item_center_top{
						text:nth-child(1){
							color: $uni-color-paragraph;
							font-size: 36rpx;
						}
						text:nth-child(2){
							margin-left: 20rpx;
							color: $uni-text-color-placeholder;
							font-size: $uni-font-size-base;
						}
						text:nth-child(3){
							margin-left: 20rpx;
							color: $uni-text-color-placeholder;
							font-size: $uni-font-size-base;
						}
					}
					.main_item_center_bottom{
						display: flex;
					 font-size: $uni-font-size-base;
						width: 100%;
						text:nth-child(2){
							margin: 0 16rpx;
						}
						text{
							font-size: $uni-font-size-sm;
							background-color: #EEEEEE;
							box-sizing: border-box;
							padding: 5rpx 20rpx;
							border-radius: $uni-border-radius-base;
							color: $uni-text-color-placeholder;
						}
					}
				}
				
				.main_item_right{
					color: $uni-color-warning;
				}
			}
		}
	}
}
</style>
