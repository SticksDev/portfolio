<template>
  <Transition name="taskbar-fade">
    <button
      v-if="isOpen"
      class="taskbar-item px-1 md:px-3 py-1 border-2 text-xs md:text-sm min-w-0"
      :class="[
        isActive
          ? 'bg-[#000080] text-white border-[#808080] border-r-white border-b-white active-button'
          : 'bg-[#c0c0c0] border-white border-r-[#808080] border-b-[#808080]'
      ]"
      @click="$emit('click')"
    >
      <div class="flex items-center gap-1 icon-wrapper">
        <component
          :is="icon"
          :size="16"
          class="flex-shrink-0"
        />
        <span class="hidden sm:inline truncate">{{ label }}</span>
      </div>
    </button>
  </Transition>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  icon: Component
  label: string
  isOpen: boolean
  isActive: boolean
}>()

defineEmits<{
  click: []
}>()
</script>

<style scoped>
.taskbar-item {
  transition: background-color 0.15s ease, color 0.15s ease;
}

/* Default inactive hover */
.taskbar-item:not(.active-button):hover {
  background: #000080;
  color: #fff;
}

/* Disable hover effects entirely on active */
.taskbar-item.active-button:hover {
  background: #000080; /* same as active */
  color: white;
  cursor: default;
}


.taskbar-fade-enter-active,
.taskbar-fade-leave-active {
  transition: all 0.3s ease;
}

.taskbar-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.taskbar-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
