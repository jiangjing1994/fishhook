<template>
  <div>
    <KemTable
      :column="column"
      :menu-width="250"
      row-key="tagId"
      :table-data="tableData"
      :tree-props="treeProps"
    >
    </KemTable>
  </div>
</template>

<script>
import { queryTreeElement, queryTreeRoot } from '@/utils/index'

export default {
  name: 'TreeTableLoopFalse',
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
        loop: false,
      },

      column: [
        { label: '功能菜单名称', prop: 'name', width: 350 },
        { label: '描述', prop: 'desc' },
        { label: '编码', prop: 'tagCode' },
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
      queryTreeElement().then((res) => {
        resolve(this.result(res))
      })
    },
  },
}
</script>

<style scoped></style>
