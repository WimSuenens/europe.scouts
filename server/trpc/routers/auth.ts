import { z } from "zod";
import { authenticedProcedure, publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { scryptSync, randomBytes, timingSafeEqual } from 'crypto';
import { AuthStatus, Session } from "~/types";
import { Gender } from "@prisma/client";

export const authRouter = router({
  session: publicProcedure
    .mutation(async ({ ctx: event, ctx: { context: { user, person }} }) => {
      if (!user) return { status: AuthStatus.UNAUTHENTICATED }
      if (!user.verified) return { user, status: AuthStatus.VERIFICATION }
      if (!person) return { user, status: AuthStatus.ONBOARDING }
      return { user, person, status: AuthStatus.AUTHENTICATED }
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
      try {
        const { email, password, password_confirm } = input;
        const { $prisma } = event.context
        if (!email || !password || !password_confirm) throw new TRPCError({ code: 'BAD_REQUEST', message: 'missing data ...' })
        if (password != password_confirm) throw new TRPCError({ code: 'BAD_REQUEST', message: 'The passwords are not the same...' })
        const exists = await $prisma.user.findUnique({ where: { email } })
        if (!!exists) throw new TRPCError({ code: 'BAD_REQUEST', message: 'A user with this email already exists.' })
        const salt = randomBytes(16).toString('hex');
        const salted_hashed_password = scryptSync(password, salt, 64).toString('hex');
        const { password: _, verified, ...user } = await $prisma.user.create({
          data: {
            email,
            password: `${salt}:${salted_hashed_password}`
          }
        })
        const { update } = event.context.session
        await update((data: Session) => ({ ...data, userId: user!.id }))
        return { user }
      } catch (error: any) {
        return { error: error?.message.toString() || 'Something went wrong...' }
      }
    }),
  request: authenticedProcedure
    .input(z.optional(z.boolean()))
    .mutation(async ({ ctx: { context: { session, user: { email }, $mailer }}, input: resend }) => {
      const { data, update } = session
      const current = new Date(Date.now()) // Current DateTime
      if (!!resend || !data.verification || (data.verification.validity < current.getTime())) {
        const code = Math.floor(100000 + Math.random() * 900000);
        const validity = current.getTime() + (1000 * 60 * 5)
        await update((data) => ({ ...data, verification: { validity, code }}))
        await $mailer.send({
          from: 'noreply@europascouts.brussels',
          to: email,
          subject: 'Confirmation code',
          text: `Hello World -> code = ${code}`,
          html: signUpTemplate({ code })
        })
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
    .mutation(async ({ ctx: { context: { $prisma, session, user: { email } }}, input: { code } }) => {
      const { data, update } = session
      if (!code) return { success: false }
      if (!data.verification) return { success: false }
      const current = new Date(Date.now()) // Current DateTime
      if (current.getTime() > data.verification.validity) return { success: false }
      if (data.verification.code != +code) return { success: false}
      const { verified } = await $prisma.user.update({ where: { email }, data: { verified: current}})
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
    .mutation(async ({ ctx: { context }, input }) => {
      try {
        // https://www.youtube.com/watch?v=NuyzuNBFWxQ
        const { email, password } = input;
        const { $prisma } = context
        if (!email || !password) throw new TRPCError({ code: 'BAD_REQUEST', message: 'missing data ...' })
        var user = await $prisma.user.findUnique({ where: { email } })
        if (!user || !user.password) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Failed to login' })
        const [salt, key] = user.password.split(':');
        const hashedBuffer = scryptSync(password, salt, 64)
        const keyBuffer = Buffer.from(key, 'hex');
        const match = timingSafeEqual(hashedBuffer, keyBuffer);
        if (!match) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Failed to login' })      
        const { update } = context.session
        await update((data: Session) => ({ ...data, userId: user!.id }))
        const { password: _, verified, ...userInfo } = user
        return userInfo
      } catch (error: any) {
        return { error: error?.message.toString() || 'Something went wrong...' }
      }
    }),
  whoami: authenticedProcedure
    .mutation(({ ctx: { context: { user } } }) => user),
  logout: authenticedProcedure
    .mutation(async ({ ctx: event }) => {
      const { clear } = event.context.session
      await clear()
      return { succes: true }
    }),
  onboard: authenticedProcedure
    .input(
      z.object({
        firstname: z.string(),
        lastname: z.string(),
        gender: z.nativeEnum(Gender),
        date_of_birth: z.date(),
        address: z.object({
          street: z.string(),
          zip: z.string(),
          community: z.string(),
          country: z.string(),
        })
      })
    )
    .mutation(async ({ ctx: event, ctx: { context: { $prisma, session } }, input }) => {
      // https://stackoverflow.com/questions/70197070/create-a-record-and-connect-it-to-an-existing-record-prisma-client-1-to-1-relat
      try {
        const { userId } = session.data
        const { address, ...form } = input
        const { firstname, lastname, gender } = form
        if (!firstname || !lastname || !gender) return { error: 'Missing data...' }
        const person = await $prisma.person.create({
          include: {
            user: true
          },
          data: {
            ...form,
            address: {
              create: {
                ...address
              }
            },
            user: {
              connect: { id: userId }
            }
          }
        })
        return { success: true }
      } catch (error: any) {
        return { error: error?.message.toString() || 'Something went wrong...' }
      }
    })
})

type SignUpTemplateType = {
  code: number
}

const signUpTemplate = ({ code }: SignUpTemplateType) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirm Your Email Address</title>
    <style>
      /* Add some basic styling */
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
      }
      .access-code {
        background-color: #f2f2f2;
        padding: 1rem;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        border-radius: 1rem;
      }
      .cta {
        text-align: center;
        margin: 2rem 0;
      }
      .cta a {
        background-color: #007bff;
        color: #fff;
        padding: 1rem 2rem;
        text-decoration: none;
        border-radius: 0.5rem;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Welcome to Guides and Scouts of Europe!</h1>
      <p>Thank you for signing up. To confirm your email address, please use the following 6-digit access code:</p>
      <div class="access-code">${code.toString()}</div>
      <div class="cta">
        <a href="#">Enter Access Code</a>
      </div>
      <p>If you have any questions, please don't hesitate to contact us at support@guidesandscoutsofeurope.org.</p>
      <p>Best regards,<br>
      Guides and Scouts of Europe</p>
    </div>
  </body>
  </html>`
}