<template>
  <div class="topo_content">
    <div id="divId" style="height: 100%; width: 100%"></div>
    <input v-model="value" />
    <button @click="filter">过滤</button>
  </div>
</template>
<script>
//获取标题高度
export default {
  name: "Jtopo2",
  components: {},
  data() {
    return {
      value: "",
      stage: null,
      layer: null,
      nodes: [],
      nodeList: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    //过滤
    filter() {
      const value = this.value;
      let nodeList = this.nodeList;

      const nodes = nodeList.filter((item) => {
        return item.label.indexOf(value) > -1;
      });

      // 已经展开的节点
      const openNodes = [];
      nodes.forEach((item) => {
        const id = item.id;
        nodeList.forEach((node) => {
          if (node.pid.indexOf(id) > -1) {
            openNodes.push(node);
          }
        });
      });
      console.log(openNodes);
    },
    init() {
      let jtopo = window.jtopo;
      var Layer = jtopo.Layer;
      var Node = jtopo.Node;
      var CircleNode = jtopo.CircleNode;
      var FoldLink = jtopo.FoldLink;
      var GridLayout = jtopo.GridLayout;
      var stage = new jtopo.Stage("divId");
      var layer = new Layer("default");
      stage.addChild(layer);

      // 全局样式
      layer.style.setStyles({
        lineWidth: 2,
        font: "12px arial",
        strokeStyle: "red",
      });

      // jtopo拥有强大的组合能力，每个Node都可以作为容器使用
      // 容器内的左上角，相对于子元素来说就是原点（0，0）

      let containers = [];
      // 创建容器
      const createContainer = (label, style) => {
        const containerWidth = 250;
        const containerHeight = 700;
        const order = containers.length;
        var container = new Node(
          label,
          order * (containerWidth + 100),
          0,
          containerWidth,
          containerHeight
        );
        container.setStyles({
          lineWidth: 12,
          // fillStyle: jtopo.randomColor(),
          ...style,
        });
        // container.draggable = false;
        layer.addChild(container);
        containers.push(container);
        return container;
      };

      const container1 = createContainer("最底层");
      const container2 = createContainer("最底层1");
      const container3 = createContainer("最底层1");
      const container4 = createContainer("最底层1");
      const container5 = createContainer("最底层1");

      const createNode = (container, label, style) => {
        const nodeWidth = 120;
        const nodeHeight = 40;
        const x = 50;
        const order = container.children.length;
        const y = order * nodeHeight + 50;
        const node = new Node(label, x, y, nodeWidth, nodeHeight);
        node.setStyles({
          fontColor: "#000",
          lineWidth: 2,
          strokeStyle: "#000",
          font: "bold 11px arial",
          textPosition: "center",
          textAlign: "center",
          textBaseline: "middle",
        });
        node.roundRadius = 18;
        container.addChild(node);
        return node;
      };

      const node1 = createNode(container1, "node1");
      const node2 = createNode(container1, "node2");
      const node3 = createNode(container1, "node2");
      const node4 = createNode(container1, "node2");

      // 网格式布局，n行1列
      // var gridLayout = new GridLayout(container1.children.length, 1);

      // 节点水平和垂直的间距为 5, 15
      //gridLayout.doLayout(container1.children, 20, 20);
      node1.zIndex = 2;
      //layer.translateTo(50, 50);
      stage.show();
      stage.hideToolbar();
      stage.show();
    },
  },
};
</script>

<style scoped>
.topo_content {
  height: 700px;
  width: 100%;
  border: 1px solid #ccc;
}
</style>
