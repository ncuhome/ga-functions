require('dotenv/config')
const axios = require('axios')

const {
  GA_PROJECT_ID,
  GA_PRIVATE_KEY,
  GA_CLIENT_EMAIL
} = process.env

const API = 'http://localhost:3000/api'


axios.post(`${API}/admin`, {
  data: {
    project_id: GA_PROJECT_ID,
    client_email: GA_CLIENT_EMAIL,
    private_key: GA_PRIVATE_KEY,
    func_name: 'listAccounts'
  }
}).then(res => res.data)
  .then(console.log)

axios.post(`${API}/admin`, {
  data: {
    project_id: GA_PROJECT_ID,
    client_email: GA_CLIENT_EMAIL,
    private_key: GA_PRIVATE_KEY,
    func_name: 'listProperties',
    func_args: [
      {
        filter: 'parent:accounts/80324378',
        pageSize: 200
      }
    ]
  }
}).then(res => res.data)
  .then(items => console.log(items.map(item => item.displayName)))
