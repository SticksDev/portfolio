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

    <!-- Blog Post Modal -->
    <Teleport to="body">
      <div v-if="selectedPost" ref="modalRef" class="fixed z-60" :style="modalStyle">
        <div
          class="bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col"
        >
          <!-- Modal Title Bar -->
          <div
            class="bg-linear-to-r from-[#000080] to-[#1084d0] px-2 py-1 flex items-center justify-between cursor-move select-none"
            @mousedown="startDrag"
          >
            <span class="text-white font-bold text-sm">{{ selectedPost.title }}</span>
            <button
              class="w-5 h-5 bg-[#c0c0c0] border border-white border-b-[#808080] border-r-[#808080] flex items-center justify-center text-xs font-bold hover:bg-[#dfdfdf]"
              @click="selectedPost = null"
            >
              <X :size="16" />
            </button>
          </div>

          <!-- Modal Content -->
          <div class="bg-white border-2 border-[#808080] border-t-white border-l-white overflow-auto flex-1">
            <div class="max-w-3xl mx-auto px-8 py-8">
              <div class="mb-6 pb-6 border-b-2 border-[#808080]">
                <h1 class="text-4xl font-bold mb-4 text-[#000080]">{{ selectedPost.title }}</h1>
                <div class="flex items-center gap-4 text-sm text-gray-600">
                  <span class="flex items-center gap-1.5 bg-[#f0f0f0] px-3 py-1.5 border border-[#808080]">
                    <Calendar :size="16" />
                    {{ formatDate(selectedPost.date) }}
                  </span>
                  <span
                    v-if="selectedPost.tags && selectedPost.tags.length > 0"
                    class="flex items-center gap-1.5 bg-[#f0f0f0] px-3 py-1.5 border border-[#808080]"
                  >
                    <Tag :size="16" />
                    {{ selectedPost.tags.join(', ') }}
                  </span>
                </div>
              </div>

              <!-- key change: a single reusable class -->
              <ContentRenderer :value="selectedPost" class="blog-prose">
                <template #empty>
                  <p class="text-gray-500 text-center py-8">No content available.</p>
                </template>
              </ContentRenderer>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { X, Calendar, Tag, ArrowRight, FileText, Loader2, AlertCircle, Inbox } from 'lucide-vue-next'
import type { BlogCollectionItem } from '@nuxt/content'
import { ref, computed, onMounted, onUnmounted } from 'vue'

const selectedPost = ref<BlogCollectionItem | null>(null)
const selectedPostPath = ref<string | null>(null)
const modalRef = ref<HTMLElement | null>(null)

const isDragging = ref(false)
const dragStartX = ref(0)
const dragStartY = ref(0)
const modalX = ref(0)
const modalY = ref(0)

const { data: posts, pending, error } = await useAsyncData('blog-posts', () => {
  return queryCollection('blog').all()
})

const sortedPosts = computed(() => {
  if (!posts.value) return []
  return [...posts.value].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

const modalStyle = computed(() => {
  if (modalX.value === 0 && modalY.value === 0) {
    return {
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      maxWidth: '56rem',
      padding: '1rem',
    }
  }
  return {
    left: `${modalX.value}px`,
    top: `${modalY.value}px`,
    width: '100%',
    maxWidth: '56rem',
    padding: '1rem',
  }
})

const openPost = async (path: string) => {
  selectedPostPath.value = path
  selectedPost.value = await queryCollection('blog').path(path).first()
  modalX.value = 0
  modalY.value = 0
}

const startDrag = (e: MouseEvent) => {
  isDragging.value = true
  if (modalX.value === 0 && modalY.value === 0) {
    const rect = modalRef.value?.getBoundingClientRect()
    if (rect) {
      modalX.value = rect.left
      modalY.value = rect.top
    }
  }
  dragStartX.value = e.clientX - modalX.value
  dragStartY.value = e.clientY - modalY.value
}

const onDrag = (e: MouseEvent) => {
  if (!isDragging.value) return
  modalX.value = e.clientX - dragStartX.value
  modalY.value = e.clientY - dragStartY.value
}

const stopDrag = () => {
  isDragging.value = false
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'Unknown date'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

onMounted(() => {
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
})
onUnmounted(() => {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
})
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
