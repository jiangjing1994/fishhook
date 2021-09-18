<template>
  <div style="text-align: left">
    <KemTree :data="baseData" show-checkbox></KemTree>
    <KemViewTree :data="baseData" show-checkbox></KemViewTree>
    <KemViewTree :data="data3" :load-data="loadData" show-checkbox></KemViewTree>
  </div>
</template>

<script>
export default {
  name: 'KemTree',

  data() {
    return {
      data3: [
        {
          title: 'parent',
          loading: false,
          children: [],
        },
      ],

      baseData: [
        {
          expand: true,
          title: 'parent 1',
          children: [
            {
              title: 'parent 1-0',
              expand: true,
              disabled: true,
              children: [
                {
                  title: 'leaf',
                  disableCheckbox: true,
                },
                {
                  title: 'leaf',
                },
              ],
            },
            {
              title: 'parent 1-1',
              expand: true,
              checked: true,
              children: [
                {
                  title: '<span style="color: red">leaf</span>',
                },
              ],
            },
          ],
        },
      ],
    }
  },
  methods: {
    loadData(item, callback) {
      setTimeout(() => {
        const data = [
          {
            title: 'children',
            loading: false,
            children: [],
          },
          {
            title: 'children',
            loading: false,
            children: [],
          },
        ]
        callback(data)
      }, 1000)
    },
  },
}
</script>

<style lang="scss" scoped></style>
