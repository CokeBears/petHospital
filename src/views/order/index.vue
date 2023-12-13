<!-- 订单 -->
<script setup>
import { computed, ref, onMounted } from 'vue'
import { getOrderFind, postOrderFind, postOrderState } from '@/apis/orderAPI'
import { InfoFilled } from '@element-plus/icons-vue'
const orderMain = ref({})
const currentPage = ref(1)//页数
const background = ref(false)
const pageSize = ref(14)//每页条数
const maxPage = ref([])//全部数据
const tableData = ref([])
const dialogOrderVisible = ref(false)
const search = ref('')
const filterTableData = computed(() => {
    if (search.value) {
        return maxPage.value.filter((data) => {
            return data.phone.toLowerCase().includes(search.value.toLowerCase());
            //.toLowerCase()处理大小写 .includes包含检查
        });
    } else {
        return tableData.value
    }
});
// 详细信息
const open = (row) => {
    orderMain.value = row
    dialogOrderVisible.value = true
}
// 分页数据
const orderFind = async () => {
    const res = await getOrderFind()
    tableData.value = res.data
}
// 全部数据
const orderFindMax = async () => {
    const res = await postOrderFind({ currentPage: currentPage.value, pageSize: pageSize.value })
    maxPage.value = res.data
}
//确认收货
const orderState = async (row) => {
    console.log(row._id);
    const res = await postOrderState(row._id)
    orderFind()
    orderFindMax()
}

onMounted(() => orderFind())
onMounted(() => orderFindMax())
</script>

<template>
    <div class="order-box">
        <el-dialog v-model="dialogOrderVisible" :title="`订单详情 ( ${orderMain.state} )`">
            <div class="orderList">
                <p>时间：{{ orderMain.time }}</p><br>
                <p class="price">应付款：{{ orderMain.totalPrice }} 元</p>
            </div>
            <div class="orderList" v-for="i in orderMain.cart" :key="i">
                <p>{{ i.name }}：</p>
                <p class="price">{{ i.price }} 元</p>
            </div>
        </el-dialog>
        <el-table :data="filterTableData" style="width: 100%">
            <el-table-column label="提交时间" prop="time" />
            <el-table-column label="用户ID" prop="user.phone" />
            <el-table-column label="应付款(人民币 元)" prop='totalPrice' />
            <el-table-column label="状态" prop="state" />
            <el-table-column align="right">
                <template #header>
                    <el-input v-model="search" size="small" placeholder="用户ID查找" />
                </template>
                <template #default="scope">
                    <el-button size="small" @click="open(scope.row)">查看详情</el-button>
                    <el-popconfirm v-if="scope.row.state == '未支付'" width="220" confirm-button-text="是"
                        cancel-button-text="否" :icon="InfoFilled" icon-color="#626AEF" title="是否确认收款，该操作无法退回?"
                        @confirm="orderState(scope.row)">
                        <template #reference>
                            <el-button size="small" type="danger">确认付款</el-button>
                        </template>
                    </el-popconfirm>
                    <el-button v-else size="small" type="success" disabled>已付款</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="demo-pagination-block">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :background="background"
                layout="prev, pager, next, jumper" :total="maxPage.length" @current-change="commodityFind()" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.order-box {
    background-color: white;
    padding-bottom: 5px;

    .demo-pagination-block {
        box-sizing: border-box;
        margin-top: 18px;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
    }

    .orderList {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    }

    .price {
        color: red;
    }
}
</style>