<template>
  <MermaidChart v-if="language === 'mermaid'" :code="code" />
  <div v-else>
    <pre
      :class="[$props.class, { 'code-collapsed': isLong && !expanded }]"
      :style="isLong && !expanded ? { maxHeight: `${COLLAPSE_AFTER}lh` } : undefined"
    ><slot /></pre>
    <button
      v-if="isLong"
      type="button"
      class="mb-4 flex items-center gap-1.5 border border-white border-b-[#808080] border-r-[#808080] bg-[#c0c0c0] px-2 py-0.5 text-xs font-bold text-black hover:bg-[#dfdfdf]"
      :aria-expanded="expanded"
      @click="expanded = !expanded"
    >
      <ChevronDown :size="14" :class="{ 'rotate-180': expanded }" />
      <span>{{ expanded ? 'Collapse code' : `Show all ${lineCount} lines` }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ChevronDown } from '@lucide/vue'

const props = defineProps({
  code: { type: String, default: '' },
  language: { type: String, default: null },
  filename: { type: String, default: null },
  highlights: { type: Array as () => number[], default: () => [] },
  meta: { type: String, default: null },
  class: { type: String, default: null },
})

// Blocks longer than this start collapsed, with a button to show the rest
const COLLAPSE_AFTER = 15

const expanded = ref(false)
const lineCount = computed(() => props.code.trimEnd().split('\n').length)
const isLong = computed(() => lineCount.value > COLLAPSE_AFTER)
</script>
