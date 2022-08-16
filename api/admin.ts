import { VercelRequest, VercelResponse } from '@vercel/node'
import { AnalyticsAdminServiceClient } from '@google-analytics/admin';
import { dlog } from '../utils/debug';

export default async function (req: VercelRequest, res: VercelResponse) {
  const {
    project_id,
    client_email,
    private_key,
    func_name,
    func_args = []
  } = req.body?.data || {}

  if (!project_id || !client_email || !private_key || !func_name) {
    res.status(200).send('Missing required parameters')
    return
  }

  const client = new AnalyticsAdminServiceClient({
    projectId: project_id,
    credentials: {
      client_email,
      private_key,
    },
  })

  try {
    const [response] = await client[func_name](...func_args);
    dlog(func_name, response)
    res.send(response)
  } catch (error) {
    console.error(error)
    res.status(200).send(error)
  }
}
