<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="blog-container h-full overflow-auto">
    <!-- Blog Header -->
    <div class="mb-6 pb-4 border-b-2 border-[#808080]">
      <h1 class="text-2xl font-bold mb-2 flex items-center gap-2">
        <FileText :size="24" />
        Blog Posts
      </h1>
      <p class="text-gray-600">The inner machinations of my mind are an enigma.</p>
    </div>

    <!-- Blog Posts List -->
    <div v-if="pending" class="flex items-center justify-center py-12">
      <div class="text-center">
        <div class="flex justify-center mb-2">
          <Loader2 :size="40" class="animate-spin text-gray-600" />
        </div>
        <p class="text-gray-600">Loading posts...</p>
      </div>
    </div>

    <div v-else-if="error" class="bg-red-100 border-2 border-red-400 p-4">
      <p class="text-red-700 font-bold flex items-center gap-2">
        <AlertCircle :size="20" />
        Error loading blog posts
      </p>
      <p class="text-red-600 text-sm mt-1">{{ error.message }}</p>
    </div>

    <div v-else-if="sortedPosts && sortedPosts.length > 0" class="space-y-4">
      <article
        v-for="post in sortedPosts"
        :key="post.path"
        class="blog-post bg-white border-2 border-[#808080] p-4 hover:border-[#000080] cursor-pointer transition-colors"
        @click="openPost(post.path)"
      >
        <h2 class="text-xl font-bold text-[#000080] mb-2">{{ post.title }}</h2>
        <div class="text-sm text-gray-500 mb-3 flex items-center gap-3">
          <span class="flex items-center gap-1">
            <Calendar :size="14" />
            {{ formatDate(post.date) }}
          </span>
          <span v-if="post.tags && post.tags.length > 0" class="flex items-center gap-1">
            <Tag :size="14" />
            {{ post.tags.join(', ') }}
          </span>
        </div>
        <p class="text-gray-700 mb-3">{{ post.description }}</p>
        <button
          class="px-3 py-1 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] text-sm font-bold hover:bg-[#dfdfdf] flex items-center gap-1"
        >
          Read More
          <ArrowRight :size="14" />
        </button>
      </article>
    </div>

    <div v-else class="bg-yellow-50 border-2 border-yellow-400 p-6 text-center">
      <p class="text-yellow-700 text-lg font-bold mb-2 flex items-center justify-center gap-2">
        <Inbox :size="24" />
        No blog posts yet
      </p>
      <p class="text-yellow-600 text-sm">Check back later for updates!</p>
    </div>

  </div>
</template>

<script setup lang="ts">
import { Calendar, Tag, ArrowRight, FileText, Loader2, AlertCircle, Inbox } from 'lucide-vue-next'
import type { BlogCollectionItem } from '@nuxt/content'

const emit = defineEmits<{
  'article-opened': [title: string, content: BlogCollectionItem]
  'article-closed': []
}>()

const { data: posts, pending, error } = await useAsyncData('blog-posts', () => {
  return queryCollection('blog').all()
})

const sortedPosts = computed(() => {
  if (!posts.value) return []
  return [...posts.value].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

const openPost = async (path: string) => {
  const post = await queryCollection('blog').path(path).first()

  // Emit to parent to open in separate window
  if (post) {
    emit('article-opened', post.title, post)
  }
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'Unknown date'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<style scoped>
.blog-post {
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.2);
}
.blog-post:active {
  transform: translateY(1px);
  box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2);
}
</style>
