- Vue component example:
```vue
<template>
    <div>
        <pre>{{color}}</pre>
        <KemColorPicker v-model="color"></KemColorPicker>
    </div>
</template>

<script>
export default {
    name: "ColorPicker",
    data() {
        return {
            color: '',
           
        };
    },
};
</script>

<style scoped></style>

```
