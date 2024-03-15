<template>
  <div class="bg-bgr-100 px-8 py-6 rounded-lg mx-aut flex flex-col items-center">
    <h1>Login</h1>
    <form class="flex flex-col w-full" @submit.prevent="submit">
      <input type="text" class="rounded-lg border-2 border-bgr-200 p-2 my-2" placeholder="Username" />
      <input type="password" class="rounded-lg border-2 border-bgr-200 p-2 my-2" placeholder="Password" />
      <button type="submit" class="bg-bgr-300 text-white rounded-lg p-2 my-2">Login</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
const email = ref('')
const password = ref('')
const subscription = ref(false)

// initialize the loginFlow
const loginFlowData: LoginFlowData | undefined = await useAuth().getLoginFlowData()
console.log('loginFlowData: ', loginFlowData)

async function submit() {
  console.log({ email: email.value, password: password.value, subscription: subscription.value })
  // TODO: implement login
  const loginData: LoginData = {
    identifier: email.value,
    password: password.value,
    method: 'password',
  }

  try {
    const loginResponse = await useAuth().loginUser(loginFlowData?.id ?? '', loginData)
    console.log('loginResponse', loginResponse)
  } catch (error) {
    console.log('Login failed with error')
  }
}
</script>

<style></style>
