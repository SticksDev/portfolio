<template>
  <div class="min-h-screen min-w-screen bg-black flex items-center justify-center overflow-hidden">
    <!-- BIOS Screen -->
    <div v-if="bootStage === 'bios'" class="w-full h-screen bg-black text-left p-8 font-mono text-sm text-gray-300 relative">
      <div class="absolute top-2 right-2 text-xs text-gray-500 animate-pulse">
        Press ESC to skip
      </div>
      <div class="mb-4">
        <p class="text-white font-bold">ShrimpBIOS v2.0</p>
        <p class="text-gray-500">Copyright (C) {{ new Date().getFullYear() }}, SticksDev Inc.</p>
      </div>

      <div class="space-y-1 mb-4">
        <p v-for="(message, index) in biosMessages" :key="index">{{ message }}</p>
      </div>

      <div v-if="biosMessages.length >= 7" class="mt-8">
        <p class="animate-pulse">Press any key to boot from HDD or ESC to skip...</p>
      </div>
    </div>

    <!-- Windows XP Style Boot Screen -->
    <div v-else-if="bootStage === 'loading'" class="w-full h-screen flex flex-col items-center justify-center relative">
      <div class="absolute top-4 right-4 text-xs text-gray-500 animate-pulse">
        Press ESC to skip
      </div>
      <!-- Logo -->
      <div class="mb-16 text-center">
        <h1 class="text-6xl font-bold text-white mb-2" style="font-family: 'Trebuchet MS', sans-serif; letter-spacing: -2px;">
          ShrimpOS
        </h1>
        <p class="text-white text-sm opacity-80">Professional Edition</p>
      </div>

      <!-- Loading Bar Container -->
      <div class="relative">
        <div class="w-64 h-2 bg-gray-800 overflow-hidden">
          <div class="loading-bar h-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500"></div>
        </div>
        <p class="text-white text-xs mt-4 text-center opacity-60">Starting up...</p>
      </div>

      <!-- Bottom Text -->
      <div class="absolute bottom-8 text-center">
        <p class="text-white text-xs opacity-40">Copyright © SticksDev {{ new Date().getFullYear() }}</p>
      </div>
    </div>

    <!-- Pre-boot Power Button -->
    <div v-else class="flex flex-col items-center justify-center text-center">
      <div class="mb-8">
        <button
          @click="startBootSequence"
          class="power-button group relative w-32 h-32 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105"
        >
          <!-- Button outer ring -->
          <div class="absolute inset-0 rounded-full bg-gradient-to-b from-gray-800 via-gray-900 to-black border-4 border-gray-700 shadow-2xl group-hover:border-gray-600 transition-all"></div>

          <!-- Button inner glow -->
          <div class="absolute inset-4 rounded-full bg-gradient-to-b from-gray-900 to-black border border-gray-800"></div>

          <!-- Power icon -->
          <div class="relative z-10">
           <Power color="white" :size="45" />
          </div>

          <!-- Shine effect -->
          <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white to-transparent opacity-10"></div>
        </button>
      </div>
      <p class="text-gray-500 text-sm animate-pulse">Press power button to start</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Power } from 'lucide-vue-next';
import { ref, onMounted } from 'vue'

const bootStage = ref<'off' | 'bios' | 'loading'>('off')
const biosMessages = ref<string[]>([])

const biosMessageList: string[] = [
  'Detecting RAM.....................64 MB OK',
  'Primary Master: 40GB HDD',
  'Primary Slave: None',
  'Secondary Master: CD-ROM',
  'Secondary Slave: None',
  'Boot Device: HDD-0',
  'Verifying DMI Pool Data.........',
]

let bootAudio: HTMLAudioElement | null = null

const startBootSequence = async () => {
  bootStage.value = 'bios'

  // Start playing audio immediately when boot starts
  let audioPromise: Promise<void> | null = null
  if (typeof window !== 'undefined') {
    bootAudio = new Audio('/bootup.mp3')
    bootAudio.volume = 0.3

    audioPromise = new Promise((resolve) => {
      bootAudio!.onended = () => {
        resolve()
      }

      bootAudio!.play().catch(() => {
        // Audio autoplay blocked, continue without sound
        console.warn('Boot audio playback was blocked, continuing without sound.')
        resolve()
      })

      // Play 5 seconds of audio then resolve
      setTimeout(() => {
        resolve()
      }, 4000) 
    })
  }

  // Show BIOS messages one by one
  for (let i = 0; i < biosMessageList.length; i++) {
    biosMessages.value.push(biosMessageList[i]!)
    await new Promise(resolve => setTimeout(resolve, 300))
  }

  // Wait for user to press a key or auto-continue
  await new Promise(resolve => setTimeout(resolve, 800))

  // Transition to loading screen
  bootStage.value = 'loading'

  // Wait for audio to finish
  if (audioPromise) {
    await audioPromise
  } else {
    await new Promise(resolve => setTimeout(resolve, 3000))
  }

  // Navigate to desktop and fade out audio
  if (bootAudio) {
    const fadeOutInterval = setInterval(() => {
      if (bootAudio!.volume > 0.05) {
        bootAudio!.volume -= 0.05
      } else {
        bootAudio!.volume = 0
        bootAudio!.pause()
        clearInterval(fadeOutInterval)
      }
    }, 200)
  }

  navigateTo('/desktop')
}

onMounted(() => {
  // Preload audio
  if (typeof window !== 'undefined') {
    bootAudio = new Audio('/bootup.mp3')
  }

  // Listen for keypress during boot screens
  const handleKeyPress = (e: KeyboardEvent) => {
    // ESC key to skip to desktop
    if (e.key === 'Escape' && (bootStage.value === 'bios' || bootStage.value === 'loading')) {
      // Stop any playing audio
      if (bootAudio) {
        bootAudio.pause()
        bootAudio.currentTime = 0
      }
      // Go directly to desktop
      navigateTo('/desktop')
      document.removeEventListener('keydown', handleKeyPress)
    }
    // Any key during BIOS to continue to loading
    else if (bootStage.value === 'bios' && biosMessages.value.length >= 7) {
      bootStage.value = 'loading'
    }
  }
  document.addEventListener('keydown', handleKeyPress)
})
</script>

<style scoped>
@keyframes loading-slide {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(400%);
  }
}

.loading-bar {
  width: 25%;
  animation: loading-slide 1.2s ease-in-out infinite;
}

.power-button {
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5));
}

.power-button:hover {
  filter: drop-shadow(0 15px 40px rgba(0, 0, 0, 0.7));
}

.power-button:active {
  transform: scale(0.95);
}
</style>
