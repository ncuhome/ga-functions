import Cache from 'tmp-cache'

export const cache = new Cache<string, any>(20)
