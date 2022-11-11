<template>
  <div class="hello">
    <input v-model="value" />
    <button @click="filter">过滤</button>
    <button @click="deleteLines">删除</button>
    <div class="container">
      <div class="container-column column1">
        <div
          v-for="item in nodes1"
          :id="item.id"
          :key="item.id"
          class="node column1-node"
          :class="{ 'node-selected': item.selected }"
          @click="handleNode(item)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="container-column column2">
        <div
          v-for="item in nodes2"
          :id="item.id"
          :key="item.id"
          class="node column1-node"
          :class="{ 'node-selected': item.selected }"
          @click="handleNode(item)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="container-column column3">
        <div
          v-for="item in nodes3"
          :id="item.id"
          :key="item.id"
          class="node column1-node"
          :class="{ 'node-selected': item.selected }"
          @click="handleNode(item)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="container-column column4">
        <div
          v-for="item in nodes4"
          :id="item.id"
          :key="item.id"
          class="node column1-node"
          :class="{ 'node-selected': item.selected }"
          @click="handleNode(item)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="container-column column5">
        <div
          v-for="item in nodes5"
          :id="item.id"
          :key="item.id"
          class="node column1-node"
          :class="{ 'node-selected': item.selected }"
          @click="handleNode(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>

    <!-- <div id="relation-box">
      <div
        class="node"
        v-for="item in nodeList"
        :key="item.id"
        :style="{ left: item.left, top: item.top }"
        :id="'node-' + item.id"
      >
        {{ item.name }}
        <div>detail...</div>
      </div>
    </div> -->
  </div>
</template>
<script>
import { jsPlumb } from "jsplumb";
import * as D3 from "d3";
export default {
  name: "JsPlumb",
  data() {
    return {
      value: "",
      nodes: [],
      selectdIds: [],
      filterIds: [],
      nodes1: [
        { name: "北京事业群1", id: "1", pid: ["0"], type: "child1" },
        { name: "XXX事业群2", id: "2", pid: ["0"], type: "child1" },
        { name: "XXX事业群3", id: "3", pid: ["0"], type: "child1" },
      ],
      nodes2: [
        { name: "HCPL1", id: "21", pid: ["1", "2"], type: "child2" },
        { name: "HCPL2", id: "22", pid: ["1"], type: "child2" },
        { name: "HCPL3", id: "23", pid: ["1", "3"], type: "child2" },
        { name: "HCPL3", id: "24", pid: ["1"], type: "child2" },
      ],
      nodes3: [
        { name: "XX物理子系统1", id: "31", pid: ["21"], type: "child3" },
        { name: "XX物理子系统2", id: "32", pid: ["21"], type: "child3" },
        { name: "XX物理子系统4", id: "34", pid: ["21"], type: "child3" },
        { name: "XX物理子系统5", id: "35", pid: ["21"], type: "child3" },
        { name: "XX物理子系统6", id: "36", pid: ["21"], type: "child3" },
        { name: "XX物理子系统7", id: "37", pid: ["21"], type: "child3" },
        { name: "XX物理子系统10", id: "40", pid: ["21"], type: "child3" },
        { name: "XX物理子系统11", id: "41", pid: ["21"], type: "child3" },
        { name: "XX物理子系统12", id: "42", pid: ["21"], type: "child3" },
        { name: "XX物理子系统13", id: "43", pid: ["21"], type: "child3" },
        { name: "XX物理子系统14", id: "44", pid: ["21", "23"], type: "child3" },
        { name: "XX物理子系统15", id: "45", pid: ["23"], type: "child3" },
        { name: "XX物理子系统16", id: "46", pid: ["24"], type: "child3" },
      ],
      nodes4: [
        { name: "XX部署单元1", id: "8", pid: ["31"], type: "child4" },
        { name: "XX部署单元2", id: "9", pid: ["31"], type: "child4" },
        { name: "XX部署单元3", id: "10", pid: ["31"], type: "child4" },
        { name: "XX部署单元4", id: "11", pid: ["31"], type: "child4" },
        { name: "XX部署单元5", id: "52", pid: ["46"], type: "child4" },
      ],
      nodes5: [
        { name: "XX服务器ip1", id: "12", pid: ["8"], type: "child4" },
        { name: "XX服务器ip2", id: "13", pid: ["8"], type: "child4" },
        { name: "XX服务器ip3", id: "14", pid: ["8"], type: "child4" },
        { name: "XX服务器ip7", id: "15", pid: ["8"], type: "child4" },
        { name: "XX服务器ip6", id: "16", pid: ["8"], type: "child4" },
        { name: "XX服务器ip5", id: "17", pid: ["8"], type: "child4" },
        { name: "XX服务器ip99", id: "18", pid: ["52"], type: "child4" },
      ],
      jsPlumbInstance: "", //jsPlumb实例
      // jsPlumb默认配置
      jsPlumbSetting: {
        // 动态锚点、位置自适应
        Anchors: [
          "Top",
          "TopCenter",
          "TopRight",
          "TopLeft",
          "Right",
          "RightMiddle",
          "Bottom",
          "BottomCenter",
          "BottomRight",
          "BottomLeft",
          "Left",
          "LeftMiddle",
        ],
        // 连线的样式 StateMachine、Flowchart，Bezier、Straight
        Connector: ["Bezier", { curviness: 60 }],
        // 鼠标是否拖动删除线
        ConnectionsDetachable: false,
        // 删除线的时候节点不删除
        DeleteEndpointsOnDetach: false,
        // 连线的两端端点类型：矩形 Rectangle；圆形Dot； eight: 矩形的高 ，idth: 矩形的宽
        Endpoints: [
          ["Dot", { radius: 2 }],
          ["Dot", { radius: 2 }],
        ],
        // 线端点的样式
        EndpointStyle: { fill: "skyblue", outlineWidth: 1 },
        // 绘制连线
        PaintStyle: {
          stroke: "#000000",
          strokeWidth: 1,
          outlineStroke: "transparent",
          // 设定线外边的宽，单位px
          outlineWidth: 10,
        },
        // 绘制连线箭头
        Overlays: [
          // 箭头叠加
          [
            "Arrow",
            {
              width: 1, // 箭头尾部的宽度
              length: 1, // 从箭头的尾部到头部的距离
              location: 0.5, // 位置，建议使用0～1之间
              direction: 1, // 方向，默认值为1（表示向前），可选-1（表示向后）
              foldback: 0.623, // 折回，也就是尾翼的角度，默认0.623，当为1时，为正三角
            },
          ],
        ],
        // 绘制图的模式 svg、canvas
        RenderMode: "svg",
        DragOptions: { cursor: "pointer", zIndex: 2000 },
        // 鼠标滑过线的样式
        HoverPaintStyle: { stroke: "skyblue", strokeWidth: 3, cursor: "pointer" },
      },
      // 连线的配置
      jsPlumbConnectOptions: {
        isSource: true,
        isTarget: true,
        // 动态锚点、提供了4个方向 Continuous、AutoDefault
        anchor: "Continuous",
        connectorStyle: { stroke: "red", strokeWidth: "2", dashstyle: "0" },
        connectorHoverStyle: { stroke: "red" },
        //overlays: [["Arrow", { width: 8, length: 8, location: 1 }]], // overlay
      },
      commonLink: {
        isSource: true,
        isTarget: true,
        anchor: ["Perimeter", { shape: "Circle" }],
        connector: ["Bezier"],
        endpoint: "Dot",
        // 不限制节点的连线数量
        maxConnections: 1,
      },
      dataList: {
        id: 1,
        name: "中国",
        children: [
          {
            id: 2,
            name: "北京",
            children: [
              {
                id: 6,
                name: "海淀区",
              },
              {
                id: 7,
                name: "高新区",
              },
            ],
          },
          {
            id: 3,
            name: "贵州",
            children: [
              {
                id: 4,
                name: "贵阳",
              },
              {
                id: 5,
                name: "黔西南",
              },
              { id: 8, name: "黔东南" },
              { id: 18, name: "黔东南" },
              { id: 28, name: "黔东南" },
              { id: 38, name: "黔东南" },
              { id: 48, name: "黔东南" },
              { id: 58, name: "黔东南" },
              { id: 68, name: "黔东南" },
              {
                id: 7,
                name: "高新区",
              },
            ],
          },
        ],
      },
      nodeList: [],
      lineList: [],
    };
  },
  mounted() {
    this.setNodeInfo(this.dataList);
    this.drawLines();
  },
  destroyed() {
    this.deleteLines();
  },

  methods: {
    handleNode(node) {
      console.log(node);
      this.value = node.name;
      this.deleteLines();
      this.filter(node.id);
    },
    //过滤
    filter() {
      const value = this.value;
      let nodeList = this.nodes;

      const filterNodes = nodeList.filter((item) => {
        return item.name.indexOf(value) > -1;
      });

      // 初始关联id

      const filterIds = filterNodes.map((item) => {
        return item.id;
      });

      this.filterIds = filterIds;

      // 根据id获取所有父级id
      const getParentIds = (id) => {
        const parentIds = [];
        const getParent = (id) => {
          const node = nodeList.find((item) => item.id === id);
          if (node) {
            if (node.pid) {
              node.pid.forEach((item) => {
                parentIds.push(item);
                getParent(item);
              });
            }
          }
        };
        getParent(id);

        return parentIds;
      };

      //去重
      const unique = (arr) => {
        return Array.from(new Set(arr));
      };

      const selectdIds = unique(
        filterIds.reduce((prev, cur) => {
          return prev.concat(getParentIds(cur));
        }, [])
      );

      this.selectdIds = selectdIds;

      // 修改selected
      this.nodes1.forEach((item) => {
        if (selectdIds.indexOf(item.id) > -1) {
          item.selected = true;
        } else {
          item.selected = false;
        }
      });
      this.nodes2.forEach((item) => {
        if (selectdIds.indexOf(item.id) > -1) {
          item.selected = true;
        } else {
          item.selected = false;
        }
      });
      this.nodes3.forEach((item) => {
        if (selectdIds.indexOf(item.id) > -1) {
          item.selected = true;
        } else {
          item.selected = false;
        }
      });
      this.nodes4.forEach((item) => {
        if (selectdIds.indexOf(item.id) > -1) {
          item.selected = true;
        } else {
          item.selected = false;
        }
      });
      this.nodes5.forEach((item) => {
        if (selectdIds.indexOf(item.id) > -1) {
          item.selected = true;
        } else {
          item.selected = false;
        }
      });
      filterNodes.forEach((item) => {
        item.selected = true;
      });

      this.drawLines();
      console.log("filterIds", filterIds);
      console.log("selectdIds", selectdIds);
    },
    setNodeInfo(tree) {
      // 参考D3API,这里会生成树形数据结构
      const data = D3.hierarchy(tree);
      // 使用D3 Tree自动布局, nodeSize控制节点x方向和y方向上的距离
      const treeGenerator = D3.tree().nodeSize([100, 90]);
      const treeData = treeGenerator(data);
      // 获取自动布局后的节点信息
      const nodes = treeData.descendants();
      // 获取父子关系列表
      const links = treeData.links();
      // 设置节点位置信息
      this.nodeList = nodes.map((item) => {
        return {
          id: item.data.id,
          name: item.data.name,
          left: item.x + 700 + "px", // 900为初始X方向起点位置，默认为0
          top: item.y + "px",
        };
      });

      this.lineList = links.map((item) => {
        return {
          source: `node-${item.source.data.id}`,
          target: `node-${item.target.data.id}`,
          overlays: [["Arrow", { width: 10, length: 10, location: 0.5 }]],
        };
      });
    },
    deleteLines() {
      this.jsPlumbInstance.deleteEveryConnection();
      //删除全部连接线
      this.jsPlumbInstance.deleteEveryEndpoint();
    },
    drawLines() {
      this.$nextTick().then(() => {
        jsPlumb.ready(() => {
          // 创建jsPlumb实例
          this.jsPlumbInstance = jsPlumb.getInstance();
          // 导入准备好的jsPlumb配置
          this.jsPlumbInstance.importDefaults(this.jsPlumbSetting);
          // 开始节点间的连线

          const nodes = [
            ...this.nodes1,
            ...this.nodes2,
            ...this.nodes3,
            ...this.nodes4,
            ...this.nodes5,
          ];

          this.nodes = nodes;

          let lines = [];

          nodes.forEach((item) => {
            const { id, pid } = item;
            if (pid && pid instanceof Array) {
              pid.forEach((pidItem) => {
                let stroke = "lightgray";

                const selectdIds = [...this.selectdIds, ...this.filterIds];
                if (selectdIds.indexOf(id) > -1 && selectdIds.indexOf(pidItem) > -1) {
                  stroke = "blue";
                }
                lines.push({
                  target: `${id}`,
                  source: `${pidItem}`,
                  maxConnections: 1,
                  paintStyle: { stroke, strokeWidth: 1 },
                });
              });
            }
          });

          lines.forEach((item) => {
            this.jsPlumbInstance.connect(item, this.jsPlumbConnectOptions);
          });

          // 让每个节点都可以被拖拽
          // nodes.forEach((item, index) => {
          //   this.jsPlumbInstance.draggable(item.id);
          // });
          // 给每个节点添加锚点
          //   this.jsPlumbInstance.addEndpoint(
          //     "node-" + (index + 1),
          //     {
          //       anchor: ["Bottom", "Top", "Left", "Right"],
          //       Overlays: [
          //         [
          //           "Arrow",
          //           { width: 10, length: 8, location: 1, direction: 1, foldback: 0.623 },
          //         ],
          //       ],
          //     },
          //     this.commonLink
          //   );
        });
        // this.jsPlumbInstance.repaintEverything(); // 重绘
      });
    },
  },
};
</script>
<style scoped lang="scss">
.container {
  display: flex;
  height: 700px;
  .container-column {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    .node-selected {
      color: blue;
      border: 2px solid blue;
    }
  }
  .column1 {
    width: 230px;
    //background: red;
  }
  .column2 {
    width: 240px;
    //background: yellow;
  }
  .column3 {
    width: 240px;
    //background: green;
  }
  .column4 {
    width: 240px;
    //background: blue;
  }
  .column5 {
    width: 240px;
    // background: pink;
  }
}
#relation-box {
  position: relative;
}

.node {
  padding: 6px;
  border: 2px solid #ccc;
  border-radius: 10px;
  text-align: center;
  // background-color: #f6f6f6;
  width: 160px;
  margin: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: #f6f6f6;
  }
}
</style>
