<script lang="jsx">
import { throttle ,get} from 'lodash'
export default {
  name: 'KemButton',
  components: {},
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'small'
    },
  },
  computed:{
    evet(){
      if (this.$listeners.click) {
        console.log(this.$attrs)
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.$listeners.click = this.throttle("click");
      }
      return this.$listeners;
    },
    style(){
      if(this.$props.type === 'text'){

        return{
          "padding-top":"0px",
          "padding-bottom": "0px"
        }
      }return {}

    }
  },
  created(){
    if(this.$listeners.click){
      this.$listeners.click = () =>{}

    }
  },

  render(){
    const { type } = this

    const baseButton = ()=>{
      return(
              <el-button
                      props={this.$attrs}
                      type={this.type}
                      size={this.size}
                      style={this.style}
                      on={this.evet}
              >
                {this.$slots.default}
              </el-button>
      )
    }

    const specialButton = (type)=>{



      const specialButtonConfig = {
        operate:{
          del:{
            type:'danger',
            text:'删除',
            icon:"el-icon-delete"
          },
          edit:{
            type:'primary',
            text:'编辑',
            icon:"el-icon-edit"
          },
          add:{
            type:'success',
            text:'新增',
            icon:"el-icon-plus"
          },
        }
      }



      return(
              <el-button
                      size="mini"
                      type={get(specialButtonConfig,type).type}
                      icon={get(specialButtonConfig,type).icon}
                      on={this.evet}
                      round={true}>
                {this.$slots.default || get(specialButtonConfig,type).text}
              </el-button>


      )
    }
    return (type.indexOf('.')!==-1?specialButton(type):baseButton(type))
  },

  methods: {
    /**
     * 节流
     * @param method
     */
    throttle(method){
      return throttle(
              (...args)=>{
                this.$emit(method, ...args);
              }, this.$attrs.wait || 1000, { //[wait=0] (number): 需要节流的毫秒数。
                // [options.leading=true] (boolean): 指定调用在节流开始前，默认true。
                // [options.trailing=true] (boolean): 指定调用在节流结束后，默认true。
                leading: true,
                trailing: false
              }
      )
    },
  }
}
</script>
<style lang="scss">
</style>



