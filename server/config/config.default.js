/* eslint valid-jsdoc: "off" */

'use strict';


/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // 个人配置
  const userConfig = {
    // myAppName: 'egg',
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_boyiao__scnu__six';

  // 中间件
  config.middleware = [];

  // 数据库
  config.mysql = {
    app: true,
    agent: false,
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: 'boyiao',
      database: 'interface_platform',
    },
  };

  // 文件
  config.multipart = {
    mode: 'file',
  };

  // token认证
  config.jwt = {
    secret: 'boyiao_scnu', // token的加密的密钥,自己随便设置
  };

  // 跨域
  config.cors = {
    origin: 'http://localhost:5173',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  // 安全 开发模式下允许访问
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [
      'http://localhost:5173',
    ],
  };
  return {
    ...config,
    ...userConfig,
  };
};
