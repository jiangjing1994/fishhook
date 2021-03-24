 <template>
    <div></div>
</template>

 <script>
export default {
    name: 'KemCharts',
    props: {
        /** 选择器类型
         * @values date, datetime, time
         */
        pkgType: {
            type: String,
            default: 'echarts'
        },
    },
    data() {
        return {
            value: ''
        }
    },
    methods: {
        name() {

        }
    },
}
</script>

 <style lang="scss" scoped>

</style>
