import { VercelRequest, VercelResponse } from '@vercel/node'
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { cache } from '../utils/cache';

const dataKey = (id: string) => `data_${id}`

export default async function (req: VercelRequest, res: VercelResponse) {
  const {
    project_id,
    client_email,
    private_key,
    func_name,
    func_args
  } = req.body?.data || {}

  if (!project_id || !client_email || !private_key || !func_name || !func_args) {
    res.status(200).send('Missing required parameters')
    return
  }

  const key = dataKey(project_id)

  let client: BetaAnalyticsDataClient
  if (cache.has(key)) {
    client = cache.get(key)
  } else {
    client = new BetaAnalyticsDataClient({
      projectId: project_id,
      credentials: {
        client_email,
        private_key,
      },
    })
    cache.set(key, client)
  }

  try {
    const [response] = await client[func_name](...func_args);
    res.send(response)
  } catch (error) {
    console.error(error)
    res.status(200).send(error)
  }
}
