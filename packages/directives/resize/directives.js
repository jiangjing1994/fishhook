/**
 * Created by jiang on 2021/5/6
 * File description:
 * History:
 */

export default {
  // 指令的名称
  bind(el, binding) {
    // el为绑定的元素，binding为绑定给指令的对象
    let width = '',
      height = ''
    let wait = binding.value.wait || 1000
    const isReize = () => {
      const style = document.defaultView.getComputedStyle(el)
      if (width !== style.width || height !== style.height) {
        binding.value.resize({
          wait,
          width: style.width,
          height: style.height,
          w: parseInt(style.width),
          h: parseInt(style.height),
        }) // 关键
      }
      width = style.width
      height = style.height
    }
    el.__vueSetInterval__ = setInterval(isReize, wait)
  },
  unbind(el) {
    clearInterval(el.__vueSetInterval__)
  },
}
