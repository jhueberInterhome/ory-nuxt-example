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

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/test-utils/module',
    '@pinia/nuxt',
    'nuxt-icons',
    '@vueuse/nuxt',
    'nuxt-headlessui',
    'floating-vue/nuxt',
    '@nuxtjs/web-vitals',
  ],

  runtimeConfig: {
    webccApiUrl: '',
    confApiUrl: '',

    public: {
      oryApi: '',
      iframeUrl: '',
      sentry: {
        enabled: true,
        release: '' || 'release-' + Date.now(),
        org: '',
        project: '',
        dsn: '',
        environment: '',
      },
      environment: process.env.K8S_NAMESPACE || 'LOCAL',
    },
  },

  headlessui: {
    prefix: 'Headless',
  },
  $test: {
    runtimeConfig: {
      test: true,
    },
  },
  build: {
    transpile: ['@vuepic/vue-datepicker'],
  },

  webVitals: {
    provider: 'gtm',
  },

  typescript: {
    shim: false,
  },

  sourcemap: {
    server: true,
    client: true,
  },
})
