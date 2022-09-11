// const baseURL = 'https://tcb-impgvfqw923ce4-5ddx91c58511f.service.tcloudbase.com'
const baseURL = 'https://tcb-4xwmp6nz0f2af8-9dnpa6e65404d.service.tcloudbase.com'
// 暴露一个函数， 这个函数返回的值是一个Promise,在promiase里发送网络请求
export const myRequest = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url:baseURL + options.url,
			// 不穿方法默认为get方法
			method: options.method || 'GET',
			data: options.data,
			success: (res) => {
				// console.log(res)
				if (res.statusCode!=200) {
					return uni.showToast({
						title: "获取数据失败"
					})
				}
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					title: '获取数据失败'
				})
				reject(err)
			}
		})
	})
}
