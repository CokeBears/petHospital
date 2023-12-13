import httpInstance from '@/utils/http'

// 登录
export const postLogin = (id, password) => {
    return httpInstance({
        url: '/adminLogin/login',
        method: 'POST',
        data: { id: id, password: password }
    })
}

// 注册
export const postEnroll = (id, password) => {
    return httpInstance({
        url: '/adminLogin/enroll',
        method: 'POST',
        data: { id: id, password: password }
    })
}

// 修改
export const postUpdate = (formData) => {
    return httpInstance({
        url: '/adminLogin/update',
        method: 'POST',
        data:formData
    })
}

//查找
export const getFind = () => {
    return httpInstance({
        url: '/adminLogin/find',
        method: 'GET',
    })
}