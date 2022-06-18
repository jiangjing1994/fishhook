<template>
  <div id="app">
    <div class="nav">
      <div v-for="(item, key) in routes" :key="key" class="nav-block" :to="item.path">
        <router-link :to="item.path">
          {{ item.name }}
        </router-link>
      </div>
    </div>
    <!--    <div id="nav" style="background-color: #d9ecff;   font-size: 14px">-->
    <!--      <div class="nav-block"  v-for="(item, key) in routes" :key="key" :to="item.path" style="margin: 0 4px">-->
    <!--           <div style="display: flex">-->
    <!--            <div>  {{ item.displayName || item.name }}</div>-->
    <!--            <div>  ({{ item.name }})</div>-->
    <!--          </div>-->

    <!--       </div>-->
    <!--      <router-link to="/"> 首页 </router-link>-->

    <!--    </div>-->
    <!--    <div style="background-color: #d9ecff; height: 100vh; padding: 30px">-->
    <!--      <div style="background-color: #ffffff; height: 100%; padding: 20px; padding-top: 100px; overflow: auto">-->
    <!--        <router-view></router-view>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="app-wrapper">
      <div class="app-main">
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
    this.routes.push({
      path: `/`,
      name: '首页',
    })
    Object.keys(pages).forEach((item) => {
      this.routes.push({
        path: `/${pages[item].name}`,
        name: pages[item].name,
      })
    })
  },
}
</script>

<style lang="scss">
#app {
  height: 100vh;
  padding-top: 60px;
  position: relative;

  .nav {
    height: 60px;
    min-height: 60px;
    width: 100%;
    position: fixed;
    z-index: 9999;
    top: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    flex-direction: row;
    align-content: flex-start;
    padding: 5px;
    background-color: rgb(252, 226, 224);
    border-bottom: 1px solid rgba(16, 49, 147, 0.2);
    overflow: hidden;
    &:hover {
      height: auto;
    }
    .nav-block {
      padding: 0 5px;
      font-size: 12px;
      .cname {
        font-size: 12px;
      }
      a {
        font-weight: bold;
        color: #000000;
        &:hover {
          color: #7e68f6;
        }

        &.router-link-exact-active {
          color: #310ef8;
        }
      }
    }
  }
  .app-wrapper {
    height: 100%;
    padding: 0 20px;
    background-color: rgba(164, 214, 227, 0.24);
    overflow: auto;
    .app-main {
      min-height: calc(100vh - 60px);
      background-color: #ffffff;
      padding: 10px 20px;
      border-left: 1px solid rgba(16, 49, 147, 0.2);
      border-right: 1px solid rgba(16, 49, 147, 0.2);
    }
  }
}

#nav {
  padding: 20px;
  z-index: 99999;
  width: 100%;
  display: flex;
  .nav-block {
    background-color: red;
  }

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
