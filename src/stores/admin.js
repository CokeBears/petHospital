import { defineStore } from 'pinia'
import { postLogin, getFind } from '@/apis/loginAPI'
import router from '@/router'
import { ref } from 'vue'

export const useAdminStore = defineStore('Admin', () => {
    const admin = ref({})

    const getAdminInfo = async (id, password) => {
        const res = await postLogin(id, password)
        admin.value = res
    }
    //用于更新数据
    const renew = async () => {
        const res = await getFind()
        admin.value = res
    }
    const clearUserInfo = () => {
        admin.value = {}
        router.push('/')
    }
    return { admin, renew, getAdminInfo, clearUserInfo }
}, {
    persist: true,
})