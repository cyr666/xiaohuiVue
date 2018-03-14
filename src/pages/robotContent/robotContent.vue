<template>
	<div>
		<robotLeft class = "robotleft" />
		<router-view class = "robotRight" ></router-view>
	</div>
</template>

<script>
	import RobotLeft from "./components/robotLeft";
//	import IndexRight from "./components/indexRight";
	export default{
		components:{
			"robotLeft":RobotLeft
		},
		data(){
			return{
				height:''
			}
		},
		mounted(){
			
		},
		methods: {
//			handlegetHeight(height){
//				this.height = height;
//			}
		  
		 }
	}
</script>

<style scoped>
	.robotleft{
		width:18%;
		background:#1e201f;
		float:left;
		margin-top:60px;
		height:580px;
	}
	.robotRight{
		float:left;
		margin-top:60px;
		width:82%;
		height:580px;
		overflow: auto;
		z-index: 999;
	}
</style>