<template>
  <div>
    <DemoDlock>
      <template slot="source">
        <Button></Button>
      </template>
      <template slot="highlight">
        <alert></alert>
      </template>
    </DemoDlock>
    <alert></alert>
  </div>
</template>

<script>
import alert from '../md/alert.md'
import Button from '../demo/Button'
//import  DemoDlock from '../../components/demo-block'
export default {
  components: {
    Button,
    //DemoDlock,
    alert,
  },
  name: 'Docs',
}
</script>

<style scoped></style>
