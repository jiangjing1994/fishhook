
## ✨ 快速开始
> 前人挖坑后人埋，看你埋得过来不过来。

### 🖥 安装
``` shell
yarn add @jiangjing94/mimi
```

### 🛡 引用
``` javascript
// main.js
__
import MimiUI from '@jiangjing94/mimi'
import '@jiangjing94/mimi/lib/mimiui.css'
import ElementUI from "element-ui";
 
Vue.use(MimiUI,{ size: 'mini', zIndex: 3000 })
Vue.use(ElementUI)
 
```
> Vue.use() 顺序不要变 😶
## 🌍其他
### 仓库说明
 - 本库高度封装，牺牲一定的体验性，为的是提高开发效率(上班摸鱼)，提倡代码配置化。
- 如果不想引入包的话可以直接把packages包粘到自己的项目里
- 本库依赖于 elementUi 和 avue
 - 主要作者本人使用，维护看心情
### 前端开发的一个现状
- 在前端项目的开发中，往往会根据业务需求，沉淀出一些项目内的UI组件/功能模块（以下通称组件）等；这些组件初期只在同一个项目中被维护，并被该项目中的不同页面或模块复用，此时的组件逐步被完善，是一个只聚焦于功能和健壮性的成长期。
- 随着业务的发展，原来的项目可能不得不产生裂变，变成几个相似但各有不同的项目 -- 比如在初始项目中积累经验后，需要推广到相似的业态上或根据不同大客户的需求进行定制，这种情况下往往很难理想化的保持各项目大版本或者后续发展进度的同步，只能逐渐各自发展。这时那些在一开始显得八面玲珑的“可复用组件”，往往就需要手忙脚乱的在各个项目中分头维护，或是出现了意想不到的问题，需要重新规划了
 

### 复用组件的常见问题
- 组件的复用局限在单个项目中。
- 1次开发，n 次~~复用~~复制。
- 项目的裂变让问题成倍放大，每个修正/改动要同步 n 次。
- 兄弟项目的依赖库可能相似但不同，或版本差距较大。
- 单元测试环境或版本的不同也让组件的复用带来问题。

### 什么样的组件是通用的
- 足够抽象，不包含业务逻辑，或扩展性足够好。
- 尽量不包含任何和项目环境有关的依赖。
- 有覆盖率足够高的单元测试
- 有必要的文档，或通过单元测试描述了足够完整的功能。
- 最好也提供可运行的例子。
## 如何贡献
 
非常欢迎你的加入！[提一个 Issue](https://github.com/jiangjing1994/mimi/issues/new) 或者提交一个 Pull Request

### Pull Request

1. Fork 代码!
2. 创建自己的分支: `git checkout -b feat/xxxx`
3. 提交你的修改: `git commit -am 'feat(function): add xxxxx'`
4. 推送您的分支: `git push origin feat/xxxx`
5. 提交`pull request`

### Git 贡献提交规范

- `feat` 增加新功能
- `fix` 修复问题/BUG
- `style` 代码风格相关无影响运行结果的
- `perf` 优化/性能提升
- `refactor` 重构
- `revert` 撤销修改
- `test` 测试相关
- `docs` 文档/注释
- `chore` 依赖更新/脚手架配置修改等
- `workflow` 工作流改进
- `ci` 持续集成
- `types` 类型定义文件更改
- `wip` 开发中

## 浏览器支持

本地开发推荐使用`Chrome 80+` 浏览器支持现代浏览器, 不支持 IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 开发计划
### Table

- loading 关闭
- menu-left right 等样式自定义

### Form

- 自定义表单布局
- 优化: 表单内标签为空时 显示:
- ~~增加: 自定义表单样式 labelStyle~~
- ~~增加: label尾部内容插槽 labelSuffix~~
- 行类型 display: block
### JSXForm
 
- 增加jsx语法支持
- 分裂表单
- 表单布局配置化
- 表单布局是否可以不用element栅格？？  
- 表单递归
- 字段深度绑定
- 自定义表单样式
- 表单自动渲染 request 模式(仅查询)
- 表单自动提交 request 模式，不提供各类按钮(此功能是否有必要？)


## 🌈 资源
- [github](https://github.com/jiangjing1994/mimi/)
- [doc](https://jiangjing1994.github.io/mimi/)
- [npm](https://www.npmjs.com/package/@jiangjing94/mimi/)


