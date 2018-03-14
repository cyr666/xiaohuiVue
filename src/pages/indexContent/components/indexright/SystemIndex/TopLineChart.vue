<template>
	<div class = "linecharts">
		<el-row class="table-header" style="padding-bottom:0">
			<el-col :span="24" align="left">
				<el-col :span='4' style="margin-left:15px;line-height: 63px;">推荐位点击统计</el-col>								   					    
				<el-col :span='4' style="margin:10px 0 0 100px;">
					<el-button type="danger" size="medium" icon = "el-icon-upload" @click.native = "handleDown" >导出数据</el-button>
				</el-col>
				<el-col :span = '1' style="margin-left:5px;line-height: 63px;cursor: pointer;" :class = {active:isDay} @click.native="handleTopLinedayData" >今日</el-col>
				<el-col :span = '1' style="margin-left:0px;line-height: 63px;cursor: pointer;" :class = {active:isWeek} @click.native="handleTopLineweekData">近一周</el-col>
				<el-col :span = '1' style="margin-left:15px;line-height: 63px;cursor: pointer;" :class = {active:isMouth} @click.native="handleTopLinemonthData">近一月</el-col>
				<el-col :span = '4' style="margin-left:15px;line-height: 63px;cursor: pointer;"><calendar ref = "date" class = "calendar" v-on:listenEvent="handlegetRandomData"/></el-col>
			</el-col>
		</el-row>
		<div id="TopBarContainer" style="width:970px; height:350px"></div> <!--创建一个echarts的容器-->
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
				ClickY:[120, 132, 101, 134, 90, 230, 210, 132, 101, 134, 90, 230, 210],
				ClickUserY:[220, 182, 191, 234, 290, 330, 310, 132, 101, 134, 90, 230, 210],
				startTime:'',
				endTime:'',
				isDay:true,
				isWeek:false,
				isMouth:false,
				talk:""
			}
		},
	  mounted() {
	  	this.getData();
	    this.myChart = echarts.init(document.getElementById('TopBarContainer'))
		this.option = {
		    title: {
		        text: this.talk
		    },
		    tooltip: {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['点击次数','点击人数']
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
		            name:'点击次数',
		            type:'line',
		            itemStyle: {normal: {areaStyle: {type: 'default'}}},
		            data:this.keyY
		        },
		        {
		            name:'点击人数',
		            type:'line',
		            areaStyle: {normal:{}},
		            data:this.chatY
		            
		        }
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
	  		if(res.data.code == 404){
	  			that.$router.push({path:'/'})
	  		}
	  		if(res.data.code == 200){
	  			var Xarr = res.data.element.xLineRecommendClickData;
	  			var Xdata = []
	  			Xarr.forEach(function(val,ind){
	  				var x = val.split(' ')[1];
	  				Xdata.push(x)
	  			})
				console.log(Xdata)
	  			that.xdata = Xdata;
	  			that.ClickY = res.data.element.yLineRecommendClickNum;
	  			that.ClickUserY = res.data.element.yLineRecommendClickUserNum;
	  			
	  			that.option.xAxis.data= that.xdata;
	  			that.option.series[0].data = that.ClickY;
	  			that.option.series[1].data = that.ClickUserY;
	  			that.myChart.setOption(that.option);
	  		}	  		
	  	},
	  	handleGetHomeDataFail(res){
	  		alert("请求失败")
	  	},
	  	handleTopLinedayData(){
				this.isWeek = false;
				this.isMouth = false;
				this.isDay = true;
				let token = localStorage.token;
		  		let time = new Date().getTime();
		  		this.endTime = this.getTimer(time);
		  		this.startTime = this.getStartTimer()
		  		let param = qs.stringify({token:token,startTime:this.startTime,endTime:this.endTime})
		  		console.log(this.biz.serverUrl+'/recommendhistory/lineChart?'+param)
		  		axios.post(this.biz.serverUrl+'/recommendhistory/lineChart?'+param).then(this.handleGetTopLineDaySucc.bind(this)).catch(this.handleGetTopLineDayErr.bind(this))
	  	},
	  	handleGetTopLineDaySucc(res){
	  		console.log(res)
	  		let that = this;
	  		if(res.data.code == 404){
	  			that.$router.push({path:'/'})
	  		}
	  		if(res.data.code == 200){
//	  			this.talk = "今日聊天统计"
				var Xarr = res.data.element.xLineRecommendClickData;
	  			var Xdata = []
	  			Xarr.forEach(function(val,ind){
	  				var x = val.split(' ')[1];
	  				Xdata.push(x)
	  			})
	  			that.xdata = Xdata;
	  			that.ClickY = res.data.element.yLineRecommendClickNum;
	  			that.ClickUserY = res.data.element.yLineRecommendClickUserNum;
	  			//that.option.title.text= that.talk;
	  			that.option.xAxis.data= that.xdata;
	  			that.option.series[0].data = that.ClickY;
	  			that.option.series[1].data = that.ClickUserY;
	  			that.myChart.setOption(that.option);
	  		}	  		
	  	},
	  	handleGetTopLineDayErr(res){
	  		alert("请求失败")
	  	},
	  	handleTopLineweekData(){
	  		this.isWeek = true;
			this.isMouth = false;
			this.isDay = false;
	  		this.startTime = this.fun_date(-7)	  		
	  		let token = localStorage.token;
	  		let time = new Date().getTime();
	  		this.endTime = this.getTimer(time);
	  		let param = qs.stringify({token:token,startTime:this.startTime,endTime:this.endTime})
	  		axios.post(this.biz.serverUrl+'/recommendhistory/lineChart?'+param).then(this.handleGetTopLineWeekSucc.bind(this)).catch(this.handleGetTopLineWeekErr.bind(this))
	  	},
	  	handleGetTopLineWeekSucc(res){
	  		let that = this;
	  		if(res.data.code == 404){
	  			that.$router.push({path:'/'})
	  		}
	  		if(res.data.code == 200){
	  			var Xarr = res.data.element.xLineRecommendClickData;
	  			var Xdata = []
	  			Xarr.forEach(function(val,ind){
	  				var x = val.split(' ')[0];
	  				Xdata.push(x)
	  			})
	  			that.xdata = Xdata;
	  			that.ClickY = res.data.element.yLineRecommendClickNum;
	  			that.ClickUserY = res.data.element.yLineRecommendClickUserNum;
	  			//that.option.title.text= that.talk;
	  			that.option.xAxis.data= that.xdata;
	  			that.option.series[0].data = that.ClickY;
	  			that.option.series[1].data = that.ClickUserY;
	  			that.myChart.setOption(that.option);
	  		}	  		
	  	},
	  	handleGetTopLineWeekErr(res){
	  		alert("请求失败")
	  	},
	  	handleTopLinemonthData(){
	  		this.isWeek = false;
			this.isMouth = true;
			this.isDay = false;
	  		this.startTime = this.fun_date(-30);
	  		let token = localStorage.token;
	  		let time = new Date().getTime();
	  		this.endTime = this.getTimer(time);
	  		console.log(this.endTime)
	  		let param = qs.stringify({token:token,startTime:this.startTime,endTime:this.endTime})
	  		axios.post(this.biz.serverUrl+'/recommendhistory/lineChart?'+param).then(this.handleGetTopLineMonSucc.bind(this)).catch(this.handleGetTopLineMonErr.bind(this))
	  	},
	  	handleGetTopLineMonSucc(res){
	  		let that = this;
	  		var Xarr = res.data.element.xLineRecommendClickData;
	  			var Xdata = []
	  			Xarr.forEach(function(val,ind){
	  				var x = val.split(' ')[0];
	  				Xdata.push(x)
	  			})
	  			that.xdata = Xdata;
	  			that.ClickY = res.data.element.yLineRecommendClickNum;
	  			that.ClickUserY = res.data.element.yLineRecommendClickUserNum;
	  			//that.option.title.text= that.talk;
	  			that.option.xAxis.data= that.xdata;
	  			that.option.series[0].data = that.ClickY;
	  			that.option.series[1].data = that.ClickUserY;
	  			that.myChart.setOption(that.option);
	  	},
	  	handleGetTopLineMonErr(res){
	  		alert("请求失败")
	  	},
	  	
	  	handlegetRandomData(data){
	  		let hour = this.gethour()
		  	this.startTime = data[0];
		  	this.endTime = data[1] +" "+ hour;		  	
		  	console.log(this.endTime)
		  	let token = localStorage.token;
		  	let param = qs.stringify({token:token,startTime:this.startTime,endTime:this.endTime})
	  		axios.post(this.biz.serverUrl+'/recommendhistory/lineChart?'+param).then(this.handleGetLineRanSucc.bind(this)).catch(this.handleGetLineRanErr.bind(this))
		},
		handleGetLineRanSucc(res){
			let that = this;
	  		var Xarr = res.data.element.xLineRecommendClickData;
	  			var Xdata = []
	  			Xarr.forEach(function(val,ind){
	  				var x = val.split(' ')[0];
	  				Xdata.push(x)
	  			})
	  			that.xdata = Xdata;
	  			that.ClickY = res.data.element.yLineRecommendClickNum;
	  			that.ClickUserY = res.data.element.yLineRecommendClickUserNum;
	  			//that.option.title.text= that.talk;
	  			that.option.xAxis.data= that.xdata;
	  			that.option.series[0].data = that.ClickY;
	  			that.option.series[1].data = that.ClickUserY;
	  			that.myChart.setOption(that.option);
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
			window.open(this.biz.serverUrl+'/recommendhistory/exportLineClickData?'+param)
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