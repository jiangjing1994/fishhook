<template>
  <div class="home" style="background-color: #ffffff; padding: 10px; padding-top: 0">
    <h4 style="font-size: 16px; padding: 0; margin: 0; text-align: left; position: absolute">
      <h5>版本号 v{{ version }}</h5>
      <h5>
        <a href="https://github.com/jiangjing1994/fishhook/">代码仓库</a>
      </h5>
      <h5>
        <a href="https://github.com/jiangjing1994/fishhook/tree/master/examples/views/demo">代码预览</a>
      </h5>
      <h5>
        <a href="https://jiangjing1994.github.io/fishhook/">文档</a>
      </h5>
    </h4>
    <img alt="Vue logo" src="../assets/log.jpg" />
  </div>
</template>

<script>
// @ is an alias to /src
import config from '../../package.json'
export default {
  name: 'Home',
  data() {
    return {
      version: config.version,
    }
  },
  created() {},
}
</script>
<style>
.home h5 {
  padding: 5px;
  color: #16045f;
}
</style>
