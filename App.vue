<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			if(!uni.getStorageSync('zhiyuanList')){
				uni.setStorageSync('zhiyuanList',[]);
			}
			if(uni.getStorageSync("user")){
				// console.log(11)
				uni.switchTab({
					url: './pages/index/index'
				})
			}
			
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			
		}
	}
</script>

<style>
	/*每个页面公共css */
		@import url("~@/static/font/iconfont.css");
		@import url("~@/static/fonts/iconfont.css");
		image{
			width: 100%;
			height: 100%;
		}
</style>


