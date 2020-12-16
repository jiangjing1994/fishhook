<template>
  <div>
    <KemTimeline :activities="activities" :reverse="false" />
  </div>
</template>

<script lang="jsx">

export default {
  name: "Timeline",
  data() {
    return {
      activities: [{
        content: '支持使用render',
        timestamp: '2018-04-12 20:46',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more',
        renderDot:()=>{
          return (
                   <span>w</span>
          )
        },
        render:(h,{activity})=>{
          return (
                  <el-card>
                    <h4>{activity.content} </h4>
                    <p>{activity.size} 提交于 {activity.timestamp} </p>
                  </el-card>
          )
        }
      }, {
        content: '支持自定义颜色',
        timestamp: '2018-04-03 20:46',
        color: '#0bbd87'
      }, {
        content: '支持自定义尺寸',
        timestamp: '2018-04-03 20:46',
        size: 'large'
      }, {
        content: '默认样式的节点',
        timestamp: '2018-04-03 20:46'
      }, {
        content: '隐藏时间戳',
        timestamp: '2018-04-03 20:46',
        hideTimestamp:true
      }
      ]
    }
  },
}
</script>

<style scoped></style>
