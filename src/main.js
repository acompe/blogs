// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'

import home from './components/home/index.vue'
import structure from './components/structure/index.vue'
import login from './components/login/index.vue'
import admin from './components/admin/index.vue'

//初始化全局配置
if(sessionStorage.modular == undefined){
  let modular =[{id:1,name:'正在加载',description:'正在加载,请稍等'}]
  sessionStorage.modular = JSON.stringify(modular)
}
if(sessionStorage.token == undefined){
  sessionStorage.token = JSON.stringify('')
}
Vue.prototype.$marked = marked

//路由配置
var router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect:'/home'
    },
    {
      path:'/home',
      component:home
    },
    {
      path:'/structure',
      component:structure
    },
    {
      path:'/login',
      component:login
    },
    {
      path:'/admin',
      component:admin => require(['@/components/admin/index.vue'], admin),
      meta: {checkLogined: true},
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.checkLogined) {
    console.log(sessionStorage.token)
    if (sessionStorage.token.length < 20) {
      next({
        path: '/login'
      })
    }
    else {
      next()
    }
  }
  else {
    next()
  }
})


//网络配置
axios.defaults.baseURL='http://www.acompe.com'
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data(){
    return{
      modular:JSON.parse(sessionStorage.modular),
      token:JSON.parse(sessionStorage.token)
    }
  },
  watch:{
    modular:{
      handler:function(s){
        sessionStorage.modular = JSON.stringify(s)
      },
      deep:true
    },
    token:{
      handler:function(s){
        sessionStorage.token = JSON.stringify(s)
      },
      deep:true
    }
  },
  mounted(){
    let that = this
    this.$axios({
      method:'post',
      url:'/document/modular',
    }).then(function (response) {
      if(response.data.status == 'success'){
        that.modular = response.data.value
      }
    })
  }
})
