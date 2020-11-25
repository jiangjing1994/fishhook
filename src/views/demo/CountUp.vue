<template>
  <div>
    <KemCountUp
      :animation="true"
      :decimals="0"
      class="count"
      :value="12234"
    ></KemCountUp>
  </div>
</template>

<script>
export default {
  name: "CountUp"
};
</script>

<style scoped></style>
