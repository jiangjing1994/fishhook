<template>
  <div>
    <kem-data-icons :option="option"></kem-data-icons>
  </div>
</template>

<script>
export default {
  name: 'DataIcons',
  data() {
    return {
      option: {
        span: 4,
        decimals: 0,
        data: [
          {
            title: '今日注册',
            count: 12678,
            color: 'red',
            append: '个',
            click: (a) => {
              console.log(a)
            },
          },
          {
            title: '今日登录',
            count: 22139,
          },
          {
            title: '今日订阅',
            count: 35623,
          },
          {
            title: '今日评论',
            count: 16826,
          },
          {
            title: '今日评论',
            count: 16826,
          },
          {
            title: '今日评论',
            count: 16826,
          },
          {
            title: '今日评论',
            count: 16826,
          },
        ],
      },
    }
  },
}
</script>

<style scoped></style>
