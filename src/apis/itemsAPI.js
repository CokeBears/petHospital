import httpInstance from '@/utils/http'

export const postCommodityFind = (data) => {
    return httpInstance({
        url: '/commodity/find',
        method: 'POST',
        data: data
    })
}

export const getCommodityFind = () => {
    return httpInstance({
        url: '/commodity/find',
        method: 'GET',
    })
}

export const postCommodityRevise = (form, id) => {
    return httpInstance({
        url: '/commodity/revise',
        method: 'POST',
        data: {
            form,
            id
        }
    })
}

export const postCommodityPush = (form) => {
    return httpInstance({
        url: '/commodity/push',
        method: 'POST',
        data: form
    })
}

export const deleteCommodityAPI = (id) => {
    return httpInstance({
        url: `/commodity/delete?id=${id}`,
        method: 'DELETE',
    })
}