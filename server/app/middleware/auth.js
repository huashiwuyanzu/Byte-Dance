
module.exports = () => {
  // 验证token是否过期
  return async function auth(ctx, next) {
    const token = ctx.request.header.authorization;
    if (token !== 'null' || token) {
      // 有token,需要验证
      try {
        const decoded = ctx.app.jwt.verify(token, 'boyiao_scnu');
        ctx.body = { ...decoded };
        await next();
      } catch (error) {
        console.log(error);
        ctx.status = 200;
        ctx.body = {
          status: 401,
          desc: 'token已过期，请重新登录',
        };
      }
    } else {
      // 没有token
      ctx.body = {
        status: 401,
        msg: '未授权,请登录',
      };
    }


  };
};
