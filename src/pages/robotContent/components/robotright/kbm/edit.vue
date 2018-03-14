<template>
  <div class='kbmadd'>
    <div class = "indextitle">
			<span class = "lineSymbol"></span>
			<span class = "indexWord">知识库管理-修改</span>
		</div>
    
        <el-form :rules="rules" ref="kbmForm" :model="kbmForm" label-position="right" label-width="110px" style='width:650px; margin:0 auto;margin-top:40px;'>						
            <el-form-item label="问题 :" prop="info">
                <el-input v-model="kbmForm.info"></el-input>
            </el-form-item>
            <el-form-item label="答案 :" prop="recontent" >
                <el-input v-model="kbmForm.recontent" type="textarea" placeholder="字数在1~1000个以内" @focus = "handleFocus"></el-input>
            </el-form-item>
            <el-form-item label="相似问题1 :" prop="info2">
                <el-input v-model="kbmForm.info2" placeholder="字数在0~64个以内"></el-input>
            </el-form-item>
            <el-form-item label="相似问题2 :" prop="info3">
                <el-input v-model="kbmForm.info3" placeholder="字数在0~64个以内"></el-input>
            </el-form-item>
            <el-form-item label="相似问题3 :" prop="info4">
                <el-input v-model="kbmForm.info4" placeholder="字数在0~64个以内"></el-input>
            </el-form-item>
            <el-form-item label="相似问题4 :" prop="info5">
                <el-input v-model="kbmForm.info5" placeholder="字数在0~64个以内"></el-input>
            </el-form-item>
            <el-form-item label="相似问题5 :" prop="info6">
                <el-input v-model="kbmForm.info6" placeholder="字数在0~64个以内"></el-input>
            </el-form-item>
        </el-form>					
        <div slot="footer" class="dialog-footer" style="text-align:center">
            <el-button type="primary" @click="updateData">确 定</el-button>
        </div>
        <el-dialog :visible.sync="dialogRichVisible" style="height:800px" ref = 'dialog'>					
					<richtext ref = "richtext" id="aushd" style = "width:645px;" v-on:input="handleGetRichData"></richtext>
					 <div  color="#20a0ff" class="editor-upload-btn" @click = "handleSave">保存</div>
					 <div  color="#20a0ff" class="editor-show-btn" @click = "handleShow">显示原内容</div>
				</el-dialog>
  </div>
</template>
<script>
import richtext from '../../../../SetTinymce/index'	
import qs from 'qs'
import axios from 'axios'
export default {
	components:{
		richtext:richtext
	},
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
      content:'',
      
      id:this.$route.query.id,
      rules: {
        info: [{ required: true, message: "请输入常见问题", trigger: "blur" },{ min: 1, max: 64, message: '字数在1~64个以内', trigger: 'blur' }],
        info2: [{ min: 0, max: 64, message: '字数在0~64个以内', trigger: 'blur' }],
        info3: [{ min: 0, max: 64, message: '字数在0~64个以内', trigger: 'blur' }],
        info4: [{ min: 0, max: 64, message: '字数在0~64个以内', trigger: 'blur' }],
        info5: [{ min: 0, max: 64, message: '字数在0~64个以内', trigger: 'blur' }],
        info6: [{ min: 0, max: 64, message: '字数在0~64个以内', trigger: 'blur' }],
        recontent: [{ required: true, message: "请输入常见问题答案", trigger: "blur" },{ min: 1, max: 1000, message: '字数在1~1000个以内', trigger: 'blur' }]
      },
      dialogRichVisible:false,
      //con:this.$refs.richtext.setContent(this.content),
    };
  },
  mounted(){
    this.detail()
  },
  methods:{
    updateData() {
      this.$refs["kbmForm"].validate(valid => {
        if (valid) {
          let that=this;
          this.kbmForm.id=this.$route.query.id
          this.kbmForm.token=localStorage.getItem("token")
          let param=qs.stringify(this.kbmForm);
          this.axios.post(this.biz.serverUrl+'/key/update',param,this.biz.urlencodedConfig).then(function(res){
          	if(res.data.code == 404){
		  		that.$router.push({path:'/'})
		  	}else if(res.data.code==200){
              that.$message({
                type:'success',
                message:'修改成功'
              })
//							window.history.go(0)
              that.$router.push({path: '/robot/kbm'})
              //Response.clearContent()
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
        }
      });
    },
    detail(){
      let that=this;
      let id=this.$route.query.id;
      let param=qs.stringify({id:id,token:localStorage.getItem("token")});
      this.axios.post(this.biz.serverUrl+'/key/query',param,this.biz.urlencodedConfig).then(function(res){
      	if(res.data.code == 404){
		  		that.$router.push({path:'/'})
		  	}
        console.log(res)
        if(res.data.code==200){
          that.kbmForm.info=res.data.element.info
          that.kbmForm.info2=res.data.element.info2
          that.kbmForm.info3=res.data.element.info3
          that.kbmForm.info4=res.data.element.info4
          that.kbmForm.info5=res.data.element.info5
          that.kbmForm.info6=res.data.element.info6
          that.kbmForm.recontent=res.data.element.recontent
          that.content = res.data.element.recontent
        }
      }).catch(function(res){
        console.log(res)
      })
    },
    handleFocus(){
    	this.dialogRichVisible = true;
  	  //this.$refs.richtext.setContent(this.content);
  	  //this.handleShow();
    },
    handleShow(){			
    	let that =this;
    	//console.log(this.$refs.richtext.setConten('sc'))
    	
    	this.$refs.richtext.setContent(that.content);
    },
    handleGetRichData(data){
    	this.content = data
    },
    handleSave(){
    	this.dialogRichVisible = false;
    	this.kbmForm.recontent = this.content;
    	console.log(this.$refs.richtext);
    	//this.$refs.richtext.removeAllCookie();
    	//this.$refs.dialog.remove(this.$refs.richtext);
    }
  },
	 watch: {
	    content(content) {
	        var con = this.$refs.richtext;
	    }
	},
	updated(){
		
	}
};
</script>
<style>
	.richtext{
		position: absolute;
		left:50px;
		z-index:3;
	}
	.tinymce-container .editor-container{
		height:400px;
	}
	.editor-upload-btn,.editor-show-btn {
  display: inline-block;
  background:deepskyblue;
  width:50px;
  height:30px;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  color:#fff;
  cursor: pointer;
  position: absolute;
  left:583px;
  top:75px;
}
.editor-show-btn{
	left:490px;
	width:80px;
}
</style>
