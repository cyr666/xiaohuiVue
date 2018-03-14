<template>
	<div class = "RecommendCon">
		<div class = "Recommendtitle">
			<span class = "RecommendlineSymbol"></span>
			<span class = "RecommendindexWord" >推荐管理-列表</span>
		</div>
		<div class="p10">
			<div class="border">
				<el-row class="p10" style="padding-bottom:0">
					<el-col :span="24" align="left">
						<span   class = "newadd" style='width:110px' @click = 'handleAdd'><i class="el-icon-plus"></i> 新增推荐</span>	
						</el-input>
						<el-input
						  placeholder="请输入创建人/推荐名称"
						  v-model="search"
						  style='width:200px;margin-left:20px;height:30px;border-radius: 6px;'
						  clearable>
						</el-input>
						<span class = "Re-search" @click="searchQ"><i class="el-icon-search"></i>&nbsp;查询</span>
					</el-col>
				</el-row>						
		<div class="pt10"> 
					<el-table :data="recommendData" border style="width: 100%;overflow-x:visible;" @selection-change="selsChange" stripe class='tablebtn'>    
						<el-table-column
							type="selection"
							width="30"
              				align="center">
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
							prop="createName"
							label="创建人"
							align="center"
              				:resizable="resizeable">
						</el-table-column>
						<el-table-column
							prop="createTime"
							label="创建时间"
							align="center"
              				:resizable="resizeable">
						</el-table-column>
						<el-table-column
							prop="name"
							label="推荐名称"
							align="center"
              				:resizable="resizeable">
						</el-table-column>
						<el-table-column
							prop="img"
							label="图片"
							align="center"
              				:resizable="resizeable">
              				<template slot-scope="scope">
							   <img  :src="scope.row.img" alt="" style="width: 50px;height: 50px" class = "images"/>
							</template>
						</el-table-column>
						<el-table-column
							prop="status"
							label="状态"
							align="center"
              				:resizable="resizeable">
              				 <template scope="scope">
					            <span ref = "isStatus" v-bind:class="{active: (scope.row.status === '未上架')}">{{ 									scope.row.status}}</span>
					      	</template>
						</el-table-column>
						<el-table-column
							prop="status"
							label="操作"
				            width="170"
				            align="center"
				            :resizable="resizeable">
							<template slot-scope="scope">
								<!--<el-button type="primary" size="mini" @click="handlePutaway(scope.row)" style='width:25px' ></el-button>-->
								<span  class = "isPut" @click = "handleClick(scope.row)">{{scope.row.status=='已上架'?'下架':'上架' }}</span>
								<el-button type="danger" size="mini"  @click="handleEdit(scope.$index, scope.row)" style='width:25px'>编辑</el-button>
								<el-button type="danger" size="mini"  @click="handleDelete(scope.$index, scope.row)" style='width:25px'>删除</el-button>
							</template>
						</el-table-column>
					</el-table>
          <el-button type="warning" size="mini" class = "del" @click="delGroup" :disabled="this.sels.length == 0" style='margin:15px;padding:7px 15px'>批量删除</el-button>
					<!-- 分页 -->
					<el-pagination
            background
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="currentPage"
						:page-size="pageSize"
						:page-sizes="[15, 30]"
						layout="total, sizes, prev, pager, next, jumper"
						:pageCount="pageCount"
            :total="totalRows" style="padding:15px 0;text-align: center;background:#fff;">
					</el-pagination>
				</div>
			</div> 
		</div>
	</div>
</template>

<script>
	import qs from 'qs';
	import axios from "axios"; 
	export default{		
		data(){
			return{
				recommendData:[
					{
						createName:'张三',
						createTime:'2018-1-2 20:23:34',
						name:'recommendName',
					    status:'已上架',
					    img:''
					}					
				],
				isactive:true,
				sels:[],
			    dialogFormVisible: false,
			    pageCount: 1,
			    pageSize: 15,
			    currentPage: 1,
			    totalRows:0,
			    resizeable:false,
			    height:'',
			    isPut:'',
			    search:'',
			    putWay:[]
			}
		},
		mounted(){
			this.getRecoData()
		},
		updated(){
			this.getheight()
		},
		methods:{
			/****************************获取高度***********************************/
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
			/****************************初始化列表***********************************/
			getRecoData(){
				
				let param = qs.stringify({token:localStorage.getItem('token'),page:this.currentPage,rows:this.pageSize,name:this.search})
				axios.post(this.biz.serverUrl+'/recommend/list?'+param).then(this.handleGetReconSucc.bind(this)).catch(this.handleGetReconErr.bind(this))
			},
			handleGetReconSucc(res){
				console.log(res)
				let that = this;
				if(res.data.code == 404){
					that.$router.push({path:'/'})
				}
				if(res.data.code == 200){
					console.log(res)
					that.recommendData = res.data.datas;					
					var fspArr = res.data.fsp.split('|');
					that.totalRows =parseInt(fspArr[0]);
					//that.currentPage = 1;
					//that.img = fspArr[1]+that.recommendData.img
					//console.log(that.recommendData.img)
					that.recommendData.forEach(function(val,index){
						//that.getTimer(val.createTime)
						val.img = fspArr[1]+val.img
						val.createTime = that.getTimer(val.createTime)
						if(val.status){
							
							val.status = '已上架';
							
																				
						}else{
							val.status = '未上架';
							
						}
					})
				}
				
			},
			handleGetReconErr(){
				 this.$message.error('请求失败');
			},
			handleSelectionChange(){},
			handlePutaway(){},
			
			/***********************************编辑**************************************/
			handleEdit(inde,data){
				this.$router.push({path:'/robot/recommendedit',query:{id:data.id}})
				console.log(data)
			},
			/************************************删除****************************************/			
			handleDelete(index, data) {
				console.log(data.id)
		      this.$confirm("", "您确定要删除吗?", {
		        confirmButtonText: "确定",
		        cancelButtonText: "取消",
		        type: "warning",
		        center: true
		      })
		        .then(() => {
		          let that=this;
		          let param=qs.stringify({id:data.id,token:localStorage.getItem("token")})
		          this.axios.post(this.biz.serverUrl+'/recommend/del?'+param).then(function(res){
		            console.log(res)
		             if(res.data.code==404){
		              that.$router.push({path:'/'});
		            } else if(res.data.code==200){
		              that.$message({
		                type:'success',
		                message:'删除成功'
		              })
		              that.getRecoData()	
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
			handleSizeChange(size){
				this.pageSize = size;
			    this.getRecoData();
			},
			handleCurrentChange(currentPage){
				this.currentPage = currentPage;
			    this.getRecoData();
			},
			handleAdd(){
				this.$router.push({path:'/robot/recommendadd'})
			},
			selsChange(sels) {  
            	this.sels = sels  
        	},
        	delGroup() {  
            var ids = this.sels.map(item => item.id).join()//获取所有选中行的id组成的字符串，以逗号分隔 
            console.log(ids)
        	this.$confirm("", "您确定要删除吗?", {
	        confirmButtonText: "确定",
	        cancelButtonText: "取消",
	        type: "warning",
	        center: true
	      }).then(() => {
	          	let that=this;
	          	let param=qs.stringify({ids:ids,token:localStorage.getItem("token")})
	          	this.axios.post(that.biz.serverUrl+'/recommend/del?'+param).then(function(res){
	          	console.log(that.biz.serverUrl+'/recommend/del?'+param)
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
        },
        handleClick(data){
        	this.putWay.length = 0;
        	let that = this;
        	this.recommendData.forEach(function(val,ind){
        		if(val.status == '已上架'){
        			that.putWay.push(1)
        		}
        	});
        	console.log(that.putWay)
        	var rowdata = data;
        	console.log(data)
        	if(data.status=='已上架'){       		
        		that.$confirm("", "您确定要下架吗?", {
		        confirmButtonText: "确定",
		        cancelButtonText: "取消",
		        type: "warning",
		        center: true
		      }).then(()=>{
      	
        		let id = data.id;
        		let status = 0;
        		let param = qs.stringify({token:localStorage.getItem('token'),id:id,status:status})
        			console.log(param)		
        axios.post(that.biz.serverUrl+'/recommend/update?'+param).then(that.handleNoPutSucc.bind(that)).catch(that.handleNoPutErro.bind(that))
      })
//				axios.post(that.biz.serverUrl+'/recommend/update?'+param).then(function(res){
//					rowdata = res.data.element;
//					that.recommendData.push = rowdata
//				})
        	}
			 if(data.status=='未上架'){
			 	if(that.putWay.length==9){
				that.$message.error("推荐位不能超过9个")
			}else{
        		that.$confirm("", "您确定要上架吗?", {
		        confirmButtonText: "确定",
		        cancelButtonText: "取消",
		        type: "warning",
		        center: true
		      }).then(()=>{
		      	let id = data.id;
		      	console.log(id)
        		let status = 1;
        		let param = qs.stringify({token:localStorage.getItem('token'),id:id,status:status});
        console.log(param)		
        axios.post(that.biz.serverUrl+'/recommend/update?'+param).then(that.handleIsPutSucc.bind(that)).catch(that.handleIsPutErro.bind(that))
        }).catch(function(){
        	console.log('上架失败')
        })}
        		        		
        	}
        },
          handleNoPutSucc(res){
        	let that = this;
        	if(res.data.code == 404){
        		that.$message({
		            type: "error",
		            message: "请重新登录"
		        });
        	}
        	if(res.data.code==200){
        		that.putWay.pop('1')
        		that.$message.success('下架成功')
        		//that.$refs.isStatus.innerText = "未上架"
      			that.getRecoData()
				//console.log(that.$refs.isStatus.innerText)
        	}
          },
		handleNoPutErro(){
			this.$message.error('下架失败');
		},
		handleIsPutSucc(res){
			console.log(res)
			let that = this;
			if(res.data.code == 404){
        		that.$message({
		            type: "error",
		            message: "请重新登录"
		        });
        	}
			if(res.data.code == -100){
				that.$message({
		            type: "error",
		            message: "推荐位不能超过9个"
		        });
			}
        	if(res.data.code==200){ 
        		that.putWay.push('1')
        		that.$message.success('上架成功')
        		that.getRecoData()	      		
        	}
		},
		handleIsPutErro(res){
			that.$message.error('上架失败')
//			console.log(res)
		},
		searchQ(){
			let that = this;
			console.log(this.search)
			let name = this.search;
			let param = qs.stringify({token:localStorage.getItem('token'),name:name,page:1,rows:this.pageSize})
			console.log(param)
			axios.post(this.biz.serverUrl+'/recommend/list?'+param).then(this.handleSearchSucc.bind(this)).catch(this.handleSearchErro.bind(this))
		},
		handleSearchSucc(res){
			console.log(res)
				let that = this;
				if(res.data.code == 404){
					that.$router.push({path:'/'})
				}
				if(res.data.code == 200){
					console.log(res)
					that.recommendData = res.data.datas;					
					var fspArr = res.data.fsp.split('|');
					that.totalRows =parseInt(fspArr[0]);
					that.currentPage = 1;
					that.recommendData.forEach(function(val,index){
						val.img = fspArr[1]+val.img
						val.createTime = that.getTimer(val.createTime)
						if(val.status){							
							val.status = '已上架';																				
						}else{
							val.status = '未上架';							
						}
					})
				}
				
		},
		handleSearchErro(){
			
		}
    }
			

	}
</script>

<style >
	.Recommendtitle{
		/*width:100%;*/
		height:70px;
		line-height:70px;
		border:1px solid #ccc;
		padding-left: 35px;
	}
	.RecommendlineSymbol{
		border:3px solid #de3039;
		background:#de3039;		
		font-size:26px;
		line-height: 70px;
    }
	.RecommendindexWord{
		font-size:20px;
		line-height:70px;
		display: inline-block;
		margin-left: 10px;
		color:#666666
	}
	.RecommendCon .el-button--default{
		background:#DF2F3A !important;
		color:#fff !important;
		border-radius: none !important;
		padding:12px 8px !important;
		border-radius:0px	!important;}
	.tablebtn .el-button--primary{
		color:#666 !important
	}
	.del{
		float:left;
		margin:15px;		
	}
	.RecommendCon .el-button--mini, .el-button--mini.is-round{
		padding:0
	}
	.images{
		width:50px;
		height:50px;
		border:1px solid #ccc;
	}
	.active{
		color:red
	}
	.isPut{
		cursor: pointer;
		display: inline-block;
		margin-right:5px
	}
	.newadd{
		width:10px;
		height:35px;
		background:#df2f3a;
		color:#fff;
		display: inline-block;
		text-align: center;
		line-height: 35px;
		border-radius: 5px;
		font-size: 14px;
		cursor: pointer;
	}
	.newadd:hover{
		background:#FF585F;
		opacity: 0.5;
	}
	.Re-search{
		width:80px;
		height:33px;
		border:1px solid #d1d1d1;
		display: inline-block;
		text-align: center;
		line-height: 33px;
		border-radius: 5px;
		background:#eeeeee;
		margin-left: 17px;
		cursor: pointer;
	}
	.Re-search:hover{
		background:#df2f3a;
		color:#fff
	}
	.el-input__suffix {	   
	    position: absolute;
	    top: 5px;
	    -webkit-transition: all .3s;
	    height: 100%;
	    color: #c0c4cc;
	    text-align: center;
	}
	.el-input__inner {    
    	height: 36px;
    }
</style>