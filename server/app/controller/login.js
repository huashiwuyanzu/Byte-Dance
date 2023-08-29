'use strict';

const { Controller } = require('egg');


class LoginController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  // 处理用户注册
  async userReg() {
    const { ctx } = this;
    const newUserInfo = ctx.request.body;
    const registStatus = await ctx.service.user.regist(newUserInfo);
    ctx.body = {
      status: registStatus === true ? 200 : 201,
      msg: registStatus === true ? '用户注册成功。' : '此id已被使用',
    };
  }

  // 处理用户登录
  async userLogin() {
    const { ctx, app } = this;
    const userInfo = ctx.request.body;
    const user = await ctx.service.user.login(userInfo);
    // 用户登录成功
    if (user !== null) {
      const tokenStr = app.jwt.sign(
        {
          userID: user.userid,
          userName: user.name,
          userEmail: user.email,
        },
        app.config.jwt.secret,
        {
          expiresIn: 10 * 60 * 60,
        }
      );
      ctx.body = {
        status: 200,
        msg: '登录成功',
        tokenStr,
        userID: user.userid,
        userName: user.name,
        userEmail: user.email,
      };
    } else {
      ctx.body = {
        status: 201,
        msg: '账号或密码错误',
      };
    }
  }

  // 检查登录是否过期
  async userAuth() {
    const { ctx } = this;
    const token = ctx.request.header.authorization;
    try {
      const decoded = ctx.app.jwt.verify(token, 'boyiao_scnu');
      const { userID, userName, userEmail } = decoded;
      const newToken = ctx.app.jwt.sign({
        userID,
        userName,
        userEmail,
      }, ctx.app.config.secret, {
        expiresIn: 10 * 60 * 60,
      });
      ctx.body = {
        status: 200,
        msg: 'ok',
        newToken,
        userID,
        userName,
        userEmail,
      };
    } catch (error) {
      ctx.body = {
        status: 401,
        msg: 'error',
      };
    }
  }
}

module.exports = LoginController;
