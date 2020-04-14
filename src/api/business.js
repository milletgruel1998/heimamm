import instance from '@/utils/request.js'
function getBusinessData(params) {
    return instance({
        url: '/enterprise/list',
        params
    })
}
function setBusinessStatus(data) {
    return instance({
        url: '/enterprise/status',
        method: 'post',
        data
    })
}
function deleteBusinessData(data) {
    return instance({
        url: '/enterprise/remove',
        method: 'post',
        data
    })
}
function addBusiness(data) {
    return instance({
        url: '/enterprise/add',
        method: 'post',
        data
    })
}
function editBusiness(data) {
    return instance({
        url: '/enterprise/edit',
        method: 'post',
        data
    })
}
export { getBusinessData, setBusinessStatus, deleteBusinessData, addBusiness, editBusiness }