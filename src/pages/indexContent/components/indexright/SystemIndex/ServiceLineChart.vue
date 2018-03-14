<template>
	<div class = "linecharts">
		<el-row class="table-header" style="padding-bottom:0">
			<el-col :span="24" align="left">
				<el-col :span='4' style="margin-left:15px;line-height: 63px;">人工客服-服务统计</el-col>								   					    
				<el-col :span='4' style="margin:10px 0 0 100px;">
					<el-button type="danger" size="medium" icon = "el-icon-upload" @click.native = "handleDown" >导出数据</el-button>
				</el-col>
				<el-col :span = '1' style="margin-left:5px;line-height: 63px;cursor: pointer;" :class = {active:isDay} @click.native="handleLinedayData" >今日</el-col>
				<el-col :span = '1' style="margin-left:0px;line-height: 63px;cursor: pointer;" :class = {active:isWeek} @click.native="handleLineweekData">近一周</el-col>
				<el-col :span = '1' style="margin-left:15px;line-height: 63px;cursor: pointer;" :class = {active:isMouth} @click.native="handleLinemonthData">近一月</el-col>
				<el-col :span = '4' style="margin-left:15px;line-height: 63px;cursor: pointer;"><calendar ref = "date" class = "calendar" v-on:listenEvent="handlegetRandomData"/></el-col>
			</el-col>
		</el-row>
		<div id="ServiceBarContainer" style="width:970px; height:350px"></div> <!--创建一个echarts的容器-->
	</div>
</template>

<script>
import calendar from './date'
import echarts from 'echarts'
import qs from 'qs';
import axios from "axios"; 
export default {
	components:{
			'calendar':calendar
	},
	data(){
			return{
				isshow:false,
				xdata:['1','2'],
				chatY:[120, 132, 101, 134, 90, 230, 210, 132, 101, 134, 90, 230, 210],
				keyY:[220, 182, 191, 234, 290, 330, 310, 132, 101, 134, 90, 230, 210],
				startTime:'',
				endTime:'',
				isDay:true,
				isWeek:false,
				isMouth:false,
				talk:"近一周服务统计"
			}
		},
	  mounted() {
	  	this.getData();
	    this.myChart = echarts.init(document.getElementById('ServiceBarContainer'))
		this.option = {
		    title: {
		        text: this.talk
		    },
		    tooltip: {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['服务次数','服务人数','服务时长']
		    },
		    grid: {
		    	width:'95%',
		        left: '5%',
		        right: 0,
		        bottom: 0,
		        containLabel: true
		    },
		    toolbox: {
		        feature: {
		            saveAsImage : {show: true}
		        }
		    },
		    xAxis: {
//		    	axisTick: {length:2},
				axisLabel: {
				    interval:0,//横轴信息全部显示
				    rotate:35,//60度角倾斜显示				
//				  	formatter:function(val){
//				     	return val.split("").join("\n");
//				    }//横轴信息文字竖直显示
				},
		        type: 'category',
		        boundaryGap: false,
		        data: this.xdata,
//		        showAllSymbol: true
		    },
		    yAxis: {
		        type: 'value'
		    },
		    series: [
		        {
		            name:'服务次数',
		            type:'line',
		            itemStyle: {normal: {areaStyle: {type: 'default'}}},
		            data:this.keyY
		        },
		        {
		            name:'服务人数',
		            type:'line',
		            areaStyle: {normal:{}},
		            data:this.chatY
		            
		        },
		        {
		            name:'服务时长',
		            type:'line',
		            itemStyle: {normal: {areaStyle: {type: 'default'}}},
		            data:this.keyY
		        },
		    ],
		    dataZoom: [
		        {
		            show: false,
		            start: 0,
		            end: 150
		        },
		        {
		            type: 'inside',
		            start: 0,
		            end: 150
		        },
		        {
		            show: false,
		            yAxisIndex: 0,
		            filterMode: 'empty',
		            width: 2,
		            height: '80%',
		            showDataShadow: false,
		            left: '93%'
		        }
		    ]
		};
		this.myChart.setOption(this.option);
	   
	  },
	  
	  methods: {
	  	getData(){
	  		let token = localStorage.token;
	  		this.axios.post(this.biz.serverUrl+'/home?'+'token'+'='+token).then(this.handleGetHomeDataSucc.bind(this)).catch(this.handleGetHomeDataFail.bind(this))
	  	},
	  	handleGetHomeDataSucc(res){
	  		let that = this;
	  		if(res.data.code == 400){
	  			that.$router.push({path:'/'})
	  		}
	  		if(res.data.code == 200){
	  			
	  			that.xdata = res.data.element.xDate;
	  			that.chatY = res.data.element.yDataChatRecord;
	  			that.keyY = res.data.element.yDataKeycontent;
	  			
	  			that.option.xAxis.data= that.xdata;
	  			that.option.series[0].data = that.chatY;
	  			that.option.series[1].data = that.keyY;
	  			that.myChart.setOption(that.option);
	  		}	  		
	  	},
	  	handleGetHomeDataFail(res){
	  		alert("请求失败")
	  	},
	  	handleLinedayData(){
				this.isWeek = false;
				this.isMouth = false;
				this.isDay = true;
				let token = localStorage.token;
		  		let time = new Date().getTime();
		  		this.endTime = this.getTimer(time);
		  		this.startTime = this.getStartTimer()
		  		let param = qs.stringify({token:token,startTime:this.startTime,endTime:this.endTime})
		  		console.log(this.biz.serverUrl+'/chat/lineChart?'+param)
		  		axios.post(this.biz.serverUrl+'/chat/lineChart?'+param).then(this.handleGetLineDaySucc.bind(this)).catch(this.handleGetLineDayErr.bind(this))
	  	},
	  	handleGetLineDaySucc(res){
	  		console.log(res)
	  		let that = this;
	  		if(res.data.code == 400){
	  			that.$router.push({path:'/'})
	  		}
	  		if(res.data.code == 200){
	  			this.talk = "今日聊天统计"
	  			that.xdata = res.data.element.xDate;
	  			that.chatY = res.data.element.yDataChatRecord;
	  			that.keyY = res.data.element.yDataKeycontent;
	  			that.option.title.text= that.talk;
	  			that.option.xAxis.data= that.xdata;
	  			that.option.series[0].data = that.keyY;
	  			that.option.series[1].data = that.chatY;
	  			that.myChart.setOption(that.option);
	  		}	  		
	  	},
	  	handleGetLineDayErr(res){
	  		alert("请求失败")
	  	},
	  	handleLineweekData(){
	  		this.isWeek = true;
			this.isMouth = false;
			this.isDay = false;
	  		this.startTime = this.fun_date(-7)	  		
	  		let token = localStorage.token;
	  		let time = new Date().getTime();
	  		this.endTime = this.getTimer(time);
	  		let param = qs.stringify({token:token,startTime:this.startTime,endTime:this.endTime})
	  		axios.post(this.biz.serverUrl+'/chat/lineChart?'+param).then(this.handleGetLineWeekSucc.bind(this)).catch(this.handleGetLineWeekErr.bind(this))
	  	},
	  	handleGetLineWeekSucc(res){
	  		let that = this;
	  		if(res.data.code == 400){
	  			that.$router.push({path:'/'})
	  		}
	  		if(res.data.code == 200){
	  			this.talk = "近一周聊天统计"
	  			console.log(res)
	  			that.xdata = res.data.element.xDate;
	  			that.chatY = res.data.element.yDataChatRecord;
	  			that.keyY = res.data.element.yDataKeycontent;
	  			that.option.title.text= that.talk;
	  			that.option.xAxis.data= that.xdata;
	  			that.option.series[0].data = that.keyY;
	  			that.option.series[1].data = that.chatY;
	  			that.myChart.setOption(that.option);
	  		}	  		
	  	},
	  	handleGetLineWeekErr(res){
	  		alert("请求失败")
	  	},
	  	handleLinemonthData(){
	  		this.isWeek = false;
			this.isMouth = true;
			this.isDay = false;
	  		this.startTime = this.fun_date(-30);
	  		let token = localStorage.token;
	  		let time = new Date().getTime();
	  		this.endTime = this.getTimer(time);
	  		console.log(this.endTime)
	  		let param = qs.stringify({token:token,startTime:this.startTime,endTime:this.endTime})
	  		axios.post(this.biz.serverUrl+'/chat/lineChart?'+param).then(this.handleGetLineMonSucc.bind(this)).catch(this.handleGetLineMonErr.bind(this))
	  	},
	  	handleGetLineMonSucc(res){
	  		let that = this;
	  		if(res.data.code == 400){
	  			that.$router.push({path:'/'})
	  		}
	  		if(res.data.code == 200){
	  			that.talk = "近一月聊天统计"
	  			
	  			console.log(res)
	  			that.xdata = res.data.element.xDate;
	  			that.chatY = res.data.element.yDataChatRecord;
	  			that.keyY = res.data.element.yDataKeycontent;
	  			that.option.title.text= that.talk;
	  			that.option.xAxis.data= that.xdata;
	  			that.option.series[0].data = that.keyY;
	  			that.option.series[1].data = that.chatY;
	  			that.myChart.setOption(that.option);
	  		}
	  	},
	  	handleGetLineMonErr(res){
	  		alert("请求失败")
	  	},
	  	
	  	handlegetRandomData(data){
	  		let hour = this.gethour()
		  	this.startTime = data[0];
		  	this.endTime = data[1] +" "+ hour;		  	
		  	console.log(this.endTime)
		  	let token = localStorage.token;
		  	let param = qs.stringify({token:token,startTime:this.startTime,endTime:this.endTime})
	  		axios.post(this.biz.serverUrl+'/chat/lineChart?'+param).then(this.handleGetLineRanSucc.bind(this)).catch(this.handleGetLineRanErr.bind(this))
		},
		handleGetLineRanSucc(res){
			let that = this;
	  		if(res.data.code == 400){
	  			that.$router.push({path:'/'})
	  		}
	  		if(res.data.code == 200){
	  			console.log(res)
	  			that.xdata = res.data.element.xDate;
	  			that.chatY = res.data.element.yDataChatRecord;
	  			that.keyY = res.data.element.yDataKeycontent;
	  			
	  			that.option.xAxis.data= that.xdata;
	  			that.option.series[0].data = that.keyY;
	  			that.option.series[1].data = that.chatY;
	  			that.myChart.setOption(that.option);
	  		}
		},
		handleGetLineRanErr(res){
			alert("请选择日期")
		},
		handleDown(){
			let that = this;
			console.log("sas")
			if(this.startTime == '' && this.endTime == ''){
				let time = new Date().getTime();
		  		this.endTime = this.getTimer(time);
		  		this.startTime = this.getStartTimer()
			}
			let param = qs.stringify({
				token:localStorage.getItem('token'),
				startTime:this.startTime,
				endTime:this.endTime
			})
			window.open(this.biz.serverUrl+'/chat/exportLineData?'+param)
		}
	}    
}
</script>
<style>
	.linecharts{
		border:1px solid #ccc;
		height:430px;
		width:100%;
		overflow: hidden;
	}
	.table-header{
		width:1055px;
		height:63px;
		border-bottom:1px solid #ccc;
	}
	.calendar{
		position:absolute
	}
	.down{
		cursor: pointer;
	}
	.active{
		color:red
	}
</style>