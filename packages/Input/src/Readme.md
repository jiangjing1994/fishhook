- Vue component example:
```vue
<template>
    <div>
        <pre>{{value}}</pre>
        <KemInput
                v-model="value"
         ></KemInput>
    </div>
</template>

<script>
export default {
    name: "Input",
    data() {
        return {
            value: '',
           
           
        };
    },
};
</script>

<style scoped></style>

```
