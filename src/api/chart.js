import instance from '@/utils/request.js'
/* 面板数据接口 */
function getchartData() {
    return instance({
        url: '/data/title',
        method: 'post',
    })
}
/* 企业题目数据统计 */
function getQuestionData() {
    return instance({
        url: '/data/statistics',
        method: 'post',
    })
}
export { getchartData, getQuestionData }