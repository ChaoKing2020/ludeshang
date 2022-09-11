<template>
	<view class="">
		<view class="status_bar">
		</view>
		<!-- 这里是状态栏 -->
		<uni-nav-bar title="同分去向" backgroundColor='#b50e03' color='#fff461' left-text="返回" @clickLeft="clickBack" />
	<view class="content">
		<view class="form">
			<uni-forms :modelValue="formData" :rules="formRules" ref="form">
				<uni-forms-item required name="grades" label="文化分">
					<uni-easyinput type="text" placeholder="请输入高考总分" v-model="formData.grades" />
				</uni-forms-item>
				<uni-forms-item required name="firstsub" label="首选科目">
					<uni-data-checkbox :localdata="firstRange" v-model="formData.firstsub"></uni-data-checkbox>
				</uni-forms-item>
			</uni-forms>
			<button @click="submitForm" class="submit">查询</button>
		</view>
		<view class="Lists">
			<yx-list :schoolList="schoolLists"></yx-list>
		</view>
	</view>
	</view>
</template>

<script>
	import YxList from "../../components/YxList.vue"
	import {dataCl} from "../../util/datacl.js"
	export default {
		components:{
			YxList
		},
		data() {
			return {
				schoolLists:[],
				formData:{
					grades:"",
					firstsub:"",
				},
				firstRange: [{
					"value": "物理",
					"text": "物理"
				}, {
					"value": "历史",
					"text": "历史"
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
					grades: {
						rules: [{
							required: true,
							errorMessage: '请输入高考总分',
							trigger: 'bind'
						}]
					},
				}
			}
		},
		methods: {
		 submitForm(){
				this.$refs.form.validate( async (result, valid) => {
					// 如果表单验证出错就return
					if (result) return ;
					uni.showLoading({
						title: '加载中'
					});
					const res = await this.$myRequest({
					url: "/TongFen",
					data: {
						a: parseInt(this.formData.grades),
						b: this.formData.firstsub,
						c:0
						// a:600,
						// b:"物理"
						// b首选，c省份,d类型
					}
				});
				console.log(res)	
				dataCl(res.data.count)
				this.schoolLists=res.data.count
				uni.hideLoading();
				// console.log(res.data.count) 
				})
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
.content{
    box-sizing: border-box;
	height: 100%;
	background-color: $uni-bg-color-grey;
	.form{
		background-color: #FFFFFF;
		// height: 100rpx;
		width: 100%;
		box-sizing: border-box;
		padding: 30rpx;
		margin-bottom: 30rpx;
	}
	.Lists{
		background-color: #FFFFFF;
		width: 100%;
		// height: 100%;
	}
	.submit {
			background-color: $uni-red;
			color: $uni-pinkwhite;
		}
}
</style>
