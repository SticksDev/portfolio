<template>
  <!-- Markdown images sit inside a <p>, where <figure> is invalid HTML, so
       build the figure from block-level spans instead -->
  <span v-if="title" class="prose-figure" role="figure" :aria-labelledby="captionId">
    <img
      :src="refinedSrc"
      :alt="alt"
      :width="width"
      :height="height"
      class="cursor-zoom-in"
      title="Click to expand"
      @click="expanded = true"
    >
    <span :id="captionId" class="prose-caption">{{ title }}</span>
  </span>
  <img
    v-else
    :src="refinedSrc"
    :alt="alt"
    :width="width"
    :height="height"
    class="cursor-zoom-in"
    title="Click to expand"
    @click="expanded = true"
  >
  <Teleport to="body">
    <div
      v-if="expanded"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 md:p-8"
      @click.self="expanded = false"
    >
      <div class="flex max-h-full max-w-full flex-col border-2 bg-[#c0c0c0] shadow-lg">
        <div
          class="flex select-none items-center justify-between bg-gradient-to-r from-[#000080] to-[#1084d0] px-1 py-1"
        >
          <span class="px-2 text-sm font-bold text-white">{{ title || 'Image Viewer' }}</span>
          <button
            class="flex h-5 w-5 items-center justify-center border border-white border-b-[#808080] border-r-[#808080] bg-[#c0c0c0] text-xs font-bold hover:bg-[#dfdfdf]"
            title="Close"
            @click="expanded = false"
          >
            <X :size="16" />
          </button>
        </div>
        <div
          class="overflow-auto border-2 border-l-white border-t-white border-[#808080] bg-white p-4"
        >
          <img :src="refinedSrc" :alt="alt" class="block max-h-[80vh] max-w-full" >
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { X } from '@lucide/vue'

const props = defineProps({
  src: { type: String, default: '' },
  alt: { type: String, default: '' },
  // Markdown image title, ![alt](src "title"), shown as the caption
  title: { type: String, default: '' },
  width: { type: [String, Number], default: undefined },
  height: { type: [String, Number], default: undefined },
})

const captionId = useId()
const expanded = ref(false)

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') expanded.value = false
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

// Same baseURL handling as the default MDC ProseImg this replaces
const refinedSrc = computed(() => {
  if (props.src.startsWith('/') && !props.src.startsWith('//')) {
    // '/' or '/sub', whatever slashes baseURL was configured with
    const base = `/${useRuntimeConfig().app.baseURL.replace(/^\/+|\/+$/g, '')}`
    if (base !== '/' && !props.src.startsWith(`${base}/`)) return base + props.src
  }
  return props.src
})
</script>
