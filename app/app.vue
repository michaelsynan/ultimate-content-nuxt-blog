<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const appConfig = useAppConfig()
const { title, description } = appConfig.site

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink
          to="/"
          class="font-serif text-xl font-bold tracking-tight text-highlighted focus-visible:outline-3 outline-primary/25 rounded-md py-1 -ms-1"
        >
          {{ title }}
        </NuxtLink>

        <UNavigationMenu
          :items="[
            { label: 'Latest', to: '/' },
            { label: 'Articles', to: '/#latest' },
            { label: 'Guides', to: '/#latest' },
            { label: 'Ideas', to: '/#latest' }
          ]"
          class="hidden lg:flex"
        />
      </template>

      <template #right>
        <UButton
          label="Get started"
          to="/#newsletter"
          color="primary"
          variant="soft"
          class="hidden sm:inline-flex"
        />
        <UColorModeButton />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          © {{ new Date().getFullYear() }} {{ title }}
        </p>
      </template>

      <template #right>
        <div class="flex items-center gap-3">
          <AppSocials />
          <p class="text-sm text-muted">
            Built with Nuxt Content and Nuxt UI
          </p>
        </div>
      </template>
    </UFooter>
  </UApp>
</template>
