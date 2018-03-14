<template>
	<div class="questionBox borderBox questionCss">
    <div class = "indextitle">
			<span class = "lineSymbol"></span>
			<span class = "indexWord">常见问题</span>
		</div>
		<div class="p10">
			<div class="border">
				<el-row class="p10" style="padding-bottom:0">
					<el-col :span="24" align="left">
						<el-button type="primary" size="medium" @click="handleCreate()">添加</el-button>
            <p style="display: inline-block;margin-left: 10px;">最多五条</p>
					</el-col>
				</el-row>
				<div class="pt10">
					<el-table :data="tableData" border style="width: 100%;text-align: center;" stripe class='tablebtn'>    
						<el-table-column
							type="index"
							label="序号"
							label-class-name = "colum"
              :resizeable='resizeable'
							>
							</el-table-column>
						<el-table-column
							prop="createTime"
							label="创建时间"
							label-class-name = "colum"
              :resizeable='resizeable'
							>
						</el-table-column>
						<el-table-column
							prop="question"
							label="问题"
							label-class-name = "colum"
              :resizeable='resizeable'
							>
						</el-table-column>
						<el-table-column
							prop="answer"
							label="答案"
							label-class-name = "colum"
              :resizeable='resizeable'
							>
						</el-table-column>
						<el-table-column
							prop="operation"
							label="操作"
							label-class-name = "colum"
              :resizeable='resizeable'
							>
							<template slot-scope="scope">
								<el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
								<el-button type="danger" size="mini"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<!-- 分页 -->
					<!-- <el-pagination
            background
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="currentPage"
						:page-size="pageSize"
						:page-sizes="[15, 30]"
						layout="total, sizes, prev, pager, next, jumper"
						:pageCount="pageCount"
			      :total="totalRows"
			      style="padding:15px 0;text-align: center;background:#fff;">
					</el-pagination> -->
				</div> 
				<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
					<el-form :rules="rules" ref="qForm" :model="qForm" label-position="left" label-width="70px" style='width: 80%; margin-left:50px;'>						
						<el-form-item label="问题" prop="question">
							<el-input v-model="qForm.question" placeholder="字数在1~64个以内"></el-input>
						</el-form-item>
						<el-form-item label="回答" prop="answer">
							<el-input v-model="qForm.answer" type="textarea" placeholder="字数在1~600个以内"></el-input>
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
      tableData: [],
      qForm: {
        question: "",
        answer: ""
      },
      rules: {
        question: [{ required: true, message: "请输入常见问题", trigger: "blur" },{ min: 1, max: 64, message: '字数在1~64个以内', trigger: 'blur' }],
        answer: [{ required: true, message: "请输入常见问题答案", trigger: "blur" },{ min: 1, max: 600, message: '字数在1~600个以内', trigger: 'blur' }]
      },
      textMap: {
        update: "常见问题-编辑",
        create: "常见问题-添加"
      },
      resizeable:false,
      dialogStatus: "",
      dialogFormVisible: false,
      pageCount: 1,
      pageSize: 15,
      currentPage: 1,
      totalRows:0,
      height:''
    };
  },
  mounted() {
    this.list()
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
          this.axios.post(this.biz.serverUrl+'/common/del',param,this.biz.urlencodedConfig).then(function(res){
            console.log(res)
             if(res.data.code==404){
            	that.$router.push({path: '/'})
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
        question: "",
        answer: ""
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
      this.qForm.question=row.question
      this.qForm.answer=row.answer
      this.qForm.id=row.id
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["qForm"].clearValidate();
      });
    },
    createData() {
      this.$refs["qForm"].validate(valid => {
        if (valid) {
          let that=this;
          this.qForm.token=localStorage.getItem("token");
          let param=qs.stringify(this.qForm);
          this.axios.post(this.biz.serverUrl+'/common/add',param,this.biz.urlencodedConfig).then(function(res){
            console.log(res)
            if(res.data.code!=200){
              that.$router.push({path:'/'});
            }
			else if(res.data.code==200){
              that.$message({
                type:'success',
                message:'添加成功'
              })
              that.list()
            }else{
              that.$message({
                type:'error',
                message:'添加失败'
              })
            }
          }).catch(function(res){
            console.log(res)
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
        if (valid) {
          let that=this;
          this.qForm.token=localStorage.getItem("token");
          let param=qs.stringify(this.qForm);
          this.axios.post(this.biz.serverUrl+'/common/update',param,this.biz.urlencodedConfig).then(function(res){
            //console.log(res)
             if(res.data.code!=200){
              that.$router.push({path:'/'});
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
            console.log(res)
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
      let that=this;
      let param=qs.stringify({page:this.currentPage,rows:this.pageSize,token:localStorage.getItem("token")})
      this.axios.post(this.biz.serverUrl+'/common/list',param,this.biz.urlencodedConfig).then(function(res){        
        console.log(res)
        if(res.data.code==200){
          that.tableData=res.data.datas;
          that.currentPage=res.data.fsp.page;
          that.pageCount=res.data.fsp.totalPages;
          that.totalRows=res.data.fsp.totalRows
          that.tableData.forEach(function(v,i){
            // let time=v.createTime;
            v.createTime=that.getTimer(v.createTime)
          })
        }
      }).catch(function(res){
        console.log(res)
      })
    }
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