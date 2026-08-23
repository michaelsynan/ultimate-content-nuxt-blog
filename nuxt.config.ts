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
      provider: process.env.NUXT_STUDIO_REPOSITORY_PROVIDER || "github",
      owner: process.env.NUXT_STUDIO_REPOSITORY_OWNER || "",
      repo: process.env.NUXT_STUDIO_REPOSITORY_REPO || "",
      branch: process.env.NUXT_STUDIO_REPOSITORY_BRANCH || "main",
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
