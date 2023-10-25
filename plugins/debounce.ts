export default defineNuxtPlugin(nuxtApp => {
  const context: string = '@@debounceContext'

  const debounce = (el:any, fn: (...args: any[]) => any, gap: number = 500) => {
    let timer: null | NodeJS.Timeout = null
    const handle = (...args: any[]) => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        fn(...args)
      }, gap)
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

  nuxtApp.vueApp.directive('debounce', {
    mounted(el, binding, vnode) {
      const { arg, value, modifiers } = binding
      const gap: number =
        modifiers && Object.keys(modifiers).length > 0
        ? Number(Object.keys(modifiers)[0])
        : 500
      const d_fn = debounce(el, value.bind(vnode), gap)
      el.addEventListener( arg as string, d_fn)
    },
    unmounted(el, binding) {
      const { arg } = binding
      el.removeEventListener (arg as string, el[context].removeHandle)
      el[context] = null
      delete el[context]
    }
  })
})
