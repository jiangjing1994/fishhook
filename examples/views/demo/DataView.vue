<template>
  <div style="width: 100vw; height: 100vh; background-color: red; position: fixed; left: 0; top: 0">
    <KemDataView :height="1080" :width="1920" :background-image="img">
      <img :src="view" alt="123" style="width: 1920px; height: 1080px" />
    </KemDataView>
  </div>
</template>

<script>
import view from '../../assets/view.jpg'
import img from '../../assets/img.png'

export default {
  name: 'DataView',
  data() {
    return {
      view,
      img,
    }
  },
}
</script>

<style scoped></style>
