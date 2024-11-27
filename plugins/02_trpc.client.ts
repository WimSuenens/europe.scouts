import type { NuxtApp } from '#app';
import { createTRPCNuxtClient, httpBatchLink } from 'trpc-nuxt/client'
import type { AppRouter } from '~/server/trpc/routers'
import transformer from 'superjson'

// interface IApi {
//   baseURL: string;
// }

type Client = ReturnType<typeof createTRPCNuxtClient<AppRouter>>;

// declare module "#app" {
//   interface NuxtApp {
//     $client: Client;
//   }
// }

export default defineNuxtPlugin(() => {
  /**
   * createTRPCNuxtClient adds a `useQuery` composable
   * built on top of `useAsyncData`.
   */
  const client: Client = createTRPCNuxtClient<AppRouter>({
    transformer,
    links: [
      httpBatchLink({
        url: '/api/trpc',
      }),
    ],
  })

  return {
    provide: {
      client: client!,
    },
  }
})
