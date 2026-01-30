<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      id="aboutDiag"
      class="fixed inset-0 flex items-center justify-center z-50"
      @click.self="close"
    >
      <div
        class="bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] shadow-lg"
        style="width: 400px"
        @mousedown="startDrag"
      >
        <!-- Title Bar -->
        <div
          ref="titleBar"
          class="bg-linear-to-r from-[#0054E3] to-[#3C8CF7] px-2 py-1 flex justify-between items-center cursor-move"
        >
          <div class="flex items-center gap-1 text-white font-bold text-sm">
            <span>About ShrimpOS</span>
          </div>
          <button
            class="bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-[#dfdfdf]"
            @click="close"
          >
            <X :size="60" />
          </button>
        </div>

        <!-- Content -->
        <div class="p-6">
          <div class="flex items-start gap-4 mb-4">
            <div class="text-6xl">🦐</div>
            <div class="flex-1">
              <h2 class="text-2xl font-bold mb-2">ShrimpOS</h2>
              <p class="text-sm mb-1">Version 1.0</p>
              <p class="text-xs text-gray-600 mb-4">© 2026 ShrimpOS. All rights reserved.</p>
            </div>
          </div>

          <div class="border-t-2 border-[#808080] border-b-2 pt-3 pb-3 mb-4">
            <p class="text-sm mb-3">
              <strong>ShrimpOS is activated.</strong>
            </p>
            <p class="text-xs text-gray-700 leading-relaxed">
              If you encounter any issues or have questions, please contact us 
              at 1-800-SHRIMP-OS or visit our website at
              <a href="https://teamhydra.dev" class="text-blue-600 underline" target="_blank">www.shrimpos.com/support</a>.
            </p>
          </div>

          <div class="mb-4">
            <p class="text-xs font-bold mb-2">ShrimpOS is proudly powered by:</p>
            <div class="space-y-1 text-xs">
              <div class="flex items-center gap-2">
                <span class="text-[#42b883]">●</span>
                <span>Vue.js - Progressive JavaScript Framework</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-[#00DC82]">●</span>
                <span>Nuxt 3 - The Intuitive Vue Framework</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-[#F38020]">●</span>
                <span>Cloudflare Pages - Fast & Secure Hosting</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-[#F6821F]">●</span>
                <span>Cloudflare D1 - Serverless SQL Database</span>
              </div>
            </div>
          </div>

          <div class="flex justify-end">
            <button
              class="bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] px-6 py-1 text-sm hover:bg-[#dfdfdf] active:border-[#808080] active:border-r-white active:border-b-white"
              @click="close"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { ref } from 'vue'

defineProps<{
  isOpen: boolean
}>()

defineOptions({
  name: 'AboutShrimpOS'
})

const emit = defineEmits<{
  close: []
}>()

const titleBar = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const dragOffset = ref({ x: 0, y: 0 })

const close = () => {
  emit('close')
}

const startDrag = (e: MouseEvent) => {
  // Only start dragging if clicking on the title bar, not the close button
  if ((e.target as HTMLElement).closest('.bg-gradient-to-r') && !(e.target as HTMLElement).closest('button')) {
    isDragging.value = true
    const dialog = (e.currentTarget as HTMLElement)
    const rect = dialog.getBoundingClientRect()
    dragOffset.value = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
    document.addEventListener('mousemove', drag)
    document.addEventListener('mouseup', stopDrag)
  }
}

const drag = (e: MouseEvent) => {
  if (!isDragging.value) return
  const dialog = document.getElementById('aboutDiag')?.firstElementChild as HTMLElement
  if (dialog) {
    dialog.style.position = 'fixed'
    dialog.style.left = `${e.clientX - dragOffset.value.x}px`
    dialog.style.top = `${e.clientY - dragOffset.value.y}px`
  }
}

const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', drag)
  document.removeEventListener('mouseup', stopDrag)
}
</script>

<style scoped>
.cursor-move {
  cursor: move;
}
</style>
