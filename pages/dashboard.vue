<template>
  <div class="flex flex-col w-full justify-center">
    <h1>Dashbaord</h1>
    <p>Your are logged in with following information:</p>
    {{ session }}
  </div>
</template>

<script lang="ts" setup>
const { session } = useAuth()
</script>

<style></style>
