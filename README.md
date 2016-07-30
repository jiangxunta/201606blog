## 安装
```javascript
npm install -g express-generator
express -e 201606blog
cd 201606blog & npm install
set DEBUG=201606blog:* & npm run start
```
在浏览器访问 `http://localhost:3000` 就成功了

> 如果你执行express 命令的时候报不是命令需要配置环境变量
> 需要找到 express命令所在的目录 C:\Users\Administrator\AppData\Roaming\npm
> 如果不是执行 npm root -g, 把最后的node_modules去掉就是你要配置的目录

## 添加.gitignore文件
```javascript
node_modules
lib
bower_component
.idea
```