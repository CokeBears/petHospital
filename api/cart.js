import {
	http,
	uploadFile
} from '../utils/http.js'

export const pushCart = (items) => {
	return http({
		url: '/cart/push',
		method: 'POST',
		data: items
	})
}

export const findCart = () => {
	return http({
		url: '/cart/find',
		method: 'GET',
	})
}