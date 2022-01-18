- Example:

```vue
<template>
  <div></div>
</template>
<script>
export default {
  name: 'SelectTree',
}
</script>
```

# 特性

- 支持直接数据和远程加载数据
- 支持单选和多选
- 支持使用 checkbox 和不显示 checkbox

# props

## multiple

类型: Boolean

默认值： false

设置下拉树是单选树还是多选数

## showValue

类型： [String, Array]

主要用于在下拉树未加载到已选中数据时，显示的数据名

## value

类型： [String, Array]

提交的值

## placeholder

类型： String

没有值是显示的占位内容

## disabled

类型： Boolean

设置下拉树不可用

## treeOption

类型： Object

使用树的配置项，和 element ui 中 tree 的选项几乎一致

主要配置项：

```
{
	data: null,
	lazy: false,
	load: null,
	props: {
		children: '',
		label: '',
		disabled: '',
		isLeaf: ''
	},
	key: '',// 配置树上使用的key
	showCheckbox: false,
	checkStrictly: false,
	defaultExpandedKeys: []
}

```
