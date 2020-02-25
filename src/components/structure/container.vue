<template>
  <el-container>
    <el-aside style="width: 12.5rem;">
      <div class="left-bar">
        <el-tree :data="modular.structure" @node-click="showContent"></el-tree>
      </div>
    </el-aside>

    <el-main>
      <div class="markdown-body">
        <div v-html="doc" />
      </div>
    </el-main>

  </el-container>
</template>

<script>

  export default{
    name:'structure-container',
    props:['modular'],
    data(){
      return{
        content:''
      }
    },
    computed:{
      doc:function(){
        return this.$marked(this.content || '', {sanitize: true});
      }
    },
    methods:{
      showContent:function(t){
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
              that.content = response.data.value.content
            }else{
              that.content = '## 没有找到想要的资料'
            }
          }
        }).catch(function (error) {
          that.$message.error('服务器中断');
        })
      }
    }
  }
</script>

<style>
  #app .markdown-body{
    padding: 1.25rem;
  }
</style>
