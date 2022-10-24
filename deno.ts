import { serve } from "https://deno.land/std@0.160.0/http/server.ts";

const parseHeaders = (originalHeaders: Request['headers']) => {
  var headers = {};
  originalHeaders.forEach((val, key) => {
    headers[key] = val;
  })
  delete headers['host']
  delete headers['user-agent']
  delete headers['connection']
  headers['content-type'] = 'application/json'
  return headers
}

async function handleRequest(request: Request) {
  const url = new URL(request.url);

  url.hostname = "ga-functions.vercel.app"
  url.port = ""
  url.protocol = "https:"

  const newHeaders = parseHeaders(request.headers)

  const body = await request.json()

  const res = await fetch(url.href, {
    method: request.method,
    headers: newHeaders,
    body: JSON.stringify(body),
  })

  return res;
}

serve(handleRequest);
