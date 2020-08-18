const User = require('../models/user')
// 获取用户信息
const getUserInfo = async (ctx) => {
  const userInfo = ctx.state.user
  return await User.findOne({ where: { username: userInfo.username } })
};


// 根据id查询用户信息
const getUserInfoById = async (ctx) => {
  console.log(ctx.request.query)
  return await User.findOne({ where: { id: ctx.request.query.id } })
}

// 获取用户列表
const getUserList = async (ctx) => {
  return await User.findAll()
}

// 更新用户信息
const updateUserInfo = async (ctx) => {
  // const remoteUser = ctx.state.user
  const userInfo = ctx.request.body
  await User.update(userInfo, { where: { id: userInfo.id } })
  return { code: '200', msg: '修改信息成功' }

}

// 删除用户信息
const deleteUserInfo = async (ctx) => {
  const id = ctx.request.query.id
  await User.destroy({ where: { id: id } })
  return { code: '200', msg: '删除用户成功' }
}

module.exports = { getUserInfo, updateUserInfo, getUserList, getUserInfoById, deleteUserInfo }
