<template>
	<div class="wrapper">
   		<div class = "header">
   			<img src="../../../static/images/logo_01.jpg" alt="" class = "logo-img"/>
   			<p class = "logo-title">价值汇</p>
   			<ul class = "header-con">
   				<li v-for="(item,index) in list" :class = {active:item.show} @click="tab(index)">
   					<router-link :to="item.link"><span class = "title">{{item.tab}}</span></router-link>
   				</li>  				
   			</ul>
   			<ul class = "baseset">
   				<li class='headImg-con'>
   					<img :src="url" alt="" class = "head-img"/>
   					<span class = "admin">{{userName}}</span>
   				</li>
   				<li class = "home">
   					<router-link to = "/sysindex/system">
   					    <img class = "home-img" src="../../../static/images/home_03.jpg" alt="" />
   					</router-link>
   				</li>
   				<!--<li class = "color">
   					<img class = "color-img" src="../../../static/images/color_05.jpg" alt="" />
   				</li>-->
   				<li class = "logout">
   					<router-link to = "/">
   						<img class = "logout-img" src="../../../static/images/logout_03.jpg" alt="" />
   					</router-link>
   				</li>
   			</ul>
   		</div>
   		<router-view class = "main"></router-view>
	</div>
</template>

<script scoped> 
export default {
  name: 'HelloWorld',
  data () {
    return {
    	list:[
	        {"tab":"首页","show":false,"link":"/sysindex/system"},
	        {"tab":"机器人","show":false,"link":"/robot"},
	        {"tab":"客服","show":false,"link":"/service"}
        ],
        url:"../../../static/images/timg.jpg",
        userName:''
        
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
   },
   getNameAndPho(){
   		this.userName = localStorage.getItem('nickName');
   		this.url = localStorage.getItem('photo')
   }
},
mounted(){
	this.getNameAndPho()
	if(this.$route.path=='/sysindex/account' || this.$route.path=='/sysindex/system'){
		this.list[0].show=true;
	}if(this.$route.path==='/robot' || this.$route.path==='/robot/baseset' || this.$route.path==='/robot/question'|| this.$route.path==='/robot/skill' ||this.$route.path==='/robot/kbm' 
	|| this.$route.path==='/robot/kbmAdd'
	|| this.$route.path==='/robot/kbmEdit'
	|| this.$route.path==='/robot/solutionset'){
		this.list[1].show=true;
	}if(this.$route.path==='/service'){
		this.list[2].show=true;
	}
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.header{
		position: fixed;
		top:0;
		height:60px;
		width:100%;
		background:#df2f3a;
		border-bottom:1px solid #e0e0e0;
		z-index:9;
	}
	.logo-img{
		float:left;
		width:60px;
		height:60px;
	}
	.logo-title{
		float:left;
		color:#fff;
		font-size:32px;
		line-height:60px;
		width:10%;
		text-align:center;
	}
	.header-con{
		float:left;
		color:#fff;
		margin-left:5px;
		width:25%
	}
	.header-con li{
		float:left;
		width:33%;
		font-size:20px;
		line-height:60px;
		text-align: center;
		cursor:pointer;
	}
	.header-con li:hover{		
		color:#ccc
	}
	.active{
		background:#a5222a
	}
 	.title{
 		display:inline-block;
 		width:60px;
		line-height:50px;
		text-align: center;
		color:#fff;
 	}
 	.baseset{
 		float:right;
 		width:15%;
 		height:60px;
 		background:url(../../../static/images/line_03.jpg) no-repeat left 120px top 19px
 				   /*url(../../../static/images/line_03.jpg) no-repeat left 200px top 19px*/
 				   /* url(../../../static/images/line_03.jpg) no-repeat left 265px top 19px;*/
 				    
 		
 		
 	}
 	.baseset li{
 		width:30%;
 		float:left
 	}
	.main{
		width:100%;
		height:100%;
		background:#f6f8f9;
		overflow:hidden;
	}
	.headImg-con{
		width:137px;
		height:60px;
		text-align: center;
		line-height: 70px;
	}
	.head-img{	
		float:left;	
		width:46px;
		height:46px;
		border-radius: 23px;
		margin-top:12px;
		margin-left:-43px;
	}
	.admin{
		/*float:left;*/
		margin-left:5px;
		font-size:16px;
		color:#fff;
	}
	.home,.color,.logout{
		width:60px;
		height:60px;
		text-align: center;
	}	
	.home-img,.color-img,.logout-img{
		height:27px;
		width:27px;
		margin-top:21px;
	}
</style>
