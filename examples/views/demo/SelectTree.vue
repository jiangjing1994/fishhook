<template>
  <div>
    {{ value }}
    <KemSelectTree v-model="value" placeholder="请选择内容" :tree-option="treeOption"></KemSelectTree>
  </div>
</template>

<script>
export default {
  name: 'SelectTree',
  components: {},
  data() {
    return {
      value: 1,
      treeOption: {
        data: [
          {
            label: '一级 1',
            children: [
              {
                label: '二级 1-1',
                children: [
                  {
                    label: '三级 1-1-1',
                  },
                ],
              },
            ],
          },
          {
            label: '一级 2',
            children: [
              {
                label: '二级 2-1',
                children: [
                  {
                    label: '三级 2-1-1',
                  },
                ],
              },
              {
                label: '二级 2-2',
                children: [
                  {
                    label: '三级 2-2-1',
                  },
                ],
              },
            ],
          },
          {
            label: '一级 3',
            children: [
              {
                label: '二级 3-1',
                children: [
                  {
                    label: '三级 3-1-1',
                  },
                ],
              },
              {
                label: '二级 3-2',
                children: [
                  {
                    label: '三级 3-2-1',
                  },
                ],
              },
            ],
          },
        ],
      },
      treeData: [
        {
          value: 1,
          label: 'text1',
          children: [
            { value: 5, label: 'text5' },
            { value: 6, label: 'text6' },
          ],
        },
        { value: 2, label: 'text2' },
        { value: 3, label: 'text3' },
        { value: 4, label: 'text5' },
      ],
    }
  },
}
</script>
