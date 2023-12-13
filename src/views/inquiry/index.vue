<!-- 问诊功能 -->
<script setup>
import { getAdminFind } from '@/apis/inquiryAPI'
import { ref, onMounted } from 'vue'
import item from './components/item.vue'
import { List } from '@element-plus/icons-vue'
import router from '@/router';
const reserveList = ref([])
const adminFind = async () => {
    const res = await getAdminFind()
    reserveList.value = res.data
}
onMounted(adminFind)
</script>


<template>
    <div class="inquiry-box">
        <el-empty v-if="reserveList.length <= 0" description="description" />
        <div v-else class="inquiry-max">
            <item v-for="i in reserveList" :key="i._id" v-if="reserveList.length >= 0">
                <div class="item-pet">
                    <img class="inquiry-avatar" :src="`http://127.0.0.1:3000/uploads/${i.pet.petImg}`">
                    <p class="inquiry-name">{{ i.pet.name }} ( {{ i.pet.phone }} )</p>
                    <p class="inquiry-time">预约时间：{{ i.time }}</p>
                </div>
                <el-button type="primary" @click="router.push({ path: '/cases', query: { id: i._id } })">
                    开始问诊<el-icon class="el-icon--right">
                        <List />
                    </el-icon>
                </el-button>
            </item>
            <div class="inquiry-null" v-else>
                <el-empty description="当前没有预约" />
            </div>
        </div>
    </div>
</template>



<style lang="scss">
.inquiry-box {
    box-sizing: border-box;
    padding: 10px;
    padding-bottom: 1px;
    background-color: white;

    .inquiry-null {
        margin-top: 100px;
        margin-bottom: 200px;
    }

    .inquiry-max {
        .item-pet {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .inquiry-avatar {
                width: 50px;
                border-radius: 50px;
            }

            .inquiry-name {
                margin-left: 20px;
                font-weight: bold;
            }

            .inquiry-time {
                margin-left: 30px;
            }
        }
    }
}
</style>