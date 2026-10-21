<template>
  <div
    class="desktop-icon flex flex-col items-center cursor-pointer p-1 md:p-2 rounded select-none w-16 md:w-20"
    :class="{ 'bg-gray-700 bg-opacity-15': isSelected }"
    @click="handleClick"
    @dblclick="handleDoubleClick"
    @touchend="handleTouchEnd"
  >
    <div class="icon-image w-10 h-10 md:w-12 md:h-12 mb-1 flex items-center justify-center">
      <component
        :is="icon"
        :size="40"
        class="md:w-12 md:h-12"
        color="white"
      />
    </div>
    <span class="text-white text-[10px] md:text-xs text-center drop-shadow-lg">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Component } from 'vue'

defineProps<{
  icon: Component
  label: string
  isSelected?: boolean
}>()

const emit = defineEmits<{
  click: []
  dblclick: []
}>()

// Double-tap detection for mobile
const lastTapTime = ref(0)
const DOUBLE_TAP_DELAY = 300 // milliseconds

const handleClick = () => {
  emit('click')
}

const handleDoubleClick = () => {
  emit('dblclick')
}

const handleTouchEnd = (e: TouchEvent) => {
  // Prevent the default behavior and mouse event emulation
  e.preventDefault()

  const currentTime = Date.now()
  const timeDiff = currentTime - lastTapTime.value

  if (timeDiff < DOUBLE_TAP_DELAY && timeDiff > 0) {
    // Double tap detected
    emit('dblclick')
    lastTapTime.value = 0 // Reset
  } else {
    // Single tap
    emit('click')
    lastTapTime.value = currentTime
  }
}
</script>

<style scoped>
.desktop-icon:hover {
  background: rgba(75, 85, 99, 0.4);
}
</style>
