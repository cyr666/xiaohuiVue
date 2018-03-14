<template>
	<div class = "indexLeft">
		<div class="SystemIndex-con">
			<img class = "index-home"src="../../../../static/images/indexhome_03.jpg"/>
			<p class = "SystemIndex-title">系统首页</p>
		</div>
		
		<ul class = "indexLeft-con">
			<li class = "systemIndex" :class = {currentStyle:isshow} @click = "handleIndex">系统首页</li>
			<li class = "accountsSet" :class = {currentStyle:!isshow} @click = "handleAccount">帐号设置</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				isshow:true				
			}
		},
		methods:{
//			handleTypeChange(e){
//				const isDomestic = e.target.getAttribute("SystemIndex")
//				this.isshow = isDomestic?true:false
//				this.$emit("change",this.isshow)
//				this.$router.push({path:''})
//			}
				handleIndex(){
					this.$router.push({path:"/sysindex/system"})
					this.isshow = true
				},
				handleAccount(){
					this.$router.push({path:"/sysindex/account"})
					this.isshow = false
				}
		}
	}
</script>

<style scoped>
	/*.indexLeft{
		width:260px;	
	}*/
	.SystemIndex-con{
		width:260px;
		height:70px;
		line-height:70px;
		font-size:16px;
	}
	.index-home{
		float:left;
		margin-left:73px;
		margin-top:22px;
	}
	.SystemIndex-title{
		float:left;
		color:#999;
		
	}
	.indexLeft-con li{
		width:100%;
		height:60px;
		line-height:60px;
		font-size:16px;
		text-align: center;
		cursor: pointer;
		list-style-type:disc;
		color:#a9a9a9
	}
	.indexLeft-con li:hover{
		color:rgba(26, 188, 156, 0.8)
	}
	.currentStyle{
		background:#de3039;
		color:#ddd0d4
	}
</style>