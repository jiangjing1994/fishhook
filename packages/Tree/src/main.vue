<template>
    <div >
        <KemInput v-model="filterText" style="margin-bottom: 20px">
            <KemButton v-if="isShowMenu"
                       slot="append"
                       icon="el-icon-plus"
                       @click="onClickNode({},'add')"
            ></KemButton>
        </KemInput>
        <el-tree
                ref="tree"
                style="overflow: hidden; height: 100%"
                v-bind="$attrs"
                :data="treeData"
                :props="defaultProps"
                node-key="id"
                :expand-on-click-node="false"
                :filter-node-method="filterNodeMethod"
                :render-content="renderContent"
                :lazy="lazy"
                :load="loadNode"
                @node-click="nodeClick"

                v-on="evet"
        />
    </div>
</template>
<script type="text/jsx">
/**
 * @displayName Tree 树
 */
export default {
    name:'KemTree',
    props: {
        defaultMenuButton:{
            type:Array,
            default:()=>{
                return[
                    {
                        type:'info',
                        icon:'el-icon-info',
                        text:'详情',
                        hidden:true
                    },
                    {
                        type:'add',
                        icon:'el-icon-plus',
                        text:'增加'
                    },
                    {
                        type:'del',
                        icon:'el-icon-delete',
                        text:'删除'
                    },
                    {
                        type:'edit',
                        icon:'el-icon-edit',
                        text:'编辑'
                    },


                ]
            }
        },
        // 懒加载
        lazy:{
            type:Boolean,
            default:false
        },

        // 默认参数
        defaultParams: {
            type: Object,
            default:()=>{
                return{

                }
            }
        },

        defaultProps: {
            type: Object,
            default:()=>{
                return{
                    children: 'children',
                    label: 'label',
                    id:'id',
                    isLeaf: 'isLeaf'

                }
            }
        },

        isShowMenu:{
            type:Boolean,
            default:false,
        },
        data:{
            type:Array,
            default:()=>{
                return[]
            }
        },

        // eslint-disable-next-line vue/require-default-prop
        request:{
            type:Function,
        },
        // eslint-disable-next-line vue/require-default-prop
        result:{
            type:Function,
        },

    },

    data() {
        return {
            filterText:'',
            loading:false,
            treeData:[]
        }
    },
    computed: {
        evet(){
            return this.$listeners;
        },

    },
    watch: {
        filterText(newValue) {
            this.filter(newValue)
        }
    },
    created(){
        if(!this.lazy){
            this.getTreeData()
        }

    },

    methods: {
        filterNodeMethod(value,data){
            if (!value) return true;
            return data[this.defaultProps['label']].indexOf(value) !== -1;
        },

        filter(val){
            this.$refs.tree.filter(val);
        },


        async getTreeData(params={}){

            const defaultParams = this.defaultParams

            const request = this.request

            if(request) {

                this.loading = true

                const res = await request({
                    ...defaultParams,
                    ...params
                })

                let data = res

                const result = this.result

                if (result) {

                    data = await result(res)

                }

                this.loading = false

                this.treeData = data


            }
            else {
                this.treeData = this.data
            }
        },


        async loadNode(node, resolve){

            this.loadData(node,resolve);

        },

        async loadData( params={},resolve) {


            const defaultParams = this.defaultParams

            const request = this.request

            if(request){

                this.loading = true

                const res = await request({
                    ...defaultParams,
                    ...params
                })

                let data = res

                const  result  = this.result

                if(result){

                    data  = await result(res) || []
                }

                this.loading=false

                resolve(data)


            }




        },

        onClickNode(data,type){
            this.$emit('clickMenus',{
                ...data,type
            },)
        },

        nodeClick(data){
            this.$emit('nodeClick',{
                ...data,
            },)

        },
        renderContent(h, { node, data, store }) {

            const defaultMenuButton = this.defaultMenuButton


            let menuList = []
            defaultMenuButton.map(item=>{
                if(!item.hidden){
                    menuList.push(
                        <el-dropdown-item>
                    <span type="text" on-click={(e) => {
                        e.stopPropagation();
                        this.onClickNode({node, data, store}, item.type)
                    }}><i className={item.icon}/> {item.text}</span>
                        </el-dropdown-item>

                    )
                }




            })

            const str =
                <el-dropdown
                    placement="bottom"
                >
              <span className="el-dropdown-link" on-click={(e) =>{e.stopPropagation()} }>
                <KemButton  type="text" icon="el-icon-more-outline"></KemButton>
              </span>
                    <el-dropdown-menu slot="dropdown">
                        { menuList }
                    </el-dropdown-menu>
                </el-dropdown>


            return (
                <div class="custom-tree-node">
                    <div class="text-ellipsis">
                        {node.label}
                    </div>
                    <div class="button__boody">
                        {this.isShowMenu ? str : ''}
                    </div>
                </div>
            );
        }
    }
};
</script>

<style lang="scss">

.custom-tree-node {
    position: relative;
    font-size: 12px;
    display: block;
    width: 100%;
    height: 100%;
    line-height: 26px;
    .text-ellipsis{
        position: absolute;
        width: calc(100% - 40px);
        height: 100%;
        overflow: hidden;
        left: 0;
        top: 0;
        z-index: 10;
        text-align: left;
    }
    .button__boody{
        position: absolute;
        width: 20px;
        height: 100%;
        right: 0px;
        padding: 0 10px;
        top: 0;
        background-color: #fff;
        z-index: 20;
    }
}
</style>
