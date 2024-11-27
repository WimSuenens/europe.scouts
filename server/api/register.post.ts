import { scryptSync, randomBytes } from 'crypto';
import prisma from '~/lib/prisma';

// https://www.youtube.com/watch?v=NuyzuNBFWxQ

export type Register = {
  email: string,
  password: string,
  password_confirm: string
}

export default defineEventHandler(async event => {
  const { email, password, password_confirm } = await readBody(event) as Register;
  if (!email || !password || !password_confirm) throw createError({
    statusCode: 500,
    message: 'Missing info...'
  })
  if (password != password_confirm) throw createError({
    statusCode: 500,
    message: 'Passwords are not the same'
  })

  var exists = await prisma.user.findUnique({ where: { email } })

  if (!!exists) throw createError({
    statusCode: 500,
    message: 'A user with this email already exists.'
  })

  const salt = randomBytes(16).toString('hex');
  const salted_hashed_password = scryptSync(password, salt, 64).toString('hex');

  const { password: _, ...user } = await prisma.user.create({
    data: {
      email,
      password: `${salt}:${salted_hashed_password}`
    }
  })
  return user
})