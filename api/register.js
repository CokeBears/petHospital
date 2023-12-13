import {
	http,
	uploadFile
} from '../utils/http.js'

export const pushRegisterAPI = (formdata) => {
	return http({
		url: '/register/push',
		method: 'POST',
		data: formdata
	})
}

export const getRegisterAPI = () => {
	return http({
		url: '/register',
		method: 'GET',
	})
}

//看诊后的历史病例
export const getStateAPI = (id) => {
	return http({
		url: '/register/state',
		method: 'POST',
		data: {
			id: id
		}
	})
}

export const deleteRegisterAPI = (id) => {
	return http({
		url: `/register/delete?id=${id}`,
		method: 'DELETE',
	})
}

//看诊后的历史病例,表id查询
export const postIdFind = (id) => {
	return http({
		url: '/register/idFind',
		method: 'POST',
		data: {
			id: id
		}
	})
}