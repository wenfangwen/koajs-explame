import { getUserInfoById } from '../service/userService';
const userModel = require('../model/userModel');
const { ResourceErr } = require('../core/http-exceptions');

const Mysql = require('../core/mysql'); //引入上面封装的方法

class HomeController {
  async index(ctx) {
    // ctx.throw(412, '先决条件失败：id大于数据长度');
    ctx.verifyParams({
      username: { type: 'string', required: true },
      password: { type: 'string', required: true, message: '密码不能为空' }
    });
    // ctx.body = ctx.params.id;
    // let res = await userModel({ name: 'wenfang' }).save();
    let res = await Mysql.query('select * from ay_area'); // 查询ay_area表数据
    ctx.body = res;
    // 自定义异常
    // throw new ResourceErr();
  }
}

export default new HomeController();
