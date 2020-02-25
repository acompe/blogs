<template>
  <div class="modular">

      <el-row type="flex" class="row-bg">
        <el-col :span='2' :offset='20'>
          <el-button v-if='isEdit' type="primary" size="mini" @click="exchangeIsAddModular" round>添加</el-button>
        </el-col>
        <el-col :span="2">
          <el-switch v-model='isEdit' inactive-text='编辑'></el-switch>
        </el-col>
      </el-row>

      <el-tabs type="card" :closable='isEdit' @tab-remove="delModular">
        <el-tab-pane v-for="(item,name) in modular" :name="''+item.id" :label='item.name' :key='name'>
          <structure-manager :modular='item'/>
        </el-tab-pane>
      </el-tabs>

      <el-dialog title="创建专栏" :visible.sync="isAddModular">
        <el-form :model="newModular">
          <el-form-item label="专栏名称">
            <el-input v-model="newModular.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="专栏描述">
            <el-input v-model="newModular.description" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="exchangeIsAddModular">取 消</el-button>
          <el-button type="primary" @click="addModular">确 定</el-button>
        </div>
      </el-dialog>

  </div>
</template>

<script>
  import structureManager from './structureManager.vue'
  export default{
    name:'mudularManager',
    props:['modular'],
    components:{
      structureManager:structureManager
    },
    data(){
      return{
        isEdit:false,
        isAddModular:false,
        newModular:{
          name:'',
          description:''
        }
      }
    },
    methods:{
      exchangeIsAddModular:function(){
        this.isAddModular = !this.isAddModular
        this.newModular.name=''
        this.newModular.description=''
      },
      addModular:function(){
        let that = this
        this.$axios({
          method:'post',
          url:'/document/addModular',
          params:that.newModular,
          headers:{
            token:this.$root.token
          }
        }).then(function (response) {
          if(response.data.status == 'success'){
            that.modular.push(response.data.value)
            that.$message.success('添加成功');
          }else{
            that.$message.error('添加失败');
          }
          that.exchangeIsAddModular()
        }).catch(function (error) {
          that.$message.error('服务器中断');
        })
      },
      delModular:function(target){
        let that = this
        this.$confirm('此操作将永久删除该目录, 是否继续?', '提示',
        {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {

          this.$axios({
            method:'post',
            url:'/document/delModular',
            params:{
              id:target
            },
            headers:{
              token:this.$root.token
            }
          }).then(function (response) {
            if(response.data.status == 'success'){
              that.modular.forEach(function(value,index,array){
                if(value.id == target){
                  array.splice(index,1)
                }
            })
              that.$message.success('删除成功');
            }
            else{
              that.$message.error('删除失败');
            }
          }).catch(function (error) {
            that.$message.error('服务器中断');
          })
        })
      }
    }
  }
</script>

<style>
 #app .modular{
    padding: 1.25rem;
  }
</style>
