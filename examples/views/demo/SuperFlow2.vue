<template>
  <div class="super-flow-base-demo2">
    <kem-super-flow ref="superFlow" :node-list="nodeList" :link-list="linkList" :origin="origin">
      <template v-slot:node="{ node }">
        <div class="flow-node__body"></div>
      </template>
    </kem-super-flow>
    <pre style="text-align: left">{{ nodeList }}</pre>
  </div>
</template>

<script>
export default {
  name: 'SuperFlow2',
  data() {
    return {
      origin: [20, 20],
      nodeList: [],
      linkList: [],
    }
  },
  created() {
    const tree = [
      {
        label: 'root-1',
        children: [
          {
            label: 'a-1',
            children: [
              {
                label: 'b-1',
              },
              {
                label: 'b-2',
              },
              {
                label: 'b-3',
              },
            ],
          },
          {
            label: 'a-2',
            children: [
              {
                label: 'b-4',
              },
              {
                label: 'b-5',
              },
            ],
          },
        ],
      },
    ]

    const nodeList = [
      {
        id: 'nodeS3WgFnzCI15X58Qw',
        width: 200,
        height: 70,
        coordinate: [0, 0],
        meta: {
          prop: 'condition',
          name: '开始节点ss',
        },
      },
      {
        id: 'nodefHsy9uJObPtdHZv1',
        width: 200,
        height: 70,
        coordinate: [300, 300],
        meta: {
          prop: 'approval',
          name: '审批节点',
          desc: '111111',
        },
      },
    ]
    const linkList = [
      {
        id: 'linkcs9ZhumWeTHrtUy8',
        startId: 'nodeS3WgFnzCI15X58Qw',
        endId: 'nodefHsy9uJObPtdHZv1',
        startAt: [1, 1],
        endAt: [0, 40],
        meta: {
          desc: 'sasas',
        },
      },
      {
        id: 'linkBDld5rDBw4C6kiva',
        startId: 'nodefHsy9uJObPtdHZv1',
        endId: 'nodeqkK9zjcDz53xKRlK',
        startAt: [160, 40],
        endAt: [0, 40],
        meta: null,
      },
      {
        id: 'linkA0ZZxRlDI9AOonuq',
        startId: 'node7WXbwOR6kSFD53Hf',
        endId: 'nodefHsy9uJObPtdHZv1',
        startAt: [160, 40],
        endAt: [0, 40],
        meta: null,
      },
      {
        id: 'linkhCKTpRAf89gcujGS',
        startId: 'nodeni9QOqT3mI7hsMau',
        endId: 'nodeZBK0ZPpgMe1exezE',
        startAt: [160, 40],
        endAt: [0, 40],
        meta: null,
      },
      {
        id: 'link2o7VZ7DRaSFKtB0g',
        startId: 'nodeqkK9zjcDz53xKRlK',
        endId: 'nodeDhVU6w2KbEnJCjZs',
        startAt: [160, 40],
        endAt: [0, 25],
        meta: null,
      },
      {
        id: 'linkII013ovDctUDuPLu',
        startId: 'nodeS3WgFnzCI15X58Qw',
        endId: 'nodeG3WeFnzCI15X58Qw',
        startAt: [100, 40],
        endAt: [0, 40],
        meta: null,
      },
      {
        id: 'link6MOmsq1EqzlWcG1n',
        startId: 'nodeZBK0ZPpgMe1exezE',
        endId: 'nodeqkK9zjcDz53xKRlK',
        startAt: [160, 40],
        endAt: [0, 40],
        meta: null,
      },
      {
        id: 'link52SczSXHmuyKDzRU',
        startId: 'nodesyxisLH1hJDdPsxx',
        endId: 'nodeDhVU6w2KbEnJCjZs',
        startAt: [160, 40],
        endAt: [0, 25],
        meta: null,
      },
      {
        id: 'link2hBQDTuIG4ZFYyE0',
        startId: 'node0aiA9VuhjkiAdZCs',
        endId: 'nodesyxisLH1hJDdPsxx',
        startAt: [160, 40],
        endAt: [0, 40],
        meta: null,
      },
      {
        id: 'linkrwdW87FmOma5rPVo',
        startId: 'nodeG3WeFnzCI15X58Qw',
        endId: 'node0aiA9VuhjkiAdZCs',
        startAt: [160, 40],
        endAt: [0, 40],
        meta: null,
      },
      {
        id: 'linknL75dQV0AWZA85sq',
        startId: 'nodeS3WgFnzCI15X58Qw',
        endId: 'node7WXbwOR6kSFD53Hf',
        startAt: [100, 40],
        endAt: [0, 40],
        meta: null,
      },
    ]

    setTimeout(() => {
      this.nodeList = nodeList
      this.linkList = linkList
    }, 100)
  },
  methods: {},
}
</script>

<style lang="scss">
.super-flow-base-demo2 {
  width: 100%;
  height: 800px;
  margin: 0 auto;
  background-color: #f5f5f5;
  .flow-node__body {
    width: 100%;
    height: 100%;
    background-color: red;
  }
}
</style>
