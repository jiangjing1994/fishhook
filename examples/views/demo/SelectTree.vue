<!--
 * @Author: dawdler
 * @Date: 2020-12-26 11:52:05
 * @Description: demo
 * @LastModifiedBy: dawdler
-->
<template>
  <div style="text-align: left; padding-top: 20px">
    {{ values }}
    <KemButton @click="changeOptions">修改options</KemButton>
    <KemSelectTree
      ref="treeSelect"
      v-model="values"
      popover-class="test-class-wrap"
      :styles="styles"
      :options="options"
      :select-params="selectParams"
      :tree-params="treeParams"
    ></KemSelectTree>
  </div>
</template>
<script>
export default {
  name: 'SelectTree',
  components: {},
  props: {
    params: Object,
    isSingle: {
      type: Boolean,
      default() {
        return true
      },
    },
  },
  data() {
    return {
      options: [],
      styles: {
        width: '300px',
      },
      // 单选value为字符串，多选为数组
      values: '0_0',
      selectParams: {
        clearable: true,
        placeholder: '请输入内容',
      },
      treeParams: {
        data: [],
        props: {
          children: 'children',
          label: 'name',
          disabled: 'disabled',
          parentId: 'parentId',
          value: 'id',
        },
      },
    }
  },
  watch: {},
  created() {},
  mounted() {
    // 手动更新树数据
    let data = []
    const { label, children, parentId, value, rootId } = this.treeParams.props
    for (let i = 0; i < 5; i++) {
      let rootNode = {
        [label]: `节点：${i}`,
        [parentId]: rootId,
        [value]: i,
        [children]: [],
      }
      for (let a = 0; a < 5; a++) {
        let subId = `${rootNode[value]}_${a}`
        let subNode = {
          [label]: `子节点：${subId}`,
          [parentId]: rootNode[value],
          [value]: subId,
          [children]: [],
        }
        for (let b = 0; b < 5; b++) {
          let endId = `${subId}_${b}`
          let endNode = {
            [label]: `末级节点：${endId}`,
            [parentId]: subNode[value],
            [value]: endId,
            [children]: [],
          }
          subNode[children].push(endNode)
        }
        rootNode[children].push(subNode)
      }
      data.push(rootNode)
    }
    this.$nextTick(() => {
      //this.$refs.treeSelect.treeDataUpdateFun(data)
    })

    //this.options = data
  },
  methods: {
    changeOptions() {
      // 手动更新树数据
      let data = []
      const { label, children, parentId, value, rootId } = this.treeParams.props
      for (let i = 0; i < 5; i++) {
        let rootNode = {
          [label]: `节点：${i}`,
          [parentId]: rootId,
          [value]: i,
          [children]: [],
        }
        for (let a = 0; a < 5; a++) {
          let subId = `${rootNode[value]}_${a}`
          let subNode = {
            [label]: `子节点：${subId}`,
            [parentId]: rootNode[value],
            [value]: subId,
            [children]: [],
          }
          for (let b = 0; b < 5; b++) {
            let endId = `${subId}_${b}`
            let endNode = {
              [label]: `末级节点：${endId}`,
              [parentId]: subNode[value],
              [value]: endId,
              [children]: [],
            }
            subNode[children].push(endNode)
          }
          rootNode[children].push(subNode)
        }
        data.push(rootNode)
      }
      this.$nextTick(() => {
        //this.$refs.treeSelect.treeDataUpdateFun(data)
      })
      this.options = data
    },
    _filterFun(value, data, node) {
      debugger
      if (!value) return true
      return data.id.indexOf(value) !== -1
    },
    // 树点击
    _nodeClickFun(data, node, vm) {
      console.log('this _nodeClickFun', this.values, data, node)
    },
    // 树过滤
    _searchFun(value) {
      console.log(value, '<--_searchFun')
      // 自行判断 是走后台查询，还是前端过滤
      this.$refs.treeSelect.filterFun(value)
      // 后台查询
      // this.$refs.treeSelect.treeDataUpdateFun(treeData);
    },
    // 自定义render
    _renderFun(h, { node, data, store }) {
      const { props, clickParent } = this.treeParams
      return (
        <span
          class={[
            'custom-tree-node',
            !clickParent && data[props.children] && data[props.children].length ? 'disabled' : null,
          ]}
        >
          <span>{node.label}</span>
        </span>
      )
    },
  },
}
</script>
<style lang="scss">
.disabled {
  cursor: no-drop;
}
.custom-tree-node {
  width: calc(100% - 40px);
}
</style>
