import type { User } from "@prisma/client";

export type Session = {
  userId: string,
  verification?: {
    code: number,
    validity: number,
  }
};

type SessionDataT = Record<string, any>;
type SessionData<T extends SessionDataT = SessionDataT> = T;
type SessionUpdate<T extends SessionDataT = SessionDataT> = Partial<SessionData<T>> | ((oldData: SessionData<T>) => Partial<SessionData<T>> | undefined);

declare module 'h3' {
  interface H3EventContext {
    session: {
      readonly id: string | undefined;
      readonly data: Session;
      update: (update: SessionUpdate<Session>) => Promise<any>;
      // update: (update: Session) => Promise<any>;
      clear: () => Promise<any>;
    }
    user: Omit<User, 'password'>
  }
}

// https://nuxt.com/docs/guide/directory-structure/pages/#typing-custom-metadata
// declare module 'vue-router' {
//   interface PageMeta {
//     auth?: AuthType;
//     // roleNeeded?: string[];
//   }
// }

// declare module 'vue-router' {
//   interface RouteMeta extends UnwrapRef<PageMeta> {
//   }
// }

// declare module "#app" {
//   interface PageMeta {
//     auth?: AuthType;
//     // roleNeeded?: string[];
//   }
// }

// type MailConfig = {
//   host: string
//   user: string
//   password: string
// }

// declare module '@nuxt/schema' {
//   interface RuntimeConfig {
//     // helloworld: string
//     mail: MailConfig
//   }
// }

// It is always important to ensure you import/export something when augmenting a type
export {}