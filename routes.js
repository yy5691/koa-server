const authController = require('./controller/authContoller')
const userController = require('./controller/userController')
const remotePre = '/koa'
module.exports = [
    // 通用路由
    {
        path: `${remotePre}/login`,
        method: 'post',
        action: authController.login
    },
    {
        path: `${remotePre}/register`,
        method: 'post',
        action: authController.register
    },
    {
        path: '/koa',
        method: 'get',
        action: (ctx) => { ctx.body = "hello koa" }
    },
    // 文件上传
    {
        path: `${remotePre}/uploadFile`,
        method: 'post',
        action: authController.uploadFile
    },
    // 用户部分
    {
        path: `${remotePre}/userInfo`,
        method: 'get',
        action: userController.getUserInfo
    },
    {
        path: `${remotePre}/updateUserInfo`,
        method: 'post',
        action: userController.updateUserInfo
    },
    {
        path: `${remotePre}/userList`,
        method: 'get',
        action: userController.getUserList
    },
    {
        path:`${remotePre}/userInfoById`,
        method:'get',
        action:userController.getUserInfoById
    },
    {
        path:`${remotePre}/delUserInfo`,
        method:'get',
        action:userController.deleteUserInfo
    }
]
