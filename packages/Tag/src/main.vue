<script lang="jsx">
/**
 * @displayName KemTag 标签
 */
export default {
	name: 'KemTag',
	props: {
		text: String,
		closable: Boolean,
		type: String,
		hit: Boolean,
		disableTransitions: Boolean,
		color: String,
		size: String,
		effect: {
			type: String,
			default: 'light',
			validator(val) {
				return ['dark', 'light', 'plain'].indexOf(val) !== -1;
			}
		}
	},
	computed: {
		tagSize() {
			return this.size ||this.$MIMI.Tag.size
		}
	},
	methods: {
		handleClose(event) {
			event.stopPropagation();
			this.$emit('close', event);
		},
		handleClick(event) {
			this.$emit('click', event);
		}
	},
	render() {
		const { type, tagSize, effect ,hit} = this;
		const classes = [
			'el-tag',
			'kem-tag',
			type ? `el-tag--${type}` : '',
			tagSize ? `el-tag--${tagSize}` : '',
			effect ? `el-tag--${effect}` : '',
			hit && 'is-hit'
		];
		const tagEl = (
			<span
				class={ classes }
				style={{ backgroundColor: this.color }}
				onClick={ this.handleClick }>
                { this.$slots.default }
				{this.closable && <i class="el-tag__close el-icon-close" onClick={ this.handleClose }/>}
	</span>
		);

		return this.disableTransitions ? tagEl : <transition name="el-zoom-in-center">{ tagEl }</transition>;
	}
}
</script>

<style lang="scss" scoped>

</style>
