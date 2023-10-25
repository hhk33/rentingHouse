import { DirectiveBinding } from "nuxt/dist/app/compat/vue-demi"

export default defineNuxtPlugin(nuxtApp => {
  const context: string = '@@wavesContext'

  const handleClick = (el: any, binding: DirectiveBinding<any>) => {
    const handle = (e: MouseEvent) => {
      const customOpts = Object.assign({}, binding.value)
      const opts = Object.assign(
        {
          ele: el, // 波纹作用元素
          type: 'hit', // hit 点击位置扩散 center中心点扩展
          color: 'rgba(0, 0, 0, 0.15)' // 波纹颜色
        },
        customOpts
      )
      const target = opts.ele
      if (target) {
        target.style.position = 'relative'
        target.style.overflow = 'hidden'
        // 获得元素左，上，右，下相对浏览器视窗的位置
        const rect = target.getBoundingClientRect()
        let ripple = target.querySelector('.waves-ripple')
        if (!ripple) {
          ripple = document.createElement('span')
          ripple.className = 'waves-ripple'
          ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px'
          target.appendChild(ripple)
        } else {
          ripple.className = 'waves-ripple'
        }
        switch (opts.type) {
          case 'center':
            ripple.style.top = rect.height / 2 - ripple.offsetHeight / 2 + 'px'
            ripple.style.left = rect.width / 2 - ripple.offsetWidth / 2 + 'px'
            break
          default:
            ripple.style.top =
              (e.pageY - rect.top - ripple.offsetHeight / 2 - document.documentElement.scrollTop ||
                document.body.scrollTop) + 'px'
            ripple.style.left =
              (e.pageX - rect.left - ripple.offsetWidth / 2 - document.documentElement.scrollLeft ||
                document.body.scrollLeft) + 'px'
        }
        ripple.style.backgroundColor = opts.color
        ripple.className = 'waves-ripple z-active'
        return false
      }
    }

    if (!el[context]) {
      el[context] = {
        removeHandle: handle
      }
    } else {
      el[context].removeHandle = handle
    }

    return handle
  }
  
  nuxtApp.vueApp.directive('wave', {
    mounted(el, binding) {
      el.addEventListener('click', handleClick(el, binding))
    },
    updated(el, binding) {
      el.removeEventListener('click', el[context].removeHandle)
      el.addEventListener('click', handleClick(el, binding))
    },
    unmounted(el) {
      el.removeEventListener('click', el[context].removeHandle)
      el[context] = null
      delete el[context]
    }
  })
})
