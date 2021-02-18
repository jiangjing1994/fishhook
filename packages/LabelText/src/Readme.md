- Vue component example:
```vue
<template>
    <div>
         <KemLabelText
                :value="value"
         ></KemLabelText>
    </div>
</template>

<script>
export default {
    name: "LabelText",
    data() {
        return {
            value: '痛苦或者凄凉，这一刻化为笑声飞扬'
           
           
        };
    },
};
</script>

<style scoped></style>

```
