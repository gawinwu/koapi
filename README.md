#  使用 koa 改造为一个api框架

#### 此分支内容 可做一般API应用的骨架，包含以下内容

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

ORM sequelize 
完成用户的注册与登录
```
core\db.js
config\config.js
app\models\user.js
app\api\v1\user.js
```

jwt 和 Auth 权限控制 
```
middlewares\auth.js
core\util.js
app\api\v1\classic.js 
// 第十行 new Auth(9).m, 测试Auth 
// 公用 API 不加入 new Auth().m 中间件即可
// 权限分级 与 扩展 设计在auth.js
middlewares\auth.js
```

#### postman 测试
注册用户：
```
post http://localhost:3000/v1/user/register
Body->raw->json:
{
	"nickname":"gawin",
	"password1": "123456abc",
	"password2": "123456abc",
	"email": "1234567@qq.com"
}
```
用户登录：
```
post http://localhost:3000/v1/token
Body->raw->json:
{
	"account" : "1234567@qq.com",
	"type": 101,
	"secret": "123456abc"
}
```
权限测试：
```
post http://localhost:3000/v1/classic/latest
Authorization->type:Basic Auth -> Username = token
http://localhost:3000/v1/token 获取的token
```

公开的API例子
```
get http://localhost:3000/v1/book/latest
```


#### 此分支不包含的内容
微信登录，其它第三方登录, 具体业务