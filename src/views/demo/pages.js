/**
 * Created by jiang on 2020/9/21
 * File description:
 * History:
 */
const files = require.context(".", false, /\.vue$/);

const pages = {};

files.keys().forEach(key => {
  pages[key.replace(/(\.\/|\.vue)/g, "")] = files(key).default;
});

export default pages;
