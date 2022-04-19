<template>
  <div class="home">
    <h4>
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
    <img alt="Vue logo" src="../assets/log.png" />
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
<style lang="scss">
.home {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  // background-color: rgba(34, 54, 234, 0.1);
  color: #000000;
  padding: 10px 0 0 0;
  font-weight: bold;
  font-size: 16px;
  &:hover {
    color: #0312f8;
    // background-color: #ee0909
  }

  img {
    padding: 0;
    margin: 0;
  }
}
.home h4 {
  padding-left: 20px;
}
.home h5 a {
  color: inherit;
}
</style>
