export default {
    data() {
        return {
            data: [],
        }
    },
    props: {
        defaultProps: {
            type: Object,
            default:()=>{
                return{
                    label: 'label',
                    value:'value'
                }
            }
        },
        // eslint-disable-next-line vue/require-default-prop
        options:{
            type: Array,
            // required:true
        },

        uiType:{
            // text normal
            type: String,
            default: 'normal'
        },
        // eslint-disable-next-line vue/require-default-prop
        request:{
            type:Function,
        },
        // eslint-disable-next-line vue/require-default-prop
        result:{
            type:Function,
        },
        // 默认参数
        defaultParams: {
            type: Object,
            default:()=>{
                return{

                }
            }
        },
    },
    computed:{

        list(){
            const { label, value }= this.defaultProps
            let options = this.isService ? this.data : this.options


            return options.map(item => {
                return {
                    ...item,
                    label: item[label],
                    value: item[value],
                }
            })
        },
        evet(){
            return this.$listeners;
        },
        isService(){
            return !!this.request
        },
        label(){
            const list = this.list

            let filterArr=list.filter( (item) =>{
                return item.value === this.$attrs.value;
            });

            if(filterArr instanceof Array && filterArr.length>0){
                return filterArr[0].label
            }else {
                return ''
            }


        }
    },
    created() {
        if (this.isService){
            this.getListData()
        }
    },
    watch: {
        defaultParams: {
            handler() {

                if (this.isService){
                    this.getListData()
                }
            },
            deep: true
        },
    },
    methods: {
        async getListData(params={}){


            const defaultParams = this.defaultParams

            const request = this.request


            if(request){

                const res = await request({
                    ...defaultParams,
                    ...params
                })

                let data = res

                const  result  = this.result

                if(result){

                    data  = await result(res) || []
                }

                this.data = data

            }else {
                throw new Error(`Need request !!!!!!!`)
            }

        },

    },

}
