<template>
    <KemPageCard header="一个有趣的crud功能模块">
        <KemTable
                :column="column"
                :menu-button="menuButton"
                :request="request"
                :result="result"
                :default-params="defaultParams"
                :menu-width="250"
                @clickMenuButton="clickMenuButton"

        />
        <KemCrud ref="kemcrud" :form-items="formItems" :form-rules="formRules"></KemCrud>



    </KemPageCard>

</template>

<script>
import { queryList,saveForm ,deleteForm} from '@/utils/index'
export default {
    name: "Crud",
    data() {
        return {
            defaultParams:{},
            request:queryList,
            menuButton: ["allBtn", "addBtn", "delBtn"],
            menuOption: {
                delBtn: true
            },
            expand: true,
            data: [
                { name: "张三", sex: "男" ,},
                { name: "李四", sex: "女" },
                { name: "王五", sex: "不详" }
            ],
            column: [
                {label: "业务需求编号", prop: "code",},
                {label: "需求主题", prop: "title"},
                {label: "需求类型", prop: "type"},
                {label: "需求提交人", prop: "createUser"},
                {label: "需求提交时间", prop: "createTime",},
                {label: "正式需求编号", prop: "formalCode"}
            ]
        };
    },
    computed: {
        formItems() {
            return [
                {label: "业务需求编号", prop: "code",},
                {label: "需求主题", prop: "title"},
                {label: "需求类型", prop: "type"},
                {label: "需求提交人", prop: "createUser"},
                {label: "正式需求编号", prop: "formalCode"}
            ]
        },
        formRules() {
            return {
                code: [{ required: true, message: '请输入业务需求编号',  },],
                title: [{ required: true, message: '请输入需求主题',  },],
                type: [{ required: true, message: '请输入需求类型',  },],
                createUser: [{ required: true, message: '请输入需求提交人',  },],
                formalCode: [{ required: true, message: '请输入正式需求编号',  },],
            }
        }
    },
    methods: {
        result(res){
            return res.data

        },

        clickMenuButton(value) {
            const { type } = value
            let request
            let done = (value)=>{
                this.$message.success(value.msg)
            }

            if( type === 'add' || type === 'edit'){
                request = saveForm
            }else if (type === 'del'){
                request = deleteForm
            }
            this.$refs['kemcrud'].start({
                ...value,
                form:value.row,
                request,
                done
            })

        }
    }
};
</script>

<style scoped></style>
