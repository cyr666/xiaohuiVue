<template>
	<div class='Recommendedit'>
    	<div class = "Reco-indextitle">
			<span class = "Reco-lineSymbol"></span>
			<span class = "Reco-indexWord">推荐管理-编辑</span>
		</div>
		<div class = "pvm">编辑推荐</div>
		<el-form :rules="rules" ref="kbmForm" :model="kbmForm" label-position="right" label-width="110px" style='width:410px; margin:0 auto;margin-top:40px;'>						
            <el-form-item label="推荐名称 :" prop="name">
                <el-input v-model="kbmForm.name" placeholder = "推荐名称长度在1-64个字之间" type ='textarea'></el-input>
            </el-form-item>
            <el-form-item label="推荐位链接 :" prop="linkTo">
                <el-input v-model="kbmForm.linkTo"></el-input>
            </el-form-item>
            <el-form-item label="推荐位图片 :" prop="img">
            	<!--<el-upload
				  class="upload-demo"
				  action="https://jsonplaceholder.typicode.com/posts/"
				  :on-preview="handlePreview"
				  :on-remove="handleRemove"
				  :file-list="fileList2"
				  list-type="picture">
				  <el-button size="small" type="primary">选择上传文件</el-button>-->
				  <span class = "start">*</span>
				<a href="javascript:;" class="file">选择文件
					<input type="file" name="" id="inp" @change="upload" >
				</a>
				  <!--<span class = "upLoads">选择上传文件</span>-->
					  <p class = "limit">最大5M,为保证图片正常显示，请尽量上传<span class = "redword">160x90px</span>的图片</p>
				<!--</el-upload>-->
				<dl>
					<dd>预览区域</dd>
					<dt>
						<img :src='imges'/>
					</dt>
				</dl>
				<span class= "message">{{message}}</span>
            </el-form-item>
            <span class ='return' @click = "handleReturn">返回</span>
            <span class = "submit" @click = 'handleUpdate'>提交</span>
             
        </el-form>	
	</div>
</template>

<script>
	import qs from 'qs';
	import axios from "axios"; 
	export default{
		data(){
			return{
				kbmForm:{name:'',linkTo:'',photo:''},
				fileList2: [],
				rules: {
			        name: [{ required: true, message: "请输入推荐名称", trigger: "blur" }],
			        linkTo:[{ required: true, message: "请输入推荐位链接", trigger: "blur" },{ pattern:/^[^\u4e00-\u9fa5]{0,}$/, message: '推荐位链接不能有汉字哦'}],
			        img:[{ required: false, message: " ", trigger: "blur" }],
			  },
			   imges:'',
			   height:'',
			   message:''
			}
		},
		updated(){
			this.getheight()
		},
		mounted(){
			this.getEditData()
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
			handleRemove(file, fileList) {
		        console.log(file, fileList);
		    },
		    handlePreview(res,file) {
		        console.log(res);
		    },
		    getEditData(){
		    	let that=this;
			    let id=this.$route.query.id;
			    let param=qs.stringify({id:id,token:localStorage.getItem("token")});
			    axios.post(this.biz.serverUrl+'/recommend/query?'+param).then(this.handleEditSucc.bind(this)).catch(this.handleEditErro.bind(this))
		    },
		    handleEditSucc(res){
		    	let that = this
		    	if(res.data.code == 400){
		    		that.$router.push({path:'/'})
		    	}
		    	if(res.data.code == 200){
		    		console.log(res)
		    		let info = res.data.element;
		    		that.kbmForm.name = info.name;
		    		that.kbmForm.linkTo = info.linkTo;
		    		that.imges = info.img;
		    		var photo = info.img.split('/')
		    		that.kbmForm.photo = photo[photo.length-1];
		    		console.log(that.kbmForm.photo)
		    		
		    	}
		    },
			handleEditErro(){
				this.$message({
					type:'error',
                	message:'请求失败'
				})
			},			
	/*********************************图片上传*****************************************/
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
				console.log(res.data)
				this.imges = res.data.fsp;
				this.kbmForm.photo = res.data.element.img
				this.$message({
					type:'success',
                	message:'上传成功'
				})
				if(this.imges){
		    		that.message=" "
		    	}
			},
			handleUploadErro(){
				 this.$message.error('上传失败');
			},
	/********************************更新*****************************************/
			handleUpdate(){	
				console.log(this.kbmForm.photo)
				let that=this;
		    	if(!this.imges){
		    		that.message = "请选择上传图片"
		    	}
				this.$refs['kbmForm'].validate(valid =>{
					if(valid){
					let id=that.$route.query.id;
					let param = qs.stringify({id:id,token:localStorage.getItem('token'),name:that.kbmForm.name,linkTo:that.kbmForm.linkTo,img:that.kbmForm.photo})
					console.log(param)
					axios.post(that.biz.serverUrl+'/recommend/update?'+param).then(that.handleUpdateSucc.bind(that)).catch(that.handleUpdateErro.bind(that))
				}})
				
			},
			handleUpdateSucc(res){
				let that = this;
		    	if(res.data.code == 404){
		    		that.$router.push({path:'/'})
		    	}else if(res.data.code == 200){
		    		that.$message.success('提交成功');
		    		that.$router.push({path:'/robot/recommend'})
		    	}
			},
			handleUpdateErro(){
				this.$message.error('提交失败')
			}
		}
	}
</script>

<style>
	.Reco-indextitle {
	    height:70px;
		line-height:70px;
		border:1px solid #ccc;
		padding-left: 35px;
	}
	.Reco-lineSymbol{
		border:3px solid #de3039;
		background:#de3039;		
		font-size:26px;
		line-height: 70px;
    }
	.Reco-indexWord{
		font-size:20px;
		line-height:70px;
		display: inline-block;
		margin-left: 10px;
		color:#666666
	}
	.Recommendedit .pvm{
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
	/*.Recommendedit .indextitle .el-button{
		background:#E9E9E9;
		color:#B2B2B2
	}
	.Recommendedit .el-upload__tip{
		width:500px
	}
	.Recommendedit .el-upload__tip .redword{
		color:red
	}
	.Recommendedit .el-button--danger{
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
	.el-upload-list--picture{
		width:206px;
		height:146px;
		position: absolute;
	}
	.el-upload-list--picture .el-upload-list__item-name{
		display: none;
	}
	.el-upload-list--picture .el-upload-list__item {
    overflow: hidden;
    background-color: #F6F8F8;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-top: 21px;
    height: 148px;
    width: 209px;
    text-align: center;
}
.el-upload-list--picture .el-upload-list__item-thumbnail {    
    width: 100px;
    height: 100px;
    position: relative;
    z-index: 1;
    margin-left: -39px;
}
.message{
		font-size:12px;
		color:red;
		position:absolute;
		top:244px;
		opacity: 0.7;
	}
.start {
    color: red;
    position: absolute;
    left: -100px;
    z-index: 3;
}
</style>