import { AuthStatus } from "~/types"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $client } = useNuxtApp()
  const { status } = await $client.auth.session.mutate()
  const { auth } = to.meta
  console.log("auth.global", status, auth)
  console.log("auth.global - from, to", from, to)
  const redirectTo = (route: string) => {
    if (from.fullPath != route) {
      return navigateTo(route)
    }
  }

  if (!auth && status != AuthStatus.AUTHENTICATED) {
    return redirectTo('/auth/login')
  }
  if (!!auth && status != auth.accepted) {
    if (status in auth.redirect) return redirectTo((auth.redirect as any)[status])
  }

})