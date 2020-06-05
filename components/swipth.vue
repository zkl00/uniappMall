<template>
	<view>
		<swiper indicator-dots='true' indicator-color='rgba(0, 0, 0, .3)' indicator-active-color="true" autoplay="true" circular="true">
			<swiper-item v-for="(item,index) in swartnum" :key="index" class="swirp">
				<image :src="item.image" mode="widthFix"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
export default{
	props:{
		swartnum:{
			type:Array
		}
	}
}
</script>

<style scoped>
	.swirp image{
		width: 100%;
	}
</style>
