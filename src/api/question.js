import instance from '@/utils/request.js'
// 获取题目列表信息接口
function questionList(params) {
    return instance({
        url: '/question/list',
        method: 'get',
        params
    })
}
export { questionList }