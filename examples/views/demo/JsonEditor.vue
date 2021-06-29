<template>
  <div style="text-align: left">
    <p>vue-json-editor</p>
    <vue-json-editor v-model="json"  :show-btns="false"  mode="code" @json-change="onJsonChange"></vue-json-editor>
  </div>
</template>

<script>
import vueJsonEditor from 'vue-json-editor'

export default {
  name:'JsonEditor',

  components: {
    vueJsonEditor
  },
  data () {
    return {
      json: {
        msg: 'demo of jsoneditor'
      }
    }
  },

  methods: {
    onJsonChange (value) {
      console.log('value:', value)
    }
  }
}
</script>
