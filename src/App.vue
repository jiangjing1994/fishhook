<template>
  <div id="app">
    <div id="nav" style="background-color: #d9ecff;margin-bottom: 25px;border-radius: 10px;box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2); ">
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


    <div style="background-color: #d9ecff;padding: 25px;box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);">
      <div style=" background-color: #ffffff;min-height:calc(100vh - 210px);padding: 20px;border-radius: 10px;box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);">
        <router-view></router-view>
      </div>
    </div>



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
