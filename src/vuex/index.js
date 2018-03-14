import Vuex from 'vuex'
import Vue from 'vue'
import indexContent from '../pages/indexContent/module.js'
Vue.use(Vuex)

export default new Vuex.Store({
	modules:{
		indexContent:indexContent
	}
})