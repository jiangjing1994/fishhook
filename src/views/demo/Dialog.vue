<template>
    <div>
        <KemButton @click="dw">
            点我
        </KemButton>
        <KemButton @click="dw2">
            点我2
        </KemButton>
        <KemButton @click="dw3">
            点我3
        </KemButton>
        <KemButton @click="dw4">
            点我4
        </KemButton>
        <KemDialog :visible.sync="visible" @save="save">
            <template slot="header">
                默认
            </template>
            盼望着，盼望着，东风来了，春天的脚步近了。
        </KemDialog>

        <KemDialog :visible.sync="visible2">
            <template slot="header">
                自定义footer
            </template>
            盼望着，盼望着，东风来了，春天的脚步近了。
            <template slot="footer">
                <KemButton type="operate.add"></KemButton>
            </template>
        </KemDialog>

        <KemDialog :visible.sync="visible3">
            <template slot="header">
                无保存按钮
            </template>
            盼望着，盼望着，东风来了，春天的脚步近了。
        </KemDialog>
        <KemDialog :visible.sync="visible4" isfullscreen>
            <template slot="header">
                全屏
            </template>
            盼望着，盼望着，东风来了，春天的脚步近了。
        </KemDialog>
    </div>
</template>

<script>
export default {
    name: "Dialog",
    data() {
        return {
            visible: false,
            visible2: false,
            visible3: false,
            visible4: false
        };
    },
    methods: {
        dw() {
            this.visible = !this.visible;
        },
        dw2() {
            this.visible2 = !this.visible2;
        },
        dw3() {
            this.visible3 = !this.visible3;
        },
        dw4() {
            this.visible4 = !this.visible4;
        },
        save() {
            this.$message("保存");
        }
    }
};
</script>

<style scoped></style>
