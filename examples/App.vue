<template>
  <div id="app">
    <div id="nav" style="background-color: #d9ecff; margin-bottom: 10px; font-size: 14px">
      <router-link to="/"> 首页 </router-link>
      <router-link v-for="(item, key) in routes" :key="key" :to="item.path" style="margin: 0 4px">
        {{ item.text }}
      </router-link>
    </div>
    <div style="background-color: #d9ecff; height: 100vh; padding: 30px">
      <div style="background-color: #ffffff; height: 100%; padding: 20px; padding-top: 100px; overflow: auto">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import pages from './views/demo/pages' // 页面文件目录

export default {
  data() {
    return {
      routes: [],
    }
  },
  mounted() {
    Object.keys(pages).forEach((item) => {
      this.routes.push({
        path: `/${pages[item].name}`,
        text: pages[item].name,
      })
    })
  },
}
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
  padding: 20px;
  position: fixed;
  z-index: 99999;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
