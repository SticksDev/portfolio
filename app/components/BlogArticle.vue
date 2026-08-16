<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="relative h-full overflow-auto bg-white">
    <div
      v-if="showOverlay"
      class="absolute inset-0 z-10 flex items-center justify-center bg-white/70"
    >
      <div
        class="flex min-w-64 flex-col items-center gap-3 border-2 border-[#808080] bg-[#f0f0f0] px-6 py-4 shadow-md"
      >
        <span class="text-sm font-bold text-[#000080]">
          {{ preparing || progress.total === 0
            ? 'Preparing document...'
            : `Rendering blocks (${currentBlock}/${progress.total})` }}
        </span>
        <div v-if="!preparing && progress.total > 0" class="flex w-full gap-1">
          <div
            v-for="i in progress.total"
            :key="i"
            class="h-3 flex-1 border border-[#808080]"
            :class="i <= progress.done ? 'bg-[#000080]' : 'bg-white'"
          />
        </div>
      </div>
    </div>

    <div v-if="article" class="max-w-3xl mx-auto px-4 md:px-8 py-6 md:py-8">
      <div class="mb-6 pb-6 border-b-2 border-[#808080]">
        <h1 class="text-3xl md:text-4xl font-bold mb-4 text-[#000080]">{{ article.title }}</h1>
        <div class="flex flex-wrap items-center gap-3 md:gap-4 text-sm text-gray-600">
          <span class="flex items-center gap-1.5 bg-[#f0f0f0] px-3 py-1.5 border border-[#808080]">
            <Calendar :size="16" />
            {{ formatDate(article.date) }}
          </span>
          <span
            v-if="article.tags && article.tags.length > 0"
            class="flex items-center gap-1.5 bg-[#f0f0f0] px-3 py-1.5 border border-[#808080]"
          >
            <Tag :size="16" />
            {{ article.tags.join(', ') }}
          </span>
        </div>
      </div>

      <ContentRenderer :value="article" class="blog-prose">
        <template #empty>
          <p class="text-gray-500 text-center py-8">No content available.</p>
        </template>
      </ContentRenderer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Calendar, Tag } from 'lucide-vue-next'

const props = defineProps<{
  path: string | null
}>()

// The article window owns its content query (instead of receiving a
// snapshot) so Nuxt Content's dev hot reload can refresh it in place
const { data: article, status } = useAsyncData(
  computed(() => `blog-article-${props.path ?? 'none'}`),
  () =>
    props.path
      ? queryCollection('blog').path(props.path).first()
      : Promise.resolve(null),
)

const progress = useMermaidProgress()
const preparing = ref(true)

// Stay in "Preparing document..." until the article's content tree has
// mounted, at which point every mermaid block has registered itself
watch(
  article,
  async (value) => {
    if (!value) return
    preparing.value = true
    await nextTick()
    preparing.value = false
  },
  { immediate: true },
)

const showOverlay = computed(
  () =>
    status.value === 'pending' ||
    (!!article.value && (preparing.value || progress.value.done < progress.value.total)),
)
const currentBlock = computed(() => Math.min(progress.value.done + 1, progress.value.total))

const formatDate = (dateString: string) => {
  if (!dateString) return 'Unknown date'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<style scoped>
/* No additional styles needed - inherits from global blog-prose */
</style>
