<script>
export default {
  name: 'ChasoRender',
  functional: true,
  props: {
    form: {
      type: Object,
      default: () => {},
    },
    rootForm: {
      type: Object,
      default: () => {},
    },
    render: {
      type: Function,
      default: function () {},
    },
    scope: {
      type: Object,
      default: () => ({}),
    },
  },
  render: (h, ctx) =>
    ctx.props.render
      ? ctx.props.render(h, ctx.props.form, ctx.props.rootForm, ctx.props.scope) || <span>{ctx.parent.emptyWords}</span>
      : ctx.parent.emptyWords,
}
</script>
