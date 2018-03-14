<template>
	<div class = "solutionSet-con">
		<div class = "solutionSet">
			<span class = "lineSymbol"></span>
			<span class = "solutionWord">解答管理</span>
		</div>
		<div class = "bottom-box">
			<el-row class="p10" style="padding-bottom:0;">
					<el-col :span="24" align="left">
						<el-col :span='5' style="margin-right:15px;">
							<el-input placeholder="请输入问题/回答" v-model="search" class="search-input" style = "margin:22px 2px" clearable>								
							</el-input>
						</el-col>
						<div class = "calendar-time"><Calendar class = "S-canlendar" v-on:listenEvent="handleGetCalendar"/></div>
						<div class = "queEst" @mouseenter="handlestatusShow" @mouseleave="handlestatusHide">
						  <span class="el-dropdown-link  estimate" >
						    <i class="el-icon-warning el-icon--left"></i>回答来源
						  </span>
						  <ul class = "choose-box" v-if='status_isshow'>
						  	<li style='width:99px;border-color:1px solid #000;color:#777;text-align: left;'>&nbsp;&nbsp;请选择</li>
						  	<li style = "border-top:1px solid #e0e0e0;"><el-radio v-model="radio8" label=" "  style='width:90px;text-align: left;margin-left: 5px;' @change = "handleisKeycontent">取消选择</el-radio></li>
						  	<li style = "border-top:1px solid #e0e0e0;"><el-radio v-model="radio8" label="1"  style='width:90px;text-align: left;margin-left: 5px;' @change = "handleisKeycontent">本地</el-radio></li>
						  	<li style = "border-top:1px solid #e0e0e0;"><el-radio v-model="radio8" label="0"  style='width:90px;text-align: left;margin-left: 5px;' @change = "handleisKeycontent">图灵</el-radio></li>
						  </ul>
						</div>
						<div class = "queEst" @mouseenter="handleShow" @mouseleave="handleHide">
						  <span class="el-dropdown-link  estimate" >
						    <i class="el-icon-tickets el-icon--left"></i>反馈状态
						  </span>
						  <ul class = "choose-box" v-if='isshow'>
						  	<li style='width:98px;border-color:1px solid #000;color:#777;text-align: left;'>&nbsp;&nbsp;请选择</li>
						  	<li style = "border-top:1px solid #e0e0e0;"><el-radio v-model="radio7" label=" "  style='width:90px;text-align: left;margin-left: 5px;' @change = "handleIsUse">取消选择</el-radio></li>
						  	
						  	<li style = "border-top:1px solid #e0e0e0;"> <el-radio v-model="radio7" label="1" style='width:90px;text-align: left;margin-left: 5px;' @change = "handleIsUse">有用</el-radio></li>
						  	<li style = "border-top:1px solid #e0e0e0;"><el-radio v-model="radio7" label="2"  style='width:90px;text-align: left;margin-left: 5px;' @change = "handleIsUse">没用</el-radio></li>
						  	<li style = "border-top:1px solid #e0e0e0;"><el-radio v-model="radio7" label="0"  style='width:90px;text-align: left;margin-left: 5px;' @change = "handleIsUse">未表态</el-radio></li>
						  </ul>
						</div>
						<el-button  @click = 'getSearchTableData'  class = "el-search">查询</el-button>
						
						<div class = "upLoads" @click = "handleUpload">
						  <span class="el-dropdown-link  estimate" >
						    <i class="el-icon-upload el-icon--left"></i>导出
						  </span>
						</div>
					</el-col>
				</el-row>
				<div class="pt10">
					<el-table :data="tableData" border style="width: 100%; text-align:center;overflow-x: visible;"  class = "tablebtn" stripe @selection-change="selsChange" ref="table" @row-click = "handleKbmEdit">    
						<el-table-column
							type="selection"
							width="30"
							align="center"
													
						>
						</el-table-column>
						<el-table-column
							type="index"
							label="序号"
							label-class-name = "colum"
              :resizeable='resizeable'
              align="center"
							>
							</el-table-column>
						<el-table-column
							prop="userid"
							label="用户"
							align="center"
							
							>
						</el-table-column>
						<el-table-column
							prop="createTime"
							label="创建时间"
							align="center"
							
							>
						</el-table-column>
						<el-table-column
							prop="info"
							label="问题"
							align="center"
							
							>
						</el-table-column>
						<el-table-column
							prop="recontent"
							label="回答"
							align="center"
							
							>
						
						</el-table-column>
						<el-table-column
							prop="isKeycontent"
							label="回答来源"
							align="center"
							
							>
						
						</el-table-column>
						<el-table-column
							prop="isUse"
							label="反馈状态"
							align="center"
							
							>
						</el-table-column>
						
						<el-table-column
							prop="handle"
							label="操作"
							align="center"
							>
							<template slot-scope="scope">
								<span style='display:inline-block;cursor:pointer;width:35px;text-align: center;' @click="handlePvw(scope.$index, scope.row)">预览</span>
								<span style='display:inline-block;cursor:pointer;width:35px;text-align: center;' @click="handleDelete(scope.$index, scope.row)">删除</span>
							</template>
						</el-table-column>						
					</el-table>
					<el-button type="warning" size="mini" class = "del" @click="delGroup" :disabled="this.sels.length === 0">批量删除</el-button>
					<!--disabled值动态显示，默认为true,当选中复选框后值为false--> 
					<!-- 分页 -->
					<el-pagination						
				      @size-change="handleSizeChange"
				      @current-change="handleCurrentChange"
				      :current-page="currentPage"
				      :page-sizes="[15, 30]"
				      :page-size="pageSize"
				      layout="total, sizes, prev, pager, next, jumper"
				      :total="totalRows"
				      style="margin:15px auto;text-align: center">
				    </el-pagination>
				</div> 				
		</div>
	</div>
</template>

<script>
	import Calendar from './date'
	import qs from 'qs';
	import axios from "axios"; 
	export default {
	  	data() {
		    return {
      resizeable:false,
		    	
		    	 sels: [],
		    	radio8:'',
		    	radio7: '',
		    	currentPage:1,
		    	pageSize:10,
		      search: '',
		      lableUse:'',
		      lableSource:'',
		      tableData:[],
		      isshow:false,
		      status_isshow:false,
		      dialogStatus: "",
		      dialogFormVisible: false,
		      pageCount: 1,
		      pageSize: 15,
		      currentPage: 1,
		      totalRows:0,
		      height:'',
		      startTime:'',
		      endTime:'',
		      flugUse:true,
		      flugSource:true
		    }
		},
		components:{
			'Calendar':Calendar
		},
		create(){
			
		},
		mounted(){
			this.getTableData();
		},
		methods:{
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
			handleKbmEdit(row){
//				console.log(row.info,row.recontent)
//				this.$router.push({path: '/robot/solutionkbmEdit?token=f26eo4sO7AajE',query:{question:row.info,answer:row.recontent}})
			},
			
			handleShow(){
				this.isshow = true
			},
			handleHide(){
				this.isshow = false
			},
			handlestatusShow(){
				this.status_isshow = true
			},
			handlestatusHide(){
				this.status_isshow = false
			},
			handleUpload(){
				let startTime = this.startTime;
			  	let endTime = this.endTime ;
			  	let token = localStorage.token;
			  	let param = qs.stringify({token:token,startTime:startTime,endTime:endTime})
	//	  		axios.post(this.biz.serverUrl+'/chat/pieChart?'+param).then(this.handleGetPieRanSucc.bind(this)).catch(this.handleGetPieRanErr.bind(this))
				console.log(this.biz.serverUrl+'/chat/chatRecordExport?'+param)
				window.open(this.biz.serverUrl+'/chat/chatRecordExport?'+param)
			},
			handlePvw(index,data){
				this.$router.push({path: '/robot/solutionpvw',query:{id:data.id}})
			},
	handleDelete(index, data) {
      this.$confirm("", "您确定要删除吗?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          let that=this;
          let param=qs.stringify({ids:data.id,token:localStorage.getItem("token")})
          this.axios.post(this.biz.serverUrl+'/chat/delete?'+param).then(function(res){
            console.log(res)
             if(res.data.code==404){
              that.$router.push({path:'/'});
            } else if(res.data.code==200){
              that.$message({
                type:'success',
                message:'删除成功'
              })
              that.getTableData()	
            }else{
              that.$message({
                type:'error',
                message:'删除失败'
              })
            }
          }).catch(function(res){
            console.log(res)
            that.$message({
              type:'error',
              message:'删除失败'
            })
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
		    handleSizeChange(size) {
			    this.pageSize = size;
			    this.getTableData();
			},
			handleCurrentChange(currentPage) {
			    this.currentPage = currentPage;
			    this.getTableData();
			},
		    getTableData(){
		    	let isUse = this.lableUse;
		  		let isKeycontent = this.lableSource
		    	let that = this;
		    	let token = localStorage.getItem('token')
			   	let param = qs.stringify({token:token,page:this.currentPage,rows:this.pageSize,isUse:this.lableUse,isKeycontent:this.lableSource})
			   	console.log(isUse)
		        axios.get(this.biz.serverUrl+'/chat/list?'+param).then(this.handleGetData.bind(this)).catch(this.handleError.bind(this))
		    },
			handleGetData(res) {
				
				let that = this;
				if(res.data.code == 404){
					that.$router.push({path:'/'})
				}
				if(res.data.code == 200){
					console.log(res.data.datas)
					that.tableData = res.data.datas;
					that.currentPage=res.data.fsp.page;
			        that.pageCount=res.data.fsp.totalPages;
			        that.totalRows=res.data.fsp.totalRows
					that.tableData.forEach(function(value,index){
						value.createTime = that.getTimer(value.createTime)
						if(value.isUse == 0){
							value.isUse = "未表态"
						}else if(value.isUse == 1){
							value.isUse = "有用"
						}else if(value.isUse == 2){
							value.isUse = "没用"
						}
						if(value.isKeycontent == 0){
							value.isKeycontent = '图灵'
						}else if(value.isKeycontent == 1){
							value.isKeycontent = '本地'
						}
						if(!value.userid){
							value.userid = "-"
						}
						if(!value.recontent){
							value.recontent = "-"
						}
					})
					
				}else{
					console.log(res)
				}
				
			},
			handleError() {
			console.log('请求失败')
		  },
		  getSearchTableData(){
		  	let isUse = this.lableUse;
		  	let isKeycontent = this.lableSource
		  	let param = qs.stringify({token:localStorage.getItem('token'),page:this.currentPage,rows:this.pageSize,queryItem:this.search,isKeycontent:isKeycontent,isUse:isUse,startTime:this.startTime,endTime:this.endTime})
		  	console.log(this.biz.serverUrl+'/chat/list?'+param)
		  	axios.get(this.biz.serverUrl+'/chat/list?'+param).then(this.handleSearchDataSucc.bind(this)).catch(this.handleSearchDataError.bind(this))
		  },
		  handleSearchDataSucc(res){
		  	console.log("123",res)
		  	let that = this;
				if(res.data.code == 404){
					that.$router.push({path:'/'})
				}
				if(res.data.code == 200){
					that.tableData = res.data.datas;
					that.currentPage=res.data.fsp.page;
			        that.pageCount=res.data.fsp.totalPages;
			        that.totalRows=res.data.fsp.totalRows
					that.tableData.forEach(function(value,index){
						value.createTime = that.getTimer(value.createTime)
						if(value.isUse == 0){
							value.isUse = "未表态"
						}else if(value.isUse == 1){
							value.isUse = "有用"
						}else if(value.isUse == 2){
							value.isUse = "没用"
						}
						if(value.isKeycontent == 0){
							value.isKeycontent = '图灵'
						}else if(value.isKeycontent == 1){
							value.isKeycontent = '本地'
						}
						if(!value.userid){
							value.userid = "-"
						}
					})
					
				}else{
					console.log(res)
				}
		  },
		  handleSearchDataError(res){
		  	this.$message({
            type: "error",
            message: "请重新登录"
          });
		  },
		  handleIsUse(lable){
//		  	this.flugUse = false
//		  	if(lable==1&&this.flugUse){
//		  		that.radio7 = '4'
//		  	}
		  	this.lableUse = lable;
//		  	this.flugUse = true
		  },
		  handleGetCalendar(data){
		  	console.log(data)
		  	this.startTime = data[0];
		  	this.endTime = data[1]+" "+"23:59:59";
		  	console.log(this.startTime,this.endTime)
		  },
		  handleisKeycontent(lable){
		  	this.lableSource = lable
		  	console.log(this.lableSource)
		  },
//		handleNoChoose(lable){
//			
//		},
		// 获取选中的row
		selsChange(sels) {  
            this.sels = sels  
        },
        
		// ******批量删除*******
        delGroup() {  
            var ids = this.sels.map(item => item.id).join()//获取所有选中行的id组成的字符串，以逗号分隔  
        	this.$confirm("", "您确定要删除吗?", {
	        confirmButtonText: "确定",
	        cancelButtonText: "取消",
	        type: "warning",
	        center: true
	      }).then(() => {
	          	let that=this;
	          	let param=qs.stringify({ids:ids,token:localStorage.getItem("token")})
	          	this.axios.post(this.biz.serverUrl+'/chat/delete?'+param).then(function(res){
            	console.log(res)
            	if(res.data.code==200){
                that.$message({
                type:'success',
                message:'删除成功'
                })
                that.getTableData()	
            	}else{
                that.$message({
	                type:'error',
	                message:'删除失败'
                })
            }
          }).catch(function(res){
            console.log(res)
            that.$message({
              type:'error',
              message:'删除失败'
            })
          })
        }).catch(() => {
          	this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
        }
		
    },
    updated(){
    	this.getheight()
    }
    
}
</script>

<style scoped>
	.solutionSet-con .el-button--default{
		background-color: #EFEEEC !important;
		color:#000 !important;
		width:75px !important;
		padding: 12px 5px !important;
		margin-top:20px !important;
		margin-left:5px !important;
		border: none !important;	
	}
	/*.solutionSet-con .el-button--primary{
	background-color: #de3039 !important;
	border-color: #de3039 !important;
	color:#fff !important;	
}*/
	.del{
		/*position: relative;*/
		float:left;
		margin:15px;
		
	}
	.calendar-time{
		float:left;
		margin-top:22px;
		margin-left:-8px;
	}
	.solutionSet{
		/*width:100%;*/
		height:70px;
		line-height:70px;
		border:1px solid #ccc;
		padding-left: 35px;
	}
	.lineSymbol{
		border:3px solid #de3039;
		background:#de3039;		
		font-size:26px;
		line-height: 70px;
    }
	.solutionWord{
		font-size:20px;
		line-height:70px;
		display: inline-block;
		margin-left: 10px;
		color:#666666
	}
	.bottom-box[data-v-9c30157a] {
	    border:1px solid #ccc;
	    border: 1px solid #ccc;
	    margin: 20px 40px;
    }
	.table-header{
		/*width:100%;*/
		height:85px;
	}
	.solutionSet-con{
		background:#f6f8f9;
	}
	.estimate{
		background:#eeeeee;
		color:#666;
		display:inline-block;
		width:90px;
		height:37px;
		text-align: center;
		line-height:36px;
		border-radius: 5px;
	}
	.queEst{
		float:left;
		position:relative;
		margin-top:21px;
		margin-left:5px;
		cursor:pointer;
		width:90px
	}
	.upLoads{
		float:left;
		margin-top:-1px;
		/*margin-left:-14px;*/
		cursor:pointer;
		width:90px
	}
	.choose-box{
		position:absolute;
		z-index: 999;
		width:88px;
		border:1px solid #ccc;
		background:#fff;
	}
	.choose-box li{
		line-height: 36px;
		width:90px;
		/*text-align: center;*/
	}
	.Scolum{
		text-align: center;
	}
	.tablebtn.el-table .cell{
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}
	.el-table__row td{
		height: 56px !important;
	}
	 .el-table__body-wrapper {
		overflow: initial !important;
    	position: relative !important;
}
	.block{
		height:50px;
	}
	.el-input__prefix, .el-input__suffix {
	    position: absolute;
	    top: 5px;
	    -webkit-transition: all .3s;
	    height: 100%;
	    color: #c0c4cc;
	    text-align: center;
	}
	.el-button:hover {
	    color: #fff !important;
	    border-color: #c6e2ff !important;
	    background-color: #F71428 !important;
	}
</style>