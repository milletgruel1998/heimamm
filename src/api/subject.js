import instance from '@/utils/request.js'
function getSubjectData(params) {
    return instance({
        url: '/subject/list',
        method: 'get',
        params
    })
}
function getSubjectStatus(data) {
    return instance({
        url: '/subject/status',
        method: 'post',
        data
    })
}
function deleteSubStatus(data) {
    return instance({
        url: '/subject/remove',
        method: 'post',
        data
    })
}
function addSubject(data) {
    return instance({
        url: '/subject/add',
        method: 'post',
        data
    })
}
function editSubject(data) {
    return instance({
        url: '/subject/edit',
        method: 'post',
        data
    })
}
export { getSubjectData, getSubjectStatus, deleteSubStatus, addSubject, editSubject }