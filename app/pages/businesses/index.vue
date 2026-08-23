<script
  setup
  lang="ts"
>
const { data: businesses } = await useAsyncData('all-businesses', () =>
  queryCollection('businesses')
    .all()
)

const featuredBusinesses = computed(() =>
  businesses.value?.filter(b => b.featured) || []
)

const regularBusinesses = computed(() =>
  businesses.value?.filter(b => !b.featured) || []
)
</script>

<template>
  <div>
    <UPageHero
      title="Business Directory"
      description="Discover local businesses in our community. From cafés to bookstores, find trusted services and shops near you."
      :links="[{ label: 'Browse listings', to: '#listings', trailingIcon: 'i-lucide-arrow-down' }]"
      orientation="vertical"
      :ui="{
        root: 'border-b border-default bg-elevated/30',
        wrapper: 'text-center',
        headline: 'justify-center',
        title: 'font-serif text-4xl sm:text-6xl lg:text-7xl',
        description: 'mx-auto max-w-2xl text-center text-lg sm:text-xl',
        links: 'justify-center'
      }"
    >
      <template #headline>
        <span class="text-primary font-semibold tracking-[0.18em] uppercase text-xs">
          Local Directory
        </span>
      </template>
    </UPageHero>

    <UContainer
      id="listings"
      class="py-12 sm:py-16"
    >
      <!-- Featured Businesses Section -->
      <div
        v-if="featuredBusinesses.length"
        class="mb-16"
      >
        <div class="mb-8 flex items-end justify-between gap-6">
          <div>
            <p class="text-primary text-sm font-semibold tracking-wider uppercase">
              Featured
            </p>
            <h2 class="font-serif mt-2 text-3xl font-bold text-highlighted sm:text-4xl">
              Top Picks
            </h2>
          </div>
          <div class="hidden sm:flex items-center gap-2 text-primary">
            <span class="i-lucide-star-off text-lg" />
            <span class="text-sm font-medium">Premium Listings</span>
          </div>
        </div>

        <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <UCard
            v-for="business in featuredBusinesses"
            :key="business.path"
            :to="business.path"
            :ui="{
              root: 'hover:ring-2 hover:ring-primary transition-all ring-1 ring-primary/30',
              body: 'space-y-3'
            }"
          >
            <div
              class="relative flex aspect-[16/9] items-end bg-linear-to-br from-primary/50 via-primary/25 to-elevated p-5"
            >
              <span
                class="absolute top-3 right-3 rounded-full bg-primary/90 px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.12em] text-white uppercase backdrop-blur flex items-center gap-1"
              >
                <span class="i-lucide-star text-xs" />
                Featured
              </span>
              <span
                class="rounded-full bg-default/85 px-3 py-1 font-mono text-[11px] font-medium tracking-[0.12em] text-highlighted uppercase backdrop-blur"
              >
                {{ business.category }}
              </span>
            </div>

            <div class="space-y-2">
              <h3 class="font-serif text-xl font-bold text-highlighted">
                {{ business.title }}
              </h3>
              <p class="text-sm text-muted line-clamp-2">
                {{ business.description }}
              </p>
            </div>

            <div class="space-y-1 text-xs text-muted">
              <p class="flex items-start gap-2">
                <span class="i-lucide-map-pin mt-0.5 shrink-0" />
                <span>{{ business.address }}</span>
              </p>
              <p
                v-if="business.phone"
                class="flex items-center gap-2"
              >
                <span class="i-lucide-phone shrink-0" />
                <span>{{ business.phone }}</span>
              </p>
              <p
                v-if="business.hours"
                class="flex items-start gap-2"
              >
                <span class="i-lucide-clock mt-0.5 shrink-0" />
                <span>{{ business.hours }}</span>
              </p>
            </div>

            <div
              class="flex items-center justify-between border-t border-default pt-3 font-mono text-[11px] tracking-[0.08em] text-primary uppercase"
            >
              <span>View details →</span>
            </div>
          </UCard>
        </div>
      </div>

      <!-- All Businesses Section -->
      <div class="mb-8 flex items-end justify-between gap-6">
        <div>
          <p class="text-primary text-sm font-semibold tracking-wider uppercase">
            Our Community
          </p>
          <h2 class="font-serif mt-2 text-3xl font-bold text-highlighted sm:text-4xl">
            {{ featuredBusinesses.length ? 'All Businesses' : 'Local Businesses' }}
          </h2>
        </div>
        <p class="hidden max-w-xs text-right text-sm text-muted sm:block">
          Supporting local businesses strengthens our community.
        </p>
      </div>

      <div
        v-if="regularBusinesses.length || !featuredBusinesses.length"
        class="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        <UCard
          v-for="business in (featuredBusinesses.length ? regularBusinesses : businesses)"
          :key="business.path"
          :to="business.path"
          :ui="{
            root: 'hover:ring-2 hover:ring-primary/50 transition-all',
            body: 'space-y-3'
          }"
        >
          <div class="flex aspect-[16/9] items-end bg-linear-to-br from-primary/35 via-primary/15 to-elevated p-5">
            <span
              class="rounded-full bg-default/85 px-3 py-1 font-mono text-[11px] font-medium tracking-[0.12em] text-highlighted uppercase backdrop-blur"
            >
              {{ business.category }}
            </span>
          </div>

          <div class="space-y-2">
            <h3 class="font-serif text-xl font-bold text-highlighted">
              {{ business.title }}
            </h3>
            <p class="text-sm text-muted line-clamp-2">
              {{ business.description }}
            </p>
          </div>

          <div class="space-y-1 text-xs text-muted">
            <p class="flex items-start gap-2">
              <span class="i-lucide-map-pin mt-0.5 shrink-0" />
              <span>{{ business.address }}</span>
            </p>
            <p
              v-if="business.phone"
              class="flex items-center gap-2"
            >
              <span class="i-lucide-phone shrink-0" />
              <span>{{ business.phone }}</span>
            </p>
            <p
              v-if="business.hours"
              class="flex items-start gap-2"
            >
              <span class="i-lucide-clock mt-0.5 shrink-0" />
              <span>{{ business.hours }}</span>
            </p>
          </div>

          <div
            class="flex items-center justify-between border-t border-default pt-3 font-mono text-[11px] tracking-[0.08em] text-primary uppercase"
          >
            <span>View details →</span>
          </div>
        </UCard>
      </div>

      <UEmpty
        v-else
        icon="i-lucide-store"
        title="No businesses yet"
        description="Add Markdown files to content/businesses to list your first business."
      />
    </UContainer>

    <UContainer class="pb-16 sm:pb-24">
      <UPageCTA
        title="List Your Business"
        description="Are you a local business owner? Get featured in our directory and connect with more customers in the community."
        :links="[{ label: 'Get started', to: '#listings', icon: 'i-lucide-arrow-up-right' }]"
        variant="subtle"
        :ui="{ title: 'font-serif' }"
      />
    </UContainer>
  </div>
</template>
