import { Session } from "~/types"

export default defineEventHandler(async (event) => {
  const { session: { password }} = useRuntimeConfig(event)
  const session = await useSession<Session>(event, {
    name: "nuxt-europe-scouts",
    password,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    },
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
  event.context.session = session
})
