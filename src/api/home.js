import instance from '@/utils/request.js'
function getUserInfo(params) {
    return instance({
        url: '/info',
        method: 'get',
        params
    })
}
/* 退出 */
function exitLogin() {
    return instance({
        url: '/logout',
        method: 'get',
    })
}
export { getUserInfo, exitLogin }