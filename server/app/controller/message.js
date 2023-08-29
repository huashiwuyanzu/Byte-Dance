'use strict';

const { Controller } = require('egg');


class MessageController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  // 获取个人信息的数量
  async messageNumGet() {
    const { ctx } = this;
    const dataFromAuth = ctx.body;
    const accepterID = dataFromAuth.userID;
    const number = await ctx.service.message.messageNumGet(accepterID);
    ctx.body = {
      status: 200,
      data: number,
      msg: 'ok',
    };
  }

  // 获取个人的消息
  async messageGet() {
    const { ctx } = this;
    const dataFromAuth = ctx.body;
    const accepterID = dataFromAuth.userID;
    const message = await ctx.service.message.messageGet(accepterID);
    const msgBox = [];
    for (let i = 0; i < message.length; ++i) {
      const element = {};
      const senderID = message[i].sender;
      const senderInfo = await ctx.service.user.getUserInfo(senderID);
      element.index = message[i].messageID;
      element.category = message[i].category;
      element.company = message[i].company;
      element.teamRole = message[i].teamRole;
      element.time = message[i].time;
      element.companyID = message[i].companyID;
      element.senderName = senderInfo.name;
      element.senderPicture = senderInfo.picture;
      element.senderID = senderID;
      msgBox.push(element);
    }
    ctx.body = {
      status: 200,
      data: msgBox,
      msg: 'ok',
    };
  }

  // 忽略一条消息
  async messageDelete() {
    const { ctx } = this;
    const { messageID } = ctx.request.body;
    await ctx.service.message.messageDelete(messageID);
    ctx.body = {
      status: 200,
      msg: 'ok',
    };
  }

  // 同意邀请
  async messageAgree() {
    const { ctx } = this;
    const consenterID = ctx.body.userID;
    const { companyID, teamRole, messageID } = ctx.request.body;
    await ctx.service.team.mateAdd(companyID, consenterID, teamRole);
    await ctx.service.message.messageDelete(messageID);
    const companyInfo = await ctx.service.team.teamInfoGet(companyID);
    const accepterInfo = {
      userID: companyInfo.leaderID,
      teamRole: '',
    };
    await ctx.service.user.userTeamAdd(consenterID, companyID);
    await ctx.service.message.messageCreate(consenterID, accepterInfo, 'agree-team-invitation', companyInfo.teamName, companyID);
    ctx.body = {
      status: 200,
      msg: 'ok',
    };
  }

  // 拒绝邀请
  async messageRefuse() {
    const { ctx } = this;
    const consenterID = ctx.body.userID;
    const { companyID, messageID } = ctx.request.body;
    await ctx.service.message.messageDelete(messageID);
    const companyInfo = await ctx.service.team.teamInfoGet(companyID);
    const accepterInfo = {
      userID: companyInfo.leaderID,
      teamRole: '',
    };
    await ctx.service.message.messageCreate(consenterID, accepterInfo, 'refuse-team-invitation', companyInfo.teamName, companyID);
    ctx.body = {
      status: 200,
      msg: 'ok',
    };
  }
}

module.exports = MessageController;
