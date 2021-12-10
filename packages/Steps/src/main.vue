<template>
  <div class="steps-box">
    <div v-for="(item, index) in options" :key="index" class="item" :class="{ active: activeIndex >= index + 1 }">
      <div class="spot">
        {{ item.value !== undefined ? item.value : index + 1 }}
      </div>
      <div class="title">{{ item.label }}</div>
      <div v-if="index !== options.length - 1" class="line"></div>
    </div>
  </div>
</template>

<script>
/**
 * @displayName Steps 步骤条
 */
export default {
  name: 'KemSteps',
  props: {
    options: {
      type: Array,
      required: true,
    },
    activeIndex: {
      type: Number,
      default: 1,
    },
  },
}
</script>

<style lang="scss" scoped>
.steps-box {
  margin: 0 auto;
  // width: 1280px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  padding: 20px 20px 37px;
  .item {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .spot {
    width: 26px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.09);
    position: relative;
    z-index: 2;
    color: rgba(#000000, 45%);
    margin-right: 9px;
  }
  .title {
    color: rgba(#000000, 45%);
  }
  .line {
    width: 90px;
    height: 0;
    border-bottom: 1px dashed rgba(#000000, 25%);
    margin: 0 16px;
  }
  .active {
    .title {
      color: #007aff;
    }
    .spot {
      color: #fff;
      background: #007aff;
      &::after {
        content: '';
        z-index: 1;
        position: absolute;
        width: 34px;
        height: 34px;
        top: -4px;
        left: -4px;
        border-radius: 50%;
        background: rgba(#007aff, 15%);
      }
    }
    .line {
      border-bottom: 1px dashed#007aff;
    }
  }
}
</style>
