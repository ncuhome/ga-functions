import axios from 'axios'
import type { AnalyticsAdminServiceClient } from '@google-analytics/admin'
import type { BetaAnalyticsDataClient } from '@google-analytics/data'

type PickMatching<T, V> =
  { [K in keyof T as T[K] extends V ? K : never]: T[K] }
type ExtractMethods<T> = PickMatching<T, Function>;

type ParamType<T> = T extends (...args: infer U) => any ? Partial<U> : never
type CallReturnType<T> = T extends (...args: any[]) => infer R ? R : T

type ToOmit = 'initialize' | 'warn' | 'close'

export type AllAdminFuncs = Omit<ExtractMethods<AnalyticsAdminServiceClient>, ToOmit>
export type AllDataFuncs = Omit<ExtractMethods<BetaAnalyticsDataClient>, ToOmit>

export interface Env {
  project_id: string
  client_email: string
  private_key: string
}

export const GA_API = 'https://ga-functions.vercel.app/api'

export const adminFetch = <T extends keyof AllAdminFuncs>(func_name: T, func_args: ParamType<AllAdminFuncs[T]>, env: Env) => {
  const {
    project_id,
    client_email,
    private_key,
  } = env
  return axios.post<CallReturnType<AllAdminFuncs[T]>>(`${GA_API}/admin`, {
    data: {
      project_id,
      client_email,
      private_key,
      func_name,
      func_args,
    },
  })
}

export const dataFetch = <T extends keyof AllDataFuncs>(func_name: T, func_args: ParamType<AllDataFuncs[T]>, env: Env) => {
  const {
    project_id,
    client_email,
    private_key,
  } = env
  return axios.post<CallReturnType<AllDataFuncs[T]>>(`${GA_API}/data`, {
    data: {
      project_id,
      client_email,
      private_key,
      func_name,
      func_args,
    },
  })
}
