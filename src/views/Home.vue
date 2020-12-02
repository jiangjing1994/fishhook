<template>
  <div class="home">
    <h2>
      <a href="https://github.com/hellonainai/kemomimi">v{{ version }}</a>
    </h2>
    <img alt="Vue logo" src="../assets/V[CL6C_F)ETTW0K0PJ1LF11.gif" />
  </div>
</template>

<script>
// @ is an alias to /src
import config from "../../package.json";
export default {
  name: "Home",
  data() {
    return {
      version: config.version
    };
  },
  created() {}
};
</script>
