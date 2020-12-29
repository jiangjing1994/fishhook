<template>
  <div class="about">
    <KemButton type="text.del"></KemButton>
    <KemButton type="text.add"></KemButton>
    <KemButton type="icon.del"></KemButton>
    <KemButton type="operate.del"></KemButton>
    <KemButton type="operate.add">
      自定义文本按钮
    </KemButton>
    <KemButton type="operate.add"></KemButton>
    <KemButton type="operate.edit"></KemButton>
    <KemButton
      type="custom.date"
      :custom-button-config="customButtonConfig"
    ></KemButton>
    <KemButton>primary按钮</KemButton>
    <KemButton type="danger">
      danger按钮
    </KemButton>
    <KemButton type="default">
      default按钮
    </KemButton>
    <KemButton
      :select-button-group="selectButtonGroup"
      @clickButtonItem="clickButtonItem"
    >
      下拉按钮
    </KemButton>
  </div>
</template>
<script>
export default {
  name: "Button",
  data() {
    return {
      selectButtonGroup: [
        { value: "11", label: "11" },
        { value: "2", label: "2" },
        { value: "4", label: "3" }
      ],
      customButtonConfig: {
        date: {
          type: "success",
          text: "日期",
          icon: "el-icon-date"
        }
      }
    };
  },
  methods: {
    clickButtonItem({ value }) {
      this.$message.success(value);
    }
  }
};
</script>
