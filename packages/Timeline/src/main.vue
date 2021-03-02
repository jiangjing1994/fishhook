<template>
    <div style="text-align: left">
        <el-timeline
                v-if="activities.length>0"
                :reverse="reverse"
        >
            <el-timeline-item
                    v-for="(activity, index) in activities"
                    :key="index"
                    v-bind="activity"
                    :timestamp="activity.timestamp"
            >
                <template v-if="activity.renderDot" slot="dot">
                    <render-dot
                            :key="index"
                            :render="activity.renderDot"
                            :activity="activity"
                    ></render-dot>
                </template>
                <template v-if="activity.slotDot" slot="dot">
                    <slot :name="activity.prop" :scope="activity"></slot>
                </template>

                <render-content
                        :key="index"
                        :render="activity.render"
                        :activity="activity"
                ></render-content>

                <slot v-if="activity.slot" :name="activity.prop"  :scope="activity"></slot>

            </el-timeline-item>
        </el-timeline>
        <div v-else>
            暂无记录
        </div>
    </div>
</template>

<script lang="jsx">
// 表格字段格式化
const RenderContent = {
    props: {
        render: Function,
        activity: Object,

    },
    render (h) {
        const { content } = this.activity
        const params = {
            activity:this.activity,
        }

        if (this.render) {
            return this.render(h, params)
        }

        return <span>{content}</span>
    }
}
const RenderDot = {
    props: {
        render: Function,
        activity: Object,

    },
    render (h) {
        const { content } = this.activity
        const params = {
            activity:this.activity,
        }

        if (this.render) {
            return this.render(h, params)
        }

        return <span>{content}</span>
    }
}
/**
 * @displayName 时间条
 */
export default {
    name: 'KemTimeline',
    components:{
        RenderContent,
        RenderDot,

    },
    props: {
        activities: {
            type: Array,
            required:true
        },
        reverse: {
            type: Boolean,
            default:true
        }
    },
}
</script>

<style scoped>

</style>
