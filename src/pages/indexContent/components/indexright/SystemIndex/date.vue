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
  <span @click = "handlesendMessage" class = "search">查询</span>
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
    	},
    	handlesendMessage(){
    		this.$emit("listenEvent",this.value9)
    	}
    }
  };
</script>
<style>
	.search{
		display:inline-block;
		background:#ccc;
		width:54px;
		height:38px;
		z-index:5;
		position:absolute;
		top:13px;
		left:295px;
		text-align: center;
		line-height: 37px;
	}
</style>