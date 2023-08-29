const Service = require('egg').Service;
const getNowTime = require('../utils/date-util').getNowTime;
class TeamService extends Service {

  // 根据队伍id获取队伍信息
  async teamInfoGet(teamID) {
    const teamInfo = await this.app.mysql.get('team', { teamID });
    return teamInfo;
  }

  // 创建新队伍
  async teamCreate(leaderID, teamID, teamName) {
    const isExist = await this.app.mysql.get('team', { teamID });
    if (isExist !== null) {
      // 该id已被占用
      return false;
    }
    // id未被占用；
    this.app.mysql.insert('team', { leaderID, teamID, teamName, createTime: getNowTime() });
    return true;
  }

  // 新队员加入
  async mateAdd(teamID, consenterID, teamRole) {
    const oldMate = await this.app.mysql.get('team', { teamID });
    const newMate = oldMate[teamRole] + consenterID + '&';
    const newInfoUpdate = {};
    newInfoUpdate[teamRole] = newMate;
    await this.app.mysql.update('team', newInfoUpdate, {
      where: {
        teamID,
      },
    });
  }
}

module.exports = TeamService;
