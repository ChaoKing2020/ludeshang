<template>
	<view class="">
		<view class="status_bar">
		</view>
		<!-- 这里是状态栏 -->
		<uni-nav-bar title="我的成绩" backgroundColor='#b50e03' color='#fff461' left-text="返回" @clickLeft="clickBack" />
		<view class="content">
			<view class="title">
				<view class="">
					模拟填报高考志愿
				</view>
				<text>输入考试成绩，为您推荐</text>
			</view>
			<uni-forms :modelValue="formData" ref="form" :rules="formRules">
				<uni-forms-item label="高考省份">
					<uni-easyinput type="text" placeholder="请输入高考省份" v-model="formData.address" disabled />
				</uni-forms-item>
				<uni-forms-item label="专业类别" name="zytypes" required>
					<uni-data-picker :localdata="items" popup-title="请选择专业类别" @change="onchange"
						@nodeclick="onnodeclick" v-model="formData.types"></uni-data-picker>
				</uni-forms-item>
				<uni-forms-item required name="firstsub" label="首选科目">
					<uni-data-checkbox :localdata="firstRange" v-model="formData.firstsub"></uni-data-checkbox>
				</uni-forms-item>
				<uni-forms-item required name="secondsub" label="再选科目">
					<uni-data-checkbox multiple :localdata="secondRange" v-model="formData.secondsub" max="2">
					</uni-data-checkbox>
				</uni-forms-item>
				<view v-if="!istype">
					<uni-forms-item required name="art" label="专业分">
						<uni-easyinput type="text" placeholder="请输入专业分" v-model="formData.artGrades" />
					</uni-forms-item>
					<uni-forms-item required name="artgrades" label="文化分">
						<uni-easyinput type="text" placeholder="请输入文化分" v-model="formData.grades" />
					</uni-forms-item>
				</view>
				<view v-else>
					<uni-forms-item required name="grades" label="高考总分">
						<uni-easyinput type="text" placeholder="请输入高考总分" v-model="formData.grades" />
					</uni-forms-item>
				</view>
				<uni-forms-item label="全省排名">
					<uni-easyinput type="text" placeholder="请输入全省排名" v-model="formData.ranking" />
				</uni-forms-item>
				<view v-if="isVIP">
					<uni-forms-item  name="place" label="心仪地区">
						<uni-data-picker :localdata="place" popup-title="请选择心仪地区" @change="onchangeplace"
							 v-model="formData.place"></uni-data-picker>
					</uni-forms-item>
					<uni-forms-item  name="schooltype" label="院校类型" v-show="istype">
						<uni-data-picker :localdata="schooltype" popup-title="请选择院校类型" @change="onchangetype"
							 v-model="formData.schooltype"></uni-data-picker>
					</uni-forms-item>
				</view>
			</uni-forms>
			<button @click="submitForm" class="submit">提交</button>
			<text class="zhushi">注：1、加*为必填项；
        2、2022年高考分数未公布前，系统会按照历年提档线预估推荐；普通用户每天可修改1次成绩，而VIP用户可以无限次修改成绩；
        3、2022年高考成绩公布之日起，仅可修改1次成绩（所有用户），系统将按往年的同位分、个性化的选项设置进行精准推荐（仅限VIP用户）；
        4、对于艺术类考生，如参加了校考，请确保校考的专业组志愿填在第1顺序位，后面的平行组志愿可按系统推荐的顺序填报</text>
		</view>
	</view>
</template>

<script>
	import UniStatusBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	export default {
		components: {
			UniStatusBar
		},
		onReady() {
		},
		data() {
			return {
				isVIP:'',
				istype: true,
				place:[{
						text: "北京",
						value: "北京市"
					},
					{
						text: "上海",
						value: "上海市"
					},{
						text: "浙江",
						value: "浙江省"
					},{
						text: "安徽",
						value: "安徽省"
					},{
						text: "江苏",
						value: "江苏省"
					},{
						text: "湖南",
						value: "湖南省"
					},{
						text: "广东",
						value: "广东省"
					},{
						text: "湖北",
						value: "湖北省"
					},{
						text: "天津",
						value: "天津市"
					},{
						text: "陕西",
						value: "陕西省"
					},{
						text: "福建",
						value: "福建省"
					},{
						text: "四川",
						value: "四川省"
					},{
						text: "黑龙江",
						value: "黑龙江省"
					},{
						text: "山东",
						value: "山东省"
					},{
						text: "吉林",
						value: "吉林省"
					},{
						text: "重庆",
						value: "重庆市"
					},{
						text: "辽宁",
						value: "辽宁省"
					},{
						text: "甘肃",
						value: "甘肃省"
					},{
						text: "江西",
						value: "江西省"
					},{
						text: "河北",
						value: "河北省"
					},{
						text: "云南",
						value: "云南省"
					},{
						text: "河南",
						value: "河南省"
					},{
						text: "广西",
						value: "广西省"
					},{
						text: "山西",
						value: "山西省"
					},{
						text: "贵州",
						value: "贵州省"
					},{
						text: "海南",
						value: "海南省"
					},{
						text: "内蒙古",
						value: "内蒙古"
					},{
						text: "宁夏",
						value: "宁夏省"
					},{
						text: "青海",
						value: "青海省"
					},{
						text: "新疆",
						value: "新疆维吾尔自治区"
					},{
						text: "西藏",
						value: "西藏省"
					}],
					schooltype:[{
						text: "综合",
						value: "综合"
					},{
						text: "师范",
						value: "师范"
					},{
						text: "财经",
						value: "财经"
					},
					{
						text: "理工",
						value: "理工"
					},	{
						text: "语言",
						value: "语言"
					},{
						text: "政法",
						value: "政法"
					},{
						text: "医药",
						value: "医药"
					},
					{
						text: "农业",
						value: "农业"
					},
					{
						text: "民族",
						value: "民族"
					},
					{
						text: "林业",
						value: "林业"
					},
					{
						text: "艺术",
						value: "艺术"
					},
					{
						text: "体育",
						value: "体育"
					},
					{
						text: "文法",
						value: "文法"
					}],
				items: [{
						text: "普通类",
						value: "普通类"
					},
					{
						text: "音乐类",
						value: "音乐"
					},
					{
						text: "美术类",
						value: "美术"
					}, {
						text: "舞蹈类",
						value: "舞蹈"
					}, {
						text: "表演类（服装表演）",
						value: "服饰表演"
					}, {
						text: "表演类（戏剧表演）",
						value: "戏剧表演"
					},
					{
						text: "书法艺术与书法教育类",
						value: "书法艺术"
					},{
						text: "播音与主持艺术类",
						value: "播音"
					},{
						text: "摄影摄像类",
						value: "摄影摄像类"
					},
					{
						text: "编导类",
						value: "编导"
					}
				],
				// 表单
				formData: {
					address: '湖南',
					// 专业类别
					types: '',
					firstsub: '',
					secondsub: [],
					// 高考成绩
					grades: '',
					ranking: '',
					// 个性化选项
					gxhtype: '',
					// 专业艺术分
					artGrades: '',
					time: '',
					place:'',
					schooltype:''
				},
				firstRange: [{
					"value": "物理",
					"text": "物理"
				}, {
					"value": "历史",
					"text": "历史"
				}],
				signRange: [{
					"value": 0,
					"text": '院校优先'
				}, {
					"value": 1,
					"text": "专业优先"
				}, {
					"value": 2,
					"text": "偏好优先"
				}],
				secondRange: [{
					"value": "化学",
					"text": "化学"
				}, {
					"value": "生物",
					"text": "生物"
				}, {
					"value": "政治",
					"text": "政治"
				}, {
					"value": "地理",
					"text": "地理"
				}],
				gxhtype: [{
					"value": 0,
					"text": "院校优先"
				}, {
					"value": 1,
					"text": "专业优先"
				}, {
					"value": 2,
					"text": "地域优先"
				}],
				// 表单验证
				formRules: {
					firstsub: {
						rules: [{
							required: true,
							errorMessage: '请选择首选科目',
							trigger: 'bind'
						}]
					},
					secondsub: {
						rules: [{
							required: true,
							errorMessage: '请选择再选科目',
							trigger: 'bind'
						}]
					},
					grades: {
						rules: [{
							required: true,
							errorMessage: '请输入高考总分',
							trigger: 'bind'
						}]
					},
					art: {
						rules: [{
							required: true,
							errorMessage: '请输入专业总分',
							trigger: 'bind'
						}]
					},
					artgrades: {
						rules: [{
							required: true,
							errorMessage: '请输入文化总分',
							trigger: 'bind'
						}]
					},
					zytypes: {
						rules: [{
							required: true,
							errorMessage: '请选择专业类别',
							// trigger: 'bind'
						}
				
					]
					}
				}
			}
	},
	onLoad() {
		this.isVIP=uni.getStorageSync("isVIP")
		if(uni.getStorageSync("Grades")){
			this.formData= uni.getStorageSync("Grades")
		}else{
			
		}
		 if(uni.getStorageSync("Grades").types!="普通类"){
			 this.istype= false
		 }
		},
		methods: {
			onchange(e) {
				const value = e.detail.value
				console.log(value)
				if (!value[0].value) {
					this.istype = true
					this.formData.artGrades=''
						this.formData.grades=''
				} else if (value[0].value != '普通类') {
					this.istype = false
					this.formData.artGrades=''
						this.formData.grades=''
				} else {
					this.istype = true
					this.formData.artGrades=''
						this.formData.grades=''
				}
				// console.log(this.istype)
			},
			onchangeplace(e){
				this.formData.place=[e.detail.value[0].value]
			},
			onchangetype(e){
				this.formData.schooltype=[e.detail.value[0].value]
			},
			submitForm() {
				const {
					firstsub,
					secondsub,
					grades,
					artGrades,
					types,
					place,
					schooltype
				} = this.formData
				this.$refs.form.validate((result, valid) => {
					// console.log(valid)
					// 如果表单验证出错就return
					if (result) return;
					// 否则发起请求
					if (types == '普通类') {
						uni.navigateTo({
							url: '../list/list?first=' + firstsub + '&second1=' + secondsub[0] +
								'&second2=' + secondsub[1] + '&grades=' + grades + '&types=' + types+'&vip='+uni.getStorageSync("isVIP")+'&place='+ place+'&schooltype=' + schooltype
						})
					} else {
						uni.navigateTo({
							url: '../list/list?first=' + firstsub + '&second1=' + secondsub[0] +
								'&second2=' + secondsub[1] + '&grades=' + grades + '&artGrades=' +
								artGrades + '&types=' + types+'&vip='+uni.getStorageSync("isVIP")+'&place='+ place
						})
					}
				})
				try {
					this.formData.time = new Date()
					uni.setStorageSync('Grades', this.formData);
				} catch (e) {
					// error
					// console.log('保存失败')
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
		box-sizing: border-box;
		padding: 40rpx 40rpx;
		height: 100%;
		font-size: 36rpx;

		.title {
			margin: 30rpx 0;
			font-size: 60rpx;
			font-weight: 600;
			line-height: 56rpx;

			text {
				color: #afafaf;
				font-size: $uni-font-size-sm;
				font-weight: 400;
			}
		}

		.submit {
			background-color: $uni-red;
			color: $uni-pinkwhite;
		}

		.zhushi {
			color: #afafaf;
			font-size: $uni-font-size-sm;
			font-weight: 400;
			color: #b50e03;
		}
	}
</style>
