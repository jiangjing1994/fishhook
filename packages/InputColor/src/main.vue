<template>
  <KemInput
          v-model="text"
          :placeholder="placeholder"
          :size="size"
          :clearable="disabled?false:clearable"
          :disabled="disabled"
          @change="handleChange"
  >
    <template slot="append">
      <KemColorPicker
              v-model="text"
              size="mini"
              show-alpha
              :predefine="predefineColors"
              @change="handleChange"
      ></KemColorPicker>
    </template>
  </KemInput>
</template>
<script>

/**
 * @displayName InputColor 颜色输入框
 */
export default {
  name: 'KemInputColor',
  props: {
    placeholder: {
      type: String,
      default: '请输入/选择颜色'
    },
    iconList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    clearable: {
      type: Boolean,
      default:true
    },
    disabled: {
      type: Boolean,
      default:false
    },
    // eslint-disable-next-line vue/require-default-prop
    value: {
      type: String,
    },
    // eslint-disable-next-line vue/require-default-prop
    size: {
      type: String,
    }

  },
  data() {
    return {
      text:'',
      predefineColors: [
        "#ff4500",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#1e90ff",
        "#c71585",
        "rgba(255, 69, 0, 0.68)",
        "rgb(255, 120, 0)",
        "hsv(51, 100, 98)",
        "hsva(120, 40, 94, 0.5)",
        "hsl(181, 100%, 37%)",
        "hsla(209, 100%, 56%, 0.73)",
        "#c7158577"
      ]
    }
  },
  computed:{
    evet(){
      return this.$listeners;
    },
  },
  watch: {
    value: {
      handler (value) {
        this.initVal(value);
      },
      immediate: true
    }
  },
  methods: {
    handleChange (value) {

      // console.log(value)

      this.$emit('input', value);
      this.$emit('change', value);
    },
    initVal (value) {
       this.text =  value
    }


  },
}
</script>
