<!-- 问诊 -->
<script setup>
import { postIdFind } from '@/apis/inquiryAPI'
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue'
import { Upload, List } from '@element-plus/icons-vue'
import { getCommodityFind } from '@/apis/itemsAPI'
import { postCases } from '@/apis/inquiryAPI'
import router from '@/router';

const route = useRoute();
// route.query.id
const petRegister = ref({})
const itemsList = ref([])
const checkList = ref([])
const idFind = async () => {
    const res = await postIdFind(route.query.id)
    petRegister.value = res.data
}
onMounted(
    () => idFind()
)
const commodityFind = async () => {
    const res = await getCommodityFind()
    itemsList.value = res.data
}
onMounted(
    () => commodityFind()
)
const subimtCases = async (subimtList) =>{
    const res = postCases(subimtList)
    console.log(res.data);
}


const dialogCheckboxVisible = ref(false)
const textarea = ref('')

const subimt = async () => {
    const subimtList = {
        id: route.query.id,
        textarea: textarea.value,
        itemsList: JSON.parse(JSON.stringify(checkList.value))
    }
    subimtCases(subimtList)
    router.go(-1)
}
</script>

<template>
    <div class="cases-header">
        <div class="cases-pet">
            <img class="cases-avatar" v-if="petRegister != null"
                :src="`http://127.0.0.1:3000/uploads/${petRegister.pet?.petImg}`">
            <p class="cases-name">{{ petRegister.pet?.name }} ( {{ petRegister.pet?.variety }} )</p>
            <p class="cases-time">预约时间：{{ petRegister?.time }}</p>
        </div>
    </div>
    <div class="cases-main">
        <div class="cases-box">
            <h3>诊断结果:</h3>
            <div class="cases-button">
                <el-button type="success" @click="dialogCheckboxVisible = true">
                    治疗项目意见<el-icon class="el-icon--right">
                        <List />
                    </el-icon>
                </el-button>
                <el-button type="primary" @click="subimt">
                    提交诊断<el-icon class="el-icon--right">
                        <Upload />
                    </el-icon>
                </el-button>
            </div>
        </div>
        <el-input v-model="textarea" maxlength="1000" placeholder="请输入诊断结果" show-word-limit type="textarea" />
    </div>
    <el-dialog v-model="dialogCheckboxVisible" title="选择医疗项目">
        <!-- 获取到医疗项目使用for循环渲染 -->
        <el-checkbox-group v-model="checkList">
            <el-checkbox v-for="i in itemsList" :key="i._id" :label="i" size="large">{{ i.name }}</el-checkbox>
        </el-checkbox-group>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogCheckboxVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogCheckboxVisible = false">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>



<style lang="scss">
.cases-header {
    border-radius: 10px;
    box-sizing: border-box;
    padding-left: 50px;
    width: 100%;
    height: 120px;
    background-color: white;
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .cases-pet {
        height: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;

        .cases-avatar {
            height: 80px;
            border-radius: 80px;
            margin-right: 30px;
        }

        .cases-name {
            margin-right: 30px;
            font-weight: bold;
            font-size: 16px;
        }

        .cases-time {
            font-weight: bold;
            font-size: 15px;
        }
    }
}

.cases-main {
    max-height: 1500px;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 10px;
    background-color: white;

    .cases-box {
        box-sizing: border-box;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
    }
}
</style>