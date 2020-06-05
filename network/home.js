
// 导入请求
import request from './request.js'

// 轮播图数据和抢购数据
export const swartData = ()=>request({
	url:'/home/multidata',
	method:"get"
})

export const getHOmeGoodes = (type,page)=>request({
    url:"/home/data",
    data:{
        type,
        page
    }
})
