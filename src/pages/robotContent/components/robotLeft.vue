<template>
	<div class = "robotLeft">
		<div class = "robotTitle-con">
			<img class = "robot-img"src="../../../../static/images/robot_03.jpg" alt="" />
			<p class = "robotLeft-title">机器人管理</p>
		</div>
		<ul class = "robotLeft-con">
			<li v-for="(item,index) in list"  @click="tab(index)">
   				<router-link :to="item.link" ><span class = "title" :class = {listStyle:item.show}>{{item.tab}}</span></router-link>
   			</li>
		</ul>
	</div>
</template>

<script scoped>
	export default {
		data(){
			return {
				list:[
			        {"tab":"基础设置","show":false,"link":"/robot/baseset"},
			        {"tab":"常见问题","show":false,"link":"/robot/question"},
			        {"tab":"求撩技能","show":false,"link":"/robot/skill"},
			        {"tab":"推荐管理","show":false,"link":"/robot/recommend"},
			        {"tab":"知识库管理","show":false,"link":"/robot/kbm"},
			        {"tab":"解答管理","show":false,"link":"/robot/solutionset"}
		        ]
			}
		},
		methods:{
			tab(index){
				for(var i=0;i<this.list.length;i++){
		            this.list[i].show=false;
		            if(i==index){
		                this.list[index].show=true;
		            }
		        }
			}
		},
		mounted(){
		  	console.log(this.$route.path)
		  	if(this.$route.path==='/robot/baseset'){
		  		this.list[0].show=true;
		  	}if(this.$route.path==='/robot/question'){
		  		this.list[1].show=true;
		  	}if(this.$route.path==='/robot/skill'){
		  		this.list[2].show=true;
		  	}if(this.$route.path==='/robot/recommend'){
		  		this.list[3].show=true;
		  	}if(this.$route.path==='/robot/kbm'){
		  		this.list[4].show=true;
		  	}if(this.$route.path==='/robot/solutionset'){
		  		this.list[5].show=true;
		  	}
		}
	}
</script>

<style scoped>
	.robotLeft{
		
	}
	.robotTitle-con{
		width:100%;
		height:60px;
		line-height:60px;
		font-size:16px;
		border-bottom:1px solid #313232;
	}
	.robot-img{
		width: 11%;
    	height: 37%;
		float:left;
		margin-left: 22%;
    	margin-top: 9%;
	}
	.robotLeft-title{
		float:left;
		color:rgba(255,255,255,0.5);
		margin-left: 5px;
		font-size:18px;
		line-height: 70px;
	}
	.robotLeft-con li{
		width:100%;
		height:60px;
		line-height:60px;
		font-size:16px;
		text-align: center;
		cursor: pointer;
		border-bottom:1px solid #313232;
	}
	.robotLeft-con li:hover{
		color:rgba(26, 188, 156, 0.8)
	}
	.title{
		display:inline-block;
		width:100%;
		height:60px;
		line-height:60px;
		text-align: center;
		color:#8d8d8d;
	}
	.listStyle{
		background:#de3039;
		color:#fff;
	}
</style>