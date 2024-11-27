// import { getServerSession } from '#auth'

import { useNuxtApp } from "nuxt/app"

// type User = {
//   id: number,
//   firstname: string,
//   lastname: string,
//   email: string,
//   birthday: string,
//   password: string,
// }
// const users: User[] = [
//  {
//   id: 0,
//   firstname: 'Wim',
//   lastname: 'Suenens',
//   email: 'wim.suenens@gmail.com',
//   birthday: '28-03-1988',
//   password: 'helloworld'
//  },
//  {
//   id: 1,
//   firstname: 'John',
//   lastname: 'Doe',
//   email: 'john.doe@gmail.com',
//   birthday: '24-01-2011',
//   password: 'helloworld'
//  }

// ]

export default defineEventHandler(async event => {
  // const session = await getServerSession(event);

  // if (!session) return { status: 'unauthenticated!' }

  // const { password, ...user} = users.find(u => u.email === session.user?.email)!;

  // return {
  //  user
  // }
  return ''
})