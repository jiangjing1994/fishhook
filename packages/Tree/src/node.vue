<template>
  <el-collapse-transition :appear="appear">
    <ul :class="classes">
      <li
        @contextmenu.stop="handleContextmenu(data, $event)"
        @selectstart.stop="handlePreventSelect(data, $event)"
      >
        <span :class="arrowClasses" @click="handleExpand">
          <KemViewIcon
            v-if="showArrow"
            :type="arrowType"
            :custom="customArrowType"
            :size="arrowSize"
          />
          <KemViewIcon v-if="showLoading" type="ios-loading" class="ivu-load-loop" />
        </span>
        <KemViewCheckbox
          v-if="showCheckbox"
          :value="data.checked"
          :indeterminate="data.indeterminate"
          :disabled="data.disabled || data.disableCheckbox"
          @click.native.prevent="handleCheck"
        ></KemViewCheckbox>
        <span :class="titleClasses" @click="handleClickNode">
          <Render v-if="data.render" :render="data.render" :data="data" :node="node"></Render>
          <Render
            v-else-if="isParentRender"
            :render="parentRender"
            :data="data"
            :node="node"
          ></Render>
          <template v-else>{{ data.title }}</template>
        </span>
        <Tree-node
          v-for="(item, i) in children"
          v-if="data.expand"
          :key="i"
          :appear="appearByClickArrow"
          :data="item"
          :multiple="multiple"
          :show-checkbox="showCheckbox"
          :children-key="childrenKey"
        >
        </Tree-node>
      </li>
    </ul>
  </el-collapse-transition>
</template>
<script>
import Render from './render'
import ElCollapseTransition from 'element-ui/src/transitions/collapse-transition'
import Emitter from '../../mixins/emitter'
import { findComponentUpward } from '../../utils'

const prefixCls = 'kem-tree'

export default {
  name: 'TreeNode',
  components: { ElCollapseTransition, Render },
  mixins: [Emitter],
  inject: ['TreeInstance'],
  props: {
    data: {
      type: Object,
      default() {
        return {}
      },
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    childrenKey: {
      type: String,
      default: 'children',
    },
    showCheckbox: {
      type: Boolean,
      default: false,
    },
    appear: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      prefixCls: prefixCls,
      appearByClickArrow: false,
    }
  },
  computed: {
    classes() {
      return [`${prefixCls}-children`]
    },
    selectedCls() {
      return [
        {
          [`${prefixCls}-node-selected`]: this.data.selected,
        },
      ]
    },
    arrowClasses() {
      return [
        `${prefixCls}-arrow`,
        {
          [`${prefixCls}-arrow-disabled`]: this.data.disabled,
          [`${prefixCls}-arrow-open`]: this.data.expand,
        },
      ]
    },
    titleClasses() {
      return [
        `${prefixCls}-title`,
        {
          [`${prefixCls}-title-selected`]: this.data.selected,
        },
      ]
    },
    showArrow() {
      return (
        (this.data[this.childrenKey] && this.data[this.childrenKey].length) ||
        ('loading' in this.data && !this.data.loading)
      )
    },
    showLoading() {
      return 'loading' in this.data && this.data.loading
    },
    isParentRender() {
      const Tree = findComponentUpward(this, 'Tree')
      return Tree && Tree.render
    },
    parentRender() {
      const Tree = findComponentUpward(this, 'Tree')
      if (Tree && Tree.render) {
        return Tree.render
      } else {
        return null
      }
    },
    node() {
      const Tree = findComponentUpward(this, 'Tree')
      if (Tree) {
        // 将所有的 node（即flatState）和当前 node 都传递
        return [Tree.flatState, Tree.flatState.find((item) => item.nodeKey === this.data.nodeKey)]
      } else {
        return []
      }
    },
    children() {
      return this.data[this.childrenKey]
    },
    // 3.4.0, global setting customArrow 有值时，arrow 赋值空
    arrowType() {
      let type = 'ios-arrow-forward'

      if (this.$MIMI) {
        if (this.$MIMI.Tree.customArrow) {
          type = ''
        } else if (this.$MIMI.Tree.arrow) {
          type = this.$MIMI.Tree.arrow
        }
      }
      return type
    },
    // 3.4.0, global setting
    customArrowType() {
      let type = ''

      if (this.$MIMI) {
        if (this.$MIMI.Tree.customArrow) {
          type = this.$MIMI.Tree.customArrow
        }
      }
      return type
    },
    // 3.4.0, global setting
    arrowSize() {
      let size = ''

      if (this.$MIMI) {
        if (this.$MIMI.Tree.arrowSize) {
          size = this.$MIMI.Tree.arrowSize
        }
      }
      return size
    },
  },
  methods: {
    handleExpand() {
      const item = this.data
      // if (item.disabled) return;

      // Vue.js 2.6.9 对 transition 的 appear 进行了调整，导致 iView 初始化时无动画，加此方法来判断通过点击箭头展开时，加 appear，否则初始渲染时 appear 为 false
      this.appearByClickArrow = true

      // async loading
      if (item[this.childrenKey].length === 0) {
        const tree = findComponentUpward(this, 'Tree')
        if (tree && tree.loadData) {
          this.$set(this.data, 'loading', true)
          tree.loadData(item, (children) => {
            this.$set(this.data, 'loading', false)
            if (children.length) {
              this.$set(this.data, this.childrenKey, children)
              this.$nextTick(() => this.handleExpand())
            }
          })
          return
        }
      }

      if (item[this.childrenKey] && item[this.childrenKey].length) {
        this.$set(this.data, 'expand', !this.data.expand)
        this.dispatch('Tree', 'toggle-expand', this.data)
      }
    },
    handleClickNode() {
      if (this.TreeInstance.expandNode) {
        if (this.showArrow) this.handleExpand()
      } else if (this.TreeInstance.selectNode) {
        this.handleSelect()
      }
    },
    handleSelect() {
      if (this.data.disabled) return
      if (this.TreeInstance.showCheckbox && this.TreeInstance.checkDirectly) {
        this.handleCheck()
      } else {
        this.dispatch('Tree', 'on-selected', this.data.nodeKey)
      }
    },
    handleCheck() {
      if (this.data.disabled) return
      const changes = {
        checked: !this.data.checked && !this.data.indeterminate,
        nodeKey: this.data.nodeKey,
      }
      this.dispatch('Tree', 'on-check', changes)
    },
    handleContextmenu(data, event) {
      if (data.contextmenu) {
        event.preventDefault()
        this.dispatch('Tree', 'contextmenu', { data, event })
      }
    },
    handlePreventSelect(data, event) {
      if (data.contextmenu) {
        event.preventDefault()
      }
    },
  },
}
</script>
