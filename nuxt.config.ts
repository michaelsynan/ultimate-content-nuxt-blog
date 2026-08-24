// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/hints',
    '@nuxtjs/seo',
    'nuxt-studio'
  ],

  devtools: {
    enabled: true
  },

  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    }
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  fonts: {
    families: [
      {
        name: 'JetBrains Mono',
        provider: 'google',
        weights: ['400 700']
      }
    ]
  },
  studio: {
    repository: {
      provider: (process.env.NUXT_STUDIO_REPOSITORY_PROVIDER || 'github') as 'github' | 'gitlab',
      owner: process.env.NUXT_STUDIO_REPOSITORY_OWNER || '',
      repo: process.env.NUXT_STUDIO_REPOSITORY_REPO || '',
      branch: process.env.NUXT_STUDIO_REPOSITORY_BRANCH || 'main'
    }
  }
})
