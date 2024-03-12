<template>
  <div class="max-w-xl">
    <h1>Ory Test A</h1>

    <div v-if="!sessionGW">
      <p>Click on "login" or "Sign Up" below to sign in.</p>
      <li><a :href="basePath + '/ui/login'" data-testid="sign-in">Login</a></li>
      <li>
        <a :href="basePath + '/ui/registration'" data-testid="sign-up">Sign Up</a>
      </li>
    </div>

    <h3 v-if="sessionGW">Calling <code>toSession()</code></h3>
    <div v-if="sessionGW" class="long">
      <p>Use the SDK's <code>toSession()</code> call to receive the session information, for example the authentication methods used:</p>
      <pre><code data-testid='ory-response'>{{ sessionGW.authentication_methods }}</code></pre>
    </div>

    <h3 v-if="sessionGW">Common Actions</h3>
    <ul v-if="sessionGW">
      <li><a :href="logoutUrl" data-testid="logout">Logout</a></li>
      <li>
        <a :href="basePath + '/ui/settings'" data-testid="settings">Settings</a>
      </li>
    </ul>
    {{ sessionGW }}
  </div>
</template>

<script lang="ts" setup>
import { FrontendApi, Configuration } from '@ory/client'

const basePath = 'http://localhost:4000'

const sessionGW: Ref<SessionGW | null> = ref(null)

const logoutUrl: Ref<string> = ref('')

const ory = new FrontendApi(
  new Configuration({
    basePath,
    baseOptions: {
      // Ensures we send cookies in the CORS requests.
      withCredentials: true,
    },
  }),
)

onMounted(() => {
  nextTick(async () => {
    await ory.toSession().then(({ data }) => {
      sessionGW.value = data
      ory.createBrowserLogoutFlow().then(({ data }) => {
        logoutUrl.value = data.logout_url
      })
    })
  })
})
</script>
