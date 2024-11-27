import { Session } from "~/session"

export default defineEventHandler(async (event) => {
  const { session: { password }} = useRuntimeConfig(event)
  const session = await useSession<Session>(event, {
    name: "my-session",
    password,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "strict" as "strict",
    },
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
  event.context.session = session
})
