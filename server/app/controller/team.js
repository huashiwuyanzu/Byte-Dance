'use strict';

const { Controller } = require('egg');

class TeamController extends Controller {

  // 注册新队伍
  async teamCreate() {
    const { ctx } = this;
    const dataFromAuth = ctx.body;
    const leaderID = dataFromAuth.userID;
    const { teamID, teamName, mateArr } = ctx.request.body;
    // 验证用户id是否有效
    let isValid = true;
    let unvalidID = '';
    for (let i = 0; i < mateArr.length; ++i) {
      const { userID } = mateArr[i];
      const userInfo = await ctx.service.user.getUserInfo(userID);
      if (userInfo === null) {
        isValid = false;
        unvalidID = userID;
      }
    }
    if (!isValid) {
      ctx.body = {
        status: 201,
        msg: unvalidID + '为无效用户id',
      };
      return;
    }
    // 队伍id已被占用
    const isExist = await ctx.service.team.teamCreate(leaderID, teamID, teamName);
    if (!isExist) {
      ctx.body = {
        status: 201,
        msg: '该队伍id已被占用',
      };
      return;
    }
    // 发送邀请信息
    const accepterInfo = [];
    for (let i = 0; i < mateArr.length; ++i) {
      const item = {};
      item.teamRole = mateArr[i].teamRole;
      item.userID = mateArr[i].userID;
      accepterInfo.push(item);
    }
    await ctx.service.message.messageCreate(leaderID, accepterInfo, 'team-invitation', teamName, teamID);
    await ctx.service.user.userTeamAdd(leaderID, teamID);
    ctx.body = { status: 200, msg: 'ok', mateArr };
  }
}

module.exports = TeamController;
