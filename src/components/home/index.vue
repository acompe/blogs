<template>
    <el-container>
      <el-header>
        <cap home='/home' style="height: 4.375rem;"/>
      </el-header>
      <el-main style="padding: 1.875rem;">
        <container :modular="this.$root.modular"/>
      </el-main>
      <el-footer style="padding:0rem">
        <foot></foot>
      </el-footer>
    </el-container>
</template>

<script>
  import cap from '../public/cap.vue'
  import container from './container.vue'
  import footer from '../public/footer.vue'

  export default{
    name:'index',
    components:{
      cap:cap,
      container:container,
      foot:footer
    }
  }
</script>

<style>
</style>
