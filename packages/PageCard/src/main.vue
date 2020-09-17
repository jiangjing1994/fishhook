<template>
  <div
    class="page-card__body"
  >
    <el-card
      body-style="padding: 0"
      shadow="never"
    >
      <div
        v-if="$slots.header || header"
        slot="header"
        style="display: flex;align-items: center;"
      >
        <div class="block-color__cell--left"/>
        <slot name="header">
          {{ header }}
        </slot>
      </div>
      <div
        class="content__body"
      >
        <slot />
      </div>
      <div
        v-if="$slots.footer || footer"
        style="padding: 15px 15px;border-top: 1px solid #EBEEF5;"
      >
        <slot name="footer">
          {{ footer }}
        </slot>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'PageCard',
  props: {
    header:{
      type:String,
      default:()=>{
        return ''
      }
    },
    footer:{
      type:String,
      default:()=>{
        return ''
      }
    },
  }
};
</script>
<style lang="scss">
//@import "~@/styles/element-variables.scss";
.page-card__body{
  .content__body{
    // height: calc(100vh - 150px);
    overflow-y: auto;
    padding: 15px 10px;
    min-height: 300px;
    position: relative
  }
  .block-color__cell--left{
    //background-color: $--color-primary;
    width: 10px;
    height: 10px;
    margin-right: 5px
  }
  .el-card__header{
    padding:8px 8px ;
    font-size: 15px;
    color: #666666;

  }
}


</style>
