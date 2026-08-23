<script
  setup
  lang="ts"
>
const appConfig = useAppConfig()

const { data: posts } = await useAsyncData('home-posts', () =>
  queryCollection('posts')
    .order('date', 'DESC')
    .all()
)

const formatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
})

function formatDate(date: string) {
  return formatter.format(new Date(`${date}T12:00:00`))
}
</script>

<template>
  <div>
    <UPageHero
      :title="appConfig.site.title"
      :description="appConfig.site.description"
      :links="[{ label: 'Read the latest', to: '#latest', trailingIcon: 'i-lucide-arrow-down' }]"
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
          Nuxt Content template
        </span>
      </template>
    </UPageHero>

    <UContainer
      id="latest"
      class="py-12 sm:py-16"
    >
      <div class="mb-8 flex items-end justify-between gap-6">
        <div>
          <p class="text-primary text-sm font-semibold tracking-wider uppercase">
            The latest
          </p>
          <h1 class="font-serif mt-2 text-3xl font-bold text-highlighted sm:text-4xl">
            Latest posts
          </h1>
        </div>
        <p class="hidden max-w-xs text-right text-sm text-muted sm:block">
          Example content to help you start shaping your own publication.
        </p>
      </div>

      <UBlogPosts
        v-if="posts?.length"
        :posts="posts.map(post => ({
          title: post.title,
          description: post.description,
          date: formatDate(post.date),
          to: post.path
        }))"
        class="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        <template #header="{ post }">
          <div class="flex aspect-[16/9] items-end bg-linear-to-br from-primary/35 via-primary/15 to-elevated p-5">
            <span
              class="rounded-full bg-default/85 px-3 py-1 font-mono text-[11px] font-medium tracking-[0.12em] text-highlighted uppercase backdrop-blur"
            >
              {{posts?.find(item => item.path === post.to)?.category}}
            </span>
          </div>
        </template>

        <template #date="{ post }">
          <span class="font-mono text-[11px] tracking-[0.08em] text-muted uppercase">
            {{ post.date }}
          </span>
        </template>

        <template #footer="{ post }">
          <div
            class="flex items-center justify-between border-t border-default p-2 font-mono text-[11px] tracking-[0.08em] text-muted uppercase"
          >
            <span>By {{posts?.find(item => item.path === post.to)?.author}}</span>
            <span class="font-medium text-primary">Read story →</span>
          </div>
        </template>
      </UBlogPosts>

      <UEmpty
        v-else
        icon="i-lucide-newspaper"
        title="No stories yet"
        description="Add Markdown files to content/posts to publish the first edition."
      />
    </UContainer>

    <UContainer
      id="newsletter"
      class="pb-16 sm:pb-24"
    >
      <UPageCTA
        title="Make it your own."
        description="Replace these example posts with your own writing, then tailor the navigation, colors, and calls to action for your audience."
        :links="[{ label: 'Start publishing', to: '#latest', icon: 'i-lucide-arrow-up-right' }]"
        variant="subtle"
        :ui="{ title: 'font-serif' }"
      />
    </UContainer>
  </div>
</template>
