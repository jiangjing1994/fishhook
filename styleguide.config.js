const themeObj = require('./styleguide/style/theme.js')
const stylesObj = require('./styleguide/style/styles.js')
const config = require('./package.json')
const path = require('path')
// const { getComponentFiles } = require('./styleguide/config.js')
// const baseComponentsUrl = './packages'

//获取当前的环境
const isProd = process.env.NODE_ENV === 'production'
// const componentFilesDir = () =>{
// 	return[
// 		'packages/Button/index.js',
// 	]
// }

//获得当前组件的目录结构
// const componentFilesDir = getComponentFiles(baseComponentsUrl)
module.exports = {
  // set your styleguidist configuration here
  title: 'MimiUi && 组件',
  sections: [
    {
      name: 'MimiUI 😓',
      description: 'MimiUi && 组件',
      content: './README.md',
    },
    {
      name: 'Example 😅',
      sections: [
        {
          name: '表单 Form',
          components: () => [
            'packages/Form/src/main.vue',
            'packages/IconSelect/src/main.vue',
            'packages/InputSlider/src/main.vue',
            'packages/Input/src/main.vue',
            'packages/InputColor/src/main.vue',
            'packages/InputNumber/src/main.vue',
            'packages/InputPassWord/src/main.vue',
            'packages/Search/src/main.vue',
            'packages/Select/src/main.vue',
            'packages/LabelText/src/main.vue',
            'packages/CheckboxGroup/src/main.vue',
            'packages/ChooseArrayElement/src/main.vue',
            'packages/ColorPicker/src/main.vue',
            'packages/RadioboxGroup/src/main.vue',
            'packages/DatePicker/src/main.vue',
          ],
        },
        { name: '表格 Table', components: () => ['packages/Table/src/main.vue'] },
        {
          name: '布局 Layout',
          components: () => [
            'packages/DataView/src/main.vue',
            'packages/Dialog/src/main.vue',
            'packages/PageCard/src/main.vue',
            'packages/DataIcons/src/main.vue',
          ],
        },
        {
          name: '其他 Others',
          components: () => [
            'packages/Button/src/main.vue',
            'packages/Steps/src/main.vue',
            'packages/SvgIcon/src/main.vue',
            //'packages/Switch/src/main.vue',
            //'packages/Timeline/src/main.vue',
            'packages/Tree/src/main.vue',
            'packages/CountUp/src/main.vue',
            'packages/Crud/src/main.vue',
          ],
        },
      ],
      /*
			sections: function() {
				return [
					'packages/CrudDialog/src/main.vue',
					'packages/FormDialog/src/main.vue',

				]
			}
*/
    },
  ],
  version: `版本 v${config.version}`,
  require: [path.join(__dirname, 'styleguide/global.requires.js')], //全局vue组件使用的插件

  theme: themeObj,
  styles: stylesObj,
  usageMode: 'expand', //文档中属性和方法的标签初始化状态，决定是否展开
  exampleMode: 'expand', //文档中代码示例的标签初始化状态，决定是否展开。
  copyCodeButton: true, //代码顶部的复制按钮
  // webpackConfig: {
  //   // custom config goes here
  // },

  progressBar: true, //打包进度条
  styleguidePublicPath: isProd ? './' : '',

  styleguideDir: 'doc', //打包文件放置的位置
}
