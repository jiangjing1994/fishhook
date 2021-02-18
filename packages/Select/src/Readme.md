- Vue component example:
```vue
<template>
    <div>
        <KemSelect v-model="multipleValue" multiple :options="options"></KemSelect>

        <KemSelect v-model="value" :options="options"></KemSelect>

        <KemSelect v-model="value2" :request="transferRequest" :default-params="{dictType:'transfer'}" :default-props="{label:'transferName',value:'id'}"></KemSelect>

        <KemSelect v-model="value3" :options="options">
            <template slot-scope="{ scope }">
                <span style="float: left">{{ scope.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{scope.value}}</span>
            </template>
        </KemSelect>
        
    </div>
</template>

<script>
export default {
    name: "Select",
    data() {
        return {
            multipleValue: [],
            value: "",
            value2: "",
            value3: "",
          
            options: [
                {
                    value: "Beijing",
                    label: "北京"
                },
                {
                    value: "Shanghai",
                    label: "上海"
                },
                {
                    value: "Nanjing",
                    label: "南京"
                },
                {
                    value: "Chengdu",
                    label: "成都"
                },
                {
                    value: "Shenzhen",
                    label: "深圳"
                },
                {
                    value: "Guangzhou",
                    label: "广州"
                }
            ]
        };
    },
    methods: {
        transferRequest() {
            return new Promise((resolve)=>{

                setTimeout(()=>{
                    resolve([
                        {transferName:'北京', id:'Beijing'},
                        {transferName:'上海', id:'Shanghai'},
                        {transferName:'南京', id:'Nanjing'},
                        {transferName:'成都', id:'Chengdu'},
                        {transferName:'深圳', id:'Shenzhen'},
                        {transferName:'广州', id:'Guangzhou'},
                    ])
                },500)

            })

        }
    },
};
</script>

<style scoped></style>


```
