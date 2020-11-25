<template>
  <KemTable
    :table-data="data"
    :column="column"
    :expand="expand"
    :menu-option="menuOption"
    :menu-button="menuButton"
    @rowClick="rowClick"
    @clickMenuButton="clickMenuButton"
  >
    <template slot="expand" slot-scope="{ scope }">
      {{ scope.row }}
      <el-input v-model="scope.row.name"></el-input>
    </template>
    <template slot="menuLeft">
      <KemInput />
    </template>
    <template slot="menuRight">
      <KemButton>保存</KemButton>
    </template>
  </KemTable>
</template>

<script>
export default {
  name: "Table",
  data() {
    return {
      menuButton: ["allBtn", "addBtn", "delBtn"],
      menuOption: {
        delBtn: true
      },
      expand: true,
      data: [
        { name: "张三", sex: "男" },
        { name: "李四", sex: "女" },
        { name: "王五", sex: "不详" }
      ],
      column: [
        {
          label: "姓名",
          prop: "name"
        },
        {
          label: "性别",
          prop: "sex"
        }
      ]
    };
  },
  methods: {
    rowClick() {
      console.log(3232);
    },
    clickMenuButton(value) {
      console.log(value);
    }
  }
};
</script>

<style scoped></style>
