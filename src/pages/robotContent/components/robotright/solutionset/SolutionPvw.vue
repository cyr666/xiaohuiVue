<template>
  <div class='solutionSetadd'>
    <div class = "indextitle">
			<span class = "lineSymbol"></span>
			<span class = "indexWord">解答管理-预览</span>
		</div>
    <div class = "pvm">解答管理-预览</div>
        <el-form :rules="rules" ref="kbmForm"  :model="kbmForm" label-position="right" label-width="110px" style='width:650px; margin:0 auto;margin-top:40px;'>						
            <el-form-item label="用户 :" prop="userId">
                <el-input v-model="kbmForm.userId" :disabled=true></el-input>
            </el-form-item>
            <el-form-item label="问题 :" prop="queryItem">
                <el-input v-model="kbmForm.queryItem" :disabled=true></el-input>
            </el-form-item>
            <el-form-item label="回答 :" prop="recontent">
                <el-input v-model="kbmForm.recontent" type="textarea" :disabled=true></el-input>
            </el-form-item>
             <el-form-item label="反馈状态 :">
                <el-radio v-model="radio7" label="1"  style='width:90px;margin-left:20px' :disabled=true >有用</el-radio>
                <el-radio v-model="radio7" label="2"  style='width:90px' :disabled=true>没用</el-radio>
                <el-radio v-model="radio7" label="0"  style='width:90px' :disabled=true>未表态</el-radio>
            </el-form-item>
        </el-form>	
        <div slot="footer" class="dialog-footer" style="text-align:center">
            <el-button type="info" @click = "handleReturn">返回</el-button>
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
      	userId:'',
      	queryItem:'',
      	recontent:''
      },
      radio7:'',
      id:this.$route.query.id,
      rules: {
        userId: [{ required: false, message: "请输入常见问题", trigger: "blur" }],
        queryItem: [{ required: false, message: "请输入相似问题", trigger: "blur" }],
        recontent: [{ required: false, message: "请输入相似问题", trigger: "blur" }]
      }
    };
  },
  mounted(){
    this.detail()
  },
  methods:{
    detail(){
      let that=this;
      let id=this.$route.query.id;
      let token = localStorage.getItem('token');
      let param = qs.stringify({token:token,id:id})      
      axios.post(this.biz.serverUrl+'/chat/query?'+param).then(this.handleGetPvwData.bind(this)).catch(this.handleError.bind(this))
    },
  	handleGetPvwData(res){
  		console.log(res)
  		let that = this;
  		if(res.data.code == 404){
  			that.$router.push({path:'/'});
  			return false;
  		}
  		if(res.data.code == 200){
  			let infomation = res.data.element;
  			that.kbmForm.userId = infomation.userid;
  			that.kbmForm.queryItem = infomation.info;
  			that.kbmForm.recontent = infomation.recontent;
			  that.radio7 = infomation.isUse.toString();
  		}
  	},
  	handleError(){
  		alert('123')
  	},
  	handleReturn(){
  		this.$router.push({path:'/robot/solutionset'})
  	}
  }
};
</script>
<style>
	.solutionSetadd .pvm{
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
	.solutionSetadd .el-button{
		background:#E9E9E9;
		color:#B2B2B2
	}
</style>
