import { instance } from '@/utils/request.js'

/* 获取手机验证码 */
function getPhoneCodeNum(data) {
    return instance({
        url: process.env.VUE_APP_URL + "/sendsms",
        method: "post",
        data,
    })
}

/* 提交表单 */
function submitForm(data) {
    return instance({
        url: '/register',
        method: 'post',
        data
    })
}

/* 调用注册接口 */
export { getPhoneCodeNum, submitForm }