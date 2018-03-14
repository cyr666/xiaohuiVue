<template>
	<div class = "SystemIndex-box">
		<div class = "indextitle">
			<span class = "lineSymbol"></span>
			<span class = "indexWord">首页</span>
		</div>
		<div class = "indexRight-box">
			<div class = "data">
				<div class = "userQuestion">
					<img src="../../../../../../static/images/index_01.jpg" alt="" class="img-talk" />
					<div class = "user-content">
						<img class = "user-que1" src="../../../../../../static/images/index_02.jpg" alt="" @mouseenter="handleShowChat" @mouseleave="handleHideChat"/>
						<p class = "user-word">今日聊天总数</p>
						<p class = "talk-count">{{talkCount}}</p>
					</div>
				</div>
				<div class = "kbmSolution">
					<img src="../../../../../../static/images/index_03.jpg" alt="" class = "img-talk"/>
					<div class = "user-content" >
						<img class = "user-que2" src="../../../../../../static/images/index_02.jpg" alt="" @mouseenter="handleShowKey" @mouseleave="handleHideKey"/>
						<p class = "user-word">今日知识库使用数</p>
						<p class = "talk-count">{{kbmCount}}</p>
					</div>
				</div>
				<!--<div class = "userQuestion">
					<img src="../../../../../../static/images/index_01.jpg" alt="" class="img-talk" />
					<div class = "user-content">
						<img class = "user-que1 user-que3" src="../../../../../../static/images/index_02.jpg" alt="" @mouseenter="handleShowSer" @mouseleave="handleHideSer"/>
						<p class = "user-word">转接人工客服次数</p>
						<p class = "talk-count">{{serviceCount}}</p>
					</div>
				</div>-->
				<div class = "userQuestion">
					<img src="../../../../../../static/images/index_01.jpg" alt="" class="img-talk" />
					<div class = "user-content">
						<img class = "user-que1" src="../../../../../../static/images/index_02.jpg" alt="" @mouseenter="handleShowTop" @mouseleave="handleHideTop"/>
						<p class = "user-word">推荐位点击量</p>
						<p class = "talk-count">{{topCount}}</p>
					</div>
				</div>
				<div class = "chat" v-if = "isShowChat">
					用户提问次数
					<span class = "triangle"></span>
				</div>
				<div class = "key" v-if = "isShowKey">
					知识库提供解答次数
					<span class = "triangle triangle-key"></span>
				</div>
				<div class = "service" v-if = "isShowSer">
					机器人无法解答，用户转接人工客服次数
					<span class = "triangle triangle-service"></span>
				</div>
				<div class = "top" v-if = "isShowTop">
					聊天窗口顶部推荐位点击次数
					<span class = "triangle triangle-top"></span>
				</div>
			</div>
		    <lineCharts class = "linecharts"/> <!--创建一个echarts的容器-->
		    <pieChart class = "pieChart"/> 
		    <barChart class = "barChart"/> 
		    <topLineChart class = "topLineChart"/>
		   <!-- <serviceLineChart class = "serviceLineChart"/>-->
		</div>
	</div>
</template>

<script>
	
	import lineCharts from './LineCharts'
	import pieChart from './pieChart'
	import barChart from './BarChart'
	import topLineChart from './TopLineChart'
	import serviceLineChart from './ServiceLineChart'
	import qs from 'qs';
	import axios from "axios";
	export default{
		data(){
			return{
				talkCount:"",
				kbmCount:"",
				serviceCount:'',
				topCount:'',
				isShowChat:false,
				isShowKey:false,
				isShowSer:false,
				isShowTop:false,
				height:''
			}
		},
		components:{
			lineCharts:lineCharts,
			pieChart:pieChart,
			barChart:barChart,
			topLineChart:topLineChart,
			serviceLineChart:serviceLineChart
		},
		mounted(){
			this.getData()
		},
		methods:{
			/*******获取页面的高度*******/
			getheight(){				
				var bodyHeight = document.body.clientHeight || document.documentElement.clientHeight
				var scrollHeight = document.body.scrollHeight;
				if(bodyHeight<scrollHeight){
					this.height = scrollHeight+"px"
				}else{
					this.height = bodyHeight+"px"
				}
				this.$emit("listenEvent",this.height) 
			},
			/**********获取页面的数据（今日）**********/
			getData(){
				let token = localStorage.token;
				axios.post(this.biz.serverUrl+'/home?'+'token'+'='+token).then(this.handleGetDataSucc.bind(this)).catch(this.handleGetDataError.bind(this))
			},
			handleGetDataSucc(res){
				let that = this
				if(res.data.code == 404){
					that.$router.push({path:'/'})
				}
				else if(res.data.code == 200){
					console.log(res)
					that.talkCount = res.data.element.countChatRecord;
					that.kbmCount = res.data.element.countUseKeyContent;
					that.topCount = res.data.element.countRecommend;
				}
			},
			handleGetDataError(res){
				alert("请求失败")
			},
		  	handleDown(){alert(123)},
		  	getNewTime(){
		  		 
		  	},
		  	handleShowChat(){
		  		this.isShowChat = true
		  		
		  	},
		  	handleHideChat(){
		  		this.isShowChat = false
		  		
		  	},
		  	handleShowKey(){
		  		this.isShowKey = true;
		  	},
		  	handleHideKey(){
		  		this.isShowKey = false
		  	},
		  	handleShowSer(){
		  		this.isShowSer = true;
		  	},
		  	handleHideSer(){
		  		this.isShowSer = false;
		  	},
		  	handleShowTop(){
		  		this.isShowTop = true;
		  	},
		  	handleHideTop(){
		  		this.isShowTop = false;
		  	}
		  	
			  	
		},
		updated(){
    		this.getheight()
    	}
		
	}
</script>

<style>	
	.user{
		font-size:36px;
		color:#00FFFF
	}
	.data{
		height:136px;
		margin-top:20px;
	}
	.indexRight-box{
		position: relative;
		margin-left:50px;
	}
	.userQuestion,.kbmSolution{
		float:left;
		width:240px;
		height:106px;
		border:1px solid #e0e0e0;
		margin-right:10px;
		background:#fff
	}
	.linecharts,.piecharts{
		margin-top:20px;
		padding-bottom:20px 
	}
	.pieChart,.barChart,.topLineChart,.serviceLineChart{
		margin-top:20px;
	}
	.indextitle{
		height:70px;
		width:110%;
		font-size:18px;
		line-height:70px;
		background:#fff;
		padding-left: 30px;
	}
	.lineSymbol{
		border:3px solid #de3039;
		background:#de3039;		
		font-size:26px;
		line-height: 70px;
    }
    .indexWord{
		font-size:20px;
		line-height:70px;
		display: inline-block;
		margin-left: 10px;
		color:#666666
	}
	.img-talk{
		float:left;
		width:40px;
		height:40px;
		margin-top:35px;
		margin-left:10px;
	}
	.user-content{
		float:left;
		position: relative;
	}
	.user-word{
		font-size:16px;
		color:#606060;
		margin-top:30px;
		margin-left:20px;
		text-align: center;
	}
	.talk-count{
		font-size:25px;
		color:#606060;
		margin-left:20px;
		margin-top: 15px;
		text-align: center;
	}
	.user-que1,.user-que2{
		position:absolute;
		left:126px;
		top:20px;
		width:20px;
		height:20px;
	}
	.user-que2{
		left:150px;
	}
	.user-que3{
		left:150px;
	}
	.chat,.key,.service,.top{
		width:106px;
		height:33px;
		background:#000;
		border-radius: 10px;
		position: absolute;
		top:-29px;
		left:132px;
		font-size:14px;
		color:#fff;
		text-align: center;
		line-height: 33px;
		z-index: 111;
	}
	.key{
		width:143px;
		left:387px;
	}
	.service{
		width:260px;
		left:580px;
	}
	.top{
		width:210px;
		left:570px;
	}
	.triangle{
		width:0;   
		height:0;   		
		border-left:10px solid transparent;   		
		border-right:10px solid transparent;   		
		border-top:8px solid #000;
		position: absolute;
	    top: 31px;
	    left: 46px;
	}
	.triangle-key{
		left:65px;
	}
	.triangle-service{
		left:125px;
	}
	.triangle-top{
		left:112px;
	}
</style>