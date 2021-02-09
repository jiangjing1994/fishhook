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
	components: [
		'./packages/box/index.js',
		'./packages/Button/index.js',
		'./packages/CheckboxGroup/index.js',
		'./packages/ChooseArrayElement/index.js',
		'./packages/ColorPicker/index.js',
		'./packages/CountUp/index.js',
		'./packages/Crud/index.js',
		'./packages/CrudDialog/index.js',
		'./packages/DataIcons/index.js',
		'./packages/DataView/index.js',
		'./packages/Dialog/index.js',
		'./packages/Form/index.js',
		'./packages/FormDialog/index.js',
		'./packages/IconSelect/index.js',
		'./packages/index.js/index.js',
		'./packages/Input/index.js',
		'./packages/InputColor/index.js',
		'./packages/InputNumber/index.js',
		'./packages/InputPassWord/index.js',
		'./packages/InputSlider/index.js',
		'./packages/LabelText/index.js',
		'./packages/PageCard/index.js',
		'./packages/RadioboxGroup/index.js',
		'./packages/Search/index.js',
		'./packages/Select/index.js',
		'./packages/Steps/index.js',
		'./packages/SvgIcon/index.js',
		'./packages/Switch/index.js',
		'./packages/Table/index.js',
		'./packages/Timeline/index.js',
		//'./packages/Tree/index.js'
	]
	,
	version: `版本 v${config.version}`,
	require: [path.join(__dirname, 'styleguide/global.requires.js')], //全局vue组件使用的插件

	// defaultExample: true,

	theme: themeObj,
	styles: stylesObj,
	usageMode: 'expand', //文档中属性和方法的标签初始化状态，决定是否展开
	exampleMode: 'expand', //文档中代码示例的标签初始化状态，决定是否展开。
	copyCodeButton: true, //代码顶部的复制按钮
	// webpackConfig: {
	//   // custom config goes here
	// },

	progressBar: true, //打包进度条
	styleguidePublicPath: isProd? './': '',

	styleguideDir: 'doc', //打包文件放置的位置

}
