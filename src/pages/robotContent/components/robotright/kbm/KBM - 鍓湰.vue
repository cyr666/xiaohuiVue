<template>
	<div class="kbmBox borderBox">
		<div class="p10">
			<div class="border">
				<el-row class="p10" style="padding-bottom:0">
					<el-col :span="24" align="left">
						<el-col :span='5' style="margin-right:15px;">
							<el-input placeholder="请输入内容" v-model="search" class="search-input">
								<el-button slot="append" icon="el-icon-search"></el-button>
							</el-input>
						</el-col>						
						<el-button type="primary" size="medium" @click="handleCreate()">添加问题</el-button>
						<el-button type="primary" size="medium">导入</el-button>
						<el-button type="primary" size="medium">导出</el-button>
						<el-button type="primary" size="medium">下载导入模板</el-button>
					</el-col>
				</el-row>
				<div class="pt10">
					<el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange" stripe>    
						<el-table-column
							type="selection"
							width="30">
						</el-table-column>
						<el-table-column
							prop="qusetion"
							label="问题"
							>
						</el-table-column>
						<el-table-column
							prop="answer"
							label="答案"
							>
						</el-table-column>
						<el-table-column
							prop="qusetion1"
							label="相似问题1"
							>
						</el-table-column>
						<el-table-column
							prop="qusetion2"
							label="相似问题2"
							>
						</el-table-column>
						<el-table-column
							prop="qusetion3"
							label="相似问题3"
							>
						</el-table-column>
						<el-table-column
							prop="qusetion4"
							label="相似问题4"
							>
						</el-table-column>
						<el-table-column
							prop="qusetion5"
							label="相似问题5"
							>
						</el-table-column>
						<el-table-column
							prop="operation"
							label="操作">
							<template slot-scope="scope">
								<el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
								<el-button type="danger" size="mini"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<!-- 分页 -->
					<el-pagination
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="currentPage"
						:page-size="pageSize"
						:page-sizes="[10, 15]"
						layout="total, sizes, prev, pager, next, jumper"
						:pageCount="pageCount" style="margin:15px auto;text-align: center">
					</el-pagination>
				</div> 
				<!-- ****弹框***** -->
				<!-- <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
					<el-form :rules="rules" ref="kbmForm" :model="kbmForm" label-position="right" label-width="100px" style='width:80%; margin-left:50px;'>						
						<el-form-item label="问题" prop="qusetion">
							<el-input v-model="kbmForm.qusetion"></el-input>
						</el-form-item>
						<el-form-item label="答案" prop="answer">
							<el-input v-model="kbmForm.answer" type="textarea"></el-input>
						</el-form-item>
						<el-form-item label="相似问题1" prop="qusetion1">
							<el-input v-model="kbmForm.qusetion1"></el-input>
						</el-form-item>
						<el-form-item label="相似问题2" prop="qusetion2">
							<el-input v-model="kbmForm.qusetion2"></el-input>
						</el-form-item>
						<el-form-item label="相似问题3" prop="qusetion3">
							<el-input v-model="kbmForm.qusetion3"></el-input>
						</el-form-item>
						<el-form-item label="相似问题4" prop="qusetion4">
							<el-input v-model="kbmForm.qusetion4"></el-input>
						</el-form-item>
						<el-form-item label="相似问题5" prop="qusetion5">
							<el-input v-model="kbmForm.qusetion5"></el-input>
						</el-form-item>
						*****************************************************************可添加相似问题
						<el-form-item
							v-for="(domain, index) in kbmForm.domains"
							:label="'相似问题' + index"
							:key="domain.key"
							:prop="'domains.' + index + '.value'"
							:rules="rules1"
						>
							<el-input v-model="domain.value"></el-input>
							<el-button @click.prevent="removeDomain(domain)" style="margin-left:10px;">删除</el-button>
						</el-form-item>
						<el-form-item  label-width="100px">
							<el-button @click="addDomain">添加相似问题</el-button>
						</el-form-item>
					</el-form>					
					<div slot="footer" class="dialog-footer" style="text-align:center">
						<el-button @click="dialogFormVisible = false">取 消</el-button>
						<el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确 定</el-button>
						<el-button v-else type="primary" @click="updateData">确 定</el-button>
					</div>
				</el-dialog> -->
			</div>
		</div>      
	</div>
</template>

<script>
import "./kbm.css";
export default {
  data() {
    return {
      search: "",
      tableData: [
        {
          qusetion: "问题",
          answer: "答案",
          qusetion1: "相似问题1",
          qusetion2: "相似问题2",
          qusetion3: "相似问题3",
          qusetion4: "相似问题4",
          qusetion5: "相似问题5"
          //   domains:[
          // 	  {value:'相似问题'}
          //   ]
        },
        {
          qusetion: "问题",
          answer: "答案",
          qusetion1: "相似问题1",
          qusetion2: "相似问题2",
          qusetion3: "相似问题3",
          qusetion4: "相似问题4",
          qusetion5: "相似问题5"
          //   domains:[
          // 	  {value:'相似问题'}
          //   ]
        },
        {
          qusetion: "问题",
          answer: "答案",
          qusetion1: "相似问题1",
          qusetion2: "相似问题2",
          qusetion3: "相似问题3",
          qusetion4: "相似问题4",
          qusetion5: "相似问题5"
          //   domains:[
          // 	  {value:'相似问题'}
          //   ]
        },
        {
          qusetion: "问题",
          answer: "答案",
          qusetion1: "相似问题1",
          qusetion2: "相似问题2",
          qusetion3: "相似问题3",
          qusetion4: "相似问题4",
          qusetion5: "相似问题5"
          //   domains:[
          // 	  {value:'相似问题'}
          //   ]
        },
        {
          qusetion: "问题",
          answer: "答案",
          qusetion1: "相似问题1",
          qusetion2: "相似问题2",
          qusetion3: "相似问题3",
          qusetion4: "相似问题4",
          qusetion5: "相似问题5"
          //   domains:[
          // 	  {value:'相似问题'}
          //   ]
        }
      ],
      kbmForm: {
        qusetion: "",
        answer: "",
        qusetion1: "",
        qusetion2: "",
        qusetion3: "",
        qusetion4: "",
        qusetion5: ""
        // domains: [
        //   {
        //     value: ""
        //   }
        // ]
      },
      rules: {
        qusetion: [{ required: true, message: "请输入常见问题", trigger: "blur" }],
        qusetion1: [{ required: true, message: "请输入相似问题", trigger: "blur" }],
        qusetion2: [{ required: true, message: "请输入相似问题", trigger: "blur" }],
        qusetion3: [{ required: true, message: "请输入相似问题", trigger: "blur" }],
        qusetion4: [{ required: true, message: "请输入相似问题", trigger: "blur" }],
        qusetion5: [{ required: true, message: "请输入相似问题", trigger: "blur" }],
        answer: [{ required: true, message: "请输入常见问题答案", trigger: "blur" }]
      },
      textMap: {
        update: "知识库管理-编辑",
        create: "知识库管理-添加"
      },
      rules1: [{ required: true, message: "请输入常见问题", trigger: "blur" }],
      multipleSelection: [],
      dialogStatus: "",
      dialogFormVisible: false,
      pageCount: 8,
      pageSize: 10,
      currentPage: 1
    };
  },
  mounted() {},
  methods: {
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
          that.$message({
            type: "success",
            message: "删除成功!"
          });
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
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
		},





		
		// 弹框用到的函数**************
    resetForm() {
      this.kbmForm = {
        qusetion: "",
        answer: "",
        qusetion1: "",
        qusetion2: "",
        qusetion3: "",
        qusetion4: "",
        qusetion5: ""
        // domains: [
        //   {
        //     value: ""
        //   }
        // ]
      };
    },
    handleCreate() {
			this.$router.push({path: '/robot/kbmAdd'})
      // this.resetForm();
      // this.dialogStatus = "create";
      // this.dialogFormVisible = true;
      // this.$nextTick(() => {
      //   this.$refs["kbmForm"].clearValidate();
      // });
    },
    handleUpdate(row) {
			this.$router.push({path: '/robot/kbmEdit',query:{id:row}})
      // this.kbmForm = Object.assign({}, row); // copy obj
      // this.dialogStatus = "update";
      // this.dialogFormVisible = true;
      // this.$nextTick(() => {
      //   this.$refs["kbmForm"].clearValidate();
      // });
    },
    createData() {
			// this.$router.push({path: '/robot/kbmAdd',query:{dialogStatus:'create'}})
      // this.$refs["kbmForm"].validate(valid => {
      //   if (valid) {
      //     console.log("添加成功");
      //     this.dialogFormVisible = false;
      //   }
      // });
    },
    updateData() {
			// this.$router.push({path: '/robot/kbmEdit',query:{dialogStatus:'update'}})
      // this.$refs["kbmForm"].validate(valid => {
      //   if (valid) {
      //     console.log("修改成功");
      //     this.dialogFormVisible = false;
      //   }
      // });
    },
    addDomain() {
      this.kbmForm.domains.push({
        value: "",
        key: Date.now()
      });
    },
    removeDomain(item) {
      var index = this.kbmForm.domains.indexOf(item);

      if (this.kbmForm.domains.length == 1) {
        return;
      } else {
        if (index !== -1) {
          this.kbmForm.domains.splice(index, 1);
        }
      }
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
  border: 1px solid #ebeef5;
}
.kbmBox .el-table--border,
.kbmBox .el-table--group {
  border-left: none;
}
.kbmBox.el-table--border::after,
.kbmBox .el-table--group::after {
  width: 0;
}

/* .kbmBox .el-input,.kbmBox .el-textarea{
	width:500px;
} */
</style>