<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
}
</script>

<style>
  html,body{
    width: 100%;
    height: 100%;
    margin: 0;
  }
  #app{
    width: 100%;
    height: 100%;
  }
  #app .el-container{
    height: 100%;
  }
  #app .el-header{
    padding: 0rem;
  }
  #app .el-main{
    padding: 0rem;
    height: 100%;
  }
  #app .left-bar{
    background-color: #2e323e;
    height: 100%;
    margin: 0rem;
  }
  #app .left-bar-hide{
    color: white;
    text-align: center;
    letter-spacing:4px;
  }
  #app .left-bar .el-tree{
    background-color: transparent;
    color: white;
  }
  #app .left-bar .el-tree-node__content{
    padding-left:12.5rem;
  }
  #app .left-bar .el-tree-node__content:hover{
    background-color: #444444;
  }
  #app .left-bar .el-tree-node:focus>.el-tree-node__content{
    background-color: #444444;
  }
</style>
