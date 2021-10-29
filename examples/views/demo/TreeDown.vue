<template>
  <div>234</div>
</template>

<script>
export default {
  name: 'TreeDown',
  data() {
    return {
      list: [
        //datasource
        {
          id: 'z1',
          name: 'leglo',
          age: '18',
          gender: '男',
          work: 'web',
          children: [
            {
              name: 'leglo1',
              age: '18',
              gender: '男',
              work: 'web',
              id: 'z1-1',
              children: [
                {
                  name: 'leglo1-1',
                  age: '18',
                  gender: '男',
                  work: 'web',
                  id: 'z1-1-1',
                  children: [
                    {
                      name: 'leglo1-1-1',
                      age: '18',
                      gender: '男',
                      work: 'web',
                      id: 'z1-1-1',
                    },
                  ],
                },
                {
                  id: 'z1-1-2',
                  name: 'leglo1-2',
                  age: '18',
                  gender: '男',
                  work: 'web',
                },
                {
                  id: 'z1-1-3',
                  name: 'leglo1-3',
                  age: '18',
                  gender: '男',
                  work: 'web',
                },
                {
                  id: 'z1-1-4',
                  name: 'leglo1-4',
                  age: '18',
                  gender: '男',
                  work: 'web',
                },
              ],
            },
            {
              name: 'leglo2',
              id: 'z1-2',
              age: '18',
              gender: '男',
              work: 'web',
            },
          ],
        },
      ],
      showFields: [
        //show fields
        {
          name: '姓名：',
          key: 'name',
        },
        {
          name: '年龄：',
          key: 'age',
        },
      ],
    }
  },
}
</script>

<style scoped></style>
