<template>
	<div class = "piechart">		
		<el-row class="table-header" style="padding-bottom:0">
			<el-col :span="24" align="left">
				<el-col :span='4' style="margin-left:15px;line-height: 63px;">机器人解答-价值统计</el-col>								   					    
				<el-col :span='4' style="margin:10px 0 0 100px;">
					<el-button type="danger" size="medium" icon = "el-icon-upload"  @click.native = "handleDown">导出数据</el-button>
				</el-col>
				<el-col :span = '1' style="margin-left:5px;line-height: 63px;cursor: pointer;" :class = {active:isDay} @click.native="handlePiedayData" >今日</el-col>
				<el-col :span = '1' style="margin-left:0px;line-height: 63px;cursor: pointer;"  :class = {active:isWeek} @click.native="handlePieweekData">近一周</el-col>
				<el-col :span = '1' style="margin-left:15px;line-height: 63px;cursor: pointer;" :class = {active:isMouth} @click.native="handlePiemonthData">近一月</el-col>
				<el-col :span = '4' style="margin-left:15px;line-height: 63px;cursor: pointer;"><calendar v-model = 'timeArr' ref = "date" class = "calendar" v-on:listenEvent="handlegetRandomData"/></el-col>
			</el-col>
		</el-row>				
		<div class = "pie">
			<div id="pieechartContainer" style="width:600px; height:350px"></div>
		</div>
		<div class = "pie-table">
			<el-table :data="pieData" border  >    
				<el-table-column
					prop="name"
					label="名称"
					align="center"
					label-class-name = "col"
					>
				</el-table-column>
				<el-table-column
					prop="value"
					label="数量"
					align="center"
					label-class-name = "col"
					>
				</el-table-column>
			</el-table>
		</div>
		<!---->
	</div>
</template>

<script scoped>
import echarts from 'echarts'
import calendar from './date'
import qs from 'qs';
import axios from "axios";
export default {
	components:{
			'calendar':calendar
	},
data() {
    return {
	  	chart: null,
	  	pieData:[
	            {value:300, name:'有用'},
	            {value:310, name:'没用'},
	            {value:274, name:'未表态'},
		      ],
	  	timeArr:['2017-12-11','2017-12-14'],
	  	startTime:'',
		endTime:'',
		isDay:true,
		isWeek:false,
		isMouth:false
    }
},
mounted(){
		this.getPieData();
		this.myPieChart = echarts.init(document.getElementById('pieechartContainer'))
		this.option = {
		    title: {
		        text: '',
		        left: 'center',
		        top: 20
		    },
		     tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		   color:['#FF6B66','#00B0EE','#F4DF19'],
		   
		    series : [
		        {
		            name:'问题评价',
		            type:'pie',
		            radius : '55%',
		            center: ['50%', '50%'],
		            data:this.pieData,
		            
		            
		
		            animationType: 'scale',
		            animationEasing: 'elasticOut',
		            animationDelay: function (idx) {
		                return Math.random() * 200;
		            }
		        }
		    ]
		};
		this.myPieChart.setOption(this.option);
	},
	methods:{
		getPieData(){
			let token = localStorage.token;
			axios.post(this.biz.serverUrl+'/home?'+'token'+'='+token).then(this.handleGetPieDataSucc.bind(this)).catch(this.handleGetPieDataError.bind(this))
		},
		handleGetPieDataSucc(res){
			let that = this
			if(res.data.code == 404){
				that.$router.push({path:'/'})
			}
			else if(res.data.code == 200){
				console.log(res.data.element.pieChartData);
				that.pieData = res.data.element.pieChartData;
				that.option.series[0].data = that.pieData;
				that.myPieChart.setOption(that.option);
				console.log(that.pieData)
			}
		},
		handleGetPieDataError(){
			alert("请求失败")
		},
		handlePiedayData(){
			this.isWeek = false;
			this.isMouth = false;
			this.isDay = true;
			let token = localStorage.token;
	  		let time = new Date().getTime();
	  		this.endTime = this.getTimer(time);
	  		this.startTime = this.fun_date(0)
	  		let param = qs.stringify({token:token,startTime:this.startTime,endTime:this.endTime})
	  		
	  		console.log(this.biz.serverUrl+'/chat/pieChart?'+'token'+'='+token+'&'+param)
	  		axios.post(this.biz.serverUrl+'/chat/pieChart?'+param).then(this.handleGetPieDaySucc.bind(this)).catch(this.handleGetPieDayErr.bind(this))
		},
		handleGetPieDaySucc(res){
			let that = this
			if(res.data.code == 404){
				that.$router.push({path:'/'})
			}
			else if(res.data.code == 200){
				console.log(res.data.element.pieChartData);
				that.pieData = res.data.element.pieChartData;
				that.option.series[0].data = that.pieData;
				that.myPieChart.setOption(that.option);
				console.log(that.pieData)
			}
		},
		handleGetPieDayErr(res){
			alert("请求失败")
		},
		handlePieweekData(){
			this.isWeek = true;
			this.isMouth = false;
			this.isDay = false;
			this.startTime = this.fun_date(-7)	  		
	  		let token = localStorage.token;
	  		let time = new Date().getTime();
	  		this.endTime = this.getTimer(time);
//	  		this.timeArr = [startTime,endTime]
	//  		console.log(startTime,endTime)
	  		let param = qs.stringify({token:token,startTime:this.startTime,endTime:this.endTime})
	  		axios.post(this.biz.serverUrl+'/chat/pieChart?'+param).then(this.handleGetPieWeekSucc.bind(this)).catch(this.handleGetPieWeekErr.bind(this))
		},
		handleGetPieWeekSucc(res){
			let that = this
			if(res.data.code == 404){
				that.$router.push({path:'/'})
			}
			else if(res.data.code == 200){
				console.log(res.data.element.pieChartData);
				that.pieData = res.data.element.pieChartData;
				that.option.series[0].data = that.pieData;
				that.myPieChart.setOption(that.option);
				console.log(that.pieData)
			}
		},
		handleGetPieWeekErr(res){
			alert("请求失败")
		},
		handlePiemonthData(){
			this.isWeek = false;
			this.isMouth = true;
			this.isDay = false;
			this.startTime = this.fun_date(-30);
	  		let token = localStorage.token;
	  		let time = new Date().getTime();
	  		this.endTime = this.getTimer(time);
//	  		console.log(startTime,endTime)
	  		let param = qs.stringify({token:token,startTime:this.startTime,endTime:this.endTime})
	  		axios.post(this.biz.serverUrl+'/chat/pieChart?'+param).then(this.handleGetPieMonSucc.bind(this)).catch(this.handleGetPieMonErr.bind(this))
		},
		handleGetPieMonSucc(res){
			let that = this
			if(res.data.code == 404){
				that.$router.push({path:'/'})
			}
			else if(res.data.code == 200){
				console.log(res.data.element.pieChartData);
				that.pieData = res.data.element.pieChartData;
				that.option.series[0].data = that.pieData;
				that.myPieChart.setOption(that.option);
				console.log(that.pieData)
			}
		},
		handleGetPieMonErr(res){
			alert("请求失败")
		},
		handlegetRandomData(data){
		  	this.startTime = data[0];
		  	this.endTime = data[1];
		  	let token = localStorage.token;
		  	let param = qs.stringify({token:token,startTime:this.startTime,endTime:this.endTime})
	  		axios.post(this.biz.serverUrl+'/chat/pieChart?'+param).then(this.handleGetPieRanSucc.bind(this)).catch(this.handleGetPieRanErr.bind(this))
		},
		handleGetPieRanSucc(res){
			let that = this
			if(res.data.code == 404){
				that.$router.push({path:'/'})
			}
			else if(res.data.code == 200){
				console.log(res.data.element.pieChartData);
				that.pieData = res.data.element.pieChartData;
				that.option.series[0].data = that.pieData;
				that.myPieChart.setOption(that.option);
				console.log(that.pieData)
			}
		},
		handleGetPieRanErr(res){
			alert("请选择日期")
		},
		handleDown(){
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
			window.open(this.biz.serverUrl+'/chat/exportPieData?'+param)
		}
	}
}

</script>

<style scoped>
	.piechart{
		border:1px solid #ccc;
		height:400px;
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
	.pie{
		width:620px;
		height:340px;
		/*position:relative;
		left:30px;*/
		/*bottom:5px;*/
		float:left;
	}
	.col{
		text-align: center;
		color:red
	}
	.pie-table{
		width: 300px;
		height:300px;
		float: left;
		margin-top: 60px;
		margin-left:35px;
	}
	el-table{
		height:300px;
	}
</style>