const { HttpExceptions } = require('../core/http-exceptions');

// 全局异常捕捉中间件
const Exception = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    const { msg, errorCode, code } = error;
    const url = `${ctx.method} : ${ctx.request.path}`;
    if (error instanceof HttpExceptions) {
      // 已知异常
      ctx.body = { msg, errorCode, url };
      ctx.status = code;
    } else {
      // 未知异常
      ctx.body = {
        msg: error.message || '服务器内部错误~',
        errorCode: error.statusCode || 500,
        url
      };
      ctx.status = 500;
    }
  }
};

module.exports = Exception;
