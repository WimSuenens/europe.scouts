import { AuthStatus } from "~/types"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $client } = useNuxtApp()
  const { status } = await $client.auth.session.mutate()
  const { auth } = to.meta
  const localePath = useLocalePath()
  // console.info("auth.global", status, auth)
  // console.info("auth.global - from, to", from, to)

  const redirectTo = (route: string) => {
    if (to.fullPath != route) {
      return navigateTo(localePath(route))
    }
  }

  if (!auth && status != AuthStatus.AUTHENTICATED && !to.fullPath.includes('/auth/logout')) {
    return redirectTo('/auth/login')
  }
  if (!!auth && 'redirect' in auth && status != auth.accepted) {
    if (status in auth.redirect) return redirectTo((auth.redirect as any)[status])
  }

  if (!!auth && !('redirect' in auth) && !auth.accepted.includes(status)) {
    return redirectTo('/')
  }

})