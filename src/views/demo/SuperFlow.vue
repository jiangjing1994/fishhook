<template>
    <div class="super-flow-base-demo">
        <kem-super-flow
                ref="superFlow"
                :node-list="nodeList"
                :link-list="linkList"
                :node-menu="nodeMenuList"
                :link-menu="linkMenuList"
                :graph-menu="graphMenuList"
                :origin="origin"
                :enter-intercept="enterIntercept"
                :output-intercept="outputIntercept"
                :link-desc="linkDesc"
        >
            <template v-slot:node="{node}">
                <!--        <div :class="`flow-node flow-node-${meta.prop}`">-->
                <!--          <header>-->
                <!--            {{meta.name}}-->
                <!--          </header>-->
                <!--          <section>-->
                <!--            {{meta.desc}}-->
                <!--          </section>-->
                <!--        </div>-->
                <div class="flow-node__body">
                    <div class="btn_body">
                        <KemButton type="icon.add" @click="addNode(node)"/>
                        <KemButton type="icon.del" @click="addNode(node)"/>
                    </div>


                </div>
            </template>
        </kem-super-flow>


    </div>
</template>

<script>

const drawerType = {
	node: 0,
	link: 1
}
let getArr = (array)=>{
	return [].concat(...array.map(item => [].concat(item,...getArr(item.children))))
}
let getChildrenSum = (treeData,id)=>{
	let result = []
	treeData.map(item=>{
		if (item.pid === id) {
			result.push(item);
			result = [...result,...getChildrenSum(treeData,item.id)]
		}
	})
	return result
}
let getTree = (treeData, parent) => {
	const pid = parent.id || null
	let arr =[]

	let treeArr = [];
	for (let i = 0; i < treeData.length; i++) {
		let node = treeData[i];


		if (node["pid"] === pid && node["id"]) {
			const parentCoordinate = parent.coordinate || [10,10]
			const parentCoordinateX = parentCoordinate[0]
			const parentCoordinateY = parentCoordinate[1]
			let sumChildren = getChildrenSum(treeData,node["id"])
			sumChildren= sumChildren.length
			let coordinate =[]

			if(!pid){
				coordinate =  node.coordinate
			}else {

				arr.push(node)

				// eslint-disable-next-line no-inner-declarations
				function contains(arr, obj) {
					var i = arr.length;
					while (i--) {
						if (arr[i] === obj) {
							return i;
						}
					}
					return false;
				}


				coordinate = [parentCoordinateX + 400, parentCoordinateY + +100+(sumChildren||0)*100 +contains(arr,node) *100 ]}

			let newNode = {
				children: getTree(treeData, node),
				id: node.id,
				width: 350,
				height: 50,
				pid,
				parentCoordinate,
				coordinate,
				sumChildren,
				meta: {
					'prop': 'condition',
					'name': '开始节点ss'
				},
			};
			treeArr.push(newNode);

		}
	}
	return treeArr;
};

export default {
	name:'SuperFlow',
	data() {
		return {
			drawerType,
			drawerConf: {
				title: '',
				visible: false,
				type: null,
				info: null,
				open: (type, info) => {
					const conf = this.drawerConf
					conf.visible = true
					conf.type = type
					conf.info = info
					if (conf.type === drawerType.node) {
						conf.title = '节点'
						if (this.$refs.nodeSetting) this.$refs.nodeSetting.resetFields()
						this.$set(this.nodeSetting, 'name', info.meta.name)
						this.$set(this.nodeSetting, 'desc', info.meta.desc)
					} else {
						conf.title = '连线'
						if (this.$refs.linkSetting) this.$refs.linkSetting.resetFields()
						this.$set(this.linkSetting, 'desc', info.meta ? info.meta.desc : '')
					}
				},
				cancel: () => {
					this.drawerConf.visible = false
					if (this.drawerConf.type === drawerType.node) {
						this.$refs.nodeSetting.clearValidate()
					} else {
						this.$refs.linkSetting.clearValidate()
					}
				}
			},
			linkSetting: {
				desc: ''
			},
			nodeSetting: {
				name: '',
				desc: ''
			},

			origin: [20, 20],
			nodeList: [],
			linkList: [],

			graphMenuList: [
				[
					{
						label: '开始节点',
						disable(graph) {
							return !!graph.nodeList.find(node => node.meta.prop === 'start')
						},
						selected: (graph, coordinate) => {

							const start = graph.nodeList.find(node => node.meta.prop === 'start')
							if (!start) {
								graph.addNode({
									width: 100,
									height: 80,
									coordinate: coordinate,
									meta: {
										prop: 'start',
										name: '开始节点'
									}
								})
							}
						}
					},
					{
						label: '条件节点',
						disable: false,
						selected: (graph, coordinate) => {
							this.$refs['superFlow'].addNode({
								width: 160,
								height: 80,
								coordinate: coordinate,
								meta: {
									prop: 'condition',
									name: '条件节点'
								}
							})
						}
					},
					{
						label: '审批节点',
						disable: false,
						selected: (graph, coordinate) => {
							graph.addNode({
								width: 160,
								height: 80,
								coordinate: coordinate,
								meta: {
									prop: 'approval',
									name: '审批节点'
								}
							})
						}
					},
					{
						label: '抄送节点',
						disable: false,
						selected: (graph, coordinate) => {
							graph.addNode({
								width: 160,
								height: 80,
								coordinate: coordinate,
								meta: {
									prop: 'cc',
									name: '抄送节点'
								}
							})
						}
					},
					{
						label: '结束节点',
						disable(graph) {
							return !!graph.nodeList.find(point => point.meta.prop === 'end')
						},
						selected: (graph, coordinate) => {
							graph.addNode({
								width: 80,
								height: 50,
								coordinate: coordinate,
								meta: {
									prop: 'end',
									name: '结束节点'
								}
							})
						}
					}
				],
				[
					{
						label: '打印数据',
						selected: (graph,) => {
							console.log(JSON.stringify(graph.toJSON(), null, 2))
						}
					},
					{
						label: '全选',
						selected: (graph,) => {
							graph.selectAll()
						}
					}
				]
			],
			nodeMenuList: [
				[
					{
						label: '删除',
						selected(node, ) {
							node.remove()
						}
					}
				],
				[
					{
						label: '新增',
						selected: (node) => {
							const {graph, coordinate,_height,_width} = node

							graph.addNode({
								width: _width,
								height: _height,
								coordinate: [
									coordinate[0] + _width + 150,
									coordinate[1]
								],
								meta: {
									prop: 'start',
									name: '开始节点'
								}
							})
						}
					}
				]
			],
			linkMenuList: [
				[
					{
						label: '删除',
						disable: false,
						selected: (link, ) => {
							link.remove()
						}
					}
				],
				[
					{
						label: '编辑',
						disable: false,
						selected: (link, coordinate) => {
							console.log(link, coordinate)
						}
					}
				]
			]
		}
	},
	created() {
		const nodeList = [
			{
				'id': 'nodeS3WgFnzCI15X58Qw',
				'width': 350,
				'height': 50,
				'coordinate': [0, 0],
				'meta': {
					'prop': 'condition',
					'name': '开始节点ss'
				},

			},
			{
				'id': 'nodefHsy9uJObPtdHZv1',
				'width': 350,
				'height': 50,
				'coordinate': [300, 300],
				'meta': {
					'prop': 'approval',
					'name': '审批节点',
					'desc': '111111'
				}
			},

		]
		const linkList = [
			{
				'id': 'linkcs9ZhumWeTHrtUy8',
				'startId': 'nodeS3WgFnzCI15X58Qw',
				'endId': 'nodefHsy9uJObPtdHZv1',
				'startAt': [160, 40],
				'endAt': [0, 40],
				'meta': {
					desc:'sasas'
				}
			},
			{
				'id': 'linkBDld5rDBw4C6kiva',
				'startId': 'nodefHsy9uJObPtdHZv1',
				'endId': 'nodeqkK9zjcDz53xKRlK',
				'startAt': [160, 40],
				'endAt': [0, 40],
				'meta': null
			},
			{
				'id': 'linkA0ZZxRlDI9AOonuq',
				'startId': 'node7WXbwOR6kSFD53Hf',
				'endId': 'nodefHsy9uJObPtdHZv1',
				'startAt': [160, 40],
				'endAt': [0, 40],
				'meta': null
			},
			{
				'id': 'linkhCKTpRAf89gcujGS',
				'startId': 'nodeni9QOqT3mI7hsMau',
				'endId': 'nodeZBK0ZPpgMe1exezE',
				'startAt': [160, 40],
				'endAt': [0, 40],
				'meta': null
			},
			{
				'id': 'link2o7VZ7DRaSFKtB0g',
				'startId': 'nodeqkK9zjcDz53xKRlK',
				'endId': 'nodeDhVU6w2KbEnJCjZs',
				'startAt': [160, 40],
				'endAt': [0, 25],
				'meta': null
			},
			{
				'id': 'linkII013ovDctUDuPLu',
				'startId': 'nodeS3WgFnzCI15X58Qw',
				'endId': 'nodeG3WeFnzCI15X58Qw',
				'startAt': [100, 40],
				'endAt': [0, 40],
				'meta': null
			},
			{
				'id': 'link6MOmsq1EqzlWcG1n',
				'startId': 'nodeZBK0ZPpgMe1exezE',
				'endId': 'nodeqkK9zjcDz53xKRlK',
				'startAt': [160, 40],
				'endAt': [0, 40],
				'meta': null
			},
			{
				'id': 'link52SczSXHmuyKDzRU',
				'startId': 'nodesyxisLH1hJDdPsxx',
				'endId': 'nodeDhVU6w2KbEnJCjZs',
				'startAt': [160, 40],
				'endAt': [0, 25],
				'meta': null
			},
			{
				'id': 'link2hBQDTuIG4ZFYyE0',
				'startId': 'node0aiA9VuhjkiAdZCs',
				'endId': 'nodesyxisLH1hJDdPsxx',
				'startAt': [160, 40],
				'endAt': [0, 40],
				'meta': null
			},
			{
				'id': 'linkrwdW87FmOma5rPVo',
				'startId': 'nodeG3WeFnzCI15X58Qw',
				'endId': 'node0aiA9VuhjkiAdZCs',
				'startAt': [160, 40],
				'endAt': [0, 40],
				'meta': null
			},
			{
				'id': 'linknL75dQV0AWZA85sq',
				'startId': 'nodeS3WgFnzCI15X58Qw',
				'endId': 'node7WXbwOR6kSFD53Hf',
				'startAt': [100, 40],
				'endAt': [0, 40],
				'meta': null
			}
		]

		setTimeout(() => {
			this.nodeList = nodeList
			this.linkList = linkList
		}, 100)
	},
	methods: {
		addNode(node){

			const {  id,_height,_width} = node

			this.$refs['superFlow'].addNode(
				{

					width: _width,
					pid:id,
					height: _height,
					coordinate: [10,10],
					meta: {
						prop: 'condition',
						name: '开始节sas点'
					}
				}
			)

			const newLineList = []
			const nodeList =  this.$refs['superFlow'].getNodeList()
			this.$refs['superFlow'].initLink(newLineList)

			const a = getTree(nodeList,{id:''})


			const newNodeList = getArr(a)
			this.$refs['superFlow'].initNode(newNodeList)

			// graph.addNode({
			// 	width: _width,
			// 	height: _height,
			// 	coordinate: [
			// 		coordinate[0] + _width + 150,
			// 		coordinate[1]
			// 	],
			// 	meta: {
			// 		prop: 'start',
			// 		name: '开始节点'
			// 	}
			// })
		},
		enterIntercept(formNode, toNode,) {
			const formType = formNode.meta.prop
			switch (toNode.meta.prop) {
				case 'start':
					return false
				case 'approval':
					return [
						'start',
						'approval',
						'condition',
						'cc'
					].includes(formType)
				case 'condition':
					return [
						'start',
						'approval',
						'condition',
						'cc'
					].includes(formType)
				case 'end':
					return [
						'approval',
						'cc'
					].includes(formType)
				default:
					return true
			}
		},
		outputIntercept(node,) {
			return !(node.meta.prop === 'end')
		},
		linkDesc(link) {

			return link.meta ? link.meta.desc : ''
		}
	}
}
</script>

<style lang="scss">
.super-flow-base-demo {
    width            : 100%;
    height           : 800px;
    margin           : 0 auto;
    background-color : #f5f5f5;

    .super-flow__node {
        .flow-node__body{
            background-color : #edf1fc;
            overflow: hidden;
            border-radius: 15px;
            box-shadow: 1px 2px 8px rgba(0, 0, 0, .2);
            border: 1px solid rgb(180, 180, 180);
            width: 100%;
            height: 100%;
            position: relative;
            .btn_body{
                width: 100px;

                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                right: 0px;
                border-left: 1px solid rgb(180, 180, 180);;

            }
        }
        .flow-node {
            background-color: #ee805c;
            > header {
                font-size   : 14px;
                height      : 32px;
                line-height : 32px;
                padding     : 0 12px;
                color       : #ffffff;
            }

            > section {
                text-align  : center;
                line-height : 20px;
                overflow    : hidden;
                padding     : 6px 12px;
                word-break  : break-all;
            }

            &.flow-node-start {
                > header {
                    background-color : #55abfc;
                }
            }

            &.flow-node-condition {
                > header {
                    background-color : #BC1D16;
                }
            }

            &.flow-node-approval {
                > header {
                    background-color : rgba(188, 181, 58, 0.76);
                }
            }

            &.flow-node-cc {
                > header {
                    background-color : #30b95c;
                }
            }

            &.flow-node-end {
                > header {
                    height           : 50px;
                    line-height      : 50px;
                    background-color : rgb(0, 0, 0);
                }
            }
        }
    }
}
</style>
