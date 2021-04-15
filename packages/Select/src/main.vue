<template lang="pug">
    div
        KemLabelText( v-if='uiType ==="text"' :value='label')
        el-select( v-bind="$attrs" :value='v'  v-else v-on="evet" :multiple='multiple' :placeholder="placeholder" :filterable='filterable' :clearable='clearable' style='width:100%' )
            el-option(v-for="(item,index) in list " :key="index"  :label="item.label" :disabled="item.disabled" :value="item.value")
                slot(:scope="item")

</template>
<script>
/**
 * @displayName Select下拉框
 */
import mixins from "../../mixins/async_form_element";
export default {
	name: 'KemSelect',
	mixins: [mixins],
	props: {
		placeholder: {
			type: String,
			default: '请选择'
		},
		clearable: {
			type: Boolean,
			default: true
		},
		filterable: {
			type: Boolean,
			default: true
		},
		multiple: {
			type: Boolean,
			default: false
		},

		/**
		 * label 数据类型
		 *  @values array, string,
		 */
		valueDataType:{
			type: String,
			default:'array'
		},

		// 分隔符
		separator:{
			type: String,
			default:','
		},

	},
	data() {
		return {
			data: [],
		}
	},
	computed: {
		v(){
			let value = ''
			if(!this.$attrs.value){
				return  ''
			}
			if(this.multiple){
				if (this.valueDataType === 'array'){
					value = this.$attrs.value
				}else if (this.valueDataType === 'string') {
					value = this.$attrs.value.split(this.separator)
				}

				return value || ''
			}
			else {
				return  this.$attrs.value
			}

		},
	},


}
</script>

<style scoped>

</style>
