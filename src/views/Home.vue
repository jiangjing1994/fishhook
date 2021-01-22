<template>
  <div class="home" style="background-color: #ffffff;padding: 40px;padding-top: 0">
    <h4 style="font-size: 20px;padding: 0;margin: 0;background-color: #f3f3f3;margin-bottom:20px;;box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2); ">
      <h5>版本 v{{ version }}</h5>
      <h5>
        <a href="https://github.com/hellonainai/mimi">GitHub</a>
      </h5>
      <h5>
        <a href="https://github.com/hellonainai/mimi/tree/master/src/views/demo">代码demo</a>
      </h5>
      <h5>
        <a href="https://hellonainai.github.io/mimi/#/">预览</a>
      </h5>
    </h4>
    <img alt="Vue logo" src="../assets/Y3QHT]~954YQ`HF004PQJ6A.jpg" style=";box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);" />
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
<style>
.home h5{
  padding: 5px;
  display: inline-block;
  color: #16045f;

}
</style>
