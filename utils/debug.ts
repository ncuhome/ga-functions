import debug from 'debug'

const tag = debug('ga-functions')

export const dlog = (...args: string[]) => tag(new Date().toLocaleTimeString(), ...args)
