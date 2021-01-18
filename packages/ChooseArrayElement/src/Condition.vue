<template>
  <div class="div">
    <div
            v-for="(domain,index) in domains"
            :key="index"
    >
      <el-row :gutter="15" style="margin-bottom: 15px">
        <!--    <el-col :span="7">
               <KemSelect v-model="domain.fieldName" :default-props="{label:'label',value:'prop'}" :options="options" size="small" placeholder="请输入字段名"></KemSelect>

            </el-col>
            <el-col :span="7">
              <KemInput v-model="domain.symbol" size="small" placeholder="请输入值"></KemInput>
            </el-col>
            <el-col :span="7">
              <KemInput v-model="domain.symbolValue" size="small" placeholder="请输入值"></KemInput>
            </el-col>-->
        <el-col :span="1">
          <div class="num">
            {{index +1}}

          </div>
        </el-col>
        <el-col :span="20">
          <KemForm
                  :data="domain"
                  :form-items="formItems"
          ></KemForm>
        </el-col>
        <el-col v-if="!readOnly" :span="3">
          <el-button type="text" icon="el-icon-plus" size="small" @click="addField()" />
          <el-button :disabled="domains.length===1" type="text" icon="el-icon-delete" size="small" @click="removeField(domain)" />
        </el-col>
      </el-row>

    </div>

  </div>
</template>

<script lang="jsx">

export default {
  name:'Condition',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    value: {
      type: Array,
      //required:true
    },
    readOnly: {
      type: Boolean,
    },
    options: {
      type: Array,
      default:()=>{
        return []
      }
    },
    formItems: {
      type: Array,
      required:true
    },
  },
  data() {
    return {
      domains:[]
    };
  },
  watch: {
    value:{
      handler(value) {
        if(value instanceof Array && value.length === 0){

          this.domains= [{}]
        }else {
          this.domains = value;
        }
      },
      deep: true,
      immediate:true
    },
    domains:{
      handler(value) {
        this.$emit('input',value)
      },
      deep: true
    },

  },
  methods: {
    removeField(item) {
      let index = this.domains.indexOf(item)
      if (index !== -1) {
        this.domains.splice(index, 1)
      }
    },
    addField() {
      this.domains.push({});
    }
  }
}</script>

<style scoped>
.num {
  width: 20px;
  height: 20px;
  border: 2px solid #2e57bc;
  border-radius: 4px;
  text-align: center;
  line-height: 20px;
  color: #2e57bc;
  background: rgba(234, 238, 248, 1);
  position: relative;
  left: 40px;
  top: 5px;
}


</style>
