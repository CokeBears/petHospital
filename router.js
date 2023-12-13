import {
	RouterMount,
	createRouter
} from 'uni-simple-router'
import store from './store/index.js'

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	routes: [
		...ROUTES
	],
});

router.beforeEach((to, from, next) => {
	let token = store.state.user.token
	if (to.meta.requiresAuth && !token) {
		// 没有 token，取消路由跳转
		next(false);
		// 触发登录提示
		uni.switchTab({
			url:'/pages/my/my',
			success() {
				uni.$emit('toastLogin');
			}
		})
		
	} else {
		next(); // 有 token，继续路由跳转
	}
});
router.afterEach((to, from) => {

});

export {
	router,
	RouterMount
}