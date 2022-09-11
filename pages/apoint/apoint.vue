<template>
	<view class="">
		<view class="status_bar">
		</view>
		<!-- 这里是状态栏 -->
		<uni-nav-bar title="我的成绩" backgroundColor='#b50e03' color='#fff461' left-text="返回" @clickLeft="clickBack" />
		<view class="content">
			<ren-dropdown-filter :filterData='filterData' :defaultIndex='defaultIndex' @onSelected='onSelected()'>
			</ren-dropdown-filter>
			<view class="line">
			</view>
			<view class="center">
				<view class="center_top">
					<text>湖南高考分段表</text>
				</view>
				<view class="center_title center_item">
					<view>分数</view>
					<view>人数</view>
					<view>排位区间</view>
				</view>
				<view class="center_center">
					<scroll-view scroll-y="true" class="scroll_y" @scrolltolower='ReachBottom'>
						<view class="center_item" v-for='item in viewData' :key='item._id'>
							<view>{{item.A}}</view>
							<view>{{item.B}}</view>
							<view>{{item.C}}</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import RenDropdownFilter from '@/components/ren-dropdown-filter/ren-dropdown-filter.vue'
	export default {
		components: {
			RenDropdownFilter
		},
		data() {
			return {
				isshow: false,
				filterData: [
					[{
						text: '2022年',
						value: "2022"
					}, {
						text: '2021年',
						value: "2021"
					}, {
						text: '2020年',
						value: "2020"
					}, {
						text: '2019年',
						value: '2019'
					}],
					[{
						text: '理科',
						value: '物理'
					}, {
						text: '文科',
						value: "历史"
					}]
				],
				defaultIndex: [0, 0],
				list: [],
				viewData: [],
				page: 1,
				bottom: false,
			}
		},
		// 页面滚动
		onPageScroll(e) {
			if (e.scrollTop >= 54) {
				this.isshow = true
			} else {
				this.isshow = false
			}
		},
		onLoad(e) {
			this.getlist('物理')
		},
		methods: {
			async getlist(first, nianfen = '2021') {
				// 发送请求当前院校的数据
				const res = await this.$myRequest({
					url: "/yifengyidang",
					data: {
						a: nianfen,
						b: first,
						c: 1
						// b首选，c省份,d类型
					}
				})
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
			onSelected(res) {
				this.viewData = []
				this.page = 1
				this.getlist(res[1][0].value, res[0][0].value)
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		.status_bar {
			height: calc(var(--status-bar-height));
			width: 100%;
			background-color: #b50e03;
		}

		.content {
			.line {
				height: 134rpx;
				width: 100%;
				background-color: $uni-bg-color-grey;
			}

			.center {
				position: relative;
				box-sizing: border-box;
				padding: 15rpx 20rpx;

				.center_top {
					color: #808080;

					text {
						display: inline-block;
						margin-left: 20rpx;
					}
				}

				.center_title {
					background-color: $uni-bg-color-grey;
					color: #8b9aae;
					margin-top: 20rpx;
				}

				.center_item {
					width: 100%;
					height: 88rpx;
					display: flex;
					align-items: center;
					text-align: center;
					border-bottom: 1px solid #eee;

					view {
						flex: 1;
					}
				}

				// .center_t{
				// 	display: none;
				// }
				// .t{
				// 	position: fixed;
				// 	box-sizing: border-box;
				// 	padding-right:40rpx;
				// 	top:44px;
				// 	z-index: 99;
				// }
				.center_center {
					color: #8b9aae;

					// 滚动
					.scroll_y {
						height: calc(100vh - 160rpx);
						width: 100%;
					}

					.center_item {
						width: 100%;
						height: 88rpx;
						display: flex;
						align-items: center;
						text-align: center;
						border-bottom: 1px solid #eee;

						view {
							flex: 1;
						}
					}
				}
			}
		}
	}
</style>
