<template>
  <div>
    <KemTable :table-data="treeData" :column="column" row-key="deptId" :tree-props="treeProps">
      <template slot="icon" slot-scope="{ scope }">
        <i :class="scope.row.icon" style="font-size: 24px"></i>
      </template>
    </KemTable>
    <KemTable :request="request" :column="column" row-key="deptId" :tree-props="treeProps" :is-show-page="false">
      <template slot="icon" slot-scope="{ scope }">
        <i :class="scope.row.icon" style="font-size: 24px"></i>
      </template>
    </KemTable>
  </div>
</template>

<script>

const dataaaa=[
  {
    "searchValue": null,
    "createBy": "admin",
    "createTime": "2021-06-08 14:37:45",
    "updateBy": "",
    "updateTime": null,
    "remark": null,
    "params": {},
    "deptId": "100",
    "parentId": "0",
    "ancestors": "0",
    "deptName": "若依科技",
    "orderNum": "0",
    "leader": "若依",
    "phone": "15888888888",
    "email": "ry@qq.com",
    "status": "0",
    "delFlag": "0",
    "parentName": null,
    "children": []
  },
  {
    "searchValue": null,
    "createBy": "admin",
    "createTime": "2021-06-08 14:37:45",
    "updateBy": "",
    "updateTime": null,
    "remark": null,
    "params": {},
    "deptId": "101",
    "parentId": "100",
    "ancestors": "0,100",
    "deptName": "深圳总公司",
    "orderNum": "1",
    "leader": "若依",
    "phone": "15888888888",
    "email": "ry@qq.com",
    "status": "0",
    "delFlag": "0",
    "parentName": null,
    "children": []
  },
  {
    "searchValue": null,
    "createBy": "admin",
    "createTime": "2021-06-08 14:37:45",
    "updateBy": "",
    "updateTime": null,
    "remark": null,
    "params": {},
    "deptId": "102",
    "parentId": "100",
    "ancestors": "0,100",
    "deptName": "长沙分公司",
    "orderNum": "2",
    "leader": "若依",
    "phone": "15888888888",
    "email": "ry@qq.com",
    "status": "0",
    "delFlag": "0",
    "parentName": null,
    "children": []
  },
  {
    "searchValue": null,
    "createBy": "admin",
    "createTime": "2021-06-08 14:37:45",
    "updateBy": "",
    "updateTime": null,
    "remark": null,
    "params": {},
    "deptId": "103",
    "parentId": "101",
    "ancestors": "0,100,101",
    "deptName": "研发部门",
    "orderNum": "1",
    "leader": "若依",
    "phone": "15888888888",
    "email": "ry@qq.com",
    "status": "0",
    "delFlag": "0",
    "parentName": null,
    "children": []
  },
  {
    "searchValue": null,
    "createBy": "admin",
    "createTime": "2021-06-08 14:37:45",
    "updateBy": "",
    "updateTime": null,
    "remark": null,
    "params": {},
    "deptId": "104",
    "parentId": "101",
    "ancestors": "0,100,101",
    "deptName": "市场部门",
    "orderNum": "2",
    "leader": "若依",
    "phone": "15888888888",
    "email": "ry@qq.com",
    "status": "0",
    "delFlag": "0",
    "parentName": null,
    "children": []
  },
  {
    "searchValue": null,
    "createBy": "admin",
    "createTime": "2021-06-08 14:37:45",
    "updateBy": "",
    "updateTime": null,
    "remark": null,
    "params": {},
    "deptId": "105",
    "parentId": "101",
    "ancestors": "0,100,101",
    "deptName": "测试部门",
    "orderNum": "3",
    "leader": "若依",
    "phone": "15888888888",
    "email": "ry@qq.com",
    "status": "0",
    "delFlag": "0",
    "parentName": null,
    "children": []
  },
  {
    "searchValue": null,
    "createBy": "admin",
    "createTime": "2021-06-08 14:37:45",
    "updateBy": "",
    "updateTime": null,
    "remark": null,
    "params": {},
    "deptId": "106",
    "parentId": "101",
    "ancestors": "0,100,101",
    "deptName": "财务部门",
    "orderNum": "4",
    "leader": "若依",
    "phone": "15888888888",
    "email": "ry@qq.com",
    "status": "0",
    "delFlag": "0",
    "parentName": null,
    "children": []
  },
  {
    "searchValue": null,
    "createBy": "admin",
    "createTime": "2021-06-08 14:37:45",
    "updateBy": "",
    "updateTime": null,
    "remark": null,
    "params": {},
    "deptId": "107",
    "parentId": "101",
    "ancestors": "0,100,101",
    "deptName": "运维部门",
    "orderNum": "5",
    "leader": "若依",
    "phone": "15888888888",
    "email": "ry@qq.com",
    "status": "0",
    "delFlag": "0",
    "parentName": null,
    "children": []
  },
  {
    "searchValue": null,
    "createBy": "admin",
    "createTime": "2021-06-08 14:37:45",
    "updateBy": "",
    "updateTime": null,
    "remark": null,
    "params": {},
    "deptId": "108",
    "parentId": "102",
    "ancestors": "0,100,102",
    "deptName": "市场部门",
    "orderNum": "1",
    "leader": "若依",
    "phone": "15888888888",
    "email": "ry@qq.com",
    "status": "0",
    "delFlag": "0",
    "parentName": null,
    "children": []
  },
  {
    "searchValue": null,
    "createBy": "admin",
    "createTime": "2021-06-08 14:37:45",
    "updateBy": "",
    "updateTime": null,
    "remark": null,
    "params": {},
    "deptId": "109",
    "parentId": "102",
    "ancestors": "0,100,102",
    "deptName": "财务部门",
    "orderNum": "2",
    "leader": "若依",
    "phone": "15888888888",
    "email": "ry@qq.com",
    "status": "0",
    "delFlag": "0",
    "parentName": null,
    "children": []
  },
  {
    "searchValue": null,
    "createBy": "admin",
    "createTime": "2021-06-16 17:16:42",
    "updateBy": "",
    "updateTime": null,
    "remark": null,
    "params": {},
    "deptId": "202",
    "parentId": "100",
    "ancestors": "0,100",
    "deptName": "ddd",
    "orderNum": "0",
    "leader": null,
    "phone": null,
    "email": null,
    "status": "0",
    "delFlag": "0",
    "parentName": null,
    "children": []
  }
]
export default {
  name: 'TreeTable',
  data() {
    return {
      treeProps: {
        loop: true,
        id: 'deptId',
        pid: 'parentId',
      },
      treeData: dataaaa,
      column: [
        {
          label: 'deptName',
          prop: 'deptName',
        },
        {
          label: 'layerId',
          prop: 'layerId',
        },
      ],
    }
  },
  methods: {
    request() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data:dataaaa,
            msg: '保存成功',
          })
        }, 500)
      })
    }
  },
}
</script>

<style scoped></style>
