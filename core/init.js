const requireDirectory = require('require-directory');
const Router = require('koa-router');

class InitManager {
  // 入口方法
  static initCore(app) {
    // 静态属性
    InitManager.app = app;
    // 路由加载
    InitManager.initLoadRouter();
  }

  // 初始化路由
  static initLoadRouter() {
    // process.cwd() 项目根目录
    const apiDirectory = `${process.cwd()}/routers`;

    requireDirectory(module, apiDirectory, { visit: loadModule });

    function loadModule(obj) {
      // 判断当前模块是否是Router的实例对象
      if (obj instanceof Router) {
        // 注册理由
        InitManager.app.use(obj.routes());
      }
    }
  }
}

module.exports = InitManager;
