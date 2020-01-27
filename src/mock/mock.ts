import Mock, { Random } from 'mockjs'

Mock.mock('/demo/query','post',{
    success:true,
    message:'@cparagraph',
    'data|8-10':[{
        'key|+1':1,
        'userId|5':'',
        'username|8':'',
        'fullname':'@ctitle(2,4)',
        'birthday':Random.date()
    }]
}) 

Mock.mock(/\/demo\/delete\/.+/,'delete',{
    success:true,
    message:'删除成功',
})


console.log('mockjs initialized')