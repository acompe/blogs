<template>
  <el-container>

    <el-aside style="width: 12.5rem;">
      <div class="left-bar">
        <el-tree :data="structure" @node-click="selectChange"></el-tree>
      </div>
    </el-aside>

    <el-main>
      <div v-if="select == 1">
        <modular-manager :modular='this.$root.modular' />
      </div>
      <div v-else-if="select == 2">
        <document-manager :modular='this.$root.modular' />
      </div>
    </el-main>

  </el-container>
</template>

<script>
  import modularManager from './modularManager.vue'
  import documentManager from './documentManager.vue'
  export default{
    name:'admin-container',
    data(){
      return{
        select:1,
        structure:[
          {
            id:1,
            parentId:1,
            label: '模块管理',
          },
          {
            id:2,
            parentId:1,
            label: '信息管理'
          },
        ]
      }
    },
    methods:{
      selectChange:function(data){
        this.select = data.id
      }
    },
    components:{
      modularManager:modularManager,
      documentManager:documentManager
    }
  }
</script>

<style>

</style>
