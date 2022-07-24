# ga-functions

A Vercel serverless functions wrapper for [@google-analytics/data](https://github.com/googleapis/nodejs-analytics-data)

## Usage

HOST: `https://ga-functions.vercel.app` or your self depoly host

### Data

API: `/api/data`

METHOD: `POST`

BODY: object

- `project_id` - {string}

  The project_id of your Google Cloud Platform API project

- `client_email` - {string}

  The client_email, which are in GOOGLE_APPLICATION_CREDENTIALS

- `private_key` - {string}
-
  The private_key, which are in GOOGLE_APPLICATION_CREDENTIALS

- `func_name` - {string}

  Function name to call, there are `runReport`, `runPivotReport`, `runRealtimeReport`, `batchRunReports`, `batchRunPivotReport`

- `func_args` - {any[]}

  Args for `func_name`

More details, see [Google Analytics Data Documentation](https://developers.google.com/analytics/devguides/reporting/data/v1/quickstart-client-libraries)

## Example

```ts
import axios from 'axios'
import 'dotenv/config'

const url = 'https://ga-functions.vercel.app/api/'

axios.post(url, {
  data: {
    project_id: process.env.GA_PROJECT_ID,
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY,
    func_name: 'runReport',
    func_args: [
      {
        property: `properties/${process.env.GA_PROPERTY_KEY}`,
        dateRanges: [
          {
            startDate: '12daysAgo',
            endDate: 'today'
          }
        ],
        dimensions: [
          {
            name: 'day',
          },
          {
            name: 'eventName',
          },
        ],
        metrics: [
          {
            name: 'eventCount',
          },
        ],
      }
    ]
  }
})
  .then(res => {
    console.log(...res.data.rows)
  })
  .catch(e => console.log('Error'))
```

## Deploy

```sh
git clone https://github.com/ncuhome/ga-functions
```

```sh
vercel --prod
```

## License

[MIT](LICENSE)
