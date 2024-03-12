// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  components: [
    {
      path: '~/components', // will get any components nested in let's say /components/nested
      pathPrefix: false,
    },
  ],
  imports: {
    dirs: ['composables/**', 'plugins/**'],
  },

  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],

  runtimeConfig: {
    public: {
      oryApiURL: '',
    },
  },

  typescript: {
    shim: false,
  },
})
