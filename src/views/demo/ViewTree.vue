<template>
  <div style="text-align: left">
    <KemViewTree :data="data3" :load-data="loadData" :render="renderContent" class="demo-tree-render"></KemViewTree>

  </div>
</template>
<script>


export default {
  name:'ViewTree',
  data () {
    const parentRender = (h, {   data }) => {
      return h('span', {
        style: {
          display: 'inline-block',
          width: '100%'
        }
      }, [
        h('span', [
          h('KemViewIcon', {
            props: {
              type: 'ios-folder-outline'
            },
            style: {
              marginRight: '8px'
            }
          }),
          h('span', data.title)
        ]),
        h('span', {
          style: {
            display: 'inline-block',
            float: 'right',
            marginRight: '32px'
          }
        }, [
          h('KemButton', {
            props: Object.assign({}, this.buttonProps, {
              type: 'icon.add'
            }),
            style: {
              width: '64px'
            },
            on: {
              click: () => { this.append(data) }
            }
          })
        ])
      ]);
    }
    return {
      data3: [
        {
          title: 'parent',
          loading: false,
          children: [],

        }
      ],

      data5: [
        {
          title: 'parent 1',
          expand: true,
          render:parentRender,
          children: [
            {
              title: 'child 1-1',
              expand: true,
              children: [
                {
                  title: 'leaf 1-1-1',
                  expand: true
                },
                {
                  title: 'leaf 1-1-2',
                  expand: true
                }
              ]
            },
            {
              title: 'child 1-2',
              expand: true,
              children: [
                {
                  title: 'leaf 1-2-1',
                  expand: true
                },
                {
                  title: 'leaf 1-2-1',
                  expand: true
                }
              ]
            }
          ]
        }
      ],
      buttonProps: {
        type: 'icon.add',
        size: 'small',

      }
    }
  },
  methods: {
    loadData (item, callback) {
      setTimeout(() => {
        const data = [
          {
            title: 'children',
            loading: false,
            children: []
          },
          {
            title: 'children',
            loading: false,
            children: []
          }
        ];
        callback(data);
      }, 1000);
    },

    renderContent(h, { root, node, data }) {
      const parentRender = () => {
        return h('span', {
          style: {
            display: 'inline-block',
            width: '100%'
          }
        }, [
          h('span', [
            h('KemViewIcon', {
              props: {
                type: 'ios-folder-outline'
              },
              style: {
                marginRight: '8px'
              }
            }),
            h('span', data.title)
          ]),
          h('span', {
            style: {
              display: 'inline-block',
              float: 'right',
              marginRight: '32px'
            }
          }, [
            h('KemButton', {
              props: Object.assign({}, this.buttonProps, {
                type: 'icon.add'
              }),
              style: {
                width: '64px'
              },
              on: {
                click: () => { this.append(data) }
              }
            })
          ])
        ]);
      }
      const nodeRender = () => {
        return h('span', {
          style: {
            display: 'inline-block',
            width: '100%'
          }
        }, [
          h('span', [
            h('KemViewIcon', {
              props: {
                type: 'ios-paper-outline'
              },
              style: {
                marginRight: '8px'
              }
            }),
            h('span', data.title)
          ]),
          h('span', {
            style: {
              display: 'inline-block',
              float: 'right',
              marginRight: '32px'
            }
          }, [
            h('KemButton', {
              props: Object.assign({}, this.buttonProps, {
                icon: 'ios-add'
              }),
              style: {
                marginRight: '8px'
              },
              on: {
                click: () => { this.append(data) }
              }
            }),
            h('KemButton', {
              props: Object.assign({}, this.buttonProps, {
                icon: 'ios-remove',
                type: 'icon.del'

              }),
              on: {
                click: () => { this.remove(root, node, data) }
              }
            })
          ])
        ]);
      }

      // eslint-disable-next-line no-constant-condition
      if (true){
        return parentRender()
      }else {
        return nodeRender()
      }

    },
    append (data) {
      const children = data.children || [];
      children.push({
        title: 'appended node',
        expand: true
      });
      this.$set(data, 'children', children);
    },
    remove (root, node, data) {
      const parentKey = root.find(el => el === node).parent;
      const parent = root.find(el => el.nodeKey === parentKey).node;
      const index = parent.children.indexOf(data);
      parent.children.splice(index, 1);
    }
  }
}
</script>
<style>
.demo-tree-render .ivu-tree-title{
  width: 100%;

}
</style>
