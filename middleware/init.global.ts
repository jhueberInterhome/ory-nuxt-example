export default defineNuxtRouteMiddleware(() => {
  if (process.server) {
    useColors().init()
  }
})
