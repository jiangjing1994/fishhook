<template>
  <el-row :span="24">
    <el-col :span="6">
      值:{{ form }}<br />
      <kem-input-tree
        v-model="form"
        default-expand-all
        placeholder="请选择内容"
        type="tree"
        :option="dic"
      ></kem-input-tree>
    </el-col>
    <el-col :span="24"></el-col>
    <el-col :span="6">
      包含父类值:{{ form1 }}<br />
      <kem-input-tree
        v-model="form1"
        multiple
        placeholder="请选择内容"
        type="tree"
        :option="dic"
      ></kem-input-tree>
    </el-col>
    <el-col :span="24"></el-col>
    <el-col :span="6">
      不包含父类值:{{ form2 }}<br />
      <kem-input-tree
        v-model="form2"
        leaf-only
        multiple
        placeholder="请选择内容"
        type="tree"
        :option="dic"
      ></kem-input-tree>
    </el-col>
    <el-col :span="24"></el-col>
    <el-col :span="6">
      半选是否包含父类值:{{ form33 }}<br />
      半选是不包含父类值:{{ form3 }}<br />
      <kem-input-tree
        ref="tree"
        v-model="form3"
        include-half-checked
        multiple
        placeholder="请选择内容"
        type="tree"
        :option="dic"
      ></kem-input-tree>
    </el-col>
    <el-col :span="24"></el-col>
    <el-col :span="6">
      父子不关联:{{ form4 }}<br />
      <kem-input-tree
        v-model="form4"
        :check-strictly="true"
        multiple
        placeholder="请选择内容"
        type="tree"
        :option="dic"
      ></kem-input-tree>
    </el-col>
  </el-row>
</template>
<script>
import KemInputTree from '../../../packages/SelectTree/src/main'
export default {
  name: 'SelectTree',
  components: { KemInputTree },
  data() {
    return {
      form: '',
      form1: [0, 1, 2, 3, 4],
      form2: [1, 2, 3],
      form3: [2, 1],
      form33: [],
      form4: [0],
      dic: [
        {
          label: '选项1',
          value: 0,
          children: [
            {
              label: '选项3',
              value: 2,
            },
            {
              label: '选项4',
              value: 3,
            },
          ],
        },
        {
          label: '选项2',
          value: 1,
        },
      ],
    }
  },
  watch: {
    form3: {
      handler() {
        this.form33 = this.$refs.tree.getHalfList()
      },
    },
  },
  mounted() {
    this.form33 = this.$refs.tree.getHalfList()
  },
}
</script>
