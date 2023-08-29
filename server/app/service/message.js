const Service = require('egg').Service;
const stringRandom = require('string-random');
const getNowTime = require('../utils/date-util').getNowTime;

class MessageService extends Service {
  // 新建消息
  async messageCreate(sender, accepterInfo, category, company, companyID) {
    if (!Array.isArray(accepterInfo)) {
      await this.app.mysql.insert('message', {
        messageID: stringRandom(16),
        sender,
        accepter: accepterInfo.userID,
        teamRole: accepterInfo.teamRole,
        category,
        company,
        companyID,
        time: getNowTime(),
      });
    } else {
      for (let i = 0; i < accepterInfo.length; ++i) {
        await this.app.mysql.insert('message', {
          messageID: stringRandom(16),
          sender,
          accepter: accepterInfo[i].userID,
          teamRole: accepterInfo[i].teamRole,
          category,
          company,
          companyID,
          time: getNowTime(),
        });
      }
    }
    return true;
  }

  // 根据接收者id获取消息
  async messageGet(accepterID) {
    const message = await this.app.mysql.select('message', {
      where: {
        accepter: accepterID,
      },
    });
    return message;
  }

  // 根据接收者id获取信息的数量
  async messageNumGet(accepterID) {
    const number = await this.app.mysql.select('message', {
      where: {
        accepter: accepterID,
      },
    });
    return number.length;
  }

  // 根据messageID删除消息
  async messageDelete(messageID) {
    await this.app.mysql.delete('message', {
      messageID,
    });
  }
}

module.exports = MessageService;
