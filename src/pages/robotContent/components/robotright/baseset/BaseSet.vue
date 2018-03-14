<template>
	<div>
    <div class = "indextitle">
			<span class = "lineSymbol"></span>
			<span class = "indexWord">基础设置</span>
		</div>
    <div class="pr20 pt20 right">
      <el-button type="primary" @click="Edit()">编辑</el-button>
    </div>
		<div class = "basesetbox">		
			<el-form ref="baseForm" :model="baseForm" :rules='rules' label-width="200px" :show-message = 'isShow'>
        <el-upload
          class="avatar-uploader"
          :action='url'
          :show-file-list="false"
          :data='datas'
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload" :disabled="disabled">
          <img v-if="imgurl" :src="imgurl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			  </el-upload>
				<el-form-item label="机器人昵称" prop="name">
					<el-input v-model="baseForm.name" :disabled="disabled" placeholder="字数在1~30个以内"></el-input>
				</el-form-item>
				<el-form-item label="机器人开场白" prop="prologue">
					<el-input v-model="baseForm.prologue" type="textarea" :disabled="disabled" placeholder="字数在1~200个以内"></el-input>
				</el-form-item>
				<el-form-item label="一句话推荐">
					<el-input v-model="baseForm.recommend" :disabled="disabled" placeholder="字数在0~30个以内"></el-input>
				</el-form-item>
				<el-form-item label="推荐链接地址">
					<el-input v-model="baseForm.recommendUrl" :disabled="disabled" placeholder="http://"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="cancel()" v-if="!disabled">取消</el-button>
					<el-button type="primary" @click="onSubmit('baseForm')" v-if="!disabled">提交</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import qs from "qs";
import axios from "axios";
export default {
  data() {
    return {
      baseForm: {
        name: "",
        prologue: "",
        recommend: "",
        headImg: "",
        recommendUrl: "",       
      },
      datas:{'token':localStorage.getItem('token')},
      imgurl:'',
      images:'',
      disabled:true ,
      url: this.biz.serverUrl + '/setting/upload',
      rules: {
        name: [{ required: true, message: "请输入机器人昵称", trigger: "blur" },{ min: 1, max: 30, message: '字数在1~30个以内', trigger: 'blur' }],
        prologue: [{ required: true, message: "请输入机器人开场白", trigger: "blur" },{ min: 1, max: 200, message: '字数在1~200个以内', trigger: 'blur' }],
        recommendUrl: [{ min: 0, max: 500, message: '字数在0~500个以内符', trigger: 'blur' }],
        recommend: [{ min: 0, max: 30, message: '字数在0~30个以内', trigger: 'blur' }]
      },
      height:'',
      isShow:''
    };
  },
  mounted() {
    this.detail()
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
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let that=this;
          this.baseForm.id=1;
          this.baseForm.token=localStorage.getItem("token")
          let param=qs.stringify(this.baseForm);
          console.log(param)
          this.axios.post(this.biz.serverUrl+'/setting/update',param,this.biz.urlencodedConfig).then(function(res){
          	if(res.data.code == 404){
		  		that.$router.push({path:'/'})
		  	}else if(res.data.code==200){
              that.$message({
                  type: 'success',
                  message: '修改成功!'
              });
              that.disabled=true
            }else{
              that.$message({
                  type: 'error',
                  message: '修改失败!'
              });
            }
          }).catch(function(res){
            console.log(res)
            that.$message({
                type: 'error',
                message: '修改失败!'
            });
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    Edit(){
      this.disabled=false;
    },
    cancel(){
      this.disabled=true;
      this.isShow = false;
      this.imgurl = this.images
    },
    handleAvatarSuccess(res, file) {
      console.log(res, file);
      this.imgurl = res.fsp
      this.baseForm.headImg=res.element.headImg;
     
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    detail(){
      let that=this
      let param=qs.stringify({id:1,token:localStorage.getItem("token")})
      this.axios.post(this.biz.serverUrl+'/setting/query',param,this.biz.urlencodedConfig).then(function(res){
      	if(res.data.code == 404){
		  		that.$router.push({path:'/'})
		 }else if(res.data.code==200){
           //console.log(res)
          that.baseForm.name=res.data.element.name
          that.baseForm.prologue=res.data.element.prologue
          that.baseForm.recommend=res.data.element.recommend         
          that.baseForm.recommendUrl=res.data.element.recommendUrl
          that.baseForm.headImg=res.data.element.headImg
          that.imgurl=res.data.fsp
           that.images = res.data.fsp
        }
      }).catch(function(res){
        console.log(res)
      })
    }
  }
};
</script>

<style>
.avatar-uploader {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.basesetbox .el-input{
	width: 300px;
}
.basesetbox .el-textarea{
	width: 300px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.basesetbox {
  width: 650px;
  height: auto;
  /* margin: 0 auto; */
  /* margin-top: 30px; */
  margin-left: 15%;
}
</style>