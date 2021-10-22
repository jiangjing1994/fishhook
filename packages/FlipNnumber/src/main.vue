<template>
  <div :class="`flip-number-warpper--${uiType}`">
    <div class="flip-number">
      <div v-if="$slots.prefix" class="flip-number-prefix">
        <!-- @slot prefix	前缀 -->
        <slot name="prefix"></slot>
      </div>
      <div class="flip-number-number">
        <template v-if="uiType === 'normal'">
          <div v-for="(number, key) in numbers" :key="key" class="flip-single-number" :style="flipSingleNumberStyle">
            {{ number }}
          </div>
        </template>
        <template v-else>
          <span :style="`${textNumbersColor(textNumbers)}`">
            <KemCountUp :value="textNumbers"></KemCountUp>
          </span>
        </template>
      </div>
      <div v-if="$slots.suffix" class="flip-number-suffix">
        <!-- @slot suffix	后缀 -->
        <slot name="suffix"></slot>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * @displayName FlipNnumber 数字翻页器
 */

export default {
  name: 'KemFlipNnumber',
  props: {
    /**
     * ui类型
     * @values normal , text
     */
    uiType: {
      type: String,
      default: 'normal',
    },
    value: {
      type: [Number, String],
      required: true,
    },
    toFixed: {
      type: Number,
      default: 0,
    },
    numberFontSize: {
      type: Number,
      default: 32,
    },
    /**
     * 是否显示正负号
     */
    isAbs: {
      type: Boolean,
      default: false,
    },
    isColorsValue: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否显示箭头
     */
    isArrowValue: {
      type: Boolean,
      default: false,
    },

    /**
     * 是否显示正负号
     */
    // isAbs: {
    //   type: Boolean,
    //   default: false,
    // },

    colors: {
      type: Array,
      default: () => {
        return ['#74ee38', '#f56969']
      },
    },
    sectionValue: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    curtenValue() {
      const value = this.value * 1

      if (this.isAbs) {
        return Math.abs(value)
      }
      return value
    },
    flipSingleNumberStyle() {
      return {
        fontSize: this.numberFontSize + 'px',
        marginLeft: this.numberFontSize * 0.1 + 'px',
        marginRight: this.numberFontSize * 0.1 + 'px',
      }
    },
    textNumbers() {
      try {
        return this.curtenValue.toFixed(this.toFixed)
      } catch (e) {
        return 0
      }
    },
    numbers() {
      let number = this.curtenValue
      try {
        const numbers = (number.toFixed(this.toFixed) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
        return numbers.split('')
      } catch {
        return []
      }
    },
  },
  methods: {
    textNumbersColor(value) {
      if (this.isColorsValue) {
        let color = ''
        if (value > this.sectionValue) {
          color = this.colors[0]
        } else {
          color = this.colors[1]
        }
        return `color:${color}`
      }
      return ''
    },
  },
}
</script>
<style lang="scss">
.flip-number-warpper--normal {
  .flip-number {
    display: flex;
    justify-content: center;
    align-items: center;
    .flip-number-prefix {
    }
    .flip-number-number {
      display: flex;
      justify-content: center;
      align-items: stretch;

      .flip-single-number {
        font-family: 'Microsoft Yahei', Arial, sans-serif;
        font-size: 32px;
        font-weight: bold;
        color: rgb(126, 211, 33);
        margin-left: 4.8px;
        margin-right: 4.8px;
        padding: 0px 0.1em;
        box-sizing: content-box;
        width: 0.6em;
        text-align: center;
        border-image-slice: 10 16 15 10 fill;
        border-width: 10px 16px 15px 10px;
        border-style: solid;

        border-image-source: url('./assets/images/img.png');
      }
    }
    .flip-number-suffix {
      font-family: 'Microsoft Yahei', Arial, sans-serif;
      font-size: 16px;
      color: rgb(126, 211, 33);
      align-self: flex-end;
      margin-left: 7px;
      margin-top: 0px;
    }
  }
}
.flip-number-warpper--text {
  .flip-number {
    display: inline-block;

    .flip-number-prefix {
      margin-right: 5px;
    }
    .flip-number-number {
    }
    .flip-number-suffix {
      margin-left: 5px;
    }
  }
}
</style>
