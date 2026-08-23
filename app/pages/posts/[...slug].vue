<script setup lang="ts">
const route = useRoute()

const { data: post } = await useAsyncData(
  `post-${route.path}`,
  () => queryCollection('posts')
    .path(route.path)
    .first()
)

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Post not found'
  })
}

const formatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric'
})

const publishedOn = computed(() => post.value
  ? formatter.format(new Date(`${post.value.date}T12:00:00`))
  : ''
)

useSeoMeta({
  title: () => post.value?.title,
  description: () => post.value?.description,
  ogTitle: () => post.value?.title,
  ogDescription: () => post.value?.description,
  articlePublishedTime: () => post.value?.date
})
</script>

<template>
  <article
    v-if="post"
    class="pb-16 sm:pb-24"
  >
    <UContainer class="py-8 sm:py-12">
      <UButton
        to="/#latest"
        label="All articles"
        icon="i-lucide-arrow-left"
        color="neutral"
        variant="link"
        class="-ms-3 mb-10"
      />

      <header class="mx-auto max-w-3xl border-b border-default pb-10 sm:pb-12">
        <div class="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2">
          <UBadge
            color="primary"
            variant="subtle"
            class="font-mono text-[11px] tracking-[0.12em] uppercase"
          >
            {{ post.category }}
          </UBadge>
          <span class="font-mono text-[11px] tracking-[0.08em] text-muted uppercase">
            {{ publishedOn }}
          </span>
        </div>

        <h1 class="font-serif text-4xl font-bold tracking-tight text-highlighted sm:text-5xl lg:text-6xl">
          {{ post.title }}
        </h1>
        <p class="mt-5 text-lg leading-8 text-toned sm:text-xl">
          {{ post.description }}
        </p>

        <p class="mt-7 font-mono text-xs tracking-[0.08em] text-muted uppercase">
          By {{ post.author }}
        </p>
      </header>

      <div class="mx-auto max-w-3xl pt-10 sm:pt-12">
        <ContentRenderer
          :value="post"
          class="article-content prose prose-slate max-w-none dark:prose-invert [&>h1:first-child]:hidden"
        />
      </div>
    </UContainer>
  </article>
</template>
