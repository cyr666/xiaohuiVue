<template>
	<div class='Recommendadd'>
    	<div class = "indextitle">
			<span class = "lineSymbol"></span>
			<span class = "indexWord">推荐管理-新增</span>
		</div>
		<div class = "pvm">新增推荐</div>
		<el-form :rules="rules" ref="kbmForm" :model="kbmForm" label-position="right" label-width="110px" style='width:410px; margin:0 auto;margin-top:40px;'>						
            <el-form-item label="推荐名称 :" prop="name">
                <el-input v-model="kbmForm.name" type ='textarea' placeholder = "问题长度在1-64个字之间"></el-input>
            </el-form-item>
            <el-form-item label="推荐位链接 :" prop="linkTo">
                <el-input v-model="kbmForm.linkTo" placeholder = 'http://'></el-input>
            </el-form-item>
            <el-form-item label="推荐位图片 :" prop="img">
				<a href="javascript:;" class="file">选择文件
					<input type="file" name="" id="inp" @change="upload" >
				</a>
				<p class = "limit">最大5M,为保证图片正常显示，请尽量上传<span class = "redword">160x90px</span>的图片</p>
				<dl>
					<dd>预览区域</dd>
					<dt>
						<img :src='image'/>
					</dt>
				</dl>
				<span class = "message">{{message}}</span>
            </el-form-item>
            <span class ='return' @click = "handleReturn">返回</span>
            <span class = "submit" @click = 'handleAdd'>提交</span>
             
        </el-form>	
	</div>
</template>

<script>
	import qs from 'qs';
	import axios from "axios"; 
	export default{
		data(){
			return{
				kbmForm:{name:'',linkTo:'',img:''},
				fileList2: [],
				rules: {
			        name: [{ required: true, message: "请输入推荐名称", trigger: "blur" },{min:1,max:64,message: "问题长度在1-64个字之间",trigger: "blur"}],
			        linkTo:[{ required: true, message: "请输入链接", trigger: "blur" },
			        {min:1,max:500,message: "链接地址在1-500个字符之间",trigger: "blur"},
			        { pattern:/^[^\u4e00-\u9fa5]{0,}$/, message: '推荐位链接不能有汉字哦'}],
			        img:[{ required: true, message:' ',trigger: "blur" }],
			  },
			   image:'',
			   picture:'',
			   height:'',
			   message:''
			}
		},
		updated(){
			this.getheight()
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
			handleReturn(){
				this.$router.push({path:'/robot/recommend'})
			},
//			handleRemove(file, fileList) {
//		        console.log(file, fileList);
//		    },
//		    handlePreview(file) {
//		        console.log(file);
//		    },
		    handleAdd(){
		    	let that=this;
		    	if(!this.image){
		    		that.message = "请选择上传图片"
		    	}
		    	
		    	this.$refs["kbmForm"].validate(valid => {
		    		 if (valid) {		    	
		    		that.kbmForm.token=localStorage.getItem("token");
				    that.kbmForm.status = true
				    let param=qs.stringify(that.kbmForm);
				    console.log(param)
			    axios.post(that.biz.serverUrl+'/recommend/add?'+param).then(that.handleAddSucc.bind(that)).catch(that.handleAddErro.bind(that))
		    	}})
			    
		    },
		    handleAddSucc(res){
		    	let that = this;
		    	if(res.data.code == 404){
		    		that.$router.push({path:'/'})
		    	}else if(res.data.code == 200){
		    		that.$message.success('已添加');
		    		that.$router.push({path:'/robot/recommend'})
		    	}
		    				    	
		    },
			 handleAddErro(){},
			 upload(e){
				let that = this;
				let files = e.target.files || e.dataTransfer.files;				
//			    if (!files.length) return;
				let fil = files[0];
				let token = localStorage.getItem('token');
				var formData = new FormData();  
				formData.append("file",fil);
				formData.append("token",token);			 		        				axios.post(that.biz.serverUrl+'/recommend/upload?',formData)
				.then(this.handleUploadSucc.bind(this))
				.catch(this.handleUploadErro.bind(this))
			},
			handleUploadSucc(res){
				let that = this;
				
				this.image = res.data.fsp;
				this.kbmForm.img = res.data.element.img
				console.log(this.image)
				if(this.image){
		    		that.message=" "
		    }
			},
			handleUploadErro(){
				 this.$message.error('上传失败');
			}
			  
		}
	}
</script>

<style scoped>
	.Recommendadd .pvm{
		width:90%;
		height:33px;
		line-height:33px;
		padding-left:20px;
		background:#EEEEEE;
		border:1px solid #D6D7D9;
		margin:0 5%;
		margin-top:15px;
		overflow: hidden;
	}
	/*.indextitle .el-button{
		background:#E9E9E9;
		color:#B2B2B2
	}
	.el-upload_Tip{
		width:500px
	}
	.el-upload__tip .redword{
		color:red
	}
	.el-button--danger{
		background:#F61C27;
		color:#fff;
		width:123px;
		height:40px;
		margin-left:165px
	}
	.pvm .el-button{
		background:#F61C27;
		color:#B2B2B2;
		width:123px;
		height:26px;
		margin-left:165px 
	}*/
	.file {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
	}
	.file input {
	    position: absolute;
	    font-size: 100px;
	    right: 0;
	    top: 0;
	    opacity: 0;
	}
	.file:hover {
	    background: #AADFFD;
	    border-color: #78C3F3;
	    color: #004974;
	    text-decoration: none;
	}
	.limit{
		width:500px;
		line-height: 40px;
	}
	.redword{
		color:red
	}
	.submit{
		width:96px;
		height:30px;
		line-height:30px;
		background:#DF2F3A;
		text-align: center;
		display: inline-block;
		position:relative;
		border-radius: 3px;
		color:#fff;
		/*margin-left:220px;*/
		left: 240px;
    	top: -30px;
		cursor: pointer;
	}
	.return{
		width:96px;
		height:30px;
		line-height:30px;
		background:#EEEEEE;
		text-align: center;
		display: block;
		border-radius: 3px;
		color:#C1C1C1;
		position:relative;
		left:97px;
		cursor: pointer;
	}
	dl{
		width:207px;
		height:168px;
		border:1px solid #ccc;
	}
	dl dd{
		line-height: 20px;
		border-bottom:1px solid #ccc;
		padding-left:10px;
		box-sizing: border-box;
	}
	dl dt{
		background:#EEEEEE;
		height:147px
	}
	dl dt img{
		width:160px;
		height:90px;
		margin:20px;
	}
	.message{
		font-size:12px;
		color:red;
		position:absolute;
		top:244px;
		opacity: 0.7;
	}
</style>