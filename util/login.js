export function login(){
				let value = uni.getStorageSync("user")
				if(value){
					uni.navigateTo({
						url: '../index/index'
					})
				}else{
					uni.getUserProfile({
						desc: '登录', 
						success:res=>{
							console.log("getUserProfile:",res)
							uni.setStorageSync("user", res.userInfo)
							uni.login({
								provider: 'weixin',
								success: (res)=>{
									console.log(res)
									if(res.errMsg == 'login:ok'){
										let APPID = "wxe38fd0276d18c128"
										let secret = "5ebd63486cc45ef98e21bd0a4fc9bdd7"
										let code = res.code
										let url =
											'https://api.weixin.qq.com/sns/jscode2session?appid=' +
											APPID + '&secret=' + secret + '&js_code=' + code +
											'&grant_type=authorization_code';
								  uni.request({
								  	url: url,
									success:res=>{
										uni.setStorageSync("openid", res
											.data.openid)
										uni.setStorageSync("session_key",
											res.data.session_key)
										let openid = uni.getStorageSync(
											"openid")
											// console.log("login_openid:",openid)
										let name = uni.getStorageSync(
											"user").nickName
											uni.request({
												// url: "https://tcb-az0n56va9a968a-7dqn4e578ad16.service.tcloudbase.com/dbbase",
												url: "https://tcb-4xwmp6nz0f2af8-9dnpa6e65404d.service.tcloudbase.com/dbbase",
												data: {
													openid: openid,
													name: name
												},
												success: (res) => {
													console.log("成功666",res)
													uni.setStorageSync("isVIP", res.data.vip)
														uni.switchTab({
															url:'../index/index'
														})
												},
												fail: (err) => {
													// console.log("错误",err)
												}
											})
									}
								  })
									}
								}
							})
							
					 //    uni.switchTab({
						// url: '../index/index'
					 //     })		
						},
						fail: (err) => {
							console.log("错误",err)
						}
					})
				}
			}