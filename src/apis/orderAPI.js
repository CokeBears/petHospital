import httpInstance from '@/utils/http'

export const getOrderFind = () => {
    return httpInstance({
        url: '/order/findMax',
        method: 'GET',
    })
}

export const postOrderFind = (data) => {
    return httpInstance({
        url: '/order/find',
        method: 'POST',
        data: data
    })
}

export const postIdFind = (id) => {
    return httpInstance({
        url: '/order/findOne',
        method: 'POST',
        data: {
            id: id
        }
    })
}

export const postOrderState = (id) => {
    return httpInstance({
        url: '/order/state',
        method: 'POST',
        data: {
            id: id
        }
    })
}