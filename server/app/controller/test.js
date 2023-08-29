'use strict';

const { Controller } = require('egg');
const stringRandom = require('string-random');

class TestController extends Controller {
  async index1() {
    // 测试token是否有用
    const { ctx } = this;
    const token = ctx.request.header.authorization;
    console.log(stringRandom(16));
    ctx.body.token = token;
  }

  async index2() {
    const { ctx } = this;
    const a = ctx.cookies.get('asd');
    ctx.body = a;
  }
}

module.exports = TestController;
