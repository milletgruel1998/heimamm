import instance from '@/utils/request.js'
function getUserList(params) {
    return instance({
        url: '/user/list',
        method: 'get',
        params
    })
}
function changeUserStatus(data) {
    return instance({
        url: '/user/status',
        method: 'post',
        data
    })
}
function deleteUserData(data) {
    return instance({
        url: '/user/remove',
        method: 'post',
        data
    })
}
function addUserData(data) {
    return instance({
        url: '/user/add',
        method: 'post',
        data
    })
}
function editUserData(data) {
    return instance({
        url: '/user/edit',
        method: 'post',
        data
    })
}

export { getUserList, changeUserStatus, deleteUserData, addUserData, editUserData }