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
        isMobile || isMaximized ? '' : 'cursor-move'
      ]"
      @mousedown="startDrag"
      @touchstart="startDrag"
      @dblclick="toggleMaximize"
    >
      <span class="text-white font-bold text-sm px-2">{{ title }}</span>
      <div class="flex gap-0.5" @dblclick.stop>
        <button
          class="title-btn w-5 h-5 bg-[#c0c0c0] border border-white border-b-[#808080] border-r-[#808080] flex items-center justify-center text-xs font-bold hover:bg-[#dfdfdf]"
          title="Minimize"
          @click.stop="$emit('minimize')"
        >
          <Minus :size="16" />
        </button>
        <button
          v-if="!isMobile"
          class="title-btn w-5 h-5 bg-[#c0c0c0] border border-white border-b-[#808080] border-r-[#808080] flex items-center justify-center text-xs font-bold hover:bg-[#dfdfdf]"
          :title="isMaximized ? 'Restore' : 'Maximize'"
          @click.stop="toggleMaximize"
        >
          <Copy v-if="isMaximized" :size="12" />
          <Square v-else :size="12" />
        </button>
        <button
          class="title-btn w-5 h-5 bg-[#c0c0c0] border border-white border-b-[#808080] border-r-[#808080] flex items-center justify-center text-xs font-bold hover:bg-[#dfdfdf]"
          title="Close"
          @click.stop="$emit('close')"
        >
          <X :size="16" />
        </button>
      </div>
    </div>

    <!-- Window Content -->
    <div class="window-content bg-white border-2 border-[#808080] border-t-white border-l-white p-6 overflow-auto text-black" :style="contentStyle">
      <slot />
    </div>

    <!-- Resize Grip -->
    <div
      v-if="!isMobile && !isMaximized"
      class="resize-grip absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
      @mousedown.stop="startResize"
      @touchstart.stop="startResize"
    />
  </div>
</template>

<script setup lang="ts">
import { X, Minus, Square, Copy } from 'lucide-vue-next';
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
const w = ref(props.width ?? 600)
const h = ref(props.height ?? 400)
const isMaximized = ref(false)
const isDragging = ref(false)
const isResizing = ref(false)
const dragStartX = ref(0)
const dragStartY = ref(0)
const resizeStartX = ref(0)
const resizeStartY = ref(0)
const resizeStartW = ref(0)
const resizeStartH = ref(0)

const MIN_WIDTH = 320
const MIN_HEIGHT = 200
const TASKBAR_HEIGHT = 40
const TITLE_BAR_HEIGHT = 32
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

  if (isMaximized.value) {
    return {
      left: '0px',
      top: '0px',
      width: '100vw',
      height: `calc(100vh - ${TASKBAR_HEIGHT}px)`,
    }
  }

  return {
    left: `${x.value}px`,
    top: `${y.value}px`,
    width: `${w.value}px`,
  }
})

const contentStyle = computed(() => {
  if (isMobile.value || isMaximized.value) {
    return {
      height: `calc(100% - ${TITLE_BAR_HEIGHT}px)`, // Subtract title bar height
    }
  }

  return {
    height: `${h.value}px`,
  }
})

const startDrag = (e: MouseEvent | TouchEvent) => {
  // Don't allow dragging on mobile or while maximized
  if (isMobile.value || isMaximized.value) {
    emit('activate')
    return
  }

  isDragging.value = true
  const clientX = 'touches' in e ? e.touches[0]!.clientX : e.clientX
  const clientY = 'touches' in e ? e.touches[0]!.clientY : e.clientY
  dragStartX.value = clientX - x.value
  dragStartY.value = clientY - y.value
  emit('activate')
}

const onDrag = (e: MouseEvent | TouchEvent) => {
  if (isMobile.value) return

  const clientX = 'touches' in e ? e.touches[0]!.clientX : e.clientX
  const clientY = 'touches' in e ? e.touches[0]!.clientY : e.clientY

  if (isResizing.value) {
    w.value = Math.max(MIN_WIDTH, resizeStartW.value + (clientX - resizeStartX.value))
    h.value = Math.max(MIN_HEIGHT, resizeStartH.value + (clientY - resizeStartY.value))
    return
  }

  if (!isDragging.value) return
  x.value = clientX - dragStartX.value
  y.value = clientY - dragStartY.value
}

const stopDrag = () => {
  isDragging.value = false
  isResizing.value = false
}

const startResize = (e: MouseEvent | TouchEvent) => {
  if (isMobile.value || isMaximized.value) return

  isResizing.value = true
  const clientX = 'touches' in e ? e.touches[0]!.clientX : e.clientX
  const clientY = 'touches' in e ? e.touches[0]!.clientY : e.clientY
  resizeStartX.value = clientX
  resizeStartY.value = clientY
  resizeStartW.value = w.value
  resizeStartH.value = h.value
  emit('activate')
}

const toggleMaximize = () => {
  if (isMobile.value) return
  isMaximized.value = !isMaximized.value
  emit('activate')
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

.resize-grip {
  background: repeating-linear-gradient(
    135deg,
    transparent 0 3px,
    #808080 3px 4px,
    #ffffff 4px 5px
  );
  touch-action: none;
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
