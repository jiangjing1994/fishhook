# [jiangjing94/mimi](https://hellonainai.github.io/mimi/#/)

## 快速开始
### install
```
yarn add @jiangjing94/mimi
```

### start
``` 
// main.js
__
import MimiUI from '@jiangjing94/mimi'
import '@jiangjing94/mimi/lib/mimiui.css'
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Avue from '@smallwei/avue';

Vue.use(MimiUI,{ size: 'mini', zIndex: 3000 })
Vue.use(ElementUI)
Vue.use(Avue)

```

## 其他
### 仓库说明
 - 本库高度封装，牺牲一定的体验性，为的是提高开发效率(为了上班摸鱼)，提倡代码配置化。
- 如果不想引入包的话可以直接把packages包粘到自己的项目里
- 本库依赖于 elementUi 和 avue
 - 主要作者本人使用，维护看心情
### 前端开发的一个现状
- 在前端项目的开发中，往往会根据业务需求，沉淀出一些项目内的UI组件/功能模块（以下通称组件） 等；这些组件初期只在同一个项目中被维护，并被该项目中的不同页面或模块复用，此时的组件逐步被完善，是一个只聚焦于功能和健壮性的成长期。
- 随着业务的发展，原来的项目可能不得不产生裂变，变成几个相似但各有不同的项目 -- 比如在初始项目中积累经验后，需要推广到相似的业态上或根据不同大客户的需求进行定制，这种情况下往往很难理想化的保持各项目大版本或者后续发展进度的同步，只能逐渐各自发展。这时那些在一开始显得八面玲珑的“可复用组件”，往往就需要手忙脚乱的在各个项目中分头维护，或是出现了意想不到的问题，需要重新规划了
 

### 复用组件的常见问题
- 组件的复用局限在单个项目中。
- 1次开发，n 次~~复用~~复制。
- 项目的裂变让问题成倍放大，每个修正/改动要同步 n 次。
- 兄弟项目的依赖库可能相似但不同，或版本差距较大。
- 单元测试环境或版本的不同也让组件的复用带来问题。
>
### 什么样的组件是通用的
- 足够抽象，不包含业务逻辑，或扩展性足够好。
- 尽量不包含任何和项目环境有关的依赖。
- 有覆盖率足够高的单元测试
- 有必要的文档，或通过单元测试描述了足够完整的功能。
- 最好也提供可运行的例子。
### 如何收敛维护点？

所在项目 | 基础组件库  | 代表性问题
----|----|----
<br/>A<br/><br/>B<br/>| element-ui@v1.x |   1. picker 的结果显示，在底层 dom 中由单个 input 实现，异于最新版本组件库。<br/>2.el-date-picker 尚不支持 value-format 属性
<br/>C<br/><br/>D<br/><br/>E<br/>| element-ui@v2.x |1.内部组件的 v-model 不能正确触发回调，需要用 watch 修正。<br/>2.这几个项目中，还需要添加一些附加的样式
 
> 由于种种原因，几个项目依赖的 UI 库相似但并不相同；且项目体量过大、维护的团队不同等等，都让统一基础组件库变得🐔乎不可能~~~🐔你太美~~，这就很尴尬了嘛~
- 仅以例子中的几个项目来说，维护点就在 6 个，工作量×6
- 如果 收敛到一个统一的库 中，则维护点变为 2 个，仅需区分基础版本库的差别
- 而大部分较简单的组件，基础组件库的版本不同并不会造成差异的，或是根本没有引用 element-ui 组件库的简单组件，则维护点直接能缩减到 1 个

### 开发计划
功能模块 | 当前状态/后续计划  |文档状态| 备注
----|----|----|----
KemButton|已完成|无|----
KemSvgIcon|已完成|无|----
KemForm|1.表单mark属性<br/><br/>2.表单提示tip文字提示功能|无|表单元素需要封装一下子
KemDialog|已完成|无|----
KemTable|功能比较少|无|----
KemLabelText|已完成|无|----
KemPageCard|已完成|无|----
KemSelect|已完成|无|----
KemInput|已完成|无|----
KemInputNumber|已完成|无|----
KemCheckboxGroup|已完成|无|----
KemRadioboxGroup|已完成|无|----
KemColorPicker|已完成|无|----
KemDataView|已完成|无|----
KemInputColor|已完成|无|----
KemTimeline|已完成|无|----
KemSwitch|已完成|无|----
KemCountUp|已完成|无|----
KemDataIcons|需要重构|----|----
KemInputSlider|已完成|无|----
KemTree|已完成|无|----
KemSteps|需要重构|----|----
KemChooseArrayElement|已完成|无|----
KemFormDialog|暂时废弃|----|----
KemCrud|已完成|无|----
KemSearch|已完成|无|----
