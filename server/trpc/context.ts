import { inferAsyncReturnType } from "@trpc/server"

/**
 * Creates context for an incoming request
 * @see https://trpc.io/docs/context
 */
export const createContext = () => ({});

export type Context = inferAsyncReturnType<typeof createContext>
