const themeObj = require('./styleguide/style/theme.js')
const stylesObj = require('./styleguide/style/styles.js')
const config = require('./package.json')
const path = require('path')
const { getComponentFiles } = require('./styleguide/config.js')
const baseComponentsUrl = './packages'


// const componentFilesDir = () =>{
// 	return[
// 		'packages/Button/index.js',
// 	]
// }

//获得当前组件的目录结构
const componentFilesDir = getComponentFiles(baseComponentsUrl)
module.exports = {
	// set your styleguidist configuration here
	title: 'MimiUi && 组件',
	components: componentFilesDir,
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
	// styleguidePublicPath: isProd? '/': '',
	styleguideDir: 'doc', //打包文件放置的位置

 }
