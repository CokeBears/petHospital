import {
	http,
	uploadFile
} from '../utils/http.js'

export const getCommoditySort = (sort) => {
	return http({
		url: '/commodity/sort',
		method: 'POST',
		data: {
			sort: sort
		}
	})
}