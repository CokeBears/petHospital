import store from '../store/index.js'

//拦截器
const baseURL = 'http://127.0.0.1:3000'

//添加拦截
const httpInterceptor = {
	//拦截前触发
	invoke(args) {
		if (!args.url.startsWith('http')) {
			args.url = baseURL + args.url
		}
		// 添加过期时间
		args.timeout = 5000;

		// 从Vuex存储中获取令牌
		const token = store.state.user.token; // 假设你的Vuex存储中有一个名为'token'的getter
		// 将令牌添加到请求头中
		if (token) {
			args.header = {
				...args.header,
				token: `${token}`
			};
		}
	}
}

uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploaFile', httpInterceptor)

export const http = (args) => {
	return new Promise((resolve, reject) => {
		uni.request({
			...args,
			//请求成功
			success(res) {
				resolve(res.data)
			},
			// 请求失败
			fail(error) {
				reject(error)
			},
		})
	})
}

export const uploadFile = (args) => {
	args.url = baseURL + args.url;
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			...args,
			// 请求成功
			success(res) {
				resolve(res.data)
			},
			// 请求失败
			fail(error) {
				reject(error)
			},
		})
	})
}