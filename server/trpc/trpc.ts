/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/v10/router
 * @see https://trpc.io/docs/v10/procedures
 */
import { initTRPC, TRPCError } from '@trpc/server'
import transformer from 'superjson'
import { ZodError } from 'zod'
import type { Context } from '../trpc/context'

const t = initTRPC.context<Context>().create({
  transformer,
  // errorFormatter: ({ shape, error }) => {
  //   return {
  //     ...shape,
  //     data: {
  //       ...shape.data,
  //       zodError: error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
  //         ? error.cause!.flatten()
  //         : null
  //     }
  //   }
  // }
})


/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure;

/**
 * Protected procedures
 **/
const isAuthenticated = t.middleware(({ ctx: event, next }) => {
  if (!event.context.user)
    throw new TRPCError({ code: 'UNAUTHORIZED' });
 
  return next({ ctx: event });
})
export const authenticedProcedure = t.procedure.use(isAuthenticated);

export const router = t.router;
export const middleware = t.middleware;
