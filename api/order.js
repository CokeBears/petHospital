import {
	http,
	uploadFile
} from '../utils/http.js'

export const findOrder = () => {
	return http({
		url: '/order/find',
		method: 'GET',
	})
}

export const pushOrder = (cart,totalPrice,userInfo) => {
	return http({
		url: '/order/push',
		method: 'POST',
		data: {
			cart:cart,
			totalPrice:totalPrice,
			userInfo:userInfo
		}
	})
}

export const findOneOrder = (id) => {
	return http({
		url: '/order/findOne',
		method: 'POST',
		data: {
			id:id
		}
	})
}