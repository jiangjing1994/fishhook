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
  name: "Jtopo",
  components: {},
  data() {
    return {
      value: "",
      stage: null,
      layer: null,
      nodes: [],
      nodeList: [
        { label: "root", id: "0", pid: [], type: "root" },
        { label: "北京事业群1", id: "1", pid: ["0"], type: "child1", isShow: true },
        { label: "XXX事业群2", id: "2", pid: ["0"], type: "child1" },
        { label: "XXX事业群3", id: "3", pid: ["0"], type: "child1" },

        { label: "HCPL1", id: "21", pid: ["1", "2"], type: "child2" },
        { label: "HCPL2", id: "22", pid: ["1"], type: "child2" },
        { label: "HCPL3", id: "23", pid: ["1", "3"], type: "child2" },

        { label: "XX物理子系统1", id: "31", pid: ["21"], type: "child3" },
        { label: "XX物理子系统2", id: "32", pid: ["21"], type: "child3" },
        { label: "XX物理子系统3", id: "33", pid: ["21"], type: "child3" },
        { label: "XX物理子系统4", id: "34", pid: ["21"], type: "child3" },
        { label: "XX物理子系统5", id: "35", pid: ["21"], type: "child3" },
        { label: "XX物理子系统6", id: "36", pid: ["21"], type: "child3" },
        { label: "XX物理子系统7", id: "37", pid: ["21"], type: "child3" },
        { label: "XX物理子系统10", id: "40", pid: ["21"], type: "child3" },
        { label: "XX物理子系统11", id: "41", pid: ["21"], type: "child3" },
        { label: "XX物理子系统12", id: "42", pid: ["21"], type: "child3" },
        { label: "XX物理子系统13", id: "43", pid: ["21"], type: "child3" },
        { label: "XX物理子系统14", id: "44", pid: ["21", "23"], type: "child3" },
        // { label: "XX物理子系统15", id: "45", pid: ["21"] },
        // { label: "XX物理子系统16", id: "46", pid: ["21"] },
        // { label: "XX物理子系统17", id: "47", pid: ["21"] },
        // { label: "XX物理子系统18", id: "48", pid: ["21"] },
        // { label: "XX物理子系统19", id: "49", pid: ["21"] },
        // { label: "XX物理子系统20", id: "50", pid: ["21"] },
        // { label: "XX物理子系统21", id: "51", pid: ["21"] },
        // { label: "XX物理子系统22", id: "52", pid: ["21"] },
        // { label: "XX物理子系统23", id: "53", pid: ["21"] },
        // { label: "XX物理子系统24", id: "54", pid: ["21"] },
        // { label: "XX物理子系统25", id: "55", pid: ["21"] },
        // { label: "XX物理子系统26", id: "56", pid: ["21"] },
        // { label: "XX物理子系统27", id: "57", pid: ["21"] },
        // { label: "XX物理子系统28", id: "58", pid: ["21"] },
        // { label: "XX物理子系统29", id: "59", pid: ["21"] },
        // { label: "XX物理子系统30", id: "60", pid: ["21"] },

        { label: "XX部署单元1", id: "8", pid: ["31"], type: "child4" },
        { label: "XX部署单元2", id: "9", pid: ["31"], type: "child4" },
        { label: "XX部署单元3", id: "10", pid: ["31"], type: "child4" },
        { label: "XX部署单元4", id: "11", pid: ["31"], type: "child4" },
        { label: "XX服务器ip1", id: "12", pid: ["8"], type: "child4" },
        { label: "XX服务器ip2", id: "13", pid: ["8"], type: "child4" },
        { label: "XX服务器ip3", id: "14", pid: ["8"], type: "child4" },
        { label: "XX服务器ip4", id: "15", pid: ["8"], type: "child4" },
      ],
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
      // const jtopo = require('/examples/assets/js/jtopo-1.0.5_trial-min.umd');
      // Hello!
      // 欢迎学习jtopo，耐心看完这个简单的例子，后续其他所有例子的
      // 流程你基本上也都清楚了，很划算的！
      // 下面开始：

      // 频繁用到的对象名字先导入，减少打字数

      let jtopo = window.jtopo;
      let that = this;
      // 自定义节点: 重写Node对象的draw 方法即可.
      class MyNode extends jtopo.Node {
        constructor(text, x, y, w, h) {
          super(text, x, y, w, h);
        }

        /**
         * 绘制图形
         */
        draw(ctx) {
          // 填充个矩形
          console.log(ctx);

          ctx.beginPath();
          ctx.fillStyle = "#FFFFFF";

          ctx.rect(0, 0, this.width, 40);
          ctx.fill();

          // 鼠标拾取(固定模式，一般情况不需要修改)
          // 判断鼠标位置是否在上面填充的矩形内
          this.mousePickupPath(ctx);

          // 文本
          this.paintText(ctx);
        }
      }
      var TextNode = jtopo.TextNode;

      var Stage = jtopo.Stage;
      var Layer = jtopo.Layer;
      var CircleNode = jtopo.CircleNode;
      var Link = jtopo.CurveLink;
      var FlexionalLink = jtopo.FoldLink;
      var PolygonNode = jtopo.PolygonNode;

      var stage = new Stage("divId");
      var layer = new Layer();
      stage.addChild(layer);

      layer.setStyles({
        // shadowColor: "#E0E0E0",
        // shadowBlur: 7,
        // shadowOffsetX: 3,
        // shadowOffsetY: 3,
        // font: "bold 20px arial",
      });

      function addRootNode(text) {
        var node = new TextNode("", 0, 0, 40, 40);
        node.autoSize = true;

        node.setStyles({
          lineWidth: 0,
          strokeStyle: "#E1E1E1",
          fontColor: "black",
          fillStyle: jtopo.randomColor(),
        });
        layer.addChild(node);

        return node;
      }
      function addNode(text, userData) {
        let x = 0;
        let y = 0;
        var node = new TextNode(text + userData.id, x, y, 40, 40);

        // var node = new PolygonNode(text, x, y, 40, 40)
        //var node = new MyNode(text, x, y, 40, 40)
        node.autoSize = true;
        node.draggable = false;
        node.id = userData.id;
        node.edges = 6;
        node.setStyles({
          lineWidth: 1,
          strokeStyle: "#E1E1E1",
          fontColor: "black",
          fillStyle: jtopo.randomColor(),
          textAlign: "center",
          textBaseline: "middle",
          textPosition: "center",
          font: "bold 12px arial",
        });
        node.userData = userData;
        node.on("mousemove", function (event) {
          //console.log("mousemove");
        });

        // 鼠标按下和移开的时候隐藏漂浮框
        node.on("mouseout", function (event) {
          //console.log("mouseout");
        });

        node.on("mousedown", function (event) {
          // console.log("mousedown", event);
        });

        // 鼠标点击
        node.on("click", function (event) {
          // node.text = node.text
          that.value = node.text;
          // node.removeAllChild();

          console.log("click", node);
        });

        layer.addChild(node);

        return node;
      }

      function addLink(nodeA, nodeZ) {
        var link = new Link("", nodeA, nodeZ, "rm", "lm");
        link.setStyles("strokeStyle", nodeA.getStyle("fillStyle"));
        link.setStyles("lineWidth", 1);
        link.setStyles("text", "ass");
        //link.setStyles('strokeStyle', 'gray');
        layer.addChild(link);
        return link;
      }
      function addLink2(nodeA, nodeZ) {
        var link = new Link("", nodeA, nodeZ, "edge", "edge");
        link.setStyles("strokeStyle", nodeA.getStyle("fillStyle"));
        link.setStyles("lineWidth", 0);
        link.setStyles("strokeStyle", "#fff");
        layer.addChild(link);
        return link;
      }

      // gen(rootNode, 1, 3)
      // var root = addRootNode('root', 0, 0)
      // var rootNode1 = addNode('北京事业群1', 0, 0)

      // var rootNode2 = addNode('XXX事业群2', 0, 0)
      // var rootNode3 = addNode('XXX事业群3', 0, 0)
      // var child1 = addNode('XX物理子系统1', 0, 0)
      // var child2 = addNode('XX物理子系统2', 0, 0)
      // var child3 = addNode('XX物理子系统3', 0, 0)
      // var child4 = addNode('XX物理子系统4', 0, 0)
      // var childchild1 = addNode('XX部署单元1', 0, 0)
      // var childchild2 = addNode('XX部署单元2', 0, 0)
      // var childchild3 = addNode('XX部署单元3', 0, 0)
      // var childchild4 = addNode('XX部署单元4', 0, 0)
      // var childchildchild1 = addNode('XX服务器ip1', 0, 0)
      // var childchildchild2 = addNode('XX服务器ip2', 0, 0)
      // var childchildchild3 = addNode('XX服务器ip3', 0, 0)
      // var childchildchild4 = addNode('XX服务器ip4', 0, 0)
      // addLink2(root, rootNode1)
      // addLink2(root, rootNode2)
      // addLink2(root, rootNode3)

      // addLink(rootNode2, child1)
      // addLink(rootNode1, child1)
      // addLink(rootNode1, child2)
      // addLink(rootNode1, child3)
      // addLink(rootNode3, child4)
      // addLink(child3, childchild1)
      // addLink(child3, childchild2)
      // addLink(child3, childchild3)
      // addLink(child3, childchild4)
      // addLink(child2, childchild1)
      // addLink(child4, childchild3)

      // addLink(childchild1, childchildchild1)
      // addLink(childchild1, childchildchild2)
      // addLink(childchild1, childchildchild3)
      // addLink(childchild1, childchildchild4)

      const nodesList = this.nodeList;

      function genNodes(nodesList) {
        const nodes = {};
        nodesList.forEach((item) => {
          let node = "";
          if (item.id === "0") {
            node = addRootNode("root", 0, 0);
          } else {
            node = addNode(item.label, item);
          }
          nodes[item.id] = node;
        });
        return nodes;
      }
      const nodes = genNodes(nodesList);
      function genLinks(nodesList) {
        nodesList.forEach((item) => {
          const pid = item.pid;
          if (pid && pid instanceof Array && pid.length > 0) {
            pid.forEach((pidItem) => {
              console.log("pidItem");
              console.log(nodes[pidItem]);
              if (pidItem === "0") {
                addLink2(nodes[pidItem], nodes[item.id]);
              } else {
                addLink(nodes[pidItem], nodes[item.id]);
              }
            });
          }
        });
      }
      genLinks(nodesList);
      // 方向: up、down、left、right
      // 左右间隔量 40， 上下间隔量 80
      var treeLayout = new jtopo.TreeLayout("right", 20, 160);
      treeLayout.doLayout(layer.children);
      // 不显示工具栏(当前版本工具栏样式未打包进去)
      stage.hideToolbar();
      stage.hideOverview();
      stage.translateToCenter();
      stage.show();
      layer.translateWith(-200, 0);
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
