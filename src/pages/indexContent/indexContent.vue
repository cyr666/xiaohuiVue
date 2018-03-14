<template>
	<div>
		<indexLeft class = "left" :style = '{height:height}'/>
		<!--<systemIndex v-if = "isshow" class = "right-systemIndex"/>
		<accountsSet v-else :accountSet = 'accountSet'/>-->
		<router-view class = "indexRight" v-on:listenEvent="handlegetHeight"></router-view>
	</div>
</template>

<script>
	import IndexLeft from "./components/indexLeft";
	export default{
		data(){
			return{
				//isshow:true,
				height:''
				//accountSet:[]
				
			}
		},
		mounted(){
		},
		components:{
			"indexLeft":IndexLeft
//			"systemIndex":SystemIndex,
//			"accountsSet":AccountsSet
		},
		methods: {
			handlegetHeight(height){
				this.height = height;
				console.log(this.height)
			}
		  
		  }
	}
</script>

<style scoped>
	.left{
		width:18%;
		background:#1e201f;
		float:left;
		margin-top:60px;
	}
	.indexRight{
		float:left;
		height:100%;
		width:80%;
		z-index: 999;
		margin-top:60px;
	}
</style>