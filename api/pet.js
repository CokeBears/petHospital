import {
	http,
	uploadFile
} from '../utils/http.js'


export const pushPetAPI = (formdata) => {
	return http({
		url: '/pet/push',
		method: 'POST',
		data: formdata
	})
}

export const deletePetAPI = (id, avatar) => {
	return http({
		url: `/pet/delete?id=${id}&avatar=${avatar}`,
		method: 'DELETE',
	})
}

export const getPetAPI = () => {
	return http({
		url: '/pet',
		method: 'GET',
	})
}

export const findPetAPI = (id) => {
	return http({
		url: '/pet/find',
		method: 'POST',
		data: {
			id: id
		}
	})
}

export const revisePetAPI = (formdata,id,oldAvatar) => {
	return http({
		url: `/pet/revise?id=${id}&oldAvatar=${oldAvatar}`,
		method: 'POST',
		data: formdata
	})
}