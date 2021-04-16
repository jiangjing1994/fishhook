<template>

    <KemPageCard header="标签">
        <pre>{{ value }}</pre>
        <KemTagGroup
                v-model="value"
                :options="[
                     {
                        label: '区域一',
                        value: 'shanghai',
                        isShow:true
                        },
                        {
                        label: '区域二',
                        value: 'beijing',
                         isShow:false
                        }
        ]"
        />
    </KemPageCard>
</template>

<script>
const transferRequest=()=> {
	return new Promise((resolve) => {

		setTimeout(() => {
			resolve([
				{transferName: '动态数据1', id: 'Beijing'},
				{transferName: '动态数据2', id: 'Shanghai'},
				{transferName: '动态数据3', id: 'Nanjing'},
				{transferName: '动态数据4', id: 'Chengdu'},
				{transferName: '动态数据5', id: 'Shenzhen'},
				{transferName: '动态数据6', id: 'Guangzhou'},
			])
		}, 500)

	})
}
export default {
	name: "TagGroup",
	data() {
		return {
			value:[],
			uiType:'text',
			form: {
				prop3:['Nanjing'],
				prop4:'这是KemInput',
				prop5:'beijing'
			}
		}
	},
	computed: {
		formItems() {
			const uiType = this.uiType
			return [
				{
					label: '静态条件', prop: 'prop1', span: 13, component: 'KemTagGroup', props: {
						options: [
							{
								label: '区域一',
								value: 'shanghai'
							},
							{
								label: '区域二',
								value: 'beijing'
							}
						]
					}
				},
				{
					label: '动态条件', prop: 'prop2', span: 13, component: 'KemTagGroup', props: {
						request: transferRequest,
						defaultProps: {
							label: 'transferName',
							value: 'id'
						},
						defaultParams: {
							dictType: 'transfer'
						},

					}
				},
				{
					label: '文字模式', prop: 'prop3', span: 13, component: 'KemTagGroup', props: {
						request: transferRequest,
						defaultProps: {
							label: 'transferName',
							value: 'id'
						},
						defaultParams: {
							dictType: 'transfer'
						},
						uiType
					}
				},
				{
					label: '文字模式2', prop: 'prop4', span: 13, props: {
						uiType
					}
				},
				{
					label: '字符串类型', prop: 'prop5', span: 13, component: 'KemTagGroup', props: {
						valueDataType:'string',
						options: [
							{
								label: '区域一',
								value: 'shanghai'
							},
							{
								label: '区域二',
								value: 'beijing'
							},
							{
								label: '区域三',
								value: 'nanjing'
							}
						]
					}
				},

			]
		}
	},
	methods: {
		dianwo() {
			if (this.uiType === ''){
				this.uiType ='text'
			}else {
				this.uiType = ''
			}

		}
	},
}
</script>

<style scoped>

</style>
