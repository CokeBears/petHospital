import httpInstance from '@/utils/http'

export const postImgSever = (avatar) => {
    // 创建一个FormData对象，并将文件添加到其中
    const formData = new FormData();
    formData.append('file', avatar);
    return httpInstance({
        url: '/upload',
        method: 'POST',
        data: formData, // 将FormData对象传递给data字段
        headers: {
            'Content-Type': 'multipart/form-data', // 设置适当的Content-Type
        },
    });
}