

<template>
	
	
	
	
	<div class="box">
		<div class="login">
			
			<div class="login-title">
				<span class="login-title-logo">
					<img src="../../../static/images/logo.jpg" />
				</span>
				<span class="login-title-word">机器人后台业务管理系统</span>
			</div>
			
			<div class="login-content"></div>
			
			<div class="login-content-center">
				<ul>
					<li>
						<span class="iconfont icon-yonghu3"></span>
						<span><input v-model = "userName" type="text" autocomplete="off"  @keydown.13="handleLogin" placeholder="请输入用户名称"></span>
					</li>
					<li>
						<span class="iconfont icon-lock"></span>
						<span><input v-model = "passWord"  @keydown.13="handleLogin" autocomplete="off"  type="passWord" placeholder="请输入登入密码"></span>
					</li>
					<li class="login-type" @keydown.13="handleLogin"  @click = "handleLogin">
						<span id="ts">登录</span>
					</li>
				</ul>
				<p class="login-tishi">{{message}}</p>
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
			message:'',
			userName:'',
			passWord:''
		}
	},
	created(){
		var _this = this;
		console.log(this.$route.path)
		window.onkeydown=function(e){
			if(!e) e = window.event;
			if((e.keyCode || e.which) == 13)
				
			{ 
				if(_this.$route.path=='/' || _this.$route.path=='/login'){
					_this.handleLogin();
				}
				
			} 
		}
	},
	methods:{
	  
		handleLogin(){
		
			let that = this;
			
			let userName = this.userName;
			let passWord = this.passWord;
			if(userName == '')
			{
				that.$message({
						type:'error',
						message:'请输入用户名'
					});
				return false;
			}
			if(passWord == '')
			{
				that.$message({
						type:'error',
						message:'请输入密码'
					});
				return false;
			}
			
			
			let token = localStorage.getItem('token')
			let param = qs.stringify({token:token,userName:userName,passWord:passWord})
			axios.post(this.biz.serverUrl+'/user/login?'+param).then(this.handleLoginSucc.bind(this)).catch(this.handleLofinError.bind(this))
		},
		handleLoginSucc(res){
			let that = this
			let data = res.data.element
			if(res.data.code == 400){
	  			that.$router.push({path:'/'})
	  		}
			if(res.data.code == 200){
				if(res.data.msg == '用户名或密码错误'){
					that.$message({
						type:'error',
						message:'用户名或密码错误'
					});
				}else{
					console.log(res);
					localStorage.setItem('token',data.token);
					localStorage.setItem('nickName',data.nickName);
					localStorage.setItem('photo',data.photo);
					that.$router.push({path: '/sysindex/system'})
				}				
			}else{
				console.log("登录失败");
			}
		},
		handleLofinError(res){
			console.log(res);
		}
		
	},
	mounted(){
		console.log(window.localStorage);
	}
	
	
}



</script>
<style rel="stylesheet/css" lang="css" >
	@import "../../../static/icon/iconfont.css";
	*{
		margin: 0;
		padding: 0;
	}
body, html{
	width: 100%;
	height: 100%;
	background: url(../../../static/images/login.jpg) no-repeat;
	background-size: 100% 100%;
}
.login{
	width: 495px;
	height: 441px;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-left: -249px;
	margin-top: -220px;
}
.login-title{
	width: 495px;
	height: 60px;
	font-size: 34px;
	position: relative;
	color: #fff;
}
.login-title-logo{
	display: inline-block;
	width: 60px;
	height: 60px;
}
.login-title-word{
	position: absolute;
	top: 5px;
	right: 35px;
}


.login-content{
	width: 440px;
	height: 340px;
	margin-left: 15px;
	margin-top: 38px;
	background: #FFFFFF;
	border-radius: 20px;
	opacity: 0.3;
}
.login-content-center{
	width: 405px;
	height: 310px;
	background: #FFFFFF;
	opacity: 0.8;
	position: absolute;
	top: 113px;
	left: 32px;
	border-radius: 20px;
}
.login-content-center ul{
	margin-top: 60px;
}
.login-content-center ul li{
	margin-top: 25px;
	list-style: none;
	width: 300px;
	height: 45px;
	background: #D1D5D4;
	border-radius: 20px;
	margin-left: 50px;
	position: relative;
}
.login-content-center ul li input{
	width: 250px;
	height: 45px;
	border: none;
	background: #D1D5D4;
	border-radius: 20px;
	outline: none;
}
.login-content-center ul li span:nth-child(1){
	font-size: 30px;
	margin-left: 7px;
	margin-right: 4px;
	display: inline-block;
	position: relative;
	top: 6px;
	left: 5px;
	color: #767B76;
}
.login-content-center .login-type{
	background: #E30000;
	text-align: center;
	cursor: pointer;
}
#ts{
	color: #FFFFFF;
	font-size: 20px;
	text-align: center;
	line-height: 30px;
}
.login-tishi{
	text-align: center;
	color: #E30000;
	font-size: 14px;
}

</style>