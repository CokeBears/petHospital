<!-- 个人资料修改 -->
<script setup>
import { ref, toRaw } from 'vue'
import { reactive } from 'vue'
import { postImgSever } from '@/apis/imgSeverAPI'
import { postUpdate } from '@/apis/loginAPI';
import router from '@/router';
import { useAdminStore } from '@/stores/admin'
import { onMounted } from 'vue'
const adminStore = useAdminStore()
const renew = adminStore.renew
onMounted(renew)
adminStore.admin.data.admin
const imageUrl = ref(`http://127.0.0.1:3000/uploads/${adminStore.admin.data.admin.avatar}`);
let numImg = 0
let file = ''


const handleFileUpload = (event) => {
    file = event.target.files[0];
    if (file) {
        numImg = 1
        const reader = new FileReader();
        reader.onload = (e) => {
            imageUrl.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

const form = reactive({
    name: adminStore.admin.data.admin.name,
    division: adminStore.admin.data.admin.division,
    position: adminStore.admin.data.admin.position,
    adminId: adminStore.admin.data.admin.adminId,
})
let formData = {}
const onSubmit = async () => {
    var avatar = ''
    if (numImg) {
        const imgSever = async () => {
            const res = await postImgSever(file)
            // console.log(res.data);
            avatar = res.data
            formData = { ...toRaw(form), "avatar": avatar }
        }
        await imgSever()
        numImg = 0
    } else {
        formData = toRaw(form)
    }
    const update = async () => {
        const res = await postUpdate(formData)
    }
    await update()
    router.push('/');
}
const quit = () => {
    router.push('/')
}
</script>

<template>
    <div class="revise-box">
        <label for="avatar">
            <div class="revise-avatar">
                <img v-if="imageUrl" :src="imageUrl">
            </div>
        </label>
        <input id="avatar" type="file" @change="handleFileUpload" style="display: none;">
        <el-form :model="form" label-width="120px">
            <el-form-item label="姓名">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input v-model="form.adminId" />
            </el-form-item>
            <el-form-item label="科室">
                <el-select v-model="form.division" placeholder="选择科室">
                    <el-option label="血液科" value="血液科" />
                    <el-option label="皮肤科" value="皮肤科" />
                    <el-option label="骨科" value="骨科" />
                    <el-option label="康复科" value="康复科" />
                    <el-option label="神经科" value="神经科" />
                </el-select>
            </el-form-item>
            <el-form-item label="职务">
                <el-select v-model="form.position" placeholder="选择职务">
                    <el-option label="主任教授" value="主任教授" />
                    <el-option label="副主任教授" value="副主任教授" />
                    <el-option label="主治医生" value="主治医生" />
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="quit()">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style lang="scss" scoped>
.revise-box {
    box-sizing: border-box;
    padding: 10px;
    background-color: white;
    display: flex;
    align-items: center;

    .revise-avatar {
        height: 250px;
        width: 350px;
        margin-right: 20px;
    }
}
</style>