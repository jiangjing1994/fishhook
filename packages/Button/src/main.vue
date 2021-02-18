<script lang="jsx">
import { throttle ,get} from 'lodash'
/**
 * Component is described here.
 */
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
            default: 'mini'
        },
        // 下拉按钮组默认不显示
        selectButtonGroup: {
            type: [Array,Boolean],
            default: false
        },
        // 自定义按钮配置
        customButtonConfig: {
            type: [Object,Boolean],
            default: false
        },

    },
    computed:{
        evet(){
            if (this.$listeners.click) {
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

        },
        buttonSize(){
            return this.$MIMI.buttonSize

        }
    },
    created(){
        if(this.$listeners.click){
            this.$listeners.click = () =>{}

        }
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
    },

    render(){
        const { type } = this
        const baseButton = ()=>{
            return(
                <el-button
                    props={this.$attrs}
                    type={this.type}
                    size={this.size || this.buttonSize }
                    style={this.style}
                    on={this.evet}
                >
                    {this.$slots.default}
                </el-button>
            )
        }

        const selectButtonGroup = (button)=>{

            const options = this.selectButtonGroup


            const dropdownItem = () =>{
                let eles = []
                options.map(item=>{
                    eles.push( <el-dropdown-item command={item.value}>{item.label}</el-dropdown-item>)
                })
                return eles
            }

            const handleCommand = (value) =>{

                this.$emit('clickButtonItem',{value})

            }



            return(
                <el-dropdown size={this.size || this.buttonSize }  v-on:command={handleCommand}>
                    <div style="padding: 0 8px">
                        { button }
                    </div>
                    <el-dropdown-menu slot="dropdown" >
                        {dropdownItem}
                    </el-dropdown-menu>
                </el-dropdown>
            )
        }

        const specialButton = (type)=>{
            const specialButtonConfig = {
                operate:{
                    del:{type:'danger', text:'删除', icon:"el-icon-delete"},
                    edit:{type:'primary', text:'编辑', icon:"el-icon-edit"},
                    add:{type:'success', text:'新增', icon:"el-icon-plus"},
                    download:{type:'primary', text:'下载', icon:"el-icon-download"},
                    refresh:{type:'success', text:'刷新', icon:"el-icon-refresh"},
                    detail:{type:'success', text:'详情', icon:"el-icon-refresh"},
                    info:{type:'primary', text:'详情', icon:"el-icon-info"},
                },
                icon:{
                    del:{type:'danger',icon:"el-icon-delete"},
                    edit:{type:'primary',icon:"el-icon-edit"},
                    add:{type:'success', icon:"el-icon-plus"},
                    download:{type:'primary',icon:"el-icon-download"},
                    refresh:{type:'success',icon:"el-icon-refresh"},
                    detail:{type:'success',icon:"el-icon-refresh"},
                    info:{type:'primary',icon:"el-icon-info"},
                },
                text:{
                    del:{type:'text', text:'删除', icon:"el-icon-delete"},
                    edit:{type:'text', text:'编辑', icon:"el-icon-edit"},
                    add:{type:'text', text:'新增', icon:"el-icon-plus"},
                    download:{type:'text', text:'下载', icon:"el-icon-download"},
                    refresh:{type:'text', text:'刷新', icon:"el-icon-refresh"},
                    detail:{type:'text', text:'详情', icon:"el-icon-refresh"},
                    info:{type:'text', text:'详情', icon:"el-icon-info"},
                },
                custom:this.customButtonConfig ? this.customButtonConfig :{}
            }



            return(
                <el-button
                    style="padding:4px 10px"
                    size="mini"
                    type={get(specialButtonConfig,type).type}
                    icon={get(specialButtonConfig,type).icon}
                    on={this.evet}
                    round={true}>
                    {this.$slots.default || get(specialButtonConfig,type).text}
                </el-button>


            )
        }
        const btn = type.indexOf('.')!==-1?specialButton(type):baseButton(type)
        if(this.selectButtonGroup){
            return (selectButtonGroup(btn))
        }else {
            return btn
        }
    }
}
</script>




