<template>
	<div class="questionBox borderBox questionCss">
    <div class = "indextitle">
			<span class = "lineSymbol"></span>
			<span class = "indexWord">求撩技能</span>
		</div>
		<div class="p20">
			<div class="border">
				<el-row class="p10" style="padding-bottom:0">
					<el-col :span="24" align="left">
						<el-button type="primary" size="medium" @click="handleCreate()">添加</el-button>
					</el-col>
				</el-row>
				<div class="pt10">
					<el-table :data="tableData" border style="width: 100%;text-align: center;" stripe class='tablebtn'>    
						<el-table-column
							type="index"
							label="序号"
							label-class-name = "colum"
              :resizeable='resizeable'
              align="center"
							>
							</el-table-column>
						<el-table-column
							prop="createTime"
							label="创建时间"
							label-class-name = "colum"
							>
						</el-table-column>
						<el-table-column
							prop="content"
							label="求撩内容"
							label-class-name = "colum"
							>
						</el-table-column>
						<el-table-column
							prop="space"
							label="距用户最后一次发消息 n 秒后求撩"
							label-class-name = "colum"
							
							>
						</el-table-column>
						<el-table-column
							prop="operation"
							label="操作"
							label-class-name = "colum"
							>
							<template slot-scope="scope">
								<el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
								<el-button type="danger" size="mini"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<!-- 分页 -->
					<!--<el-pagination
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="currentPage"
						:page-size="pageSize"
						:page-sizes="[15, 30]"
						layout="total, sizes, prev, pager, next, jumper"
						:pageCount="pageCount" style="margin:15px auto;text-align: center">
					</el-pagination>-->
				</div> 
				<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
					<el-form :rules="rules" ref="qForm" :model="qForm" label-position="left" label-width="90px" style='width: 80%; margin-left:50px;'>						
						<el-form-item label="求撩内容" prop="content" >
							<el-input v-model="qForm.content" type="textarea" placeholder = "字数在一到一百个以内"></el-input>
						</el-form-item>	
						<el-form-item 
							label="距用户最后一次发消息" 
							prop="space" 
							label-width="185px"
							>
							 <el-input placeholder = "请输入数字"v-model="qForm.space" style="width:130px;margin:0 5px"></el-input>秒后求撩				
						</el-form-item>	
					</el-form>
					<div slot="footer" class="dialog-footer" style="text-align:center">
						<el-button @click="dialogFormVisible = false">取 消</el-button>
						<el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确 定</el-button>
						<el-button v-else type="primary" @click="updateData">确 定</el-button>
					</div>
				</el-dialog>
			</div>
		</div>      
	</div>
</template>

<script>
import qs from "qs";
import axios from "axios";
export default {
  data() {
    return {
    	resizeable:false,
      tableData: [],
      qForm: {
        content: "",
        space: ""
      },
      rules: {
        content: [{ required: true, message: "请输入求撩内容", trigger: "blur" },{ min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }],
        space: [{ required: true, message: "请输入时间", trigger: "blur" },{pattern: /^\+?[1-9][0-9]*$/,message: '只能输入大于0的数字',trigger: 'blur'}]
      },
      textMap: {
        update: "添加求撩内容",
        create: "编辑求撩内容"
      },
      dialogStatus: "",
      dialogFormVisible: false,
      height:''
//    pageCount: 1,
//    pageSize: 10,
//    currentPage: 1
    };
  },
  mounted() {
    this.list()
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
    handleDelete(index, data) {
      this.$confirm("", "您确定要删除吗?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          let token = localStorage.token;
          let that=this;
          let param=qs.stringify({token:localStorage.getItem('token'),id:data.id})
          this.axios.post(this.biz.serverUrl+'/tease/del?'+param).then(function(res){
          	console.log(res.data.code)
          	if(res.data.code==404){
            	that.$router.push({path: '/'})
            }
            else if(res.data.code==200){
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
      this.list()
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.list()
    },
    resetForm() {
      this.qForm = {
        context: "",
        time: ""
      };
    },
    handleCreate() {
    	
      this.resetForm();
      if(this.tableData.length>=5){
        this.$message({
          type:'warning',
          message:'最多添加五条！'
        })
      }else{
        this.dialogStatus = "create";
        this.dialogFormVisible = true;
        this.$nextTick(() => {
        this.$refs["qForm"].clearValidate();
        });
      }     
      
    },
    handleUpdate(row) {
      // this.qForm = Object.assign({}, row); // copy obj
      this.qForm.content=row.content
      this.qForm.space=row.space
      this.qForm.id=row.id
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["qForm"].clearValidate();
      });
    },
    createData() {
      let that = this;
      this.$refs["qForm"].validate(valid => {
        if (valid) {
        	console.log(this.qForm.space)
        	
          let that=this;
          this.qForm.token=localStorage.getItem("token");
          let param=qs.stringify(this.qForm);
          console.log(this.biz.serverUrl+'/tease/add?'+param)
          this.axios.post(this.biz.serverUrl+'/tease/add?'+param).then(function(res){
          console.log(res)
          if(res.data.code==404){
            	that.$router.push({path: '/'})
            }
            else if(res.data.code==200){
              that.$message({
                type:'success',
                message:'添加成功'
              })
              that.list()
            }
            if(res.data.code==-100){
              that.$message({
                type:'error',
                message:"求撩记录最多五条"
              })
            }
          }).catch(function(res){
//          console.log(res)
            that.$message({
              type:'error',
              message:'添加失败'
            })
          })
          this.dialogFormVisible = false;
        }
      });
    },
    updateData() {
      this.$refs["qForm"].validate(valid => {  
      	let that=this;
        if (valid) {
        	console.log(this.qForm.space)
        	if(this.qForm.space<0){
//      		alert('123')
        		this.$message({
                type:'error',
                message:'时间必须为正数'
              })
        	};
        
          this.qForm.token=localStorage.getItem("token");
          let param=qs.stringify(this.qForm);
          this.axios.post(this.biz.serverUrl+'/tease/update?'+param).then(function(res){
          	if(res.data.code==404){
            	that.$router.push({path: '/'});
            }else if(res.data.code==200){
              that.$message({
                type:'success',
                message:'修改成功'
              })
              that.list()
            }else{
              that.$message({
                type:'error',
                message:'修改失败'
              })
            }
          }).catch(function(res){
            that.$message({
              type:'error',
              message:'修改失败'
            })
          })
          this.dialogFormVisible = false;
        }
      });
    },
    list(){
    	let token = localStorage.token
      let that=this;
      let param=qs.stringify({token:token,page:this.currentPage,rows:this.pageSize})
      console.log(param)
      this.axios.get(this.biz.serverUrl+'/tease/list?'+param).then(function(res){
      	if(res.data.code==404){
            	that.$router.push({path: '/'});
        }
        else if(res.data.code==200){        	
          that.tableData=res.data.datas;
          that.tableData.forEach(function(v,i){          	 
          v.createTime=that.getTimer(v.createTime)
          })
        }else if(res.data.code == 404){
        	that.$router.push({path: '/'});
        }
       
      }).catch(function(res){
      })
    }
  },
  updated(){
    	this.getheight()
    }
};
</script>

<style>
.questionBox {
  width: 100%;
}
.questionBox .el-table__body-wrapper {
  overflow: initial !important;
}
.border {
  border: 1px solid #CFD1D1;
}
.questionBox .el-table--border,
.questionBox .el-table--group {
  border-left: none;
}
.questionBox.el-table--border::after,
.questionBox .el-table--group::after {
  width: 0;
}
.colum {
  text-align: center;
}
</style>