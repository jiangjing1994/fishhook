/**
 * Created by jiang on 2021/1/21
 * File description:
 * History:
 */
export const mockList = () => {
    return [
        {
            "code":"CWB-FSC-2021-01-055",
            "formalCode":null,
            "title":"dddd",
            "system":"CRM/BOSS系统",
            "type":"非市场口需求",
            "createUser":"王小二(财务)",
            "createTime":"2021-01-19 16:35:38",
            "dealTime":null,
            "formalId":null,
            "processInstanceId":"1788016"
        },
        {
            "code":"CWB-FSC-2021-01-054",
            "formalCode":null,
            "title":"ccccc",
            "system":"CRM/BOSS系统",
            "type":"非市场口需求",
            "createUser":"王小二(财务)",
            "createTime":"2021-01-18 14:31:16",
            "dealTime":null,
            "formalId":null,
            "processInstanceId":"1787919"
        },
        {
            "code":"CWB-FSC-2021-01-053",
            "formalCode":"BOSS-FSC-2021-01-030-xx_liulei",
            "title":"bbbbbbbbbb",
            "system":"CRM/BOSS系统",
            "type":"非市场口需求",
            "createUser":"王小二(财务)",
            "createTime":"2021-01-18 11:44:11",
            "dealTime":null,
            "formalId":"753648",
            "processInstanceId":"1787731"
        },
        {
            "code":"CWB-FSC-2021-01-053",
            "formalCode":"BOSS-FSC-2021-01-029-xx_liulei",
            "title":"bbbbbbbbbb",
            "system":"CRM/BOSS系统",
            "type":"非市场口需求",
            "createUser":"王小二(财务)",
            "createTime":"2021-01-18 11:44:11",
            "dealTime":null,
            "formalId":"753647",
            "processInstanceId":"1787731"
        },
        {
            "code":"CWB-FSC-2021-01-053",
            "formalCode":"BOSS-FSC-2021-01-029-xx_liulei",
            "title":"bbbbbbbbbb",
            "system":"CRM/BOSS系统",
            "type":"非市场口需求",
            "createUser":"王小二(财务)",
            "createTime":"2021-01-18 11:44:11",
            "dealTime":null,
            "formalId":"753647",
            "processInstanceId":"1787731"
        },
        {
            "code":"CWB-FSC-2021-01-050",
            "formalCode":null,
            "title":"非市场口测试流程",
            "system":"CRM/BOSS系统",
            "type":"非市场口需求",
            "createUser":"王小二(财务)",
            "createTime":"2021-01-18 09:33:19",
            "dealTime":null,
            "formalId":null,
            "processInstanceId":"1787522"
        },
        {
            "code":"CWB-FSC-2021-01-049",
            "formalCode":null,
            "title":"测试01151726",
            "system":"CRM/BOSS系统",
            "type":"非市场口需求",
            "createUser":"王小二(财务)",
            "createTime":"2021-01-15 17:26:00",
            "dealTime":null,
            "formalId":null,
            "processInstanceId":"1786591"
        },
        {
            "code":"PTST-KS-2021-01-048",
            "formalCode":"BOSS-KS-2021-01-027-xx_liuyun",
            "title":"gzw第二次测试",
            "system":"CRM/BOSS系统",
            "type":"快速响应需求",
            "createUser":"谭昕",
            "createTime":"2021-01-15 16:50:38",
            "dealTime":null,
            "formalId":"753644",
            "processInstanceId":"1786498"
        },
        {
            "code":"SCJY-KS-2021-01-046",
            "formalCode":null,
            "title":"校园共享巴士",
            "system":"CRM/BOSS系统",
            "type":"快速响应需求",
            "createUser":"谭曦",
            "createTime":"2021-01-15 10:09:55",
            "dealTime":null,
            "formalId":null,
            "processInstanceId":"1786318"
        }]
};
export const queryTreeRoot = () => {

     return new Promise((resolve)=>{
        setTimeout(()=>{
             resolve({
                 "msg": "success",

                 "obj": [{
                     "organize_id": 2,
                     "organize_name": "中国移动通信集团湖南有限公司",
                     "code": "2",
                     "org_type": 1,
                     "state": 1,
                     "create_date": "2019-12-24 00:00:00",
                     "ext1": "QT",
                     "ext2": "0010",
                     "ext3": "0010",
                     "children_count": 48
                 }, {
                     "organize_id": 3,
                     "organize_name": "中国移动通信集团青海有限公司",
                     "code": "3",
                     "org_type": 1,
                     "notes": "青海",
                     "state": 1,
                     "create_date": "2019-12-24 00:00:00",
                     "ext1": "QH",
                     "ext2": "0011",
                     "ext3": "0011",
                     "children_count": 14
                 }],
                 "code": 1
             })
        },500)

    })
}
export const queryTreeElement = () => {

     return new Promise((resolve)=>{
        setTimeout(()=>{
             resolve(
                 {
                     "msg": "success",
                     "obj": [{
                         "organize_id": 4486,
                         "parent_organize_id": 2,
                         "organize_name": "长沙移动通信分公司",
                         "code": "4486",
                         "org_type": 3,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "QT",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 34
                     }, {
                         "organize_id": 4487,
                         "parent_organize_id": 2,
                         "organize_name": "湘潭移动通信分公司",
                         "code": "4487",
                         "org_type": 3,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "QT",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 22
                     }, {
                         "organize_id": 4488,
                         "parent_organize_id": 2,
                         "organize_name": "株洲移动通信分公司",
                         "code": "4488",
                         "org_type": 3,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "QT",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 28
                     }, {
                         "organize_id": 4494,
                         "parent_organize_id": 2,
                         "organize_name": "自治州移动通信分公司",
                         "code": "4494",
                         "org_type": 3,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "QT",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 27
                     }, {
                         "organize_id": 4483,
                         "parent_organize_id": 2,
                         "organize_name": "娄底移动通信分公司",
                         "code": "4483",
                         "org_type": 3,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "QT",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 25
                     }, {
                         "organize_id": 4482,
                         "parent_organize_id": 2,
                         "organize_name": "益阳移动通信分公司",
                         "code": "4482",
                         "org_type": 3,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "QT",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 28
                     }, {
                         "organize_id": 4489,
                         "parent_organize_id": 2,
                         "organize_name": "衡阳移动通信分公司",
                         "code": "4489",
                         "org_type": 3,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "QT",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 30
                     }, {
                         "organize_id": 4490,
                         "parent_organize_id": 2,
                         "organize_name": "郴州移动通信分公司",
                         "code": "4490",
                         "org_type": 3,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "QT",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 30
                     }, {
                         "organize_id": 4491,
                         "parent_organize_id": 2,
                         "organize_name": "常德移动通信分公司",
                         "code": "4491",
                         "org_type": 3,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "QT",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 30
                     }, {
                         "organize_id": 4492,
                         "parent_organize_id": 2,
                         "organize_name": "邵阳移动通信分公司",
                         "code": "4492",
                         "org_type": 3,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "QT",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 32
                     }, {
                         "organize_id": 4493,
                         "parent_organize_id": 2,
                         "organize_name": "岳阳移动通信分公司",
                         "code": "4493",
                         "org_type": 3,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "QT",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 29
                     }, {
                         "organize_id": 4495,
                         "parent_organize_id": 2,
                         "organize_name": "张家界移动通信分公司",
                         "code": "4495",
                         "org_type": 3,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "QT",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 24
                     }, {
                         "organize_id": 4496,
                         "parent_organize_id": 2,
                         "organize_name": "怀化移动通信分公司",
                         "code": "4496",
                         "org_type": 3,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "QT",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 32
                     }, {
                         "organize_id": 4497,
                         "parent_organize_id": 2,
                         "organize_name": "永州移动通信分公司",
                         "code": "4497",
                         "org_type": 3,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "QT",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 32
                     }, {
                         "organize_id": 4485,
                         "parent_organize_id": 2,
                         "organize_name": "外方单位",
                         "code": "4485",
                         "org_type": 2,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "QT",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 49
                     }, {
                         "organize_id": 4499,
                         "parent_organize_id": 2,
                         "organize_name": "中国移动通信集团终端有限公司湖南分公司",
                         "code": "4499",
                         "org_type": 2,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "QT",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 19
                     }, {
                         "organize_id": 4808,
                         "parent_organize_id": 2,
                         "organize_name": "信息技术中心",
                         "code": "4808",
                         "parent_code": "2",
                         "org_type": 2,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "JF",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 1
                     }, {
                         "organize_id": 4498,
                         "parent_organize_id": 2,
                         "organize_name": "湖南中移通信技术工程有限公司",
                         "code": "4498",
                         "org_type": 2,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "QT",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 7
                     }, {
                         "organize_id": 4787,
                         "parent_organize_id": 2,
                         "organize_name": "客户服务中心",
                         "code": "4787",
                         "parent_code": "2",
                         "org_type": 2,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "SKF",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 0
                     }, {
                         "organize_id": 4748,
                         "parent_organize_id": 2,
                         "organize_name": "信息安全管理部",
                         "code": "4748",
                         "parent_code": "2",
                         "org_type": 2,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "QT",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 0
                     }, {
                         "organize_id": 4756,
                         "parent_organize_id": 2,
                         "organize_name": "办公室",
                         "code": "4756",
                         "parent_code": "2",
                         "org_type": 2,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "BGS",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 0
                     }, {
                         "organize_id": 4397,
                         "parent_organize_id": 2,
                         "organize_name": "工程建设中心",
                         "code": "4397",
                         "parent_code": "2",
                         "org_type": 2,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "GC",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 0
                     }, {
                         "organize_id": 4749,
                         "parent_organize_id": 2,
                         "organize_name": "网管中心",
                         "code": "4749",
                         "parent_code": "2",
                         "org_type": 2,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "QT",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 7
                     }, {
                         "organize_id": 4804,
                         "parent_organize_id": 2,
                         "organize_name": "发展战略部",
                         "code": "4804",
                         "parent_code": "2",
                         "org_type": 2,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "FZ",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 0
                     }, {
                         "organize_id": 4520,
                         "parent_organize_id": 2,
                         "organize_name": "党委巡察工作办公室（党风廉政办公室）",
                         "code": "4520",
                         "parent_code": "2",
                         "org_type": 2,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "BGS",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 0
                     }, {
                         "organize_id": 4750,
                         "parent_organize_id": 2,
                         "organize_name": "网优中心",
                         "code": "4750",
                         "parent_code": "2",
                         "org_type": 2,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "WY",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 0
                     }, {
                         "organize_id": 4751,
                         "parent_organize_id": 2,
                         "organize_name": "党委办公室（党群工作部）",
                         "code": "4751",
                         "parent_code": "2",
                         "org_type": 2,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "BGS",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 0
                     }, {
                         "organize_id": 4752,
                         "parent_organize_id": 2,
                         "organize_name": "内审部",
                         "code": "4752",
                         "parent_code": "2",
                         "org_type": 2,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "NS",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 0
                     }, {
                         "organize_id": 4753,
                         "parent_organize_id": 2,
                         "organize_name": "纪委办公室",
                         "code": "4753",
                         "parent_code": "2",
                         "org_type": 2,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "QT",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 1
                     }, {
                         "organize_id": 4754,
                         "parent_organize_id": 2,
                         "organize_name": "工会",
                         "code": "4754",
                         "parent_code": "2",
                         "org_type": 2,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "GH",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 2
                     }, {
                         "organize_id": 4755,
                         "parent_organize_id": 2,
                         "organize_name": "行政事务部",
                         "code": "4755",
                         "parent_code": "2",
                         "org_type": 2,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "XZ",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 0
                     }, {
                         "organize_id": 4757,
                         "parent_organize_id": 2,
                         "organize_name": "法律事务部",
                         "code": "4757",
                         "parent_code": "2",
                         "org_type": 2,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "QT",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 0
                     }, {
                         "organize_id": 4758,
                         "parent_organize_id": 2,
                         "organize_name": "人力资源部",
                         "code": "4758",
                         "parent_code": "2",
                         "org_type": 2,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "RZ",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 0
                     }, {
                         "organize_id": 4759,
                         "parent_organize_id": 2,
                         "organize_name": "财务部",
                         "code": "4759",
                         "parent_code": "2",
                         "org_type": 2,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "CW",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 1
                     }, {
                         "organize_id": 4760,
                         "parent_organize_id": 2,
                         "organize_name": "市场经营部",
                         "code": "4760",
                         "parent_code": "2",
                         "org_type": 2,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "QT",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 1
                     }, {
                         "organize_id": 4780,
                         "parent_organize_id": 2,
                         "organize_name": "集中运营中心",
                         "code": "4780",
                         "parent_code": "2",
                         "org_type": 2,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "QT",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 0
                     }, {
                         "organize_id": 4781,
                         "parent_organize_id": 2,
                         "organize_name": "客户服务部",
                         "code": "4781",
                         "parent_code": "2",
                         "org_type": 2,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "KH",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 0
                     }, {
                         "organize_id": 4782,
                         "parent_organize_id": 2,
                         "organize_name": "政企客户部",
                         "code": "4782",
                         "parent_code": "2",
                         "org_type": 2,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "ZQ",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 0
                     }, {
                         "organize_id": 4783,
                         "parent_organize_id": 2,
                         "organize_name": "计划部",
                         "code": "4783",
                         "parent_code": "2",
                         "org_type": 2,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "JH",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 1
                     }, {
                         "organize_id": 4784,
                         "parent_organize_id": 2,
                         "organize_name": "采购中心",
                         "code": "4784",
                         "parent_code": "2",
                         "org_type": 2,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "QT",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 0
                     }, {
                         "organize_id": 4785,
                         "parent_organize_id": 2,
                         "organize_name": "网络部",
                         "code": "4785",
                         "parent_code": "2",
                         "org_type": 2,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "WL",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 1
                     }, {
                         "organize_id": 4786,
                         "parent_organize_id": 2,
                         "organize_name": "公司领导",
                         "code": "4786",
                         "parent_code": "2",
                         "org_type": 2,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "QT",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 0
                     }, {
                         "organize_id": 4515,
                         "parent_organize_id": 2,
                         "organize_name": "渠道运营中心",
                         "code": "4515",
                         "parent_code": "2",
                         "org_type": 2,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "QT",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 0
                     }, {
                         "organize_id": 4523,
                         "parent_organize_id": 2,
                         "organize_name": "重要客户销售服务中心",
                         "code": "4523",
                         "parent_code": "2",
                         "org_type": 2,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "QT",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 0
                     }, {
                         "organize_id": 4500,
                         "parent_organize_id": 2,
                         "organize_name": "中移电子商务有限公司",
                         "code": "4500",
                         "org_type": 2,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "QT",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 15
                     }, {
                         "organize_id": 4508,
                         "parent_organize_id": 2,
                         "organize_name": "客户响应中心",
                         "code": "4508",
                         "parent_code": "2",
                         "org_type": 2,
                         "state": 1,
                         "create_date": "2019-12-24 00:00:00",
                         "ext1": "QT",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 0
                     }, {
                         "organize_id": 4267,
                         "parent_organize_id": 2,
                         "organize_name": "需求管理第三方厂家",
                         "code": "100",
                         "parent_code": "0",
                         "org_type": 5,
                         "notes": "1",
                         "state": 1,
                         "create_date": "2018-08-29 00:00:00",
                         "ext1": "QT",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 19
                     }, {
                         "organize_id": 1043,
                         "parent_organize_id": 2,
                         "organize_name": "第三方厂商",
                         "code": "1043",
                         "parent_code": "0",
                         "org_type": 5,
                         "state": 1,
                         "create_date": "2019-03-26 00:00:00",
                         "ext1": "QT",
                         "ext2": "00100001",
                         "ext3": "0010",
                         "children_count": 29
                     }],
                     "code": 1
                 }
             )
        },500)

    })
}
export const queryList = () => {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            const data = mockList()
            resolve({
                data,
                msg: "查询成功",
                page_no: 1,
                page_size: data.length,
                status: 1,
            })
        },500)

    })
}
export const saveForm = (data) => {

    return new Promise((resolve)=>{
        setTimeout(()=>{

            resolve({
                data,
                msg: "保存成功",

            })
        },500)

    })
}
export const deleteForm = (data) => {

    return new Promise((resolve)=>{
        setTimeout(()=>{

            resolve({
                data,
                msg: "删除成功",

            })
        },500)

    })
}
