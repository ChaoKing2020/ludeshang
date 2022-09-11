<template>
	<view class="">
		<view class="status_bar">
		</view>
		<!-- 这里是状态栏 -->
		<uni-nav-bar :title="titles" backgroundColor='#b50e03' color='#fff461' left-text="返回" @clickLeft="clickBack"/>
	<view class="content">
		<HM-filterDropdown :filterData="filterData" :defaultSelected='defaultSelected' :updateMenuName="true"
			@confirm="confirm"></HM-filterDropdown>
		<tab v-model="activeKey" :navData="scrollData" @change="tabChange" @tabClick="tabClick"
			:line='{color:"#f87869",width:"150rpx"}'
			:font="{defaultColor:'#333333',defaultSize:'28rpx',activeColor:'#f87869',activeSize:'28rpx'}"
			background='#fff' height='80rpx' :tabFix="{top:'216rpx'}">
		</tab>
		<scroll-view scroll-y="true" class="scroll_y" @scrolltolower='ReachBottom'>
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
							<text>院校代码</text>
							<text>{{item.A}}</text>
							<text>{{item.H}}</text>
							<text>-{{item.I}}</text>
							<!-- <text>{{item.D}}</text> -->
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
									<!-- <text class="zy">{{i[0]}}</text> -->
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
	import tab from '../../components/Mark-Tab/Tab.vue';
	import data from '@/common/data.js'; //筛选菜单数据
	import {formatDate} from'../../util/formatDate.js'
	export default {
		components: {
			tab
		},
		data() {
			return {
				titles:'',
				user:null,
				isVIP:'',
				listnumber:{},
				types:'',
				options:{},
				toTop: 0,
				bottom: false,
				nowIndex: 0,
				color: 0,
				defaultSelected: [],
				changeDropDown: false,
				list: [],
				itemChecked: false,
				Bao: [1],
				Chong: [],
				Wen: [],
				viewData: [],
				page: 1,
				activeKey: 0,
				scrollData: [{
						label: '可冲击',
						slot: 'slot-1'
					},
					{
						label: '较稳妥',
						slot: 'slot-2'
					},
					{
						label: '可保底',
						slot: 'slot-3'
					},
				],
				// 下拉筛选数据
				filterData: []
			}
		},
		onShow() {
			if(this.options.vip==1){
				this.titles='VIP智能填报'
			}else{
				this.titles='志愿模拟填报'
			}
		},
		onLoad(option) {
		this.isVIP=uni.getStorageSync("isVIP")
			this.user=uni.getStorageSync("user")
			// this.getList(0)
			// 传入的数据
			const {
				first,
				second1,
				second2,
				grades,
				artGrades,
				types,
			} = option
			this.options=option
			// console.log(option)
			this.types=types
			if(types=='普通类'){
				this.options.schooltype=this.options.schooltype?[this.options.schooltype]:["不限"],
				this.options.place=this.options.place?[this.options.place]:["不限"],
				
				console.log(this.options.schooltype)
				// this.options.place=[this.options.place]
				console.log(first, second1, second2, grades,2,this.isVIP,this.options.place,this.options.schooltype)
				this.getList(first, second1, second2, grades,2,this.isVIP,this.options.place,this.options.schooltype)
				// console.log(this.listnumber)
				// uni.setStorageSync('listInform', this.listnumber);
			}else{
				this.options.place=this.options.place?[this.options.place]:["不限"],
				this.getArtList(first, grades,types,artGrades,2,this.isVIP,this.options.place)
				// uni.setStorageSync('listInform', this.listnumber);
			}
			this.filterData = data;
		},
		methods: {
			tb(data,item,index1){
			// console.log(new Date().Format("yyyy-MM-dd HH:mm:ss"))
				uni.showModal({
					title: '提示',
					content: '是否加入志愿表',
					success: function (res) {
						if (res.confirm) {
							// console.log('用户点击确定');
							// console.log(data,item,index1)
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
							// console.log(zhiyuanList)
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
			// 普通类列表
	async getList(first, second1, second2, grades,time,vip,shenfen = ['不限'], leixing = ['不限']) {
				console.log(first,second1,second2,grades,"省份："+shenfen,"类型："+leixing,"vip:",vip)
				// 发送请求当前院校的数据
				const res = await this.$myRequest({
					url: "/Ordinary",
					method: 'get',
					data: {
						a: parseInt(grades),
						b: first,
						c: shenfen,
						d: leixing,
						vips:vip,
						openid:uni.getStorageSync('oid')
						// b首选，c省份,d类型
					}
				})
				uni.setStorageSync('count',res.data.count)
				console.log(res)
				if(res.data.count==0){
					uni.showModal({
						title: '提示',
						content: '每天只能修改一次成绩，今日已达上线',
						confirmColor: "#b50e03",
						cancelText: '取消',
						confirmText: '确定',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.switchTab({
									url: '../index/index'
								})
					
							} else if (res.cancel) {
								uni.switchTab({
									url: '../index/index'
								})
							}
						}
					});
				}else{
					uni.setStorageSync('fenshu', this.options.grades);
					uni.setStorageSync('artfenshu', this.options.artGrades);
					if(time==2){
						this.listnumber.num=res.data.Bao.length+res.data.Chong.length+res.data.Wen.length
						this.listnumber.Bao=res.data.Bao.length
						this.listnumber.Chong=res.data.Chong.length
						this.listnumber.Wen=res.data.Wen.length
						this.listnumber.flag=res.data.flag
						this.listnumber.TWgrade= res.data.grade
						uni.setStorageSync('listInform', this.listnumber);
						uni.setStorageSync('ListBao', res.data.Bao);
						uni.setStorageSync('ListChong', res.data.Chong);
						uni.setStorageSync('ListWen', res.data.Wen);
					}
					this.Bao = this.getNewArray(res.data.Bao, 10) || []
					this.Chong = this.getNewArray(res.data.Chong, 10) || []
					this.Wen = this.getNewArray(res.data.Wen, 10) || []
					this.viewDataAdd(this.nowIndex)
				}
				
			},
			// 艺术类列表
		async getArtList(first,grades,types,artGrades,time,vip,shenfen = ['不限']){
				console.log(parseInt(grades),first,shenfen,types,parseInt(artGrades),"vip:",vip)
				const res = await this.$myRequest({
					url: "/art",
					data: {
						a: parseInt(grades),
						b: first,
						c: shenfen,
						e:types,
						f:parseInt(artGrades),
						vips:vip,
						openid:uni.getStorageSync('oid')
					},
				})
				console.log(res)
				uni.setStorageSync('count',res.data.count)
				if(res.data.count==0){
					uni.showModal({
						title: '提示',
						content: '每天只能修改一次成绩，今日已达上线',
						confirmColor: "#b50e03",
						cancelText: '取消',
						confirmText: '确定',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.switchTab({
									url: '../index/index'
								})
					
							} else if (res.cancel) {
								uni.switchTab({
									url: '../index/index'
								})
							}
						}
					});
				}else{
					// uni.setStorageSync('Grades', this.options);
					uni.setStorageSync('fenshu', this.options.grades);
					uni.setStorageSync('artfenshu', this.options.artGrades);
					if(time==2){
						this.listnumber.num=res.data.Bao.length+res.data.Chong.length+res.data.Wen.length
					this.listnumber.Bao=res.data.Bao.length
					this.listnumber.Chong=res.data.Chong.length
					this.listnumber.Wen=res.data.Wen.length
					this.listnumber.flag=res.data.flag
					this.listnumber.TWgrade= res.data.grade||0
					uni.setStorageSync('listInform', this.listnumber);
					uni.setStorageSync('ListBao', res.data.Bao);
					uni.setStorageSync('ListChong', res.data.Chong);
					uni.setStorageSync('ListWen', res.data.Wen);
					}
					this.Bao = this.getNewArray(res.data.Bao, 10) || []
					this.Chong = this.getNewArray(res.data.Chong, 10) || []
					this.Wen = this.getNewArray(res.data.Wen, 10) || []
					this.viewDataAdd(this.nowIndex)
				}
			},
			// 触底加载
			ReachBottom() {
				// 因为第一次触底直接return了,这时候page==0  this.page*10=0
				// console.log(this.viewData.length, this.page * 10)
				if (this.viewData.length < this.page * 10) {
					return this.bottom = true
				}
				this.page++;
				this.viewDataAdd(this.nowIndex)
			},
			viewDataAdd(index = 0) {
				this.color = index
				if (index == 0) {
					if (this.viewData == []) {
						
						this.viewData = this.Chong[0] || []
					} else {
						// console.log(this.Chong)
						this.viewData = this.viewData.concat(this.Chong[this.page - 1])
					}
				} else if (index == 1) {
					// console.log(1)
					if (this.viewData == []) this.viewData = this.Wen[0] || []
					// console.log(this.Wen)
					this.viewData = [...this.viewData, ...this.Wen[this.page - 1]]
				} else if (index == 2) {
					// console.log(2)
					if (this.viewData == []) this.viewData = this.Bao[0] || []
					// console.log(this.Bao)
					this.viewData = [...this.viewData, ...this.Bao[this.page - 1]]
					// this.viewData=[...this.viewData,...this.Bao[this.page]]
				}
				this.viewData.forEach(item => {
					if (typeof item.E == 'string') {
						item.E = item.E.split('/')
						item.F = item.F.split(';')
					} else {
						return
					}
				})
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
			// 下拉可选专业,获取专业数据
			dropDown(item) {
				// console.log(item)
				item.L = !item.L
				for (let i = 0; i < item.F.length; i++) {
					item.F[i] = item.F[i].split('/')
				}
				// console.log(item.F)
			},
			// 点击填报专业,并记录是否填报属性，使用foreach循环，向专业数组里追加一个checked属性，
			clicksubject() {

			},
			tabChange(e) {
				this.viewData = []
				this.page = 1
				this.nowIndex = e.index
				this.viewDataAdd(e.index)
			},
			tabClick(e) {
			},
			// 选择学校类型和地区,用户点击了确定
			confirm(e) {
				if(uni.getStorageSync("user")&&uni.getStorageSync('isVIP')==1){
					const {
					first,
					second1,
					second2,
					grades,
					artGrades,
					types
				} = this.options
				let a=e.value[0][0][0]==undefined?['不限']:e.value[0][0]
				let b=e.value[1][0][0]==undefined?['不限']:e.value[1][0]
				this.viewData = []
				// console.log(first, second1, second2, grades,a,b)
				if(types=='普通类'){
					this.getList(first, second1, second2, grades,1,this.isVIP,a,b)
				}else{
					this.getArtList(first, grades,types,artGrades,1,this.isVIP,a)
				}
				}else{
					uni.showModal({
						title: '提示',
						content: '此项服务需要购买志愿卡',
						confirmColor: "#b50e03",
						cancelText: '取消',
						confirmText: '去购买',
						success: function(res) {
							if (res.confirm) {
								// console.log('用户点击确定');
								uni.navigateTo({
									url: '../pay/pay'
								})
							} else if (res.cancel) {
								// console.log('用户点击取消');
							}
						}
					});
				}
			},
			// 点击了返回
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

		// 滚动
		.scroll_y {
			margin-top: 160rpx;
			height: calc(100vh - 160rpx);
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
