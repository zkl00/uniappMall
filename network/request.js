// 封装请求方法
export default function request(confing){
	// 等待加载
			uni.showLoading({
				title:'加载中。。。'
			})
	return new Promise((reslove,reject)=>{
		uni.request({
		    url: ''+confing.url, //仅为示例，并非真实接口地址。
		    data: confing.data || '{}',
			method:confing.post || 'GET',
		    success: (res) => {
				uni.hideLoading()
		        reslove(res)
		    },
			fail(err) {
				console.log(err)
				uni.showToast({
					title:'接口正在维护',
					icon:'none',
					duration:4000
					
				})
			}
		})
	})
}