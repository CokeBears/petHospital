import httpInstance from '@/utils/http'

export const getAdminFind = () => {
    return httpInstance({
        url: '/register/adminFind',
        method: 'GET',
    })
}

export const getHistoryFind = () => {
    return httpInstance({
        url: '/register/historyFind',
        method: 'GET',
    })
}

export const postHistoryFind = (data) => {
    return httpInstance({
        url: '/register/historyFind',
        method: 'POST',
        data: data
    })
}

export const postIdFind = (id) => {
    return httpInstance({
        url: '/register/idFind',
        method: 'POST',
        data: {
            id: id
        }
    })
}

export const postCases = (subimtList) => {
    return httpInstance({
        url: '/register/cases',
        method: 'POST',
        data: subimtList
    })
}