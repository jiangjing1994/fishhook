<template>
  <div class="topo_content">
    <div id="divId" style="height: 100%; width: 100%"></div>
    <input v-model="value" />
    <div
      class="aat"
      style="
        border: 1px solid #000;
        width: 100px;
        height: 100px;
        margin-top: 20px;
        overflow: auto;
      "
    ></div>

    <!-- <button @click="filter">过滤</button> -->
  </div>
</template>
<script>
//获取标题高度
export default {
  name: "InfoFlow",
  components: {},
  data() {
    return {
      value: "",
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let jtopo = window.jtopo;
      let that = this;
      let Stage = jtopo.Stage;
      let Layer = jtopo.Layer;
      let Node = jtopo.Node;
      let CircleNode = jtopo.CircleNode;
      let Link = jtopo.Link;
      let BezierLink = jtopo.BezierLink;
      let FoldLink = jtopo.FoldLink;
      let FlexionalLink = jtopo.FlexionalLink;

      let stage = new Stage("divId");
      let layer = new Layer();

      stage.addChild(layer);
      layer.draggable = false;

      // 全局样式
      layer.setStyles({
        shadowColor: "#E1E1E1",
        shadowBlur: 5,
        shadowOffsetX: 3,
        shadowOffsetY: 3,
        lineWidth: 8,
        strokeStyle: "#E1E1E1",
        font: "bold 11px arial",
      });

      let nodes = [];
      let links = [];

      function addNode(text, beforeNode, y) {
        console.log("addNode", text, beforeNode.width, y);
        let node = new Node(text, beforeNode.x + beforeNode.width + 60, y, 100, 40);

        //node.setRadius(14);
        const textWidth = 12 * text.length + 20;
        const width = textWidth > 100 ? textWidth : 100;
        node.resizeTo(width, 50);
        node.draggable = false;
        node.setStyles({
          // fillStyle: "#fff",
          fontColor: "#000",
          lineWidth: 2,
          strokeStyle: "73,184,125",
          font: "bold 11px arial",
          textPosition: "center",
          textAlign: "center",
          textBaseline: "middle",
        });
        node.autoSize = true;
        // node.rotateTo(0.2);
        // 圆角半径
        node.roundRadius = 15;
        nodes.push(node);

        let n = 0;
        node.on("mouseenter", function () {
          this.text = "over times:" + n++;
        });
        node.on("mouseout", function () {
          this.text = text;
        });
        return node;
      }

      function addHtmlNode(userData, x, y) {
        let node = new Node("", x, y, 80, 40);
        console.log("node.style");
        console.log(node.getUserData());

        // 创建一个Html作为图片对象
        let htmlImage = new jtopo.HtmlImage(
          `<div xmlns="http://www.w3.org/1999/xhtml" style="height:100%;box-sizing: border-box;background-color:#fff; border: 2px solid #000; border-radius: 5px;">
            ${node.userData}

          <div>`,
          node.width,
          node.height
        );
        //顶层div的 xmlns 属性必须指定
        //支持的html特性有限，需要开发时做测试验证

        // 使用html类型的图片对象
        // node.setImage(htmlImage, true);
        node.userData = userData;
        node.autoSize = true;
        // node.draggable = false;
        //layer.addChild(node);
        nodes.push(node);

        return node;
      }

      function addLink(nodeA, nodeZ, text) {
        let link = new Link(text, nodeA, nodeZ, "rm", "lm");
        link.toArrowSize = 8;
        link.setStyles({
          strokeStyle: "73,184,125",
          lineWidth: 2,
        });
        links.push(link);
        return link;
      }

      // let rootNode = addNode("接入", 200, 225);
      let rootNode = addNode("北京事业群", 200, 0);
      let rootNode2 = addNode("武汉事业群", 200, 150);

      const createFlow = (data, node) => {
        const rootNode = node;
        data.forEach((item) => {
          const { name } = item;
          const newNode = addNode(name, node, rootNode.y);
          addLink(node, newNode);
          node = newNode;
        });
      };
      const data = [
        { name: "北京事业群" },
        { name: "XX代码工程-关联流水线" },
        { name: "编译流水线" },
        { name: "制品入库镜像/二进制" },
        { name: "部署" },
        { name: "部署成功" },
      ];

      createFlow(data, rootNode);
      createFlow(data, rootNode2);
      // let fwNode = addNode("XX代码工程-关联流水线", rootNode, 150);
      // addLink(rootNode, fwNode);

      // let cloudNode = addNode("编译流水线", fwNode, 150);
      // addLink(fwNode, cloudNode);

      // let fw2Node = addNode("制品入库镜像/二进制", cloudNode, 150);
      // addLink(cloudNode, fw2Node);

      // let bsNode = addNode("部署", fw2Node, 150);
      // addLink(fw2Node, bsNode);

      // let fw3Node = addNode("部署成功", bsNode, 150);
      // addLink(bsNode, fw3Node);

      layer.addChilds(links);
      layer.addChilds(nodes);
      layer.translateTo(50, 50);
      stage.show();
      stage.hideToolbar();

      // Animation
      layer.frames = 60;
      let beginNode = layer.findFirst("text", "北京事业群");
      let offset = 0;

      // 遍历链路
      let objects = jtopo.Layout.travel(beginNode);

      // function flow(objects, n) {
      //   if (n == objects.length) return;
      //   let obj = objects[n];

      //   obj.setStyles({
      //     lineWidth: 2,
      //     strokeStyle: "red",
      //   });

      //   console.log(obj);

      //   let offset = 0;

      //   setTimeout(function () {
      //     flow(objects, n + 1);
      //   }, 0);
      // }

      //flow(objects, 0);
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
.aat {
  border-radius: 5px;
  box-sizing: border-box;
}
</style>
