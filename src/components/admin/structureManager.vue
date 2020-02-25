<template>
  <div class="structure">
    <div class="structure-manager">
      <el-button type="primary" size="mini" round @click='addRootStructure'>创建</el-button>
      <el-button type="success" size="mini" round @click='saveStructure'>保存</el-button>
    </div>
    <el-tree
      node-key="id"
      default-expand-all
      draggable
      :expand-on-click-node="false"
      :data="structure"
      :render-content="renderContent">
    </el-tree>
  </div>

</template>

<script>
  export default{
    name:'structureManager',
    props:['modular'],
    data(){
      return{
        structure:this.modular.structure
      }
    },
    methods:{

      append(data) {
        this.$prompt('请输入你要创建的名字', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {

          const newChild = { id:this.getId(this.structure), label:value, children: [] };
          if (!data.children) {
            this.$set(data, 'children', []);
          }
          data.children.push(newChild);
        })
      },
      update(data) {
        this.$prompt('请输入要修改的名字', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          data.label = value
        })
      },
      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },
      addRootStructure(){
        this.$prompt('请输入标题', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                }).then(({ value }) => {
                  if(this.structure == null){
                    this.structure = new Array()
                  }
                  this.structure.push({id:this.getId(this.structure),label:value})
                });
      },
      saveStructure(){
        let that = this
        this.$axios({
          method:'post',
          url:'/document/updateStructure',
          params:{
            id:this.modular.id,
            structure:JSON.stringify(that.structure)
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
      },
      getId(tree){
        let maxId = 1
        for(let i=0;i<tree.length;i++){
          if(tree[i].children == undefined){
            if(maxId < tree[i].id){
              maxId = tree[i].id
            }
          }else{
            let mId = this.getId(tree[i].children)
            if(maxId < mId){
              maxId = mId
            }
          }
        }
        return maxId+1;
      },
      renderContent(h, { node, data, store }) {
        return (<span class='lineTree'>
            <span class='lineTree'>{node.label}</span>
            <span style="float:right">
              <el-button size="mini" type="text" on-click={ () => this.append(data)}>添加</el-button>
              <el-button size="mini" type="text" on-click={ () => this.update(data)}>修改</el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data)}>删除</el-button>
            </span>
          </span>)
      }
    }
  }
</script>

<style>
#app .lineTree{
  width: 100%;
}
#app .structure-manager{
  padding:1.25rem;
  text-align: right;
}
</style>
