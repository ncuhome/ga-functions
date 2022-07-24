import { VercelRequest, VercelResponse } from '@vercel/node'

import handleData from './data'

/**
 * Fallback /api to /api/data
 */
export default async function (req: VercelRequest, res: VercelResponse) {
  return handleData(req, res)
}

