<template>
  <div class='kbmadd'>
    <div class = "indextitle">
			<span class = "lineSymbol"></span>
			<span class = "indexWord">知识库管理-添加</span>
		</div>
        <el-form :rules="rules" ref="kbmForm" :model="kbmForm" label-position="right" label-width="110px" style='width:650px; margin:0 auto;margin-top:40px;'>						
            <el-form-item label="问题 :" prop="info">
                <el-input v-model="kbmForm.info"></el-input>
            </el-form-item>
            <el-form-item label="答案 :" prop="recontent">
                <el-input v-model="kbmForm.recontent" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="相似问题1 :" prop="info2">
                <el-input v-model="kbmForm.info2"></el-input>
            </el-form-item>
            <el-form-item label="相似问题2 :" prop="info3">
                <el-input v-model="kbmForm.info3"></el-input>
            </el-form-item>
            <el-form-item label="相似问题3 :" prop="info4">
                <el-input v-model="kbmForm.info4"></el-input>
            </el-form-item>
            <el-form-item label="相似问题4 :" prop="info5">
                <el-input v-model="kbmForm.info5"></el-input>
            </el-form-item>
            <el-form-item label="相似问题5 :" prop="info6">
                <el-input v-model="kbmForm.info6"></el-input>
            </el-form-item>
        </el-form>					
        <div slot="footer" class="dialog-footer" style="text-align:center">
            <el-button type="primary" @click="createData">确 定</el-button>
        </div>
  </div>
</template>
<script>
import qs from 'qs'
import axios from 'axios'
export default {
  data() {
    return {
      kbmForm: {
        info: "",
        recontent: "",
        info2: "",
        info3: "",
        info4: "",
        info5: "",
        info6: ""
      },
      dialogStatus:this.$route.query.dialogStatus,
      rules: {
        info: [{ required: true, message: "请输入常见问题", trigger: "blur" }],
        info2: [{ required: true, message: "请输入相似问题", trigger: "blur" }],
        info3: [{ required: true, message: "请输入相似问题", trigger: "blur" }],
        info4: [{ required: true, message: "请输入相似问题", trigger: "blur" }],
        info5: [{ required: true, message: "请输入相似问题", trigger: "blur" }],
        info6: [{ required: true, message: "请输入相似问题", trigger: "blur" }],
        recontent: [{ required: true, message: "请输入常见问题答案", trigger: "blur" }]
      }
    };
  },
  methods:{
    createData() {
      this.$refs["kbmForm"].validate(valid => {
        if (valid) {
          let that=this;
          let param=qs.stringify(this.kbmForm);
          this.axios.post(this.biz.serverUrl+'/key/add',param,this.biz.urlencodedConfig).then(function(res){
            //console.log(res)
            if(res.data.code==404){
            	that.$router.push({path: '/'})
            }else if(res.data.code==200){
              that.$message({
                type:'success',
                message:'添加成功'
              })             
              that.$router.push({path: '/robot/kbm'})
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
        }
      });
    }
  }
};
</script>
<style>

</style>
