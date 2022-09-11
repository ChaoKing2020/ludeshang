<template>
	<view class="content">
	    <tab 
	        v-model="activeKey" 
	        :navData="scrollData"
	        @change="tabChange"
	        @tabClick="tabClick"
	    >
	        
	<!--        <scroll-view scroll-y slot="slot-1" style="overflow:auto;height:300rpx">
	            1
	        </scroll-view>
	        <scroll-view scroll-y slot="slot-2" style="overflow:auto;height:300rpx">
	            2
	        </scroll-view> -->
	       
	        <!-- AND -->
	        <view :slot="item.slot" v-for="(item,key) in scrollData" :key="key">
	            <scroll-view scroll-y height="400rpx">
	                第{{key+1}}页
	            </scroll-view>
	        </view>
	    </tab>
	</view>
</template>

<script>
	import tab from '../../components/Mark-Tab/Tab.vue';
	export default {
		components:{
			tab
		},
		data() {
			return {
				 activeKey:0,
				            scrollData:[
				                {
				                    label:'第1页',
				                    slot:'slot-1'
				                },
				                {
				                    label:'第2页',
				                    slot:'slot-2'
				                },
				                {
				                    label:'第3页',
				                    slot:'slot-3'
				                },
				            ]
			}
		},
		methods: {
			tabChange(e){
			            console.log(e);
			        },
			        tabClick(e){
			            console.log(e);
			        }
		}
	}
</script>

<style>

</style>
