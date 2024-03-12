import type { QueryObject } from 'ufo'

export default defineEventHandler(async (event) => {
  const host = getRequestHost(event)
  const params = getQuery(event)
  const path = event.context.params!._

  const config = useRuntimeConfig()
  const apiBase = config.public.oryApi
  const header = getRequestHeaders(event)
  console.log('###########header: ', header)

  const result: {
    req?: {
      host: string
      params: QueryObject
      path: string
    }
    res?: SessionGW
  } = {}

  // Add meta values for development and debug purposes
  if (process.env.NODE_ENV !== 'production' || params.debug) {
    result.req = {
      host,
      params,
      path,
    }
  }

  const oryCookie = getCookie(event, 'ory_session_beautifulherschelezuqg9jgc4r')
  console.log('oryCookie: ', oryCookie)

  const url = `${apiBase}/sessions/whoami`
  // const url = 'https://sleepy-ganguly-eryl1pdqer.projects.oryapis.com/sessions/whoami'

  // result.res = await $fetch(url, { params, headers: { Cookie: 'ory_session_beautifulherschelezuqg9jgc4r' + '=' + oryCookie } })
  result.res = await $fetch(url, { params, header })

  return result
})
