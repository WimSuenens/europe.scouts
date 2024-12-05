import type { AuthStatus } from "./types";

// export type AuthType = { [K in AuthStatus]: {
//   accepted: K,
//   redirect: Record<Exclude<AuthStatus, K>, string>
// } }[AuthStatus]

// type AuthType<T extends AuthStatus = AuthStatus> = { [K in T]: {
//   accepted: K,
//   redirect: Record<Exclude<T, K>, string>
// } }[T]

export type AuthType<T extends PropertyKey> = { [K in T]: {
  accepted: K,
  redirect: Record<Exclude<T, K>, string>
} }[T]

declare module "#app" {
  interface PageMeta {
    auth?: { accepted: Array<AuthStatus> } | AuthType<AuthStatus>;
    // roleNeeded?: string[];
  }
}

export {}