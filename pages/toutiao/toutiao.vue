<template>
	
			<!-- <view class="status_bar">
			</view> -->
			<!-- 这里是状态栏 -->
			<!-- <uni-nav-bar title="高考头条排名" backgroundColor='#b50e03' color='#fff461' left-text="返回" @clickLeft="clickBack"/> -->
			<!-- <view class="content">
			</view> -->
			 <web-view :src="url"></web-view>
	
</template>

<script>
	export default {
		data() {
			return {
				url:''
			}
		},
		onLoad(option) {
			// console.log(option)
			this.changeUrl(option.type)
		},
		methods: {
			changeUrl(type){
				if(type==0){
					this.url='https://mp.weixin.qq.com/s/4TZrcNVz69CHK9aBmNNx8w'
				}else if(type==1){
					this.url="https://mp.weixin.qq.com/s/fPTCeLV_74fpIjQvDCbtoA"
				
				}else if(type==2){
					this.url='https://mp.weixin.qq.com/s/4lO6ypqwHhuCAdUDdcCC4g'
				}else if(type==3){
					this.url='https://mp.weixin.qq.com/s/IVkXaQPQozyIVx_8VNluEw'
				}else if(type==4){
					this.url='https://mp.weixin.qq.com/s/G9LUXusINJbJlol40eApWA'
				}else if(type==5){
						this.url='https://mp.weixin.qq.com/s?__biz=Mzg4MDcwMjQ1MA==&mid=2247484255&idx=1&sn=8d7e0b67ff9e92a52fd45679e67ad930&chksm=cf7065c2f807ecd44eae6c72a3dfe67aa74deceee9f513ace8c31b04f27e543c833f00bf0896#rd'
				}else if(type==6){
					this.url="https://mp.weixin.qq.com/s?__biz=Mzg4MDcwMjQ1MA==&mid=2247483807&idx=1&sn=080bddc412d93dd1be186e9e25e3c2e4&chksm=cf706702f807ee14f16450f110eb2db603cabdd9ccd2faa44b97a6864eef233ff0a94a4e8419#rd"
				}else if(type==7){
					this.url="https://mp.weixin.qq.com/s/nmfO9qj3Ru_flygP87tTIQ"
				}else if(type==8){
					this.url="https://mp.weixin.qq.com/s/fOH3D4adir1DUeleEOREXQ"
				}else if(type==9){
					this.url="https://mp.weixin.qq.com/s/Q6VO-WOGv6yfqgCYvYuXTQ"
				}else if(type==10){
					this.url="https://mp.weixin.qq.com/s/ur041LSKWtLEFXhWOGSFXA"
				}else if(type==11){
					this.url="https://mp.weixin.qq.com/s/UYV5z9gJdWXqwDN270gt_A"
				}else if(type==12){
					this.url="https://mp.weixin.qq.com/s/GdDjm0rj6oIjhSn6BEIzgg"
				}else if(type==13){
					this.url="https://mp.weixin.qq.com/s?__biz=Mzg4MDcwMjQ1MA==&mid=2247484238&idx=1&sn=96d9bee64e538d5204d6d2eea5151bc5&chksm=cf7065d3f807ecc55d8005879d304e0a10ad82f2665f502355a9ef7890c6b6cf406418054ab7#rd"
				}else if(type==14){
					this.url="https://mp.weixin.qq.com/s?__biz=Mzg4MDcwMjQ1MA==&mid=2247484336&idx=1&sn=6e6a231fcb9d1fbb5daea48565b31d56&chksm=cf70652df807ec3b25bebc6f85d4c4b26936f96ef8b24d5879c1f5642a4e9a6bb6987b95f469#rd"
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
// .status_bar {
// 		height: calc(var(--status-bar-height));
// 		width: 100%;
// 		background-color: #b50e03;
// 	}
	.content{
		box-sizing: border-box;
		// overflow: hidden;
		height: 100%;
		width: 100%;

			image{
				width: 100%;
				height: 100%;
			}
		}
</style>
