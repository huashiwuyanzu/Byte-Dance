/* eslint-disable @typescript-eslint/no-unused-vars */
// 根据category判断文本内容
function getText(category: string, company: string, role: string): string | undefined {
  const categoryTabel = {
    'team-invitation': '邀请您以' + role + '的身份加入团队' + company + '。',
    'agree-team-invitation': '同意加入您的团队' + company + '。',
    'refuse-team-invitation': '拒绝加入您的团队' + company + '。',
  };
  return categoryTabel[category];
}

// 判断是否需要同意和拒绝按钮
function isNeeded(category: string): boolean {
  if (category === "team-invitation") {
    return true;
  }
  return false;
}

// 队伍角色中英互译
function translate(teamRole: string): string {
  const conversioTable = {
    '开发人员': 'developer' + 'Arr',
    '测试人员': 'tester' + 'Arr',
    '运维人员': 'operator' + 'Arr'
  };
  return conversioTable[teamRole];
}

export { getText, isNeeded, translate };
