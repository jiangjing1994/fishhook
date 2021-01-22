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
