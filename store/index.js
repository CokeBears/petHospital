// 页面路径：store/index.js 
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'
import cart from './modules/cart.js'
import persistedstate from 'vuex-persistedstate'

Vue.use(Vuex); //vue的插件机制

//Vuex.Store 构造器选项
export default new Vuex.Store({
	modules: { //存放状态
		user,
		cart
	},
	plugins: [
		persistedstate({
			storage: {
				getItem: key => {
					// 使用 return 语句返回本地存储的值
					return uni.getStorageSync(key);
				},
				setItem: (key, value) => {
					// 使用 return 语句返回执行成功标志
					return uni.setStorageSync(key, value);
				},
				removeItem: key => {
					// 使用 return 语句返回执行成功标志
					return uni.removeStorageSync(key);
				}
			}
		})
	]
})