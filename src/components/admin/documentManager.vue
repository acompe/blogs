<template>
  <div class="modular">
    <el-tabs type="card">
      <el-tab-pane v-for="(item,name) in modular" :name='item.name' :label='item.name' :key='name'>
        <ducumentEditor :modular='item'/>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
  import ducumentEditor from './documentEditor.vue'
  export default{
    name:'ducumentManager',
    props:['modular'],
    components:{
      ducumentEditor:ducumentEditor
    }
  }
</script>

<style>
</style>
