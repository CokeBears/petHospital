<!-- 问诊功能 -->
<script setup>
import { getHistoryFind, postHistoryFind, postIdFind } from '@/apis/inquiryAPI';
import { computed, ref, onMounted } from 'vue'
const casesMain = ref({})
const currentPage = ref(1)//页数
const background = ref(false)
const pageSize = ref(14)//每页条数
const maxPage = ref([])//全部数据
const tableData = ref([])
const dialogCasesVisible = ref(false)
// 分页数据
const historyFind = async () => {
    const res = await getHistoryFind()
    tableData.value = res.data
}
// 全部数据
const historyFindMax = async () => {
    const res = await postHistoryFind({ currentPage: currentPage.value, pageSize: pageSize.value })
    maxPage.value = res.data
}
const findId = async (id) => {
    const res = await postIdFind(id)
    casesMain.value = res.data
}

onMounted(() => historyFind())
onMounted(() => historyFindMax())

const search = ref('')
const filterTableData = computed(() => {
    if (search.value) {
        return maxPage.value.filter((data) => {
            return data.name.toLowerCase().includes(search.value.toLowerCase());
            //.toLowerCase()处理大小写 .includes包含检查
        });
    } else {
        return tableData.value
    }
});
const open = async (row) => {
    dialogCasesVisible.value = true
    await findId(row._id)
}
</script>


<template>
    <div class="history-box">
        <el-dialog v-model="dialogCasesVisible" title="病例详情">
            <div>
                <p>用户ID：{{ casesMain?.pet?.phone }}</p>
                <p>宠物名称：{{ casesMain?.pet?.name }}</p>
                <p>诊断时间：{{ casesMain?.time }}</p>
                <p>诊断结果：{{ casesMain?.cases }}</p>
                <p>医疗开具：</p>
                <p v-for="i in casesMain?.commodity">{{ i.name }}</p>
            </div>
        </el-dialog>
        <el-table :data="filterTableData" style="width: 100%">
            <el-table-column label="诊断时间" prop="time" />
            <el-table-column label="宠物名称" prop="pet.name" />
            <el-table-column label="用户ID" prop="pet.phone" />
            <el-table-column align="right">
                <template #header>
                    <el-input v-model="search" placeholder="用户ID查找" />
                </template>
                <template #default="scope">
                    <el-button @click="open(scope.row)">查看记录</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="demo-pagination-block">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :background="background"
                layout="prev, pager, next, jumper" :total="maxPage.length" @current-change="commodityFind()" />
        </div>
    </div>
</template>



<style lang="scss">
.history-box {
    background-color: white;
    padding-bottom: 5px;

    .demo-pagination-block {
        box-sizing: border-box;
        margin-top: 18px;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
    }
}
</style>