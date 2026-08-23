// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxt/hints",
    "@nuxtjs/seo",
    "nuxt-studio",
  ],
  studio: {
    repository: {
      provider: "github", // 'github' or 'gitlab'
      owner: "michaelsynan",
      repo: "ultimate-content-blog",
      branch: "main",
    },
  },

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],

  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },

  routeRules: {
    "/": { prerender: true },
  },

  compatibilityDate: "2026-06-30",

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },

  fonts: {
    families: [
      {
        name: "JetBrains Mono",
        provider: "google",
        weights: ["400 700"],
      },
    ],
  },
});
