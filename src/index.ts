import axios from 'axios'
import type { AnalyticsAdminServiceClient } from '@google-analytics/admin'
import { BetaAnalyticsDataClient } from '@google-analytics/data'

type PickMatching<T, V> =
  { [K in keyof T as T[K] extends V ? K : never]: T[K] }
type ExtractMethods<T> = PickMatching<T, Function>;

type ParamType<T> = T extends (...args: infer U) => any ? U : never

type ToOmit = 'initialize' | 'warn' | 'close'

export type AllAdminFuncs = Omit<ExtractMethods<AnalyticsAdminServiceClient>, ToOmit>
export type AllDataFuncs = Omit<ExtractMethods<BetaAnalyticsDataClient>, ToOmit>

type OverloadedReturnType<T> =
  T extends { (...args: any[]): infer R; (...args: any[]): infer R; (...args: any[]): infer R; (...args: any[]): infer R } ? R :
  T extends { (...args: any[]): infer R; (...args: any[]): infer R; (...args: any[]): infer R } ? R :
  T extends { (...args: any[]): infer R; (...args: any[]): infer R } ? R :
  T extends (...args: any[]) => infer R ? R : any

type Awaited<T> =
  T extends null | undefined ? T : // special case for `null | undefined` when not in `--strictNullChecks` mode
  T extends object & { then(onfulfilled: infer F): any } ? // `await` only unwraps object types with a callable `then`. Non-object types are not unwrapped
  F extends ((value: infer V, ...args: any) => any) ? // if the argument to `then` is callable, extracts the first argument
  Awaited<V> : // recursively unwrap the value
  never : // the argument to `then` was not callable
  T; // non-object or non-thenable

type PickFirst<T> = T extends any[] ? T[0] : T

type ResponeType<T = any> = PickFirst<Awaited<Exclude<OverloadedReturnType<T>, void>>>


export interface Env {
  project_id: string
  client_email: string
  private_key: string
}

export const DEFAULTS = {
  GA_API: 'https://ga-functions.vercel.app/api'
}

/**
 * set default GA_API url
 * @default 'https://ga-functions.vercel.app/api'
 */
export const setGAURL = (url: string) => {
  DEFAULTS.GA_API = url
}

export const adminFetch = <FuncName extends keyof AllAdminFuncs, K extends ParamType<AllAdminFuncs[FuncName]>, R extends ResponeType<AllAdminFuncs[FuncName]>>(func_name: FuncName, func_args: Partial<K>, env: Env) => {
  const {
    project_id,
    client_email,
    private_key,
  } = env
  return axios.post<R>(`${DEFAULTS.GA_API}/admin`, {
    data: {
      project_id,
      client_email,
      private_key,
      func_name,
      func_args,
    },
  })
}

export const dataFetch = <T extends keyof AllDataFuncs, K extends ParamType<AllDataFuncs[T]>, R extends ResponeType<AllDataFuncs[T]>>(func_name: T, func_args: Partial<K>, env: Env) => {
  const {
    project_id,
    client_email,
    private_key,
  } = env
  return axios.post<R>(`${DEFAULTS.GA_API}/data`, {
    data: {
      project_id,
      client_email,
      private_key,
      func_name,
      func_args,
    },
  })
}
