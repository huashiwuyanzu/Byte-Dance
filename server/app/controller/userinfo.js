'use strict';
const { Controller } = require('egg');
const fs = require('fs');

class UserInfoController extends Controller {
  // 获取用户信息
  async getUserInfo() {
    const { ctx } = this;
    const user = await ctx.service.user.getUserInfo(ctx.body.userID);
    ctx.body = { ...user, password: '' };
  }
  // 修改用户信息
  async changeUserInfo() {
    const { ctx } = this;
    const updateStatus = await ctx.service.user.changeUserInfo(ctx.request.body);
    ctx.body = {
      status: updateStatus === true ? 200 : 201,
      msg: updateStatus === true ? '信息修改成功' : '信息修改错误,请稍后重试',
    };
  }
  // 修改用户头像
  async changeUserPic() {
    const { ctx } = this;
    const oldPicStatic = await ctx.service.user.getUserPic(ctx.body.userID);
    const newPic = './app/public/user-images/' + ctx.body.userID + '.jpg';
    const file = ctx.request.files[0];
    if (oldPicStatic !== 'http://127.0.0.1:7002/public/user-images/default.jpg') {
      // eslint-disable-next-line node/prefer-promises/fs
      fs.unlink(newPic, err => {
        if (err) throw err;
        console.log('File has been deleted!');
      });
    } else {
      const staticPicPath = 'http://127.0.0.1:7002/public/user-images/' + ctx.body.userID + '.jpg';
      await ctx.service.user.changePic(ctx.body.userID, staticPicPath);
    }
    // eslint-disable-next-line node/prefer-promises/fs
    fs.writeFile(newPic, '', err => {
      if (err) throw err;
    });
    const readStream = fs.createReadStream(file.filepath);
    const writeStream = fs.createWriteStream(newPic);
    readStream.pipe(writeStream);
    ctx.body = {
      status: 200,
      msg: 'ok',
    };
  }

}

module.exports = UserInfoController;
