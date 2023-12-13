import {
	http,
	uploadFile
} from '../utils/http.js'


export const imgSeverAPI = (avatar) => {
	return uploadFile({
		url: '/upload', //服务器接收url
		filePath: avatar,
		name: 'file', // 服务端接收文件的字段名
	})
}