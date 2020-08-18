const { encrypt, decrypt } = require('../utils/better-crypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// 注册
const register = async (ctx) => {
  const userModel = ctx.request.body;
  userModel.password = encrypt(userModel.password);
  const [project, created] = await User.findOrCreate({ where: { username: userModel.username }, defaults: userModel });
  return created ? { code: '200', data: project.get({ plain: true }), msg: "注册成功" } : { code: '201', msg: "该用户已存在" }
};
// 登录
const login = async (ctx) => {
  const user = ctx.request.body;
  const userModel = await User.findOne({ where: { username: user.username } });
  if (!userModel) {
    return {code: '201', msg: "该用户不存在"}
  }
  if (!decrypt(user.password, userModel.password)) {
    return { code: '00002', msg: "密码错误" }
  } else {
    const token = jwt.sign(user, '123456', { expiresIn: '1h' });
    return {code: '200', msg: "登陆成功", token}
  }
};
// 文件上传
const uploadFile = async (ctx)=>{
  console.log(ctx.request.files)
  if (ctx.request.files['file']) {
    console.log('上传')
    // 上传单个文件
    const file = ctx.request.files.file; // 获取上传文件
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(__dirname, '../static/images') + `/${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    let publicPath = `http://localhost:3000/static/images/${file.name}`
    return publicPath
    // return `http://koa.site.blueflyming.cn/static/images/${file.name}`
  }
};


module.exports = { register, login, uploadFile };
