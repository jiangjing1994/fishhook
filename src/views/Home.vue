<template>
  <div class="home">
    <h2>v{{ version }}</h2>
    <img
      alt="Vue logo"
      src="../assets/logo.jpg"
    >
  </div>
</template>

<script>
// @ is an alias to /src
import config from '../../package.json'
export default {
  name: "Home",
  data() {
    return {
      version: config.version
    }
  },
  created() {
   }

};
</script>
