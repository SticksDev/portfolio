<template>
  <div
    class="desktop-icon flex flex-col items-center cursor-pointer p-2 rounded select-none w-20"
    :class="{ 'bg-[#000080] bg-opacity-50': isSelected }"
    @click="$emit('click')"
    @dblclick="$emit('dblclick')"
  >
    <div class="icon-image w-12 h-12 mb-1 flex items-center justify-center">
      <component
        :is="icon"
        :size="48"
        color="white"
      />
    </div>
    <span class="text-white text-xs text-center drop-shadow-lg">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  icon: Component
  label: string
  isSelected?: boolean
}>()

defineEmits<{
  click: []
  dblclick: []
}>()
</script>

<style scoped>
.desktop-icon:hover {
  background: rgba(0, 0, 128, 0.3);
}
</style>
