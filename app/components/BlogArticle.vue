<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="h-full overflow-auto bg-white">
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
import type { BlogCollectionItem } from '@nuxt/content'

defineProps<{
  article: BlogCollectionItem | null
}>()

const formatDate = (dateString: string) => {
  if (!dateString) return 'Unknown date'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<style scoped>
/* No additional styles needed - inherits from global blog-prose */
</style>
