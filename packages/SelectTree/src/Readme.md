### API：

#### 特殊点(屏蔽 el-select、el-tree 的几个参数)：

##### el-select 取消参数:

```
multiple                       改为内置，通过v-model类型判断是否多选
:filterable="false"            搜索从弹出框里面执行
```

##### el-tree 取消参数：

```
:show-checkbox="selectParams.multiple"  使用下拉框参数multiple 判断是否对树进行多项 取消对el-tree的人为传参show-checkbox
:node-key="propsValue"  自动获取treeParams.props.value
:draggable="false"      屏蔽拖动
```

#### 支持的参数：

#### el-select 参数：

```
selectParams  :     支持el-select 相关参数

#### styles参数：
styles 对el-select设置style,类型:Object

#### selectClass参数：
selectClass  对el-select设置class,类型:String
```

#### el-tree 参数：

```
treeParams  :     支持el-tree 相关参数
增加：'clickParent'
treeParams.clickParent 类型：Boolean 默认：false
在selectParams.multiple=false单选情况下点击节点，判断是否关闭弹出框
clickParent: true 允许点击父级关闭弹出框 false 只能点击子级关闭弹出框
```

#### popover 参数：

```
popoverClass  对应：popper-class,类型:String
```

#### 搜索框参数：

```
treeParams.filterable   Boolean 考虑是显示在弹出框内的，因此放到treeParams参数内
```

### 事件:

###### filter-node-method

```
filter-node-method 自定义过滤方式
```

###### select-clear

```
select-clear 下拉框清空事件   this.$emit('select-clear');
```

###### removeTag

```
removeTag 移除单个标签，返回所有勾选的ids，以及当前移除的tag（可能为中文）标签   this.$emit('removeTag',ids,tag);
```

###### node-click

```
树点击,和el-tree参数一致: this.$emit('node-click', data, node, vm);
```

###### check

```
勾选触发,和el-tree参数一致: this.$emit('check',data, node, vm);
```

###### treeDataUpdateFun

```
treeDataUpdateFun 树更新数据

this.post(url,postobj,response=>{
    this.$refs.treeSelect.treeDataUpdateFun(response.data);
});
```

###### searchFun 参数: keywords

```
searchFun(value){
    // 如果是本地过滤：
    this.$refs.treeSelect.$refs.tree.filter(value);
    // 可以直接访问方法，也可以拿到 $refs.tree
    this.$refs.treeSelect.filterFun(val);
    // 如果是请求后台：
    this.post(url,postobj:{
        keywords:value
    },response=>{
        this.$refs.treeSelect.treeDataUpdateFun(response.data);
    });
}
```

###### filterFun 参数: 本地过滤树

```
this.$refs.treeSelect.filterFun(val);
```

### DEMO (App.vue)

```
<template>
    <div id="app">
        <el-tree-select :styles="styles" v-model="values" :selectParams="selectParams" :treeParams="treeParams" :treeRenderFun="_renderFun" @searchFun="_searchFun" @node-click="_nodeClickFun" ref="treeSelect"/>
        <el-select multiple v-model="test" placeholder="请选择" @change="_selectChange">
            <el-option v-for="item in treeParams.data" :key="item.testId" :label="item.name" :value="item.testId"></el-option>
        </el-select>
    </div>
</template>
<style>
#app {
    display: flex;
    justify-content: space-between;
    width: 600px;
}
</style>
<script>
export default {
    name: 'App',
    data() {
        return {
            styles: {
                width: '300px'
            },
            test: '',
            values: ['11111'],
            selectParams: {
                multiple: true,
                clearable: true,
                placeholder: '请输入内容'
            },
            treeParams: {
                clickParent: false,
                filterable: true,
                'check-strictly': true,
                'default-expand-all': true,
                'expand-on-click-node': false,
                data: [],
                props: {
                    children: 'child',
                    label: 'name',
                    disabled: 'disabled',
                    value: 'testId'
                }
            }
        };
    },
    mounted() {
        let data = [
            {
                testId: '1',
                name: '节点1',
                disabled: true,
                child: [
                    {
                        testId: '11111',
                        name: '子节点'
                    }
                ]
            },
            {
                testId: '2',
                name: '节点2',
                child: [
                    {
                        testId: '222222',
                        disabled: true,
                        name: '子节点'
                    }
                ]
            },
            {
                testId: '3',
                name: '节点3'
            },
            {
                testId: '4',
                name: '节点4'
            },
            {
                testId: '5',
                name: '节点5'
            },
            {
                testId: '6',
                name: '节点6'
            }
        ];
        this.treeParams.data = data;
        this.$refs.treeSelect.treeDataUpdateFun(data);
    },
    methods: {
        // 下拉框修改
        _selectChange(val) {
            console.log(val, '<-select change');
        },
        // 树点击
        _nodeClickFun(data, node, vm) {
            console.log('this _nodeClickFun', this.values, data, node);
        },
        // 树过滤
        _searchFun(value) {
            console.log(value, '<--_searchFun');
            // 自行判断 是走后台查询，还是前端过滤
            // this.$refs.treeSelect.$refs.tree.filter(value);
            this.$refs.treeSelect.filterFun(value);
            // 后台查询
            // this.$refs.treeSelect.treeDataUpdateFun(treeData);
        },
        // 自定义render
        _renderFun(h, { node, data, store }) {
            return (
                <span class='custom-tree-node'>
                    <span>{node.label}</span>
                </span>
            );
        }
    },
    components: { }
};
</script>

```

## 安装

```
npm install el-tree-select --save-dev
```

## git 地址

```
https://github.com/ayiaq1/el-tree-select

```
