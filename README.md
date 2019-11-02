#  使用 koa 改造为一个api框架

#### 此分支内容

requireDirectory路由自动加载
```
core\init.js
```

中间件：异常处理, init.js 全局异常处理
```
middlewares\exception.js
core\init.js
```

自定义 validator 数据校验
```
core\koi-validator.js
app\validators\validator.js
app\api\v1\classic.js
```

#### 此分支不包含的内容
ORM, token, 业务