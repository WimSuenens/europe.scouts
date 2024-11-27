import { PrismaClient } from "@prisma/client";
import prisma from "~/lib/prisma";

declare module 'h3' {
  interface H3EventContext {
    prisma: PrismaClient
  }
}

export default defineEventHandler(event => {
  event.context.prisma = prisma;
})