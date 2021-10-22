<template>
  <div>
    <div style="height: 400px; background-color: #000; padding: 10px; margin-bottom: 50px">
      <KemFlipNnumber :value="123456.34">
        <div slot="suffix">Km/h</div>
        <div slot="prefix">+</div>
      </KemFlipNnumber>
    </div>
    <KemFlipNnumber :value="-123456.34" ui-type="text">
      <div slot="suffix">Km/h</div>
    </KemFlipNnumber>
    <KemFlipNnumber value="-123456.34" ui-type="text" is-abs>
      <div slot="suffix">Km/h</div>
    </KemFlipNnumber>
    <KemFlipNnumber value="-123456.34" ui-type="text" is-colors-value> </KemFlipNnumber>
  </div>
</template>

<script>
export default {
  name: 'FlipNnumber',
}
</script>

<style scoped></style>
