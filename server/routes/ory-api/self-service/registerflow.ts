import type { QueryObject } from 'ufo'
import { FrontendApi, Configuration } from '@ory/client'

export default defineEventHandler(async (event) => {
  const host = getRequestHost(event)
  const params = getQuery(event)
  const path = event.context.params!._

  const config = useRuntimeConfig()
  const basePath = config.public.oryApi
  // const header = getRequestHeaders(event)

  const ory = new FrontendApi(
    new Configuration({
      basePath,
      baseOptions: {
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
    res?: RegistrationFlowData | undefined
  } = {}

  // Add meta values for development and debug purposes
  if (process.env.NODE_ENV !== 'production' || params.debug) {
    result.req = {
      host,
      params,
      path,
    }
  }

  await ory
    .createBrowserRegistrationFlow()
    .then(({ data }) => {
      result.res = data
    })
    .catch((error) => {
      console.error('Error while getting registration flow: ', error)
      result.res = undefined
    })

  return result
})
