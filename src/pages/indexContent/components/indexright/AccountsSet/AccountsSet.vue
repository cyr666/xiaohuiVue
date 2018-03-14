<template>
	<div class = "boxIndex">
		 
    <div class = "indextitle">
			<span class = "lineSymbol"></span>
			<span class = "indexWord">帐号设置</span>
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
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload" :disabled="disabled">
          <img v-if="photo" :src="photo" class="avatar" >
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			  </el-upload>
				<el-form-item label="用户名" prop="name">
					<el-input v-model="baseForm.name" :disabled=true></el-input>
				</el-form-item>
				<el-form-item label="旧密码" prop="oldpass">
					<el-input v-model="baseForm.oldpass"  :disabled="disabled" type = "password" placeholder = "6-16位字母、数字下划线组合"></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="newpass">
					<el-input v-model="baseForm.newpass" :disabled="disabled" type = "password"  placeholder = "6-16位字母、数字下划线组合"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="newpass">
					<el-input v-model="baseForm.confirm" :disabled="disabled" type = "password"  placeholder = "6-16位字母、数字下划线组合"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="cancel()" v-if="!disabled">取消</el-button>
					<el-button type="primary" @click="handleConfirm" v-if="!disabled" center>确认</el-button>
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
        oldpass: "",
        newpass: "",
        confirm:"" ,
        headImg:'',
      },
      photo: "",
      images:"",
      disabled:true ,
      url: '',
      rules: {
        name: [{ required: false, message: "请输入用户名", trigger: "blur" }],
        oldpass: [{ required: true, message: "请输入旧密码", trigger: "blur" },
        			{ min: 6, max: 16, message: '6-16位字母、数字下划线组合', trigger: 'blur' },
        			{pattern: /^(\w){6,16}$/,message: '只能输入6-16个字母、数字、下划线',trigger: 'blur'}
        		 ],
        newpass: [
        			{ required: true, message: "请输入新密码", trigger: "blur"},
        			{ min: 6, max: 16, message: '6-16位字母、数字下划线组合', trigger: 'blur' },
        			{pattern: /^(\w){6,16}$/,message: '只能输入6-16个字母、数字、下划线',trigger: 'blur'}
        ],
        confirm: [
        			{ required: true, message: "请确认新密码", trigger: "blur" },
        			{ min: 6, max: 16, message: '6-16位字母、数字下划线组合', trigger: 'blur' },
        			{pattern: /^(\w){6,16}$/,message: '只能输入6-16个字母、数字、下划线',trigger: 'blur'}
        ],
      },
      height:'',
      isShow:true
    };
  },
  mounted() {
	this.getAccountData();
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
	handleConfirm(){
		let that = this
		 this.$refs['baseForm'].validate(valid => {
		 	if(valid){
		 		if(this.baseForm.newpass === this.baseForm.confirm){
			let param = qs.stringify({
			token:localStorage.getItem('token'),
			oldPassWord:this.baseForm.oldpass,
			newPassWord:this.baseForm.newpass,
			confirmNewPassWord:this.baseForm.confirm,
			photo:this.baseForm.headImg
			})
			console.log(param)
			axios.post(that.biz.serverUrl+'/user/updateSetting?'+param)
			.then(this.handleSetSucc.bind(this))
			.catch(this.handleSetErro.bind(this))
		}else{
			that.$message({
                type: 'error',
                message: '两次密码不一致!'
            });
		}
		 	}
		 })
		
		
	},
	handleSetSucc(res){
		console.log(res)
		let that = this
		if(res.data.code == 404){
			//console.log(res)
			that.$router.push({path:'/'});
		}else if(res.data.code == -100){
			if(res.data.msg == '旧密码不正确'){
				that.$message({
                type: 'error',
                message: '旧密码不正确'
            });
			}
		}
		if(res.data.code == 200){
			if(res.data.msg == 'success'){
				that.$message({
                type: 'success',
                message: '修改成功'
            });
			}
		}
	},
	handleSetErro(res){
		alert("请求失败")
	},
    Edit(){
      this.disabled=false;
    },
    cancel(){
      this.disabled=true;
      this.isShow = false;
      this.baseForm.oldpass = "";
      this.baseForm.newpass = '';
      this.baseForm.confirm = '';  
      this.photo = this.images;
    },
    handleAvatarSuccess(res, file) {
    	console.log(res)
	  this.photo = res.fsp
      this.baseForm.headImg = res.element.photo
      console.log(this.baseForm.headImg)
     // this.baseForm.headImg = res.element.coverPicUrl
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
    getAccountData(){
    	this.url = this.biz.serverUrl + "/user/upload?"+'token='+localStorage.getItem('token')
    	console.log("1234")
    	let param = qs.stringify({token:localStorage.getItem('token')})
    	axios.post(this.biz.serverUrl+'/user/current?'+param)
    	.then(this.handlegetAccountDataSucc.bind(this))
    	.catch(this.handlegetAccountDataErro.bind(this))
    },
    handlegetAccountDataSucc(res){
    	let that = this;
    	console.log(res)
    	if(res.data.code == 404){
			that.$router.push({path:'/'})
    	}
    	else if(res.data.code == 200){ 
    		console.log(res)
    		let info = res.data.element;
    		this.baseForm.name = info.userName;
   		    this.photo = info.photo;
   		    this.images = info.photo;
   		    console.log(info.photo)
    	}
    },
    handlegetAccountDataErro(){
    	alert("请求失败")
    }
 },
 updated(){
 	this.getheight()
 }
};
</script>

<style scoped>
	.boxIndex{
		float:left;
		/*width:100%;*/
		width:82%;
	}
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