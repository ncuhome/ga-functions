import { VercelRequest, VercelResponse } from '@vercel/node'
import { BetaAnalyticsDataClient } from '@google-analytics/data';

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

  const gaClient = new BetaAnalyticsDataClient({
    projectId: project_id,
    credentials: {
      client_email,
      private_key
    }
  })

  try {
    const [response] = await gaClient[func_name](...func_args);
    res.send(response)
  } catch (error) {
    console.error(error)
    res.status(200).send(error)
  }
}
