<template>
<div>
  <div class="block">
    <el-date-picker
      v-model="value9"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      default-value="2018-1-01"
      @change = "getTime"
       value-format="yyyy-MM-dd">
    </el-date-picker>
  </div>
  <!--<div class = "upLoads" @click = "handleUpload">
	  <span class="el-dropdown-link  estimate" >
	    <i class="el-icon-upload el-icon--left"></i>导出
	  </span>
	</div>-->
 <!-- <span @click = "handlesendMessage" class = "search">搜索</span>-->
 </div>
</template>

<script>
  export default {
    data() {
      return {
        value8: '',
        value9: ''
      };
    },
    methods:{
    	getTime(val){
    		this.value9 = val
    	}
//  	handleUpload(){
//  		this.$emit("listenEvent",this.value9)
//  	}
    },
    updated(){
    	  this.$emit("listenEvent",this.value9)
    }
  };
</script>
<style>
	.upLoads{
		position: absolute;
    cursor: pointer;
    width: 90px;
    left: 865px;
    top: 32px;
	}
	.estimate{
		background:#eeeeee;
		color:#666;
		display:inline-block;
		width:90px;
		height:37px;
		text-align: center;
		line-height:36px;
		border-radius: 5px;
	}
</style>