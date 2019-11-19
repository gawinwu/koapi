#  使用 koa 改造为一个api框架

#### 更新日志

```
npm init
npm i koa
```
Add to github
```
git init 
git remote add -f -t master -m master origin https://github.com/gawinwu/koapi
git add .  
git commit -m "init"
git push -u origin master -f
```

##### nodenom自动重启server
```
npm i nodemon -g
nodemon app.js

##### 提示错误：无法加载文件 C:\Users\neted\AppData\Roaming\npm\nodemon.ps1，因为在此系统上禁止运行脚本。
1.管理员身份打开powerShell
2.输入set-ExecutionPolicy RemoteSigned  
```

##### requireDirectory路由自动加载
```
core/init.js -> initLoadRouters
app.js 修改
```

##### 删除无用分支：
```
git branch -D router-auto-load
git push origin --delete router-auto-load
```

##### 添加github分支：validator 

##### 添加github分支：skeleton

##### 完成微信登录接口
添加github分支：skeleton-wx

##### module-alias 别名
```
package.json
 "_moduleAliases": {...}

app.js
require('module-alias/register')

增加 module-alias 别名后vscode无法感知
```

##### Sequelize scope 排除字段
```
core\db.js  scopes: {...)
app\models\art.js
static async getData(..., useScope = true) {...}
const scope = useScope ? 'bh' : null
await Movie.scope(scope).findOne(finder)
// 使用scope查询的对象集，如果需要再次使用来操作数据库，比如 :
const art = await Art.getData(art_id, type, true)
await art.decrement('fav_nums', { by: 1, transaction: t })
// art.decremen 将生成错误的SQL语句，这是一个Sequelize的一个Bug
// 所以这里需要使用 useScope = false 
```

##### 在应用Model里使用 js内置的 toJSON() 序列化指定字段
```
test.1.js
app\models\book-comment.js
    // toJSON(){
    //     return {
    //       content:this.getDataValue('content'),
    //       nums:this.getDataValue('nums'),
    //     }
    // }
```

##### 在Model基类原型上定义toJSON 全局过滤字段
```
core\db.js
if(isArray(this.exclude)){...}

测试:
app\api\v1\classic.js
art.exclude = ['index','like_status']
```

##### 静态文件处理完整方案
```
core\db.js
for (key in data) {...}

config\config.js
host: 'http://localhost:3000/'
```



