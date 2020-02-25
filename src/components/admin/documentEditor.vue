<template>
  <div class="mkeditor">
    <el-tree
      :data="structure"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      @node-click='editor'>
    </el-tree>

    <el-dialog top="5%" :visible.sync="isEditor">
        <mavon-editor
          v-model="doc"
          @save="saveDocument"
        />
    </el-dialog>

  </div>
</template>

<script>
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'

  export default{
    name:'documentEditor',
    props:['modular'],
    components:{
      mavonEditor
    },
    data(){
      return{
        structure:this.modular.structure,
        isEditor:false,
        title:'',
        doc:'',
        parentId:''
      }
    },
    methods:{
      saveDocument:function(){
        let that = this
        this.$axios({
          method:'post',
          url:'/document/updateDocument',
          params:{
            parentId:this.parentId,
            content:this.doc
          },
          headers:{
            token:this.$root.token
          }
        }).then(function (response) {
          if(response.data.status == 'success'){
            that.$message.success('保存成功');
          }else{
            that.$message.error('保存失败');
          }
        }).catch(function (error) {
          that.$message.error('服务器中断');
        })
        this.isEditor =false
      },
      editor:function(t){
        let that = this
        this.$axios({
          method:'post',
          url:'/document/content',
          params:{
            parentId:t.id,
          }
        }).then(function (response) {
          if(response.data.status == 'success'){
            if(response.data.value != null){
              that.doc = response.data.value.content
            }else{
              that.doc = ''
            }
            that.parentId = t.id
            that.title = t.label
            that.isEditor = true
          }
        }).catch(function (error) {
          that.$message.error('服务器中断');
        })
      }
    }
  }
</script>

<style>
  .mkeditor .el-dialog{
    width: 90%;
    height: 80%;
    margin-bottom: 0rem;
    overflow: scroll;
  }
  .mkeditor .el-dialog__body{
    height: 80%;
  }
  .mkeditor .markdown-body{
    height: 100%;
  }
</style>
