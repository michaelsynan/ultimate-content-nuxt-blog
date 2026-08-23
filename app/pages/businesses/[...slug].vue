<script
  setup
  lang="ts"
>
const route = useRoute()

const { data: business } = await useAsyncData(
  `business-${route.path}`,
  () => queryCollection('businesses')
    .path(route.path)
    .first()
)

if (!business.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Business not found'
  })
}

useSeoMeta({
  title: () => business.value?.title,
  description: () => business.value?.description,
  ogTitle: () => business.value?.title,
  ogDescription: () => business.value?.description
})
</script>

<template>
  <article
    v-if="business"
    class="pb-16 sm:pb-24"
  >
    <UContainer class="py-8 sm:py-12">
      <UButton
        to="/businesses#listings"
        label="All businesses"
        icon="i-lucide-arrow-left"
        color="neutral"
        variant="link"
        class="-ms-3 mb-10"
      />

      <div class="mb-10 flex items-start justify-between gap-6">
        <div class="flex-1 space-y-4">
          <div>
            <span
              class="inline-block rounded-full bg-primary/15 px-3 py-1 font-mono text-[11px] font-medium tracking-[0.12em] text-primary uppercase"
            >
              {{ business.category }}
            </span>
          </div>
          <h1 class="font-serif text-4xl font-bold text-highlighted sm:text-5xl lg:text-6xl">
            {{ business.title }}
          </h1>
          <p class="text-lg text-muted sm:text-xl">
            {{ business.description }}
          </p>
        </div>
      </div>

      <UDivider class="my-8" />

      <div class="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div class="prose prose-primary dark:prose-invert max-w-none">
          <ContentRenderer
            :value="business"
            class="nuxt-content"
          />
        </div>

        <aside class="space-y-6">
          <UCard :ui="{
            body: 'space-y-4'
          }">
            <h3 class="font-serif text-lg font-bold text-highlighted">
              Contact Information
            </h3>

            <div class="space-y-3 text-sm">
              <div class="flex items-start gap-3">
                <span class="i-lucide-map-pin mt-0.5 shrink-0 text-primary" />
                <div>
                  <p class="font-medium text-highlighted">Address</p>
                  <p class="text-muted">{{ business.address }}</p>
                </div>
              </div>

              <div
                v-if="business.phone"
                class="flex items-start gap-3"
              >
                <span class="i-lucide-phone mt-0.5 shrink-0 text-primary" />
                <div>
                  <p class="font-medium text-highlighted">Phone</p>
                  <p class="text-muted">{{ business.phone }}</p>
                </div>
              </div>

              <div
                v-if="business.website"
                class="flex items-start gap-3"
              >
                <span class="i-lucide-globe mt-0.5 shrink-0 text-primary" />
                <div>
                  <p class="font-medium text-highlighted">Website</p>
                  <UButton
                    :to="business.website"
                    target="_blank"
                    variant="link"
                    color="primary"
                    size="xs"
                    class="-ms-3"
                    :label="business.website"
                  />
                </div>
              </div>

              <div
                v-if="business.hours"
                class="flex items-start gap-3"
              >
                <span class="i-lucide-clock mt-0.5 shrink-0 text-primary" />
                <div>
                  <p class="font-medium text-highlighted">Hours</p>
                  <p class="text-muted">{{ business.hours }}</p>
                </div>
              </div>
            </div>

            <UDivider />

            <UButton
              v-if="business.website"
              :to="business.website"
              target="_blank"
              label="Visit Website"
              icon="i-lucide-external-link"
              color="primary"
              block
            />
          </UCard>
        </aside>
      </div>
    </UContainer>
  </article>
</template>
