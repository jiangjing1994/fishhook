## KemTable
@displayNameTable配置化表格


### Attributes
|参数|类型|说明|默认值|
|------|------|------|------|
|readOnly|Boolean|——|false|
|tableData|Array|——|[]|
|column|Array|——|[]|
|size|String|sizie尺寸|——|
|align|String|列跟菜单对齐方式 支持$MIMI|——|
|expand|Boolean|行展开|false|
|pageOption|Object|分页器|——|
|menuWidth|Number|操作栏宽度 支持$MIMI|——|
|waitRefresh|Number|定时刷新|——|
|menuButton|Array|——|[]|
|isShowPage|Boolean|是否显示分页器|true|
|isShowBorder|Boolean|是否显示边框 支持$MIMI||
|isShowStripe|Boolean|是否显示斑马线 支持$MIMI||
|isShowIndex|Boolean|是否显示索引 支持$MIMI||
|isShowHeader|Boolean|是否显示表头 支持$MIMI||
|mergeOption|Object|合并选项 支持option下的所有属性及props没有暴露的属性 支持$MIMI方式|——|
|selection|Boolean|是否开启多选 支持$MIMI||
|defaultParams|Object|默认参数|{}|
|autoRefresh|Boolean|表格是否根据queryParams变化自动 刷新数据 默认 true|true|
|defaultProps|Object|参数转义|——|
|orderProps|Object|分页参数转义|——|
|request|Function|异步方法|——|
|result|Function|结果处理|——|
|rowStyle|Function|行样式 $Mimi|——|
|treeLoad|Function|——|{}|
|tableHeight|Number|表格高度|——|
|indexLabel|String|索引显示文字|——|
|menuButtonType|String|菜单按钮滴样式|text|
|columnOverHidden|Boolean|单元格超出隐藏|true|
|rowKey|String|rowkey|$index|
|searchProps|Object、Boolean|搜索框的传值|false|
|treeProps|Object、Boolean|树的传值|false|
|bigData|Boolean|大数模式|false|
|reserveSelection|Boolean|分页选中|false|


### Slots
|name|说明|
|------|------|
|menuTop|无描述|
|menuLeft|无描述|
|menuRight|无描述|
|menuBottom|无描述|


### Events 事件
|事件名称|说明|
|------|------|
|searchFormUpdata|[{"type":"CommentBlock","value":"* 搜索条件改变\n         * @event searchFormUpdata\n         * @type {Event}\n         ","start":11382,"end":11464,"loc":{"start":{"line":543,"column":8,"index":11382},"end":{"line":546,"column":11,"index":11464}}}]|
|getDataListSuccess||
|selectionChange||
|expandChanges|[{"type":"CommentBlock","value":"* 手风琴展开\n       * @event expandChanges\n       * @type {Event}\n       ","start":16144,"end":16216,"loc":{"start":{"line":759,"column":6,"index":16144},"end":{"line":762,"column":9,"index":16216}}}]|
|rowUpdate||
|cell-mouse-enter|[{"type":"CommentLine","value":"单元格 hover 进入时会触发该事件","start":17062,"end":17083,"loc":{"start":{"line":800,"column":6,"index":17062},"end":{"line":800,"column":27,"index":17083}}}]|
|cell-mouse-leave||
|header-click||
|row-contextmenu||
|cell-dblclick||
|on-load||
|cellClick|[{"type":"CommentBlock","value":"* 单元格被点击\n       * @event cellClick\n       * @type {Event}\n       ","start":17803,"end":17872,"loc":{"start":{"line":826,"column":6,"index":17803},"end":{"line":829,"column":9,"index":17872}}}]|
|rowClick|[{"type":"CommentBlock","value":"* 某一行被点击\n       * @event rowClick\n       * @type {Event}\n       ","start":18043,"end":18111,"loc":{"start":{"line":840,"column":6,"index":18043},"end":{"line":843,"column":9,"index":18111}}}]|
|rowDblclick|[{"type":"CommentBlock","value":"* 行双击\n       * @event rowClick\n       * @type {Event}\n       ","start":18240,"end":18305,"loc":{"start":{"line":852,"column":6,"index":18240},"end":{"line":855,"column":9,"index":18305}}}]|
|clickMenuButton|[{"type":"CommentBlock","value":"* 点击菜单按钮\n         * @event clickMenuButton\n         * @type {Event}\n         ","start":18974,"end":19055,"loc":{"start":{"line":882,"column":8,"index":18974},"end":{"line":885,"column":11,"index":19055}}}]|
|handelLoadmore||


### Methods
|方法名|说明|参数|返回值|
|------|------|------|------|
|menuPermission|判断权限|——|——|
|getListData `async` |——|——|——|
|setCrudData|给crudData 赋值|——|——|
|renderTable|表格渲染|——|——|
|resetPage|重置分页器分页器|——|——|
|sizeChange|分页器每页条数改变|——|——|
|currentChange|当前页数改变|——|——|
|sortChange|排序|——|——|
|selectionChange|多选|——|——|
|expandChanges|风琴展开|row:object(描述),expendList:array|——|
|rowCellAdd|表格增加一行|——|——|
|columnInit|表格增加一行|——|——|
|rowUpdate|当行内编辑点击保存时|——|——|
|clearSort|清空排序|——|——|
|cellMouseEnter|当单元格 hover 进入时会触发该事件|——|——|
|cellMouseLeave|当单元格 hover 退出时会触发该事件|——|——|
|headerClick|当某一列的表头被点击时会触发该事件|——|——|
|rowContextmenu|当某一行被鼠标右键点击时会触发该事件|——|——|
|cellDblclick|当某个单元格被双击击时会触发该事件|——|——|
|onLoad|——|——|——|
|cellClick|——|——|——|
|rowClick|当某一行被点击时会触发该事件|——|——|
|rowDblclick|——|——|——|
|methodsRowStyle|单元格样式|——|——|
|clickMenuButton|点击操作栏的删除按钮|——|——|
|loadNode|手动渲染|——|——|
|handelLoadmore|——|——|——|
|toggleRowSelection|——|——|——|
|toggleIdSelection|——|——|——|