<template>
  <div
    class="page-card__body">
    <el-card
      body-style="padding: 0"
      shadow="never"
    >
      <div
        v-if="$slots.header || header"
        slot="header"
        style="display: flex;align-items: center;font-size: 16px;font-weight: bold;padding: 7px;color: #333333"
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
        style="padding: 15px 15px;border-top: 1px solid #EBEEF5;text-align: right"
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
  name: 'KemPageCard',
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
  margin-bottom: 20px;
  .content__body{
    // height: calc(100vh - 150px);
    text-align: left;
    overflow-y: auto;
    padding: 15px 10px;
    min-height: 300px;
    position: relative
  }
  .block-color__cell--left{
    background-color: #0f80ff;
    width: 4px;
    height: 15px;
    margin-right: 10px
  }
  .el-card__header{
    padding:8px 8px ;
    font-size: 15px;
    color: #666666;

  }
}


</style>
