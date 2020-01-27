import Mock, { Random } from 'mockjs'

export default Mock.mock('/demo/query','post',{
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

console.log('mockjs initialized')