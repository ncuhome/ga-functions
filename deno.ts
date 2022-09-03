import { serve } from "https://deno.land/std@0.149.0/http/server.ts";

async function handleRequest(request: Request) {
  const url = new URL(request.url);

  url.hostname = "ga-functions.vercel.app"
  url.port = ""
  url.protocol = "https:"

  const res = await fetch(url.href, {
    method: request.method,
    headers: request.headers,
    body: request.body
  })

  return res;
}

serve(handleRequest);
