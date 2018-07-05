# Angular社区的commit规范

1. 使用commitizen规范提交格式

2. [参考文章](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)

3. 操作步骤

* 安装`$ npm install -g commitizen`

* windows系统需要安装`cmder`

* 进入你的项目，执行`commitizen init cz-conventional-changelog --save --save-exact`（commitizen需要用到`package.json`，所以如果你的项目没有package.json，就需要先执行一下`npm init -y`）

* 需要提交你的文件时，采用命令`git cz`

* 选择你提交的类型

4. 自定义
   如果要自定义内容，就使用[cz-customizable](https://github.com/leonardoanalista/cz-customizable)插件。(上面使用的是[cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog)这个插件)
