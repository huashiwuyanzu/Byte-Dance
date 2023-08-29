'use strict';

/**
 * @param {Egg.Application} app - egg application
 */


module.exports = app => {
  const { router, controller } = app;
  const auth = app.middleware.auth();
  router.get('/test1', auth, controller.test.index1);
  router.get('/test2', controller.test.index2);
  // 登录、注册、自动登录
  router.post('/regist', controller.login.userReg);
  router.post('/login', controller.login.userLogin);
  router.get('/auth', controller.login.userAuth);
  // 用户信息
  router.get('/userinfo/get', auth, controller.userinfo.getUserInfo);
  router.post('/userinfo/change', auth, controller.userinfo.changeUserInfo);
  router.post('/userinfo/change-pic', auth, controller.userinfo.changeUserPic);
  // 队伍信息
  router.post('/team/create', auth, controller.team.teamCreate);
  // 个人消息
  router.get('/message/get', auth, controller.message.messageGet);
  router.get('/message/number/get', auth, controller.message.messageNumGet);
  router.delete('/message/delete', auth, controller.message.messageDelete);
  router.post('/message/agree', auth, controller.message.messageAgree);
  router.post('/message/refuse', auth, controller.message.messageRefuse);
};
