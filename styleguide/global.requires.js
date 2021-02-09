/**
 * 全局插件组件库
 * Styleguidist不加载main.js文件。为了安装插件和组件库，你需要在其他地方安装插件和组件库。
 * 首先创建一个安装插件的.js文件。然后将其添加到styleguide.config.js文件中
 */

import Vue from 'vue'
import KemUI from "../packages";

Vue.use(KemUI);

// 引入utils
// import "./../../assets/js/utils.js";

