const Service = require('egg').Service;
const bcrypt = require('bcryptjs');

class UserService extends Service {
  // 用户注册
  async regist(newUserInfo) {
    const { userID, userPassword } = newUserInfo;
    const user = await this.app.mysql.get('user', { userid: userID });
    if (user !== null) {
      // userID已被其他用户使用
      return false;
    }
    this.app.mysql.insert('user', { userid: userID, password: bcrypt.hashSync(userPassword, 10) });
    return true;
  }

  // 用户登录
  async login(userInfo) {
    const { userID, userPassword } = userInfo;
    const user = await this.app.mysql.get('user', { userid: userID });
    // 账号不存在
    if (user === null) {
      console.log('asd');
      return null;
    }
    const { password } = user;
    const compareResult = bcrypt.compareSync(userPassword, password);
    // 密码错误
    if (!compareResult) {
      return null;
    }
    // 成功
    return user;
  }

  // 获取用户信息
  async getUserInfo(userID) {
    const user = await this.app.mysql.get('user', { userid: userID });
    return user;
  }

  // 修改用户信息
  async changeUserInfo(newInfo) {
    const newInfoUpdate = {
      name: newInfo.userName,
      codeage: newInfo.userCodeAge,
      'introduction-self': newInfo.userIntroduction,
      'introduction-blog': newInfo.userBlogIntroduction,
      technology: newInfo.userTechnologyStack,
      gender: newInfo.userGender,
      email: newInfo.userEmail,
    };
    const result = await this.app.mysql.update('user', newInfoUpdate, {
      where: {
        userid: newInfo.userID,
      },
    });
    if (result.affectedRows === 1) {
      return true;
    }
    return false;
  }

  // 查找用户头像
  async getUserPic(userID) {
    const user = await this.app.mysql.get('user', { userid: userID });
    return user.picture;
  }

  // 更新用户头像
  async changePic(userID, newPic) {
    const newInfo = {
      picture: newPic,
    };
    const result = await this.app.mysql.update('user', newInfo, {
      where: {
        userid: userID,
      },
    });
    return result.affectedRows;
  }

  // 新增加入的团队
  async userTeamAdd(userID, teamID) {
    const userInfo = await this.app.mysql.get('user', { userid: userID });
    const newTeam = userInfo['import-team'] + teamID + '&';
    const newInfoUpdate = {
      'import-team': newTeam,
    };
    await this.app.mysql.update('user', newInfoUpdate, {
      where: {
        userid: userID,
      },
    });
  }

}

module.exports = UserService;
