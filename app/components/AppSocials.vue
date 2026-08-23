<script setup lang="ts">
const appConfig = useAppConfig()

const socialIcons: Record<string, string> = {
  github: 'i-simple-icons-github',
  instagram: 'i-simple-icons-instagram',
  linkedin: 'i-simple-icons-linkedin',
  x: 'i-simple-icons-x'
}

const socials = computed(() => Object.entries(
  appConfig.socials as Record<string, string | null | undefined>
).flatMap(([name, url]) => {
  if (typeof url !== 'string' || !url.trim()) {
    return []
  }

  return [{
    name,
    url,
    icon: socialIcons[name] ?? 'i-lucide-link'
  }]
}))
</script>

<template>
  <nav
    v-if="socials.length"
    aria-label="Social links"
    class="flex items-center gap-1"
  >
    <UButton
      v-for="social in socials"
      :key="social.name"
      :to="social.url"
      :icon="social.icon"
      :aria-label="social.name"
      :title="social.name"
      target="_blank"
      rel="noopener noreferrer"
      color="neutral"
      variant="ghost"
    />
  </nav>
</template>
