import instance from '@/utils/request.js'
// 获取题目列表信息接口
function questionList(params) {
    return instance({
        url: '/question/list',
        method: 'get',
        params
    })
}
/* 设置题目状态 */
function setQuestionStatus(data) {
    return instance({
        url: '/question/status',
        method: 'post',
        data
    })
}
/* 发布题目 */
function addQuestion(data) {
    return instance({
        url: '/question/add',
        method: 'post',
        data
    })
}
/* 删除题目 */
function deleteQuestion(data) {
    return instance({
        url: '/question/remove',
        method: 'post',
        data
    })
}
/* 编辑题目 */
function editQuestion(data) {
    return instance({
        url: '/question/edit',
        method: 'post',
        data
    })
}
export { questionList, setQuestionStatus, addQuestion, deleteQuestion, editQuestion }