<template>
    <div>
        <KemTree :request="request"  :lazy="true" is-show-menu @clickMenus="clickMenus" @nodeClick="nodeClick"></KemTree>
    </div>
</template>

<script>
export default {
    name: "Tree",
    data() {
        return {
            value:'',
            data: [{
                label: '一级 1',
                id:'w2332',
                children: [{
                    label: '二级 1-1',
                    children: [{
                        label: '三级 1-1-1'
                    }]
                }]
            }, {
                label: '一级 2',
                children: [{
                    label: '二级 2-1',
                    children: [{
                        label: '三级 2-1-1'
                    }]
                }, {
                    label: '二级 2-2',
                    children: [{
                        label: '三级 2-2-1',
                        leaf: true
                    }]
                }]
            }, {
                label: '一级 3',
                leaf: true

            }],
        }
    },
    methods: {
        clickMenus({data,type}){
          console.log(data,type)
        },
        nodeClick(data){
          console.log(data)
        },

        request() {
            return new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve(this.data)
                },500)

            })
        }
    },
}
</script>

<style scoped>

</style>
