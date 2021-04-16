- Vue component example: 简单表格静态数据纯用于展示

```vue
<template>
  <KemTable
    :column="column"
    :menu-button="menuButton"
    :request="request"
    :result="result"
    :default-params="defaultParams"
    :menu-width="250"
    @clickMenuButton="clickMenuButton"
  />
</template>

<script>
import { queryList } from '@/utils/index'
export default {
  name: 'SimpaleTable',
  data() {
    return {
      defaultParams: {},
      request: queryList,
      menuButton: ['allBtn', 'addBtn', 'delBtn'],

      column: [
        { label: '业务需求编号', prop: 'code' },
        { label: '需求主题', prop: 'title' },
        { label: '需求类型', prop: 'type' },
        { label: '需求提交人', prop: 'createUser' },
        { label: '需求提交时间', prop: 'createTime' },
        { label: '正式需求编号', prop: 'formalCode' },
      ],
    }
  },
  methods: {
    result(res) {
      return res.data
    },
    rowClick(value) {
      this.$message.success(JSON.stringify(value))
    },
    save(value) {
      this.$message.success(JSON.stringify(value))
    },
    clickMenuButton(value) {
      this.$message.success(JSON.stringify(value))
    },
  },
}
</script>

<style scoped></style>
```

- Vue component example: 稍微复杂一丢丢的表格

```vue
<template>
  <KemTable
    :column="column"
    :menu-button="menuButton"
    :request="request"
    :result="result"
    :default-params="defaultParams"
    :menu-width="250"
    @clickMenuButton="clickMenuButton"
  />
</template>

<script>
import { queryList } from '@/utils/index'
export default {
  name: 'BaseTable',
  data() {
    return {
      defaultParams: {},
      request: queryList,
      menuButton: ['allBtn', 'addBtn', 'delBtn'],

      column: [
        { label: '业务需求编号', prop: 'code' },
        { label: '需求主题', prop: 'title' },
        { label: '需求类型', prop: 'type' },
        { label: '需求提交人', prop: 'createUser' },
        { label: '需求提交时间', prop: 'createTime' },
        { label: '正式需求编号', prop: 'formalCode' },
      ],
    }
  },
  methods: {
    result(res) {
      return res.data
    },
    rowClick(value) {
      this.$message.success(JSON.stringify(value))
    },
    save(value) {
      this.$message.success(JSON.stringify(value))
    },
    clickMenuButton(value) {
      this.$message.success(JSON.stringify(value))
    },
  },
}
</script>

<style scoped></style>
```

- Vue component example: 各种 menu~expand~花里胡哨版

```vue
<template>
  <KemTable
    :column="column"
    :menu-button="menuButton"
    :request="request"
    :result="result"
    :default-params="defaultParams"
    :menu-width="250"
    :expand="true"
    @clickMenuButton="clickMenuButton"
  >
    <template slot="menu" slot-scope="{ scope }">
      <KemButton type="text">{{ scope.row.createUser }}</KemButton>
    </template>
    <template slot="expand" slot-scope="{ scope }">
      <div>expand</div>
      <div>
        <pre>{{ scope.row }}</pre>
      </div>
    </template>
    <template slot="menuTop">
      <div class="menu-top-class">menuTop</div>
    </template>
    <template slot="menuLeft">
      <div class="menu-left-class">menuLeft</div>
    </template>
    <template slot="menuRight">
      <div class="menu-right-class">menuRight</div>
    </template>
    <template slot="menuBottom">
      <div class="menu-bottom-class">menuBottom</div>
    </template>
  </KemTable>
</template>

<script>
import { queryList } from '@/utils/index'
export default {
  name: 'MenuTable',
  data() {
    return {
      defaultParams: {},
      request: queryList,
      menuButton: ['delBtn'],
      column: [
        { label: '业务需求编号', prop: 'code' },
        { label: '需求主题', prop: 'title' },
        { label: '需求类型', prop: 'type' },
        { label: '需求提交人', prop: 'createUser' },
        { label: '需求提交时间', prop: 'createTime' },
        { label: '正式需求编号', prop: 'formalCode' },
      ],
    }
  },
  methods: {
    result(res) {
      return res.data
    },
    rowClick(value) {
      this.$message.success(JSON.stringify(value))
    },
    save(value) {
      this.$message.success(JSON.stringify(value))
    },
    clickMenuButton(value) {
      this.$message.success(JSON.stringify(value))
    },
  },
}
</script>

<style scoped>
.menu-top-class {
  height: 55px;
  background-color: #d9ecff;
  text-align: center;
  line-height: 55px;
}
.menu-left-class {
  height: 55px;
  background-color: #d9ecff;
  text-align: center;
  line-height: 55px;
}
.menu-right-class {
  height: 55px;
  background-color: #d9ecff;
  text-align: center;
  line-height: 55px;
}
.menu-bottom-class {
  height: 55px;
  background-color: #d9ecff;
  text-align: center;
  line-height: 55px;
}
</style>
```

- Vue component example: 我有一个带搜索框的大表哥

```vue
<template>
  <KemTable
    :column="column"
    :menu-button="menuButton"
    :request="request"
    :result="result"
    :default-params="defaultParams"
    :menu-width="250"
    :search-props="searchProps"
    @clickMenuButton="clickMenuButton"
  />
</template>

<script>
import { queryList } from '@/utils/index'
export default {
  name: 'SimpaleTable',
  data() {
    return {
      defaultParams: {},
      request: queryList,
      menuButton: ['allBtn', 'addBtn', 'delBtn'],
      searchProps: {
        formItems: [
          { label: '业务需求编号', prop: 'code', span: 8 },
          { label: '需求主题', prop: 'title', span: 8 },
          { label: '选择颜色', prop: 'color', slot: 'color', span: 8 },
          { label: '需求类型', prop: 'type', span: 8 },
          { label: '需求提交人', prop: 'createUser', span: 8 },
          { label: '正式需求编号', prop: 'formalCode', span: 8 },
        ],
      },

      column: [
        { label: '业务需求编号', prop: 'code' },
        { label: '需求主题', prop: 'title' },
        { label: '需求类型', prop: 'type' },
        { label: '需求提交人', prop: 'createUser' },
        { label: '需求提交时间', prop: 'createTime' },
        { label: '正式需求编号', prop: 'formalCode' },
      ],
    }
  },
  methods: {
    result(res) {
      return res.data
    },
    rowClick(value) {
      this.$message.success(JSON.stringify(value))
    },
    save(value) {
      this.$message.success(JSON.stringify(value))
    },
    clickMenuButton(value) {
      this.$message.success(JSON.stringify(value))
    },
  },
}
</script>

<style scoped></style>
```
