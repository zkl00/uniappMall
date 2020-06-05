<template>
	<view class="content_box">
		<!-- 轮播图 -->
		<view class="swirth">
			<swipth :swartnum="banner"></swipth>
		</view>
		<!-- 推荐数据 -->
		<view class="trjian_warp">
			<view class="warp_box" v-for="(item,index) in recommend" :key="index">
				<image :src="item.image" mode="widthFix"></image>
				<view>{{item.title}}</view>
			</view>
		</view>
		<!-- 本周流行 -->
		<view class="Recommended_warp">
			<image src="../../static/home/recommend_bg.jpg" mode="widthFix"></image>
		</view>
		<!-- 流行 新款 精选 -->
		<view class="active_warp" ref='scrollots'>
			<view class="active_nav" v-for="(item,index) in listMall" :key="item.id">
				<view :class="index == actives ? 'active_color' : '' " @click="mynavActive(item)">{{item.title}}</view>
			</view>
		</view>
		<!-- 内容部分 -->
		<view class="content_view">
			<scroll-view class="scroll-Y" scroll-y="true">
				<view class="recommend_boxs">
					<view class="recomm_newbox" v-for="item in gooods[pop].list" :key="item.iid">
						<image :src="item.show.img" ></image>
						<view class="title">{{item.title}}</view>
						<view class="newimgLogo">
							<view class="price">
								￥{{item.price}}
							</view>
							<view class="imgs">
								<image src="../../static/common/collect.svg" mode="widthFix"></image>
							<text>	{{item.cfav}}</text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 回到顶部的图标 -->
		<view class="topo" v-show="ishide">
			<image src="../../static/common/top.png" mode="widthFix" @click="myClick"></image>
		</view>
	</view>
</template>

<script>
	import {
		swartData,
		getHOmeGoodes
	} from '../../network/home.js'
	import swipth from '../../components/swipth.vue'
	export default {
		components:{
			swipth
		},
		data() {
			return {
				banner: [],//轮播图
				recommend:[],//推荐数据
				contentList:[],//精选 流行  新款
				listMall:[
					{
						type:'pop',
						id:0,
						page:1,
						title:'流行'
					},
					{
						type:'new',
						id:1,
						title:'新款'
					},
					{
						type:'sell',
						id:2,
						title:'精选'
					}
				],
				actives:0,
				pop:'pop',
				gooods:{
					'pop':{page:0,list:[]},
					'new':{page:0,list:[]},
					'sell':{page:0,list:[]}
				},
				ishide:false,//回到顶部的图标
				heightHide:0,
			}
		},
		onLoad() {
			this.swartDataList()
			// 获取精选数。。。
			this.getHOmeGoodesData('pop')
			this.getHOmeGoodesData('new')
			this.getHOmeGoodesData('sell')
		},
		onReady() {
			// console.log('11')
			// console.log(this.$refs)
			  let info = uni.createSelectorQuery().select(".active_warp");
			  　info.boundingClientRect(function(data) { //data - 各种参数
			 　　　  　console.log(data.offsetTop)  // 获取元素宽度
						this.heightHide = parseInt(data.offsetTop)
			 　　    }).exec()
		},
		// 下拉加载更多
		onReachBottom(){
			this.getHOmeGoodesData(this.pop)
		},
		//监听滚动的事件
		onPageScroll(e){
			// 判断是否隐藏图标
			if(parseInt(e.scrollTop)>this.heightHide){
				// console.log('111')
			}
			// 判断是否显示回到顶部图标
			if(parseInt(e.scrollTop)>= 2000){
				this.ishide = true
			}else{
				this.ishide = false
			}
		},
		methods: {
			async swartDataList() {
				const {
					data
				} = await swartData()

				let {
					list
				} = data.data.banner
				this.banner = list//轮播图数据
				let recommend = data.data.recommend.list
				this.recommend = recommend
			},
			//切换nav
			mynavActive(e){
				this.actives  = e.id
				this.pop = e.type
			},
			// 请求新款数据和流行数据和精选数据
		  async	getHOmeGoodesData(type){
				let page =  this.gooods[type].page+1 
				const {data} = await getHOmeGoodes(type,page)
				
				let {list} = data.data
				// console.log(list)
				this.gooods[type].page += 1
				this.gooods[type].list.push(...list)
			},
			myClick(){
				uni.pageScrollTo({
					scrollTop:0,
					duration:3000
				})
			},
		}
	}
</script>

<style lang="less">
	.scroll-Y{
		width: 100%;
		// height: 800upx;
	}
	.Recommended_warp>image{
		width: 100%;
	}
.trjian_warp{
	display: flex;
	justify-content: space-between;
	text-align: center;
	padding: 20upx 20upx 30upx 20upx;
	border-bottom: 20upx solid #eeee;
	.warp_box image {
		width:150upx;
	}
	.warp_box>view{
		font-size: 28upx;
	}
}

.active_warp{
	display: flex;
	justify-content: space-around;
	.active_color{
		padding-bottom: 10upx;
		border-bottom:5upx solid red ;
	}
	
}
.content_view{
	height: 100%;
}
.recommend_boxs{
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 10upx 20upx;
	.recomm_newbox{
		width: 49%;
	}
	
	.recomm_newbox image{
		width: 100%;
	}
	.recomm_newbox .title{
		width: 80%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 28upx;
		padding-top:10upx;
		
	}
	.newimgLogo{
		width: 100%;
		display: flex;
		align-items: center;
		.price{
			font-size: 28upx;
			color: #ff5777;
			padding: 11upx 20upx;
		}
		.imgs{
			display: flex;
			height: 50upx;
			align-items: center;
		}
		.imgs image{
			width: 35upx;
			// vertical-align: middle;
		}
		.imgs text{
			font-size: 28upx;
			margin-top: 5upx;
			
		}
	}
}
.topo{
	position:fixed;
	// top: 0;
	right: 30upx;
	bottom: 20upx;
	image{
		width: 80upx;
		height: 80upx;
	}
}
</style>
