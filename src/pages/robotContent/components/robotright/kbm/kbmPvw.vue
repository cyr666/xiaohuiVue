<template>
  <div class='solutionSetadd'>
    <div class = "indextitle">
			<span class = "lineSymbol"></span>
			<span class = "indexWord">知识库管理-预览</span>
		</div>
    <div class = "pvm">知识库管理-预览</div>
        <el-form :rules="rules" ref="kbmForm" :model="kbmForm" label-position="right" label-width="110px" style='width:650px; margin:0 auto;margin-top:40px;'>						
            <el-form-item label="问题 :" prop="info">
                <el-input v-model="kbmForm.info" :disabled=true></el-input>
            </el-form-item>
            <el-form-item label="答案 :" prop="recontent">
                <el-input v-model="kbmForm.recontent" type="textarea" placeholder="字数在1~64个以内" :disabled=true></el-input>
            </el-form-item>
            <el-form-item label="相似问题1 :" prop="info2">
                <el-input v-model="kbmForm.info2"  type="textarea" placeholder="字数在0~64个以内" :disabled=true></el-input>
            </el-form-item>
            <el-form-item label="相似问题2 :" prop="info3">
                <el-input v-model="kbmForm.info3"  type="textarea" placeholder="字数在0~64个以内" :disabled=true></el-input>
            </el-form-item>
            <el-form-item label="相似问题3 :" prop="info4">
                <el-input v-model="kbmForm.info4" type="textarea" placeholder="字数在0~64个以内" :disabled=true></el-input>
            </el-form-item>
            <el-form-item label="相似问题4 :" prop="info5">
                <el-input v-model="kbmForm.info5" type="textarea" placeholder="字数在0~64个以内" :disabled=true></el-input>
            </el-form-item>
            <el-form-item label="相似问题5 :" prop="info6">
                <el-input v-model="kbmForm.info6" type="textarea" placeholder="字数在0~64个以内" :disabled=true></el-input>
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
        info: "",
        recontent: "",
        info2: "",
        info3: "",
        info4: "",
        info5: "",
        info6: ""
      },
      id:this.$route.query.id,
      rules: {
        info: [{ required: false, message: "请输入常见问题", trigger: "blur" },{ min: 1, max: 64, message: '字数在1~64个以内', trigger: 'blur' }],
        info2: [{ min: 0, max: 64, message: '字数在0~64个以内', trigger: 'blur' }],
        info3: [{ min: 0, max: 64, message: '字数在0~64个以内', trigger: 'blur' }],
        info4: [{ min: 0, max: 64, message: '字数在0~64个以内', trigger: 'blur' }],
        info5: [{ min: 0, max: 64, message: '字数在0~64个以内', trigger: 'blur' }],
        info6: [{ min: 0, max: 64, message: '字数在0~64个以内', trigger: 'blur' }],
        recontent: [{ required: false, message: "请输入常见问题答案", trigger: "blur" },{ min: 1, max: 64, message: '字数在1~64个以内', trigger: 'blur' }]
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
      axios.post(this.biz.serverUrl+'/key/query?'+param).then(this.handleGetPvwData.bind(this)).catch(this.handleError.bind(this))
    },
  	handleGetPvwData(res){
  		console.log(res)
  		let that = this;
  		if(res.data.code == 404){
  			that.$router.push({path:'/'});
  			return false;
  		}
  		if(res.data.code == 200){
  			this.kbmForm = res.data.element;
//			that.kbmForm.userId = infomation.id;
//			that.kbmForm.queryItem = infomation.info;
//			that.kbmForm.recontent = infomation.recontent;
//			  that.radio7 = infomation.isUse.toString();
  		}
  	},
  	handleError(){
  		alert('123')
  	},
  	handleReturn(){
  		this.$router.push({path:'/robot/kbm'})
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
