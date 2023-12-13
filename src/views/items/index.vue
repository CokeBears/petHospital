<!-- 商品 -->
<script setup>
import { computed, ref, onMounted } from 'vue';
import { Upload } from '@element-plus/icons-vue'
import { getCommodityFind, postCommodityFind, postCommodityPush, postCommodityRevise, deleteCommodityAPI } from '@/apis/itemsAPI'

const search = ref('');
const tableData = ref([])//分页数据

const currentPage = ref(1)//页数
const background = ref(false)
const pageSize = ref(14)//每页条数
const maxPage = ref([])//全部数据
//查找并加载数据
const commodityFind = async () => {
    const res = await postCommodityFind({ currentPage: currentPage.value, pageSize: pageSize.value })
    tableData.value = res.data
}
const commodityFindMax = async () => {
    const res = await getCommodityFind()
    maxPage.value = res.data
}
onMounted(() => commodityFind())
onMounted(() => commodityFindMax())
const commodityPush = async () => {
    const res = await postCommodityPush(form.value)
}
const commodityRevise = async (id) => {
    const res = await postCommodityRevise(form.value, id)
}

const deleteCommodity = async (id) => {
    const res = await deleteCommodityAPI(id)
    commodityFind()
}

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
let state = 0 //用于识别新增0和修改1 
const form = ref({
    name: '',
    price: '',
    sort: '',
})
let ReviseId = ''
const open = async (row) => {
    dialogFormVisible.value = true
    ReviseId = ''
    if (state === 1) {
        //将原有数据渲染到位置上
        form.value = row
        ReviseId = row._id
    } else {
        form.value = {}
    }
}
const submit = async () => {
    if (state === 0) {
        //新增
        await commodityPush()
        commodityFind()
    } else {
        //修改
        await commodityRevise(ReviseId)
        commodityFind()
    }
    dialogFormVisible.value = false
}

//通过计算属性监测搜索框内容
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

</script>

<template>
    <div class="items-box">
        <el-table :data="filterTableData" style="width: 100%">
            <el-table-column label="类型" prop="sort" />
            <el-table-column label="医疗项目" prop="name" />
            <el-table-column label="价格（人民币 元）" prop="price" />
            <el-table-column align="right">
                <template #header>
                    <div class="table-header">
                        <el-input v-model="search" placeholder="请输入查找项目名" />
                        <el-button type="primary" class="header-button" @click="state = 0, open()">
                            添加项目<el-icon class="el-icon--right">
                                <Upload />
                            </el-icon>
                        </el-button>
                    </div>
                </template>
                <template #default="scope">
                    <el-button @click="state = 1, open(scope.row)">修改</el-button>
                    <el-button type="danger" @click="deleteCommodity(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="demo-pagination-block">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                :background="background" layout="prev, pager, next, jumper" :total="maxPage.length"
                @current-change="commodityFind()" />
        </div>
    </div>


    <el-dialog v-model="dialogFormVisible" title="项目信息">
        <el-form :model="form">
            <el-form-item label="项目类型" :label-width="formLabelWidth">
                <el-select v-model="form.sort" placeholder="选择项目类型">
                    <el-option label="洗护" value="洗护" />
                    <el-option label="疫苗" value="疫苗" />
                    <el-option label="放射检测" value="放射检测" />
                    <el-option label="血液检测" value="血液检测" />
                    <el-option label="常规检测" value="常规检测" />
                    <el-option label="手术治疗" value="手术治疗" />
                </el-select>
            </el-form-item>
            <el-form-item label="项目名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="项目价格" :label-width="formLabelWidth">
                <el-input-number v-model="form.price" :precision="2" :step="0.1" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submit()">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>


<style lang="scss">
.table-header {
    display: flex;
    box-sizing: border-box;
    align-items: center;

    .header-button {
        margin-left: 10px;
    }
}

.items-box {
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

.el-button--text {
    margin-right: 15px;
}

.el-select {
    width: 300px;
}

.el-input {
    width: 300px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>