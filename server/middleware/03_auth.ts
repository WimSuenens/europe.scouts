
export default defineEventHandler(async (event) => {
  // const session = await useSession<Session>(event, SESSION_CONFIG)
  const { session } = event.context

  /**
   * Set 'user' on the context
   */
  if (!!session.data.userId) {
    const { context, context: { prisma }} = event
    const user = await prisma.user.findUnique({ where: { id: session.data.userId }})
    if (user) {
      const { password, ...userInfo } = user
      context.user = userInfo
    }
  }

})