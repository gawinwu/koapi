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
添加github分支：skeleton-ex


