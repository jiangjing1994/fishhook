<template>
    <span>{{ value }}</span>
</template>

<script>
import CountUp from "countup.js";
/**
 * @displayName 计数器
 */
 export default  {
    name: "KemCountUp",
    props: {
        animation: {
            type: Boolean,
            default: true
        },
        start: {
            type: Number,
            required: false,
            default: 0
        },
        // eslint-disable-next-line vue/require-prop-types
        value: {
            required: true
        },
        decimals: {
            type: Number,
            required: false,
            default: 0
        },
        duration: {
            type: Number,
            required: false,
            default: 2
        },
        options: {
            type: Object,
            required: false,
            default () {
                return {};
            }
        },
        callback: {
            type: Function,
            required: false,
            default: () => { }
        }
    },
    data () {
        return {
            c: null
        };
    },
    watch: {
        decimals () {
            if (this.c && this.c.update) {
                this.c.update(this.value);
            }
        },
        value (value) {
            if (this.c && this.c.update) {
                this.c.update(value);
            }
        }
    },
    mounted () {
        if (this.animation) {
            this.init();
        }

    },
    beforeDestroy () {
        this.destroy();
    },
    methods: {
        init () {
            if (!this.c) {
                this.c = new CountUp(
                    this.$el,
                    this.start,
                    this.value,
                    this.decimals,
                    this.duration,
                    this.options
                );
                this.c.start(() => {
                    this.callback(this.c);
                });
            }
        },
        destroy () {
            this.c = null;
        }
    },
    start (callback) {
        if (this.c && this.c.start) {
            this.c.start(() => {
                callback && callback(this.c);
            });
        }
    },
    pauseResume () {
        if (this.c && this.c.pauseResume) {
            this.c.pauseResume();
        }
    },
    reset () {
        if (this.c && this.c.reset) {
            this.c.reset();
        }
    },
    update (newEndVal) {
        if (this.c && this.c.update) {
            this.c.update(newEndVal);
        }
    }
}
</script>
