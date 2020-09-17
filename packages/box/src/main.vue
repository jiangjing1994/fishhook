<template>
  <div class="box" :style="'width: '+width+';height: '+height">
    <div class="child" :class="'border-'+borderType">
      <div class="c1">
        <slot name="c1"></slot>
      </div>
      <div class="c2">
        <slot name="c2"></slot>
      </div>
      <div class="c3">
        <slot name="c3"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      width: {
        type: String,
        default: '50px'
      },
      height: {
        type: String,
        default: '105px'
      },
      borderType:{
        type:String,
        default:'right'
      }
    },
      name:"NnBox"
  };
</script>

<style scoped lang='scss'>
  @import "../../../src/styles/variables";

  .box {
    $borderColor:#dddddd;
    padding: 10px;
    display: inline-block;
    .child{
      //max-width: 400px;
      min-width: 50px;
      position: relative;
      height: 100%;
      .c1{
        width: 100%;
        position: absolute;
        top: 0px;
        font-size: 14px;
        color: #666666;
       // padding:0 10px 0px 10px;
      }
      .c2{
        width: 100%;
        position: absolute;
        bottom: 0px;
        font-size: 16px;
        color: $color-basic;
       // padding:0 10px 0px 10px;
        font-weight: bold;

      }
      .c3{
        width: 100%;
        position: absolute;
        bottom: 0px;
       // padding:0 10px 0px 10px;
      }
    }
    .border-all{
      border: 1px solid $borderColor
    }
    .border-right{
      border-right: 1px solid $borderColor
    }
    .border-top{
      border-top: 1px solid $borderColor
    }
    .border-left{
      border-left: 1px solid $borderColor
    }
    .border-bottom{
      border-bottom: 1px solid $borderColor
    }

  }
</style>
