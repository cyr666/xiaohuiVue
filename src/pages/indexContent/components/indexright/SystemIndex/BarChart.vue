<template>
	<div class = "linecharts">
		<el-row class="table-header" style="padding-bottom:0">
			<el-col :span="24" align="left">
				<el-col :span='4' style="margin-left:15px;line-height: 63px;">推荐位点击Top</el-col>								   					    
				<el-col :span='4' style="margin:10px 0 0 100px;">
					<el-button type="danger" size="medium" icon = "el-icon-upload" @click.native = "handleDown" >导出数据</el-button>
				</el-col>
				<el-col :span = '1' style="margin-left:5px;line-height: 63px;cursor: pointer;" :class = {active:isDay} @click.native="handleBardayData" >今日</el-col>
				<el-col :span = '1' style="margin-left:0px;line-height: 63px;cursor: pointer;" :class = {active:isWeek} @click.native="handleBarweekData">近一周</el-col>
				<el-col :span = '1' style="margin-left:15px;line-height: 63px;cursor: pointer;" :class = {active:isMouth} @click.native="handleBarmonthData">近一月</el-col>
				<el-col :span = '4' style="margin-left:15px;line-height: 63px;cursor: pointer;"><calendar ref = "date" class = "calendar" v-on:listenEvent="handlegetRandomData"/></el-col>
			</el-col>
		</el-row>
		<div ref = "Bar" id="BarechartContainer" style="width:970px; height:350px"></div> <!--创建一个echarts的容器-->
	</div>
</template>

<script>
import calendar from './date'
import echarts from 'echarts'
import qs from 'qs';
import axios from "axios"; 
export default{
	components:{
		'calendar':calendar
	},
	data(){
		return{
				xBarRecommendClickData: ['周一','周二','周三','周四','周五','周六','周日','周六','周日'],
				xBarRecommendClickUserData:[],
				yBarCount:[120, 132, 451, 134, 190, 230, 110],
				yBarPeop:[620, 732, 734, 890, 930, 820,134],
				isshow:false,
				isDay:true,
				isWeek:false,
				isMouth:false,
				startTime:'',
				endTime:''
			}
	},
	methods:{
		/*********************************初始化数据*****************************************/
		getData(){
			let token = localStorage.token;
	  		this.axios.post(this.biz.serverUrl+'/home?'+'token'+'='+token).then(this.handleGetHomeDataSucc.bind(this)).catch(this.handleGetHomeDataFail.bind(this))
		},
		handleGetHomeDataSucc(res){
	  		let that = this;
	  		if(res.data.code == 404){
	  			that.$router.push({path:'/'})
	  		}
	  		else if(res.data.code == 200){
				that.xBarRecommendClickData = res.data.element.xBarRecommendClickData;
				that.xBarRecommendClickUserData = res.data.element.xBarRecommendClickUserData;
	  			that.yBarCount = res.data.element.yBarRecommendClickNum;
	  			that.yBarPeop = res.data.element.yBarRecommendClickUserNum;
	  			
	  			that.option.xAxis[0].data= that.xBarRecommendClickData;
	  			that.option.series[0].data = that.yBarCount;
	  			that.option.series[1].data = that.yBarPeop;
	  			that.myChart.setOption(that.option);
	  		}	  		
	  	},
	  	handleGetHomeDataFail(res){
           this.$message.error("请重新登录")
	  	},
	  	/****************************获取当天数据***********************************************/
		handleBardayData(){
			this.isWeek = false;
				this.isMouth = false;
				this.isDay = true;
				let token = localStorage.token;
		  		let time = new Date().getTime();
		  		this.endTime = this.getTimer(time);
		  		this.startTime = this.getStartTimer()
		  		let param = qs.stringify({token:token,startTime:this.startTime,endTime:this.endTime})
		  		console.log(this.biz.serverUrl+'/recommendhistory/barChart?'+param)
		  		axios.post(this.biz.serverUrl+'/recommendhistory/barChart?'+param).then(this.handleGetBarDaySucc.bind(this)).catch(this.handleGetBarDayErr.bind(this))
		},
		handleGetBarDaySucc(res){
			let that = this;
	  		if(res.data.code == 404){
	  			that.$router.push({path:'/'})
	  		}else if(res.data.code == 200){
				that.xBarRecommendClickData = res.data.element.xBarRecommendClickData;
				that.xBarRecommendClickUserData = res.data.element.xBarRecommendClickUserData;
	  			that.yBarCount = res.data.element.yBarRecommendClickNum;
	  			that.yBarPeop = res.data.element.yBarRecommendClickUserNum;
	  			
	  			that.option.xAxis[0].data= that.xBarRecommendClickData;
	  			that.option.series[0].data = that.yBarCount;
	  			that.option.series[1].data = that.yBarPeop;
	  			that.myChart.setOption(that.option);
	  		}	 
		},
		handleGetBarDayErr(){},
		handleBarweekData(){
			this.isWeek = true;
			this.isMouth = false;
			this.isDay = false;
	  		this.startTime = this.fun_date(-7)	  		
	  		let token = localStorage.token;
	  		let time = new Date().getTime();
	  		this.endTime = this.getTimer(time);
	  		let param = qs.stringify({token:token,startTime:this.startTime,endTime:this.endTime})
	  		axios.post(this.biz.serverUrl+'/recommendhistory/barChart?'+param).then(this.handleGetBarLineWeekSucc.bind(this)).catch(this.handleGetBarLineWeekErr.bind(this))
		},
		handleGetBarLineWeekSucc(res){
			let that = this;
	  		if(res.data.code == 404){
	  			that.$router.push({path:'/'})
	  		}
	  		else if(res.data.code == 200){
	  			console.log(res)
	  			that.xBarRecommendClickData = res.data.element.xBarRecommendClickData;
				that.xBarRecommendClickUserData = res.data.element.xBarRecommendClickUserData;
	  			that.yBarCount = res.data.element.yBarRecommendClickNum;
	  			that.yBarPeop = res.data.element.yBarRecommendClickUserNum;
	  			
	  			that.option.xAxis[0].data= that.xBarRecommendClickData;
	  			that.option.series[0].data = that.yBarCount;
	  			that.option.series[1].data = that.yBarPeop;
	  			that.myChart.setOption(that.option);
	  		}
		},
		handleGetBarLineWeekErr(){},
		handleBarmonthData(){
			this.isWeek = false;
			this.isMouth = true;
			this.isDay = false;
	  		this.startTime = this.fun_date(-30);
	  		let token = localStorage.token;
	  		let time = new Date().getTime();
	  		this.endTime = this.getTimer(time);
	  		console.log(this.endTime)
	  		let param = qs.stringify({token:token,startTime:this.startTime,endTime:this.endTime})
	  		axios.post(this.biz.serverUrl+'/recommendhistory/barChart?'+param).then(this.handleGetBarLineMonSucc.bind(this)).catch(this.handleGetBarLineMonErr.bind(this))
		},
		handleGetBarLineMonSucc(res){
			let that = this;
	  		if(res.data.code == 404){
	  			that.$router.push({path:'/'})
	  		}
	  		else if(res.data.code == 200){
	  			console.log(res)
	  			that.xBarRecommendClickData = res.data.element.xBarRecommendClickData;
				that.xBarRecommendClickUserData = res.data.element.xBarRecommendClickUserData;
	  			that.yBarCount = res.data.element.yBarRecommendClickNum;
	  			that.yBarPeop = res.data.element.yBarRecommendClickUserNum;
	  			
	  			that.option.xAxis[0].data= that.xBarRecommendClickData;
	  			that.option.series[0].data = that.yBarCount;
	  			that.option.series[1].data = that.yBarPeop;
	  			that.myChart.setOption(that.option);
	  		}
		},
		handleGetBarLineMonErr(){},
		handlegetRandomData(data){
			console.log(data)
		  	this.startTime = data[0];
		  	this.endTime = data[1]+' 23:59:59';
		  	console.log(this.endTime)
		  	let token = localStorage.token;
		  	let param = qs.stringify({token:token,startTime:this.startTime,endTime:this.endTime})
	  		axios.post(this.biz.serverUrl+'/recommendhistory/barChart?'+param).then(this.handleGetBarLineRanSucc.bind(this)).catch(this.handleGetBarLineRanErr.bind(this))
		},
		handleGetBarLineRanSucc(res){
			let that = this;
	  		if(res.data.code == 404){
	  			that.$router.push({path:'/'})
	  		}
	  		else if(res.data.code == 200){
	  			console.log(res)
	  			that.xBarRecommendClickData = res.data.element.xBarRecommendClickData;
				that.xBarRecommendClickUserData = res.data.element.xBarRecommendClickUserData;
	  			that.yBarCount = res.data.element.yBarRecommendClickNum;
	  			that.yBarPeop = res.data.element.yBarRecommendClickUserNum;
	  			
	  			that.option.xAxis[0].data= that.xBarRecommendClickData;
	  			that.option.series[0].data = that.yBarCount;
	  			that.option.series[1].data = that.yBarPeop;
	  			that.myChart.setOption(that.option);
	  		}
		},
		handleGetBarLineRanErr(){},
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
			window.open(this.biz.serverUrl+'/recommendhistory/exportBarClickData?'+param)
		}
	},
	mounted(){
		this.getData();
		let that = this;
		this.myChart = echarts.init(document.getElementById('BarechartContainer'));		
			this.option = {
			    tooltip:{
		        show: true,
		        trigger: 'item'
		    	},
			    legend: {
			        data:['次数','人数'],
			        selectedMode:'single',
			    },
			    grid: {
			    	width:'95%',
			        left: '5%',
			        right: 0,
			        bottom: 0,
			        containLabel: true
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            mark : {show: true},
//			            dataView : {show: true, readOnly: false},
			//          magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
//			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',			            
			            axisLabel: {
						    interval:0,//横轴信息全部显示
						    rotate:35,//60度角倾斜显示				
		//				  	formatter:function(val){
		//				     	return val.split("").join("\n");
		//				    }//横轴信息文字竖直显示
					},
						data:this.xBarRecommendClickData
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value'
			        }
			    ],
			    series : [ 
			    	 {
			            name:'次数',
			            type:'bar',
			            stack: '总量',
			            barWidth: 40, 
			            itemStyle: {
			                normal: {                   // 系列级个性化，横向渐变填充
			                    borderRadius: 5,
			                    color:'#3AB1FF',
			                    label : {
			                        show : true,
			                        position: 'top',
			                        textStyle : {
			                            fontSize : '20',
			                            fontFamily : '微软雅黑',
			                            fontWeight : 'bold'
			                        }
			                    }
			                }
			            },
			            data:this.yBarCount,
			            markLine : {
			                data : [
			                    {type : 'average', name : '平均值'},
			                    {type : 'max'},
			                    {type : 'min'}
			                ]
			            }
			        },
			        {
			            name:'人数',
			            type:'bar',
			            barWidth: 40,                   // 系列级个性化，柱形宽度
			            itemStyle: {
			                normal: {                   // 系列级个性化，横向渐变填充
			                    borderRadius: 5,
			                    color:'#1BBC9B',
			                    label : {
			                        show : true,
			                        position: 'top',
			                        textStyle : {
			                            fontSize : '20',
			                            fontFamily : '微软雅黑',
			                            fontWeight : 'bold'
			                        }
			                    }
			                }
			            },
			            data:this.yBarPeop,
			            markLine : {
			                data : [
			                    {type : 'average', name : '平均值'},
			                    {type : 'max'},
			                    {type : 'min'}
			                ]
			            }
			        }
			    ]
			};
			this.myChart.setOption(this.option);
			this.myChart.on('legendselectchanged', function (params) {
                  var name = params.name; 
                  if (name == "次数"){ 
                      that.option.xAxis[0].data = that.xBarRecommendClickData;
                      //option.xAxis[1].show = 'true';
                      }else{
                      	 that.option.xAxis[0].data = that.xBarRecommendClickUserData;
                      }
                       that.myChart.setOption(that.option);
			})
		}
	
}
</script>

<style scoped>
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