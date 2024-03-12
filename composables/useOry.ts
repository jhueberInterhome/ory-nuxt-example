export const useOry = defineStore('ory', () => {
  async function loadSession(headers: Record<string, string>) {
    const url = '/ory-api/sessions/whoami'

    const { data, error } = await useFetch(url, { headers, credentials: 'include' })

    if (error.value) {
      console.log('##############################')
      console.log('error while loading ory session: ')
      console.log('message: ', error.value.message)
      console.log('name: ', error.value.name)
      console.log('statusCode: ', error.value.statusCode)
      console.log('statusMessage: ', error.value.statusMessage)
      console.log('##############################')
    }

    return data.value?.res
  }

  async function getLogoutUrl(headers: Record<string, string>) {
    const url = '/ory-api/self-service/logout'

    const { data, error } = await useFetch(url, { headers })

    if (error.value) {
      console.log('error while getting logout url: ', error)
    }

    return data.value?.res
  }

  return {
    loadSession,
    getLogoutUrl,
  }
})
