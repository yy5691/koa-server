const userService = require('../service/userService')

class UserController {
  // 获取用户信息
  static async getUserInfo(ctx){
    ctx.body = await userService.getUserInfo(ctx)
  }

  // 更新用户信息
  static  async updateUserInfo(ctx){
    ctx.body = await userService.updateUserInfo(ctx)
  }

  // 删除用户信息
  static async deleteUserInfo(ctx){
    ctx.body = await userService.deleteUserInfo(ctx)
  }

  // 获取用户列表
  static async getUserList(ctx){
    ctx.body = await userService.getUserList(ctx)
  }

  // 根据id获取用户信息
  static async getUserInfoById(ctx){
    ctx.body = await userService.getUserInfoById(ctx)
  }
}

module.exports = UserController;
