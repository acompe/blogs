<template>
    <el-container>
      <el-header style="height: 4.375rem;">
        <cap/>
      </el-header>
      <el-container>
        <container :modular='modular'/>
      </el-container>
    </el-container>
</template>

<script>
  import cap from '../public/cap.vue'
  import container from './container.vue'
  export default{
    name:'structure',
    components:{
      cap:cap,
      container:container
    },
    data(){
      return{
        modular:{}
      }
    },
    mounted(){
      let that = this
      this.$root.modular.forEach(function(value,index,array){
        if(value.id == that.$route.query.id){
          that.modular = value;
        }
      })
    }
  }
</script>

<style>
</style>
