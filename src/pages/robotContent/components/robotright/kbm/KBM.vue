<template>
	<div class="kbmBox borderBox">
    <div class = "indextitle">
			<span class = "lineSymbol"></span>
			<span class = "indexWord">知识库管理-列表</span>
		</div>
		<div class="p10">
			<div class="border">
				<el-row class="p10 btn" style="padding-bottom:0">
					<el-col :span="24" align="left">
						<el-col :span='7' style="margin-right:15px;">
							<el-input placeholder="请输入问题" v-model="search" class="search-input">
								<!--<el-button slot="append" icon="el-icon-search" @click="searchQ()">搜索</el-button>-->
							</el-input>
						<!--<span class = 'searchQ'>查询</span>-->
						</el-col>
						
						<div class = "create-con"  @mouseenter = "handleCreateUserisShhow" @mouseleave="handleCreateUserNoShhow">
						<div class="triangle_border_down">
						    <span></span>
						</div>
						  <span >
						    &nbsp;&nbsp;创建人
						  </span>
						  <ul class = "choose-box" v-if = "isShow">
						  	<li style='width:99px;border-color:1px solid #000;color:#777;text-align: left;'>&nbsp;&nbsp;请选择</li>
						  	<li style = "border-top:1px solid #e0e0e0;"><el-radio v-model="radio8" label="-1"  style='width:90px;text-align: left;margin-left: 11px;' @change = "handleisKeycontent">取消选择</el-radio></li>
						  	<li v-for = '(item,index) in createUser' style='text-align: left;'><el-radio v-model="radio8" :label='index' border style='width:99px;border-color:1px solid #000;' @change = "handleisKeycontent">{{item}}</el-radio></li>
						  	<!--<li><el-radio v-model="radio8" label="0" border style='width:90px' @change = "handleisKeycontent">图灵</el-radio></li>-->
						  </ul>
						</div>
						<span class = "searchQ" @click="searchQ()">查询</span>
						<el-button type="primary" size="medium" @click="handleCreate()">添加问题</el-button>
			
            <el-upload
              class="upload-demo"
              :action="excelUrl"
              :show-file-list='showFileList'
              :before-upload="beforeAvatarUpload"
              :on-progress='showProgress'
              :on-change="handleChange"
              :on-success="handleAvatarSuccess"
              :on-error="handleAvatarError" ref='export'>
              <el-button size="medium" type="primary">导入</el-button>
            </el-upload>
						<!-- <el-button type="primary" size="medium" @click="exportExcel()">导出</el-button> -->
						<el-button type="primary" size="medium" @click="handleDownload()" :loading="downloadLoading">导出</el-button>
						<el-button type="primary" size="medium" @click="exportTemplate()" :loading="downloadLoadingTem">下载导入模板</el-button>
					</el-col>
				</el-row> 
				<div class="pt10"> 
					<el-table :data="tableData" border style="width: 100%;" @selection-change="handleSelectionChange" stripe class='tablebtn'>
						
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
							prop="info"
							label="问题"
							align="center"
              :resizable="resizeable">
						</el-table-column>
						<el-table-column
							prop="recontent"
							label="答案"
							align="center"
              :resizable="resizeable">
						</el-table-column>
						<el-table-column
							prop="info2"
							label="相似问题1"
							align="center"
              :resizable="resizeable">
						</el-table-column>
						<el-table-column
							prop="info3"
							label="相似问题2"
							align="center"
              :resizable="resizeable">
						</el-table-column>
						<el-table-column
							prop="info4"
							label="相似问题3"
							align="center"
              :resizable="resizeable">
						</el-table-column>
						<el-table-column
							prop="info5"
							label="相似问题4"
							align="center"
              :resizable="resizeable">
						</el-table-column>
						<el-table-column
							prop="info6"
							label="相似问题5"
							align="center"
              :resizable="resizeable">
						</el-table-column>
						<el-table-column
							prop="operation"
							label="操作"
              width="170"
              align="center"
              :resizable="resizeable">
							<template slot-scope="scope">
								<span class = "operation-span" @click="handlePvw(scope.row)">预览 &nbsp;</span>
								<span class = "operation-span" @click="handleUpdate(scope.row)">修改 &nbsp;</span>
								<span class = "operation-span" @click="handleDelete(scope.$index, scope.row)">删除</span>
							</template>
						</el-table-column>
					</el-table>
          <el-button type="warning" size="mini" class = "del" @click="delGroup" :disabled="this.multipleSelection.length == 0" style='margin:15px;'>批量删除</el-button>
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
        <el-dialog title="导入" :visible.sync="dialogFormVisible" :close-on-click-modal='false'>					
					<el-progress :text-inside="true" :stroke-width="18" :percentage="percentage" status="exception"></el-progress>
				</el-dialog>
			</div>
		</div>      
	</div>
</template>
 
<script>
import "./kbm.css";
import qs from 'qs'
import axios from 'axios'
export default {
  data() {
    return {
      search: "",
      tableData: [],
      resizeable:false,
      showFileList:false,
      excelUrl:this.biz.serverUrl+'/key/importExcel?token='+localStorage.getItem("token"),
      rules1: [{ required: true, message: "请输入常见问题", trigger: "blur" }],
      multipleSelection: [],
      dialogFormVisible: false,
      pageCount: 1,
      pageSize: 15,
      currentPage: 1,
      totalRows:0,
      downloadLoading: false,
      downloadLoadingTem:false,
      filename: 'robotKnowledge',
      exportList:[],
      percentage:0,
      interval:null,
      height:'',
      createUser:[],
      createUserId:[],
      radio8:'',
      isShow:false,
      clickUserId:''
    };
  },
  mounted() {
    this.list();
    this.userList()
  },
  created() {
   
  },
   updated(){
    	this.getheight()
   },
  methods: {
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
	handlePvw(data){
		this.$router.push({path:'/robot/kbmpvw',query:{id:data.id}})
	},
	handleCreateUserisShhow(){
		this.isShow = true
	},
	handleCreateUserNoShhow(){
		this.isShow = false
	},
	handleisKeycontent(lable){
		let that = this;
		if(lable!='-1'){
			that.clickUserId = that.createUserId[lable]
		}else{
			console.log(lable)
			that.clickUserId = ""
		}
		
	},
	userList(){
		let that=this;
        let param=qs.stringify({token:localStorage.getItem("token")})
        axios.post(this.biz.serverUrl+'/user/listAll?'+param).then(this.handleGetUser.bind(this)).catch(this.handleGetUserErro.bind(this))
	},	
	handleGetUser(res){
		console.log(res.data.datas)
		let that = this;
		let nickName = res.data.datas;
		nickName.forEach(function(val,ind){
			that.createUser.push(val.nickName);
			that.createUserId.push(val.id)
		})
		console.log(that.createUser,that.createUserId)
	},
	handleGetUserErro(){},
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
          let param=qs.stringify({id:data.id,token:localStorage.getItem("token")})
          this.axios.post(this.biz.serverUrl+'/key/del',param,this.biz.urlencodedConfig).then(function(res){
          	if(res.data.code == 404){
		  		that.$router.push({path:'/'});
		  	}else if(res.data.code==200){
              that.$message({
                type:'success',
                message:'删除成功'
              })
              that.list()
            }else{
              that.$message({
                type:'error',
                message:'删除失败'
              })
            }
          }).catch(function(res){
            // console.log(res)
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
    delGroup(){
      this.$confirm("", "您确定要删除吗?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          let that=this;
          let ids=''
          this.multipleSelection.forEach(function(v,i){
              if(i==that.multipleSelection.length-1){
                  ids+=v.id
              }else{
                  ids+=v.id+','
              }
          })
          let param=qs.stringify({ids:ids,token:localStorage.getItem("token")})
          this.axios.post(this.biz.serverUrl+'/key/del',param,this.biz.urlencodedConfig).then(function(res){
          	if(res.data.code == 404){
		  		that.$router.push({path:'/'});
		  	}else if(res.data.code==200){
              that.$message({
                type:'success',
                message:'删除成功'
              })
              that.list()
            }else{
              that.$message({
                type:'error',
                message:'删除失败'
              })
            }
          }).catch(function(res){
            // console.log(res)
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
      this.list()
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.list()
		},
    handleCreate() {
			this.$router.push({path: '/robot/kbmAdd'})
    },
    handleUpdate(row) {
			this.$router.push({path: '/robot/kbmEdit',query:{id:row.id}})
    },
    list(){
      let that=this;
      let param=qs.stringify({page:this.currentPage,rows:this.pageSize,info:this.search,token:localStorage.getItem("token")})
      this.axios.post(this.biz.serverUrl+'/key/list',param,this.biz.urlencodedConfig).then(function(res){    
      	if(res.data.code == 404){
		  		that.$router.push({path:'/'})
		  	}else if(res.data.code==200){
		  		var kbmtableData = res.data.datas;
		  		kbmtableData.forEach(function(val,ind){
		  			if(!val.createName){
		  				val.createName = "-"
		  			}
		  			if(!val.info2){
		  				val.info2 = "-"
		  			}
		  			if(!val.info3){
		  				val.info3 = "-"
		  			}
		  			if(!val.info4){
		  				val.info4 = "-"
		  			}
		  			if(!val.info5){
		  				val.info5 = "-"
		  			}
		  			if(!val.info6){
		  				val.info6 = "-"
		  			}
		  		})
			  that.tableData=kbmtableData
	          that.currentPage=res.data.fsp.page;
	          that.pageCount=res.data.fsp.totalPages;
	          that.totalRows=res.data.fsp.totalRows
	        }
      }).catch(function(res){
        // console.log(res)
      })
    },
    searchQ(){
      let that=this;
      let param=qs.stringify({page:this.currentPage,rows:this.pageSize,info:this.search,token:localStorage.getItem("token"),createId:this.clickUserId})//,createId:this.clickUserId
   
    console.log(param)
   this.axios.post(this.biz.serverUrl+'/key/list',param,this.biz.urlencodedConfig).then(function(res){
      	if(res.data.code == 404){
		  		that.$router.push({path:'/'})
		  	}else if(res.data.code==200){
		  		var kbmtableData = res.data.datas;
		  		
		  		kbmtableData.forEach(function(val,ind){
		  			if(!val.createName){
		  				val.createName = "-"
		  			}
		  			if(!val.info2){
		  				val.info2 = "-"
		  			}
		  			if(!val.info3){
		  				val.info3 = "-"
		  			}
		  			if(!val.info4){
		  				val.info4 = "-"
		  			}
		  			if(!val.info5){
		  				val.info5 = "-"
		  			}
		  			if(!val.info6){
		  				val.info6 = "-"
		  			}
		  		})
          that.tableData=kbmtableData
          that.currentPage=res.data.fsp.page;
          that.pageCount=res.data.fsp.totalPages;
          that.totalRows=res.data.fsp.totalRows
        }
      }).catch(function(res){
        //console.log(res)
      })
    },
    handleChange(file) {
      console.log(file)
      // this.fileList3 = fileList.slice(-3);
    },
    progress(){
      let that=this
      this.axios.post(this.biz.serverUrl+'/key/getProgress',this.biz.urlencodedConfig).then(function(res){  
      	if(res.data.code == 404){
		  		that.$router.push({path:'/'});
		  	}
        else if(res.status==200){
          that.percentage=res.data
        }            
      }).catch(function(res){
        console.log(res)
      })
    },
    beforeAvatarUpload(file) {
      const isLt20M = file.size / 1024 / 1024 < 10;
      if (!isLt20M) {
        this.$message.error('上传文件大于 10MB!');
      }
      return isLt20M;
    },
    showProgress(event, file, fileList){
      // console.log(event,file,fileList)
      this.dialogFormVisible=true
      this.percentage=Math.floor(event.percent)
      // this.interval=setInterval(this.progress(),50)
    },
    handleAvatarSuccess(res, file) {
      console.log("------------------上传成功",res, file)
      if(res.status==200){
        if(this.percentage==100){
          if(res.fsp.list2){
            this.$message({
              type:'error',
              message:'导入失败'+res.fsp.successCount+'条数据，失败数据请查看下载的失败文档'
            }) 
            require.ensure([], () => {
              const { export_json_to_excel } = require('@/vendor/Export2Excel')
              const tHeader = ['问题', '答案', '相似问题1', '相似问题2', '相似问题3', '相似问题4', '相似问题5','失败原因']
              const filterVal = ['info', 'recontent', 'info2', 'info3','info4','info5','info6','uploadMsg']
              let lists = res.fsp.list2;
              const data = this.formatJson(filterVal, lists)
              let myDate=new Date();
              let time=myDate.getFullYear()+'-'+ (myDate.getMonth()+1) +'-'+ myDate.getDate()
              export_json_to_excel(tHeader, data, this.filename+'-'+time)
            })
          }else{            
            this.$message({
              type:'success',
              message:'导入成功'
            })           
          }
          this.list()
          this.dialogFormVisible=false
        }                
      }else{
        this.$message({
          type:'error',
          message:'导入失败'
        })
        this.dialogFormVisible=false 
      }
    },
    handleAvatarError(err,file){
      console.log(err)
      this.$message({
        type:'error',
        message:'导入失败'
      })
      if(err.response.fsp.list2){
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/vendor/Export2Excel')
          const tHeader = ['问题', '答案', '相似问题1', '相似问题2', '相似问题3', '相似问题4', '相似问题5','失败原因']
          const filterVal = ['info', 'recontent', 'info2', 'info3','info4','info5','info6','uploadMsg']
          const lists = err.response.fsp.list2;
          const data = this.formatJson(filterVal, lists)
          let myDate=new Date();
          let time=myDate.getFullYear()+'-'+ (myDate.getMonth()+1) +'-'+ myDate.getDate()
          const filenameTemplate=this.filename+'-'+time
          export_json_to_excel(tHeader, data, filenameTemplate)
        })
      }
      this.dialogFormVisible=false
    },
    exportExcel(){
      // console.log(this.multipleSelection)       
      let that = this      
      if(this.multipleSelection.length==0){
          window.open(this.biz.serverUrl+'/key/export2Excel')
      }else{
          let ids=''
          this.multipleSelection.forEach(function(v,i){
              if(i==that.multipleSelection.length-1){
                  ids+=v.id
              }else{
                  ids+=v.id+','
              }
          })
          // console.log(ids)
          window.open(this.biz.serverUrl+'/key/export2Excel?ids='+ ids )
      }
    },
    exportTemplate(){
      // *********原来的方法
      // window.open(this.biz.serverUrl+'/key/export2ExcelModule')
      // *****自己拼接的方法
      this.downloadLoadingTem = true   
      require.ensure([], () => {
        const { export_json_to_excelxls } = require('@/vendor/Export2Excel')
        const tHeader = ['问题', '答案', '相似问题1', '相似问题2', '相似问题3', '相似问题4', '相似问题5']
        const filterVal = ['info', 'recontent', 'info2', 'info3','info4','info5','info6']
        const lists = [{info:'',recontent:'',info2:'',info3:'',info4:'',info5:'',info6:''}]
        const data = this.formatJson(filterVal, lists)
        let myDate=new Date();
        let time=myDate.getFullYear()+'-'+ (myDate.getMonth()+1) +'-'+ myDate.getDate()
        const filenameTemplate=this.filename + '模板-' +time
        export_json_to_excelxls(tHeader, data, filenameTemplate)
        this.downloadLoadingTem = false
      })
    },
    handleDownload() {
      this.downloadLoading = true   
      require.ensure([], () => {
        let that=this;
        let parameter={}
        // ***********判断上传参数
        if(this.multipleSelection.length!=0 && this.search.length==0){
            let ids=''
            this.multipleSelection.forEach(function(v,i){
                if(i==that.multipleSelection.length-1){
                    ids+=v.id
                }else{
                    ids+=v.id+','
                }
            })
            parameter.ids=ids;
        }else if(this.multipleSelection.length==0 && this.search.length!=0){
          parameter.info=this.search;
        }else if(this.multipleSelection.length!=0 && this.search.length!=0){
            let ids=''
            this.multipleSelection.forEach(function(v,i){
                if(i==that.multipleSelection.length-1){
                    ids+=v.id
                }else{
                    ids+=v.id+','
                }
            })
            parameter.ids=ids;
            parameter.info=this.search;
        }
        parameter.token=localStorage.getItem("token")
        let param=qs.stringify(parameter)
        // console.log(param)
        this.axios.post(this.biz.serverUrl+'/key/exportData',param,this.biz.urlencodedConfig).then(function(res){ 
        	if(res.data.code == 404){
		  		that.$router.push({path:'/'})
		  	}else if(res.data.code==200){
            that.exportList = res.data.datas
            const { export_json_to_excel } = require('@/vendor/Export2Excel')
            const tHeader = ['问题', '答案', '相似问题1', '相似问题2', '相似问题3', '相似问题4', '相似问题5']
            const filterVal = ['info', 'recontent', 'info2', 'info3','info4','info5','info6']
            const lists = that.exportList        
            const data = that.formatJson(filterVal, lists)
            let myDate=new Date();
            let time=myDate.getFullYear()+'-'+ (myDate.getMonth()+1) +'-'+ myDate.getDate()
            export_json_to_excel(tHeader, data, that.filename+'-'+time)
            that.downloadLoading = false
          }
        }).catch(function(res){
          // console.log(res)
        })        
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
};
</script>

<style>
.kbmBox {
  width: 100%;
}
.kbmBox .el-table__body-wrapper {
  overflow: initial !important;
}
.border {
  border: 1px solid #CFD1D1;
}
.kbmBox .el-table--border,
.kbmBox .el-table--group {
  border-left: none;
}
.kbmBox.el-table--border::after,
.kbmBox .el-table--group::after {
  width: 0;
}
.kbmBox .upload-demo{
  display:inline-block;
  margin:0 10px;
}
.del{
  /*position: relative;*/
  float:left;
  margin:15px;
  
  
}
.create-con{
	width:100px;
	height:37px;
	float:left;
	background:#F0EEEA;
	color:#666;
	line-height: 37px;
	text-align: center;
	border-radius: 3px;
	margin-right:15px;
	margin-left:5px;
	cursor: pointer;
	border: 1px solid #D6D3C9;
}
.operation-span{
	cursor: pointer;
}
.operation-span:hover{
	color:red
}
.choose-box{
	position:absolute;
	width:99px;
	border:1px solid #e0e0e0;
	background:#fff;
	z-index:3;
}
.searchQ{
	display: inline-block;
	width:80px;
	height:34px;
	background:#EFEEEC;
	border:1px solid #D3D2CD; 
	float:left;
	text-align: center;
	line-height: 34px;
	margin-right:15px;
	border-radius: 5px;
	cursor:pointer;
}
.searchQ:hover {
    color: #fff;
    border-color: #c6e2ff;
    background-color: #F71428;
}
/*.triangle_border_down{
    width:0;
    height:0;
    border-width:10px 10px 0;
    border-style:solid;
    border-color:#333 transparent transparent;/*灰 透明 透明 */
    /*margin:40px auto;
    position:relative;
}*/
.triangle_border_down span{
    display:block;
    width:0;
    height:0;
    border-width:6px 6px 0;
    border-style:solid;
    border-color:#666 transparent transparent;/*黄 透明 透明 */
    position:absolute;
    top:27px;
    left:352px;
}
/* .kbmBox .el-input,.kbmBox .el-textarea{
	width:500px;
} */
</style>