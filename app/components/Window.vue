<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    ref="windowRef"
    class="window bg-[#c0c0c0] border-2 shadow-lg"
    :style="windowStyle"
    :class="[
      { 'z-50': isActive, 'z-10': !isActive },
      isMobile ? 'fixed' : 'absolute',
      { 'minimize-animation': shouldAnimate && isMinimized }
    ]"
    @mousedown="bringToFront"
  >
    <!-- Title Bar -->
    <div
      class="title-bar flex items-center justify-between px-1 py-1 select-none"
      :class="[
        isActive ? 'bg-[#000080]' : 'bg-[#808080]',
        isMobile ? '' : 'cursor-move'
      ]"
      @mousedown="startDrag"
      @touchstart="startDrag"
    >
      <span class="text-white font-bold text-sm px-2">{{ title }}</span>
      <div class="flex gap-0.5">
        <button
          class="title-btn w-5 h-5 bg-[#c0c0c0] border border-white border-b-[#808080] border-r-[#808080] flex items-center justify-center text-xs font-bold hover:bg-[#dfdfdf]"
          @click.stop="$emit('minimize')"
          title="Minimize"
        >
          <Minus :size="16" />
        </button>
        <button
          class="title-btn w-5 h-5 bg-[#c0c0c0] border border-white border-b-[#808080] border-r-[#808080] flex items-center justify-center text-xs font-bold hover:bg-[#dfdfdf]"
          @click.stop="$emit('close')"
          title="Close"
        >
          <X :size="16" />
        </button>
      </div>
    </div>

    <!-- Window Content -->
    <div class="window-content bg-white border-2 border-[#808080] border-t-white border-l-white p-6 overflow-auto text-black" :style="contentStyle">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { X, Minus } from 'lucide-vue-next';
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  title: string
  initialX?: number
  initialY?: number
  width?: number
  height?: number
  isActive?: boolean
  isMinimized?: boolean
}>()

const emit = defineEmits<{
  close: []
  activate: []
  minimize: []
}>()

const windowRef = ref<HTMLElement | null>(null)
const x = ref(props.initialX ?? 100)
const y = ref(props.initialY ?? 100)
const isDragging = ref(false)
const dragStartX = ref(0)
const dragStartY = ref(0)
const isMobile = ref(false)
const wasMinimized = ref(false)
const shouldAnimate = ref(false)

// Check if device is mobile
const checkMobile = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 768
  }
}

const windowStyle = computed(() => {
  if (isMobile.value) {
    // On mobile, make windows fullscreen with small padding
    return {
      left: '10px',
      top: '10px',
      right: '10px',
      bottom: '50px', // Leave room for taskbar
      width: 'calc(100vw - 20px)',
      height: 'calc(100vh - 60px)',
    }
  }

  return {
    left: `${x.value}px`,
    top: `${y.value}px`,
    width: props.width ? `${props.width}px` : '600px',
  }
})

const contentStyle = computed(() => {
  if (isMobile.value) {
    return {
      height: 'calc(100% - 32px)', // Subtract title bar height
    }
  }

  return {
    height: props.height ? `${props.height}px` : '400px',
  }
})

const startDrag = (e: MouseEvent | TouchEvent) => {
  // Don't allow dragging on mobile
  if (isMobile.value) return

  isDragging.value = true
  const clientX = 'touches' in e ? e.touches[0]!.clientX : e.clientX
  const clientY = 'touches' in e ? e.touches[0]!.clientY : e.clientY
  dragStartX.value = clientX - x.value
  dragStartY.value = clientY - y.value
  emit('activate')
}

const onDrag = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value || isMobile.value) return

  const clientX = 'touches' in e ? e.touches[0]!.clientX : e.clientX
  const clientY = 'touches' in e ? e.touches[0]!.clientY : e.clientY
  x.value = clientX - dragStartX.value
  y.value = clientY - dragStartY.value
}

const stopDrag = () => {
  isDragging.value = false
}

const bringToFront = () => {
  emit('activate')
}

// Watch for minimize state changes
watch(() => props.isMinimized, (newVal, oldVal) => {
  // Only animate if transitioning from false to true (not minimized -> minimized)
  if (newVal && !oldVal) {
    shouldAnimate.value = true
    wasMinimized.value = true
  } else if (!newVal && oldVal) {
    // Restore from minimized - no animation needed, just reset
    shouldAnimate.value = false
    wasMinimized.value = false
  }
})

onMounted(() => {
  checkMobile()
  wasMinimized.value = props.isMinimized ?? false
  window.addEventListener('resize', checkMobile)
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchmove', onDrag)
  document.addEventListener('touchend', stopDrag)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', stopDrag)
})
</script>

<style scoped>
.window {
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
}

.title-bar {
  background: linear-gradient(90deg, #000080, #1084d0);
}

.title-btn:active {
  border-style: inset;
}

.minimize-animation {
  animation: minimize 0.3s ease-out forwards;
  transform-origin: bottom left;
}

@keyframes minimize {
  0% {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
  100% {
    transform: scale(0.1) translateY(calc(100vh - 100px));
    opacity: 0;
  }
}
</style>
