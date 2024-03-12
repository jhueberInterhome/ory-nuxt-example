<template>
  <div>
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
    <div v-if="sessionGW" class="flex flex-grow p-20 bg-neutral-300 rounded-xl">Ich bin eingeloggt: {{ sessionGW }}</div>
  </div>
</template>

<script lang="ts" setup>
const sessionGW: Ref<SessionGW | undefined> = ref()
// const logoutData: Ref<LogoutData | undefined> = ref()
const logoutUrl: Ref<string> = ref('')

// const basePath = 'https://sleepy-ganguly-eryl1pdqer.projects.oryapis.com'
// const basePath = 'http://localhost:4000'
const config = useRuntimeConfig()
const basePath = config.public.oryApi

const ory = useOry()
const headers = useRequestHeaders(['cookie'])

sessionGW.value = await ory.loadSession(headers)

console.log('sessionGW', sessionGW.value)

// if (sessionGW) {
//   logoutData.value = (await ory.getLogoutUrl(headers)) as LogoutData
//   logoutUrl.value = basePath + '/self-service/logout?token=' + logoutData.value.logout_token
// }
</script>
