<template>
  <div style="width: 100vw;height: 100vh;background-color: red;position: fixed;left: 0;top: 0">
    <KemDataView
      :height="800"
      :width="600"
      :background-image="backgroundImage"
    >
    </KemDataView>
  </div>

</template>

<script>
import backgroundImage from '@/assets/logo.jpg'

export default {
    name: "DataView",
    data() {
        return {
            backgroundImage
        }
    },
}
</script>

<style scoped>

</style>
