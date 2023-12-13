import {
	http,
	uploadFile
} from '../utils/http.js'

export const getFind = () => {
	return http({
		url: '/adminLogin/doctor',
		method: 'get',
	})
}