import * as Sentry from '@sentry/vue'

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()
  const {
    public: { sentry },
  } = useRuntimeConfig()

  if (!sentry.enabled) {
    return
  }

  if (!sentry.dsn) {
    console.warn('Sentry DSN not set, skipping Sentry initialization from client')
    return
  }

  console.log('Sentry DSN set, initializing Sentry from client')

  Sentry.init({
    app: nuxtApp.vueApp,
    dsn: sentry.dsn,
    environment: sentry.environment,
    integrations: [Sentry.browserTracingIntegration({ router }), Sentry.replayIntegration()],

    // Configure this whole part as you need it!

    tracesSampleRate: 0.1, // Change in prod

    // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
    // tracePropagationTargets: ["localhost"],
    replaysSessionSampleRate: 0.1, // Change in prod
    replaysOnErrorSampleRate: 1.0, // Change in prod if necessary
  })
})
