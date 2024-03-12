import type { QueryObject } from 'ufo'

export default defineEventHandler(async (event) => {
    const host = getRequestHost(event)
    const params = getQuery(event)
    const path = event.context.params!._

    const apiBase = `${useRuntimeConfig().oryApi}`

    const result: {
        req?: {
            host: string
            params: QueryObject
            path: string
        }
        res?: LogoutData
    } = {}

    // Add meta values for development and debug purposes
    if (process.env.NODE_ENV !== 'production' || params.debug) {
        result.req = {
            host,
            params,
            path,
        }
    }

    const oryCookie = getCookie(event, 'ory_session_sleepygangulyeryl1pdqer')

    const url = `${apiBase}/self-service/logout/browser`
    result.res = await $fetch(url, { params, headers: { Cookie: 'ory_session_sleepygangulyeryl1pdqer' + '=' + oryCookie } })

    return result
})
