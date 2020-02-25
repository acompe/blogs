<template>
  <el-container>
    <el-header style="height: 4.375rem;">
      <cap home='/admin'/>
    </el-header>
    <el-main>
      <container></container>
    </el-main>
  </el-container>
</template>

<script>
  import cap from '../public/cap.vue'
  import container from './container.vue'

  export default{
    name:'admin',
    components:{
      cap:cap,
      container:container
    }
  }
</script>

<style>
</style>
