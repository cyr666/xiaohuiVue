<template>
  <div class='kbmadd'>
    <div class = "indextitle">
			<span class = "lineSymbol"></span>
			<span class = "indexWord">知识库管理-添加</span>
		</div>
        <el-form :rules="rules" ref="kbmForm" :model="kbmForm" label-position="right" label-width="110px" style='width:650px; margin:0 auto;margin-top:40px;'>						
            <el-form-item label="问题 :" prop="info">
                <el-input v-model="kbmForm.info" placeholder="字数在1~64个以内"></el-input>
            </el-form-item>
            <!--<div class = "link" @click = "handleisRich">点击</div>
            -->
            <el-form-item label="答案 :" prop="recontent">
                <el-input v-model="kbmForm.recontent" type="textarea" placeholder="字数在1~1000个以内" @focus = "handleFocus" ></el-input>
            </el-form-item>
            <el-form-item label="相似问题1 :" prop="info2">
                <el-input v-model="kbmForm.info2" placeholder="字数在1~64个以内"></el-input>
            </el-form-item>
            <el-form-item label="相似问题2 :" prop="info3">
                <el-input v-model="kbmForm.info3" placeholder="字数在1~64个以内"></el-input>
            </el-form-item>
            <el-form-item label="相似问题3 :" prop="info4">
                <el-input v-model="kbmForm.info4" placeholder="字数在1~64个以内"></el-input>
            </el-form-item>
            <el-form-item label="相似问题4 :" prop="info5">
                <el-input v-model="kbmForm.info5" placeholder="字数在1~64个以内"></el-input>
            </el-form-item>
            <el-form-item label="相似问题5 :" prop="info6">
                <el-input v-model="kbmForm.info6" placeholder="字数在1~64个以内"></el-input>
            </el-form-item>
        </el-form>					
        <div slot="footer" class="dialog-footer" style="text-align:center">
            <el-button type="primary" @click="createData">确 定</el-button>
        </div>
        <el-dialog :visible.sync="dialogRichVisible" style="height:800px">					
					<richtext ref = "richtext" id="aushd" style = "width:645px;" v-on:input="handleGetRichData"></richtext>
					 <div  color="#20a0ff" class="editor-upload-btn" @click = "handleSave">保存</div>
				</el-dialog>
  </div>
</template>
<script>
import qs from 'qs'
import axios from 'axios'
import richtext from '../../../../Tinymce/index'
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
      recontent:this.$refs.richtext,
      dialogStatus:this.$route.query.dialogStatus,
      rules: {
        info: [{ required: true, message: "请输入常见问题", trigger: "blur" },{ min: 1, max: 64, message: '字数在1~64个以内', trigger: 'blur' }],
        info2: [{ min: 0, max: 64, message: '字数在1~64个以内', trigger: 'blur' }],
        info3: [{ min: 0, max: 64, message: '字数在1~64个以内', trigger: 'blur' }],
        info4: [{ min: 0, max: 64, message: '字数在1~64个以内', trigger: 'blur' }],
        info5: [{ min: 0, max: 64, message: '字数在1~64个以内', trigger: 'blur' }],
        info6: [{ min: 0, max: 64, message: '字数在1~64个以内', trigger: 'blur' }],
        recontent: [{ required: true, message: "请输入常见问题答案", trigger: "focus" },{ min: 1, max: 1000, message: '字数在1~1000个以内', trigger: 'blur' }]
      },
      isRich:false,
      height:'',
      dialogRichVisible:false,
      content:''
    };
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
    createData() {
      this.$refs["kbmForm"].validate(valid => {
        if (valid) {
          let that=this;
          this.kbmForm.token=localStorage.getItem("token");
          let param=qs.stringify(this.kbmForm);
          this.axios.post(this.biz.serverUrl+'/key/add',param,this.biz.urlencodedConfig).then(function(res){
            //console.log(res)
            if(res.data.code==404){
            	that.$router.push({path: '/'});
            }else if(res.data.code==200){
              that.$message({
                type:'success',
                message:'添加成功'
              })             
              that.$router.push({path: '/robot/kbm'});
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
    },
    handleFocus(){
    	this.dialogRichVisible = true
    },
//  handleSave(){
//  	//console.log(this.content)
//  	console.log(this.$refs.richtext);
//  	this.$refs['richtext'].setContent("123");
//		this.content= this.$refs['richtext'].getContent();
//		console.log(this.$refs['richtext'].activeEditor.getContent(this.$refs['richtext']));
//  	//console.log("123")
//  },
	handleGetRichData(data){
		this.content = data;
		console.log(data)
	},
    handleSave(){
    	this.dialogRichVisible = false;
    	this.kbmForm.recontent = this.content
    }
  }
};
</script>
<style>
	.link{
		width: 442px;
    height: 30px;
    border: 1px solid #e0e0e0;
    margin-left: 110px;
    line-height: 30px;
	}
	.richtext{
		position: absolute;
		left:50px;
		z-index:3;
	}
	.tinymce-container .editor-container{
		height:400px;
	}
	.editor-upload-btn {
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
</style>
