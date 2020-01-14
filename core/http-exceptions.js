// 自定义异常
class HttpExceptions {
  constructor(msg = '服务器异常', errorCode = 0, code = 400) {
    this.msg = msg;
    this.errorCode = errorCode;
    this.code = code;
  }
}

// 资源未找到异常
class ResourceErr extends HttpExceptions {
  constructor(msg = '资源未找到', errorCode = 1, code = 404) {
    super(msg, errorCode, code);
  }
}

module.exports = {
  HttpExceptions,
  ResourceErr
};
