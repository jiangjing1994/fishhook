<template>
  <div>
    <KemButton @click="loadNode">手动渲染</KemButton>
    <KemTable
      ref="tree"
      :column="column"
      :request="request"
      :result="result"
      :menu-width="250"
      row-key="organize_id"
      :tree-props="treeProps"
      :tree-load="treeLoad"
    >
    </KemTable>
  </div>
</template>

<script>
import { queryTreeElement, queryTreeRoot } from '../../utils/index'

export default {
  name: 'TreeTableLazy',
  data() {
    return {
      request: queryTreeRoot,
      tableData: [
        {
          tagId: 1,
          parentId: 0,
          name: 'CRM-个人组',
          desc: '11',
          tagCode: '111',
          children: [
            {
              tagId: 2,
              parentId: 1,
              name: '订单中心',
              desc: '11',
              tagCode: 'TEAM',
            },
            {
              tagId: 3,
              parentId: 1,
              name: '携转中心',
              desc: '11',
              tagCode: 'TEAM',
            },
            {
              tagId: 4,
              parentId: 1,
              name: '预受理中台',
              desc: '11',
              tagCode: 'TEAM',
            },
          ],
        },
      ],

      treeProps: {
        lazy: true,
      },

      column: [
        { label: '组织名称', prop: 'organize_name' },
        { label: '父节点ID', prop: 'parentId' },
        { label: '组织编码', prop: 'code' },
        { label: '组织类型', prop: 'org_type' },
        { label: '备注', prop: 'notes' },
        { label: '状态', prop: 'state' },
      ],
    }
  },
  methods: {
    result(res) {
      return res.obj.map((item) => {
        if (item.children_count > 0) {
          return {
            ...item,
            hasChildren: true,
          }
        } else {
          return item
        }
      })
    },
    treeLoad(tree, treeNode, resolve) {
      console.log(3333333333333344444444)
      queryTreeElement().then((res) => {
        resolve(this.result(res))
      })
    },

    loadNode() {
      //手动调用加载数据方法
      this.$refs.tree.loadNode({ organize_id: 2 })
    },
  },
}
</script>

<style scoped></style>
