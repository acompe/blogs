<template>
  <div class="cap-bar">
    <el-row>
      <el-col :span="4">
         <div class="cap-name" @click="goHome">
           Acompe知识库
         </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default{
    cap:'cap',
    props:['home'],
    methods:{
      goHome:function(){
        this.$router.push(this.$props.home)
      }
    }
  }
</script>

<style>
  #app .cap-bar{
    background-color: #2e323e;
    height: 100%;
    border-bottom: 0.0625rem solid #1f1f1f;
  }
  #app .cap-name{
    color: white;
    font-size: 1.25rem;
    line-height: 3.5;
    padding-left: 1.25rem;
    cursor: pointer;
  }
  #app .cap-menu{
    line-height: 4.5;
  }
</style>
