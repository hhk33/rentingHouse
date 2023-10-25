export default defineNuxtPlugin(nuxtApp => {
  const context: string = '@@thorttleContext'

  const thorttle = (el: any, fn: (...args: any[]) => any, gap: number = 500) => {
    let last_run: Date| null = null
    const handle = (...args: any[]) => {
      const now: Date = new Date()
      if (!last_run || now.getTime() - last_run.getTime() > gap) {
        fn(args)
        last_run = new Date()
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
  
  nuxtApp.vueApp.directive('throttle', {
    mounted(el, binding, vnode) {
      const { arg, value, modifiers } = binding
      const gap: number =
        modifiers && Object.keys(modifiers).length > 0
        ? Number(Object.keys(modifiers)[0])
        : 500
      const t_fn = thorttle(el, value.bind(vnode), gap)
      el.addEventListener(arg as string, () =>{
        t_fn()
      })
    },
    unmounted(el, binding) {
      const { arg } = binding
      el.removeEventListener (arg as string, el[context].removeHandle)
      el[context] = null
      delete el[context]
    }
  })
})
