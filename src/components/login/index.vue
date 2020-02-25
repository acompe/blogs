<template>
<div class="loginFrom">
    <el-row>
      <el-col :span="8" :offset="8">
        <el-card class="box-card">
          <div class="loginFrom-title">
            后台管理登录
          </div>
          <div class="loginFrom-body">
            <el-form status-icon label-width="50px">
              <el-form-item label="账号">
                <el-input v-model="userform.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input type="password" v-model="userform.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
</div>
</template>

<script>
  export default{
    name:'loginForm',
    data(){
      return{
        userform:{
          username:'',
          password:''
        }
      }
    },
    methods:{
      resetForm:function() {
        this.userform.username=''
        this.userform.password=''
      },
      submitForm:function(){
        var that = this
        this.$axios({
          method:'post',
          url:'/user/login',
          params:that.userform
        }).then(function (response) {
          if(response.data.status == 'success'){
            that.$root.token = response.data.value
            sessionStorage.token = response.data.value
            that.$router.push('/admin').catch(err => {console.log(err)})
          }else{
            that.$message.error('账号或密码错误');
          }
        }).catch(function (error) {
          that.$message.error('服务器中断');
        })
      }
    }
  }
</script>

<style>
  #app .loginFrom{
    text-align: center;
    margin-top: 6.25rem;
  }
  #app .loginFrom-title{
    font-size: 1.875rem;
  }
  #app .loginFrom-body{
    margin-top: 3.125rem;
    min-height: 12.5rem;
    padding: 2.5rem;
  }
</style>
