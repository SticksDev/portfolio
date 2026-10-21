<template>
  <!-- Use in markdown as ::blog-alert{type="warning" title="..."} ... :: -->
  <div role="note" class="blog-alert" :class="`blog-alert-${type}`">
    <div class="blog-alert-title">
      <component :is="variant.icon" :size="16" />
      <span>{{ title || variant.title }}</span>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { Info, OctagonAlert, TriangleAlert } from '@lucide/vue'

const props = defineProps({
  type: { type: String as () => 'info' | 'warning' | 'danger', default: 'warning' },
  title: { type: String, default: '' },
})

const variants = {
  info: { icon: Info, title: 'Note' },
  warning: { icon: TriangleAlert, title: 'Warning' },
  danger: { icon: OctagonAlert, title: 'Danger' },
}

const variant = computed(() => variants[props.type] ?? variants.warning)
</script>
