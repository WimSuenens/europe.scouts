import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { authRouter } from "./auth";

export const appRouter = router({
  auth: authRouter,
  hello: publicProcedure
    .input(
      z.object({
        text: z.string().nullish(),
      })
    )
    .query(({ ctx, input }) => {
      return {
        greetings: `hello ${input?.text ?? 'world'}`,
      }
    }),
})

export type AppRouter = typeof appRouter;
