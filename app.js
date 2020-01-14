const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const parameter = require('koa-parameter');
// import routing from './routers/index.js';
// 引入初始化类
const InitManager = require('./core/init');

// 引入mongoose
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
// 引入配置
import { ConnectStr } from './config/index.js';

console.log(ConnectStr);

const app = new Koa();

// 使用Koa-json-error 中间件处理错误
const error = require('koa-json-error');
app.use(
  error({
    postFormat: (e, obj) => (process.env.NODE_ENV === 'production' ? obj : obj)
  })
);

// // 自定义错误中间件
// const Exception = require('./middlewares/Exception');
// app.use(Exception);

// 连接mongodb数据库
mongoose.connect(ConnectStr, { useNewUrlParser: true }, () => {
  console.log('数据库连接成功');
});
mongoose.connection.on('error', console.error);
// 获取数据库表对应的js对象所在的路径
const models_path = path.join(__dirname, './model');
// 已递归的形式，读取models文件夹下的js模型文件，并require
var walk = function(modelPath) {
  fs.readdirSync(modelPath).forEach(function(file) {
    var filePath = path.join(modelPath, '/' + file);
    var stat = fs.statSync(filePath);
    if (stat.isFile()) {
      if (/(.*)\.(js|coffee)/.test(file)) {
        require(filePath);
      }
    } else if (stat.isDirectory()) {
      walk(filePath);
    }
  });
};

walk(models_path);

app.use(bodyParser());
app.use(parameter(app));

// 注册路由 初始化类
InitManager.initCore(app);

// 注册路由
// routing(app);

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

app.listen(3000, () => {
  console.log('服务启动http://localhost:3000');
});
