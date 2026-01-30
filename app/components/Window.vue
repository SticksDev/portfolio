<template>
  <div
    ref="windowRef"
    class="window absolute bg-[#c0c0c0] border-2 shadow-lg"
    :style="windowStyle"
    :class="{ 'z-50': isActive, 'z-10': !isActive }"
    @mousedown="bringToFront"
  >
    <!-- Title Bar -->
    <div
      class="title-bar flex items-center justify-between px-1 py-1 cursor-move select-none"
      :class="isActive ? 'bg-[#000080]' : 'bg-[#808080]'"
      @mousedown="startDrag"
    >
      <span class="text-white font-bold text-sm px-2">{{ title }}</span>
      <button
        class="close-btn w-5 h-5 bg-[#c0c0c0] border border-white border-b-[#808080] border-r-[#808080] flex items-center justify-center text-xs font-bold hover:bg-[#dfdfdf]"
        @click="$emit('close')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Window Content -->
    <div class="window-content bg-white border-2 border-[#808080] border-t-white border-l-white p-6 overflow-auto text-black" :style="contentStyle">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  title: string
  initialX?: number
  initialY?: number
  width?: number
  height?: number
  isActive?: boolean
}>()

const emit = defineEmits<{
  close: []
  activate: []
}>()

const windowRef = ref<HTMLElement | null>(null)
const x = ref(props.initialX ?? 100)
const y = ref(props.initialY ?? 100)
const isDragging = ref(false)
const dragStartX = ref(0)
const dragStartY = ref(0)

const windowStyle = computed(() => ({
  left: `${x.value}px`,
  top: `${y.value}px`,
  width: props.width ? `${props.width}px` : '600px',
}))

const contentStyle = computed(() => ({
  height: props.height ? `${props.height}px` : '400px',
}))

const startDrag = (e: MouseEvent) => {
  isDragging.value = true
  dragStartX.value = e.clientX - x.value
  dragStartY.value = e.clientY - y.value
  emit('activate')
}

const onDrag = (e: MouseEvent) => {
  if (!isDragging.value) return

  x.value = e.clientX - dragStartX.value
  y.value = e.clientY - dragStartY.value
}

const stopDrag = () => {
  isDragging.value = false
}

const bringToFront = () => {
  emit('activate')
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
.window {
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
}

.title-bar {
  background: linear-gradient(90deg, #000080, #1084d0);
}

.close-btn:active {
  border-style: inset;
}
</style>
