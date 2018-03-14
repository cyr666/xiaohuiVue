// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app/App'
import router from './router'
import biz from './config.js'
import Element from 'element-ui'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'
import 'element-ui/lib/theme-chalk/index.css'
import VueBus from 'vue-bus';

Vue.use(VueBus);
Vue.config.productionTip = false
Vue.use(Element)
Vue.use(VueAxios,axios)
Vue.use(qs)
Vue.prototype.biz = biz
Vue.prototype.getTimer=function(time){
  let mydate=new Date(time);
  let str=''
  str+=mydate.getFullYear()+'-'
  str+=((mydate.getMonth()+1) < 10 ? '0'+(mydate.getMonth()+1) :　(mydate.getMonth()+1))+'-'
  str+=(mydate.getDate() < 10 ? '0'+mydate.getDate() : mydate.getDate())+' '
  str+=(mydate.getHours() < 10 ? '0'+mydate.getHours() : mydate.getHours())+':'
  str+=(mydate.getMinutes() < 10 ? '0'+mydate.getMinutes() : mydate.getMinutes())+':'
  str+=(mydate.getSeconds() < 10 ? '0'+mydate.getSeconds() : mydate.getSeconds())
  return str
}
Vue.prototype.gethour=function(){
	let mydate=new Date();
  let str=''
	str+=(mydate.getHours() < 10 ? '0'+mydate.getHours() : mydate.getHours())+':'
  str+=(mydate.getMinutes() < 10 ? '0'+mydate.getMinutes() : mydate.getMinutes())+':'
  str+=(mydate.getSeconds() < 10 ? '0'+mydate.getSeconds() : mydate.getSeconds())
  return str
}
Vue.prototype.getStartTimer=function(){
  let mydate=new Date();
  let str=''
  str+=mydate.getFullYear()+'-'
  str+=((mydate.getMonth()+1) < 10 ? '0'+(mydate.getMonth()+1) :　(mydate.getMonth()+1))+'-'
  str+=(mydate.getDate() < 10 ? '0'+mydate.getDate() : mydate.getDate())+' '
  str+='00:00:00'
  return str
}
Vue.prototype.fun_date = function(aa){
    var date1 = new Date(),
    time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//time1表示当前时间
    var date2 = new Date(date1);
    date2.setDate(date1.getDate()+aa);
    var time2 = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate();
    return time2
}
Vue.axios.defaults.withCredentials = true
// Vue.axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.axios.defaults.headers['Content-Type'] = 'application/json'
Vue.config.productionTip = false
/* eslint-disable no-new */
window.Bus = new Vue()
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
