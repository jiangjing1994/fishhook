- Example:

```vue
<template>
  <div style="width: 100%;height: 800px;background-color: red ">
    <KemDataView :height="800" :width="600" :background-image="backgroundImage"></KemDataView>
  </div>
</template>

<script>
import backgroundImage from '../../../examples/assets/view.jpg'

export default {
  name: 'DataView',
  data() {
    return {
      backgroundImage,
    }
  },
}
</script>

<style scoped></style>
```
