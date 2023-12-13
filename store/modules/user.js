export default {
	state: {
		token:'',
		status:false,
		userInfo:{}
	},
	mutations: {
		setToken(state, token) {
			state.token = token
		},
		clearToken(state){
			state.userInfo = {}
			state.status = false
		},
		setInfo(state,info){
			state.userInfo = info
			state.status = true
		}
	}
}