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
export { getBusinessData, setBusinessStatus }