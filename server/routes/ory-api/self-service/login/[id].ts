import type { QueryObject } from 'ufo'
import { FrontendApi, Configuration } from '@ory/client'

export default defineEventHandler(async (event) => {
  const host = getRequestHost(event)
  const params = getQuery(event)
  const path = event.context.params!._
  const body = await readBody(event)
  const flow = event.context.params!.id

  const config = useRuntimeConfig()
  const basePath = config.public.oryApi
  // const header = getRequestHeaders(event)
  const ory = new FrontendApi(
    new Configuration({
      basePath,
      baseOptions: {
        // Ensures we send cookies in the CORS requests.
        withCredentials: true,
      },
    }),
  )

  const result: {
    req?: {
      host: string
      params: QueryObject
      path: string
    }
    res?: LoginResponse | undefined
  } = {}

  // Add meta values for development and debug purposes
  if (process.env.NODE_ENV !== 'production' || params.debug) {
    result.req = {
      host,
      params,
      path,
    }
  }

  const loginFlowBody = {
    flow,
    updateLoginFlowBody: body,
    // cookie: header.cookie,
  }

  console.log('loginFlowBody: ', loginFlowBody)

  await ory
    .updateLoginFlow(loginFlowBody)
    .then(({ data }) => {
      result.res = data
    })
    .catch((error) => {
      // If logged out, send to login page
      console.error('Error while sending the login request: ', error)
      result.res = error
    })

  // Set the cookie and the csrf token
  // TODO: implement
  console.log('session is: ', result.res)

  return result
})
