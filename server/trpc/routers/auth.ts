import { z } from "zod";
import { authenticedProcedure, publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { scryptSync, randomBytes, timingSafeEqual } from 'crypto';
import { AuthStatus } from "~/types";
import { Session } from "~/session";

export const authRouter = router({
  session: publicProcedure
    .mutation(async ({ ctx: event, ctx: { context: { user }} }) => {
      if (!user) return { status: AuthStatus.UNAUTHENTICATED }
      if (!user.verified) return { user, status: AuthStatus.VERIFICATION }
      if (!user.firstname || !user.lastname) return { user, status: AuthStatus.ONBOARDING }
      return { user, status: AuthStatus.AUTHENTICATED }
    }),
  register: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        password_confirm: z.string()
      })
    )
    .mutation(async ({ ctx: event, input }) => {
      const { email, password, password_confirm } = input;
      const { prisma } = event.context
      if (!email || !password || !password_confirm) throw new TRPCError({ code: 'BAD_REQUEST', message: 'missing data ...' })
      if (password != password_confirm) throw new TRPCError({ code: 'BAD_REQUEST', message: 'The passwords are not the same...' })
      const exists = await prisma.user.findUnique({ where: { email } })
      if (!!exists) throw new TRPCError({ code: 'BAD_REQUEST', message: 'A user with this email already exists.' })
      const salt = randomBytes(16).toString('hex');
      const salted_hashed_password = scryptSync(password, salt, 64).toString('hex');
      const { password: _, verified, ...user } = await prisma.user.create({
        data: {
          email,
          password: `${salt}:${salted_hashed_password}`
        }
      })
      const { update } = event.context.session
      await update((data: Session) => ({ ...data, userId: user!.id }))
      return user
    }),
  request: authenticedProcedure
    .input(z.optional(z.boolean()))
    .mutation(async ({ ctx: { context: { session, user: { email } }}, input: resend }) => {
      const { data, update } = session
      const current = new Date(Date.now()) // Current DateTime
      if (!!resend || !data.verification || (data.verification.validity < current.getTime())) {
        const code = Math.floor(100000 + Math.random() * 900000);
        const validity = current.getTime() + (1000 * 60 * 5)
        await update((data) => ({ ...data, verification: { validity, code }}))
        console.log(`${email} - You're access code is '${code}'`)
        return { sent: true }
      } else {
        const { verification: { code }} = data
        console.log(`${email} - You're access code is '${code}' is still valid`)
      }
      return { sent: false }
    }),
  verify: authenticedProcedure
    .input(
      z.object({
        code: z.string(),
      })
    )
    .mutation(async ({ ctx: { context: { prisma, session, user: { email } }}, input: { code } }) => {
      const { data, update } = session
      if (!code) return { success: false }
      if (!data.verification) return { success: false }
      const current = new Date(Date.now()) // Current DateTime
      if (current.getTime() > data.verification.validity) return { success: false }
      if (data.verification.code != +code) return { success: false}
      const { verified } = await prisma.user.update({ where: { email }, data: { verified: current}})
      await update((data)=> (({ verification, ...rest }) => (rest))(data))
      return { success: !!verified }
    }),
  login: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx: event, input }) => {
      // https://www.youtube.com/watch?v=NuyzuNBFWxQ
      const { email, password } = input;
      const { prisma } = event.context
      if (!email || !password) throw new TRPCError({ code: 'BAD_REQUEST', message: 'missing data ...' })
      var user = await prisma.user.findUnique({ where: { email } })
      if (!user || !user.password) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Failed to login' })
      const [salt, key] = user.password.split(':');
      const hashedBuffer = scryptSync(password, salt, 64)
      const keyBuffer = Buffer.from(key, 'hex');
      const match = timingSafeEqual(hashedBuffer, keyBuffer);
      if (!match) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Failed to login' })      
      const { update } = event.context.session
      await update((data: Session) => ({ ...data, userId: user!.id }))
      const { password: _, verified, ...userInfo } = user
      return userInfo
    }),
  whoami: authenticedProcedure
    .mutation(({ ctx: { context: { user } } }) => user),
  logout: publicProcedure
    .mutation(async ({ ctx: event}) => {
      const { clear } = event.context.session
      await clear()
    })
})