- Vue component example:
```vue
<template>
    <div>
        <pre>{{multipleValue}}</pre>
        <KemCheckboxGroup
                v-model="multipleValue"
                 :options="options"
        ></KemCheckboxGroup>
    </div>
</template>

<script>
export default {
    name: "CheckboxGroup",
    data() {
        return {
            multipleValue: [],
           
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
};
</script>

<style scoped></style>

```
