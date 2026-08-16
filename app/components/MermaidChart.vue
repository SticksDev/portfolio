<template>
  <div v-if="error" class="my-4 border-2 border-[#808080] bg-[#f0f0f0]">
    <div class="bg-[#000080] px-2 py-1 text-xs font-bold text-white">
      Diagram failed to render
    </div>
    <p class="px-3 pt-2 font-mono text-xs text-red-700">{{ error }}</p>
    <pre class="overflow-x-auto px-3 pb-3 pt-1 text-xs">{{ code }}</pre>
  </div>
  <template v-else>
    <div
      class="group cursor-zoom-in"
      title="Click to expand"
      @click="expanded = true"
    >
      <div class="mermaid-chart overflow-x-auto pt-4" v-html="svg" />
      <div
        v-if="svg"
        class="flex items-center justify-center gap-1.5 pb-4 pt-1 text-xs text-gray-500 group-hover:text-[#000080]"
      >
        <Maximize2 :size="12" />
        <span>Click to expand</span>
      </div>
    </div>
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
            <span class="px-2 text-sm font-bold text-white">Diagram Viewer</span>
            <button
              class="flex h-5 w-5 items-center justify-center border border-white border-b-[#808080] border-r-[#808080] bg-[#c0c0c0] text-xs font-bold hover:bg-[#dfdfdf]"
              title="Close"
              @click="expanded = false"
            >
              <X :size="16" />
            </button>
          </div>
          <div
            class="mermaid-chart-full overflow-auto border-2 border-l-white border-t-white border-[#808080] bg-white p-4"
            v-html="svg"
          />
        </div>
      </div>
    </Teleport>
  </template>
</template>

<script setup lang="ts">
import { X, Maximize2 } from 'lucide-vue-next'

const props = defineProps<{ code: string }>()

const svg = ref('')
const error = ref<string | null>(null)
const expanded = ref(false)
const id = useId()
const progress = useMermaidProgress()

let counted = false
let finished = false
let renderSeq = 0

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') expanded.value = false
}

const render = () =>
  enqueueMermaidRender(async () => {
    const mermaid = await loadMermaid()
    const { svg: rendered } = await mermaid.render(
      `mmd-${id.replace(/[^a-zA-Z0-9-]/g, '')}-${renderSeq++}`,
      props.code,
    )
    svg.value = rendered
    error.value = null
    await nextTick()
  }).catch((e) => {
    error.value = e instanceof Error ? e.message : String(e)
  })

onMounted(() => {
  window.addEventListener('keydown', onKeydown)

  progress.value.total++
  counted = true

  render().finally(() => {
    finished = true
    progress.value.done++
  })
})

// Content hot reload can patch this component in place with new code
// instead of remounting it, so re-render (and recover from errors) on change
watch(
  () => props.code,
  () => {
    render()
  },
)

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  if (counted) progress.value.total--
  if (finished) progress.value.done--
})
</script>

<style>
/* Thumbnail view: scale to fit the article column, keep aspect ratio */
.mermaid-chart svg {
  display: block;
  margin-inline: auto;
  max-width: 100%;
  height: auto;
}

/* Expanded view: natural size, scroll if bigger than the viewport */
.mermaid-chart-full svg {
  display: block;
}

/* foreignObject (mermaid's HTML-label wrapper) clips its content by
   default, and fractional-width rounding at non-100% display scaling
   can shave the last character. Let labels paint past the measured
   box instead of truncating. */
.mermaid-chart svg foreignObject,
.mermaid-chart-full svg foreignObject {
  overflow: visible;
}

/* Force the exact font mermaid measured with (MERMAID_FONT in
   composables/mermaid.ts) so the page theme (Courier body font,
   window-content line-height) can't widen labels past their boxes */
.mermaid-chart svg,
.mermaid-chart svg *,
.mermaid-chart-full svg,
.mermaid-chart-full svg * {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
  line-height: 1.5 !important;
}
</style>
