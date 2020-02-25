<template>
  <div class="home-container">
   <el-row :gutter="40">
     <el-col v-for="(model,index) in modular" :key='index' :span="6">
       <el-card class="box-card" @click.native='structure(model.id)'>
           <div slot="header" class="clearfix">
             <span>{{model.name}}</span>
           </div>
           <div class="text item">
             {{model.description}}
           </div>
       </el-card>
     </el-col>
   </el-row>
  </div>
</template>

<script>
  export default{
    name:'home-container',
    props:['modular'],
    methods:{
      structure:function(id){
        this.$router.push({
          path:'/structure',
          query:{id:id}
        })
      }
    }
  }
</script>

<style scoped="scoped">
 #app .home-container{
    background-color: #FFFFFF;
    height: 100%;
    width: 100%;
  }
 #app .box-card{
    cursor: pointer;
    height: 12.5rem;
    overflow: hidden;
    margin-bottom: 1.25rem;
  }
</style>
