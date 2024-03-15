export const useAuth = defineStore('auth', () => {
  const session: Ref<Session | undefined> = useCookie('interhome_session', undefined)
  const csrfToken: Ref<string | undefined> = useCookie('csrf_token')

  // Computed property that determines, if the user is logged in
  const isAuthenticated = computed(async () => {
    if (session.value) {
      return true
    }

    // If the session is not loaded, load the session and check if it is still undefined
    await loadSession()
    return !!session.value
  })

  async function loadSession() {
    // Load the session from ory via the /ory-api/sessions/whoami nuxt server endpoint
    const headers = useRequestHeaders(['cookie'])
    const { data, error } = await useFetch<{ req: any; res: Session | undefined }>('/ory-api/sessions/whoami', { headers, credentials: 'include' })

    if (error.value) {
      console.log('error while loading session: ', error)
    }

    session.value = data.value?.res
  }

  // Gets the logout data including the url from Ory via the /ory-api/self-service/logoutflow nuxt server endpoint
  async function getLogoutData() {
    const headers = useRequestHeaders(['cookie'])

    const { data, error } = await useFetch<{ req: any; res: LogoutFlowData }>('/ory-api/self-service/logoutflow', { headers })

    if (error.value) {
      console.log('error while getting logout url: ', error)
    }

    return data.value?.res
  }

  // Gets the login flow data from Ory via the /ory-api/self-service/loginflow nuxt server endpoint
  async function getLoginFlowData() {
    const { data, error } = await useFetch<{ req: any; res: LoginFlowData }>('/ory-api/self-service/loginflow')

    if (error.value) {
      console.log('error while getting login flow data: ', error)
    }

    // Get the csrf_token from the response by ranging over the ui.nodes and finding the csrf_token node
    if (data.value?.res?.ui?.nodes) {
      const csrfNode = data.value.res.ui.nodes.find((node) => node.type === 'input' && (node.attributes as UiNodeInputAttributes).name === 'csrf_token')
      if (csrfNode) {
        csrfToken.value = (csrfNode.attributes as UiNodeInputAttributes).value
      }
    }

    return data.value?.res
  }

  // Gets the register flow data from Ory via the /ory-api/self-service/registerflow nuxt server endpoint
  async function getRegisterFlowData() {
    const { data, error } = await useFetch<{ req: any; res: RegistrationFlowData }>('/ory-api/self-service/registerflow')

    if (error.value) {
      console.log('error while getting register flow data: ', error)
    }

    return data.value?.res
  }

  // Gets the recovery flow data from Ory via the /ory-api/self-service/recoveryflow nuxt server endpoint
  async function getRecoveryFlowData() {
    const { data, error } = await useFetch<{ req: any; res: RecoveryFlowData }>('/ory-api/self-service/recoveryflow')

    if (error.value) {
      console.log('error while getting recovery flow data: ', error)
    }

    return data.value?.res
  }

  // Logs the user in with the given credentials
  async function loginUser(flowID: string, body: LoginData) {
    const headers = useRequestHeaders(['cookie'])

    // Update the login data
    body.csrf_token = csrfToken.value

    const data = await $fetch<{ req: any; res: LoginResponse }>(`/ory-api/self-service/login/${flowID}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      onResponseError: (error) => {
        console.log('error while logging in: ', error)
        throw error
      },
    })

    return data.res
  }

  // Registers the user with the given credentials
  async function registerUser(flowID: string, body: RegistrationData) {
    const headers = useRequestHeaders(['cookie'])

    // Update the registration data
    body.csrf_token = csrfToken.value

    const data = await $fetch<{ req: any; res: RegistrationResponse }>(`/ory-api/self-service/registration/${flowID}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      onResponseError: (error) => {
        console.log('error while registering user: ', error)
        throw error
      },
    })

    return data.res
  }

  return {
    isAuthenticated,
    getLoginFlowData,
    getLogoutData,
    getRegisterFlowData,
    getRecoveryFlowData,
    loginUser,
    registerUser,
    session,
  }
})
