import type { Directive } from 'vue'
export const vIntersection: Directive = {
  mounted(el, binding) {
    // 获取指令的一些配置信息并初始化IntersectionObserver
    const modifier = binding.modifiers
    const value = binding.value
    const intersectionObserver = new IntersectionObserver(entries => {
      if (entries[0].intersectionRatio <= 0) {
        // 绑定指令的元素还没有进入可视窗口
        return
      }
      // 绑定指令的元素进入了可视窗口
      if (modifier.lazy) {
        // 懒加载
        const datasrc = el.getAttribute('datasrc')
        if (!datasrc) {
          // 没有配置datasrc属性
          console.warn(
            '%c' +
              '你配置了图片懒加载修饰符但没有给出datasrc属性或值,这会造成问题',
            'color: #90d7ec; font-size: 14px;'
          )
        } else {
          // 配置了datasrc属性
          el.setAttribute('src', datasrc)
        }
      }
      if (modifier.class) {
        // 动态类名
        if (!value) {
          // 没有给出值
          console.warn(
            '%c' +
              '你配置了动态类名修饰符但没有给出指令值,不能实现动态添加类名',
            'color: #90d7ec; font-size: 16px;'
          )
        } else {
          let classes = el.getAttribute('class')
          if (!classes) {
            classes = value
          } else {
            classes += ` ${value}`
          }
          el.setAttribute('class', classes)
        }
      }
      // 元素进入可视窗口完成了一系列操作后取消对他的监听
      intersectionObserver?.unobserve(el)
    })
    intersectionObserver.observe(el)
  }
}
