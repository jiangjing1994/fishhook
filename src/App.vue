<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
        Home
      </router-link>
      <router-link
        v-for="(item, key) in routes"
        :key="key"
        :to="item.path"
        style="margin: 0 5px"
      >
        {{ item.text }}
      </router-link>
    </div>
    <div style="padding: 20px;font-size: 24px;font-weight: bold;">
      <a
        href="https://github.com/hellonainai/kemomimi/tree/master/src/views/demo"
        >demo</a>
    </div>

    <router-view></router-view>
  </div>
</template>
<script>
import pages from "./views/demo/pages"; // 页面文件目录

export default {
  data() {
    return {
      routes: []
    };
  },
  mounted() {
    Object.keys(pages).forEach(item => {
      this.routes.push({
        path: `/${pages[item].name}`,
        text: pages[item].name
      });
    });
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
