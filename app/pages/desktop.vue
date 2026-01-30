<template>
  <div class="desktop-container min-h-screen bg-[#008080] relative overflow-hidden" :class="{ 'hourglass-cursor': isLoading || isDesktopLoading }">
    <!-- Desktop Background -->
    <div class="absolute inset-0 flex flex-col items-center justify-center opacity-50 pointer-events-none">
      <div class="w-[600px] h-[600px] pointer-events-auto">
        <ClientOnly>
          <ShrimpRender />
        </ClientOnly>
      </div>
      <p class="text-white text-3xl font-bold mt-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">In shrimp, we trust.</p>
    </div>

    <!-- Loading Window -->
    <div
      v-if="isDesktopLoading"
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] shadow-lg z-50"
      style="width: 400px;"
    >
      <div class="bg-[#000080] px-2 py-1 flex items-center justify-between">
        <span class="text-white font-bold text-sm">Loading ShrimpOS Desktop...</span>
      </div>
      <div class="bg-white border-2 border-[#808080] border-t-white border-l-white p-6">
        <div class="flex items-center gap-4 mb-4">
          <div class="text-4xl">⏳</div>
          <div>
            <p class="text-black font-bold mb-2">Please wait...</p>
            <p class="text-black text-sm">{{ loadingMessage }}</p>
          </div>
        </div>
        <div class="w-full bg-[#dfdfdf] border-2 border-[#808080] border-t-white border-l-white h-6">
          <div
            class="bg-[#000080] h-full transition-all duration-300"
            :style="{ width: `${loadingProgress}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Desktop Icons -->
    <div class="desktop-icons absolute top-4 left-4 flex flex-col gap-2">
      <Transition name="icon-fade">
        <DesktopIcon
          v-if="visibleIcons >= 1"
          icon="👤"
          label="About Me"
          @dblclick="openWindow('about')"
        />
      </Transition>
      <Transition name="icon-fade">
        <DesktopIcon
          v-if="visibleIcons >= 2"
          icon="💼"
          label="Projects"
          @dblclick="openWindow('projects')"
        />
      </Transition>
      <Transition name="icon-fade">
        <DesktopIcon
          v-if="visibleIcons >= 3"
          icon="🎓"
          label="Experience"
          @dblclick="openWindow('experience')"
        />
      </Transition>
      <Transition name="icon-fade">
        <DesktopIcon
          v-if="visibleIcons >= 4"
          icon="📧"
          label="Contact"
          @dblclick="openWindow('contact')"
        />
      </Transition>
    </div>

    <!-- Windows -->
    <Window
      v-if="windows.about"
      title="About Me - ShrimpOS"
      :initial-x="150"
      :initial-y="100"
      :width="1200"
      :height="550"
      :is-active="activeWindow === 'about'"
      @close="closeWindow('about')"
      @activate="activeWindow = 'about'"
    >
      <About />
    </Window>

    <Window
      v-if="windows.projects"
      title="Projects - ShrimpOS"
      :initial-x="200"
      :initial-y="150"
      :width="900"
      :height="650"
      :is-active="activeWindow === 'projects'"
      @close="closeWindow('projects')"
      @activate="activeWindow = 'projects'"
    >
      <Projects />
    </Window>

    <Window
      v-if="windows.experience"
      title="Experience - ShrimpOS"
      :initial-x="250"
      :initial-y="200"
      :width="1200"
      :height="700"
      :is-active="activeWindow === 'experience'"
      @close="closeWindow('experience')"
      @activate="activeWindow = 'experience'"
    >
      <Experience />
    </Window>

    <Window
      v-if="windows.contact"
      title="Contact - ShrimpOS"
      :initial-x="300"
      :initial-y="250"
      :width="700"
      :height="500"
      :is-active="activeWindow === 'contact'"
      @close="closeWindow('contact')"
      @activate="activeWindow = 'contact'"
    >
      <Contact />
    </Window>

    <!-- Start Menu -->
    <div
      v-if="showStartMenu"
      class="start-menu absolute bottom-10 left-0 w-64 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] shadow-2xl z-50"
    >
      <!-- Start Menu Header -->
      <div class="bg-gradient-to-r from-[#000080] to-[#1084d0] text-white px-3 py-2 font-bold text-sm flex items-center gap-2">
        <span class="text-lg">🦐</span>
        <span>ShrimpOS</span>
      </div>

      <!-- Menu Items -->
      <div class="bg-[#c0c0c0]">
        <button
          @click="openWindow('about'); showStartMenu = false"
          class="menu-item w-full text-left px-4 py-2 hover:bg-[#000080] hover:text-white flex items-center gap-3 border-b border-gray-400"
        >
          <span class="text-lg">👤</span>
          <span>About Me</span>
        </button>
        <button
          @click="openWindow('projects'); showStartMenu = false"
          class="menu-item w-full text-left px-4 py-2 hover:bg-[#000080] hover:text-white flex items-center gap-3 border-b border-gray-400"
        >
          <span class="text-lg">💼</span>
          <span>Projects</span>
        </button>
        <button
          @click="openWindow('experience'); showStartMenu = false"
          class="menu-item w-full text-left px-4 py-2 hover:bg-[#000080] hover:text-white flex items-center gap-3 border-b border-gray-400"
        >
          <span class="text-lg">🎓</span>
          <span>Experience</span>
        </button>
        <button
          @click="openWindow('contact'); showStartMenu = false"
          class="menu-item w-full text-left px-4 py-2 hover:bg-[#000080] hover:text-white flex items-center gap-3 border-b border-gray-400"
        >
          <span class="text-lg">📧</span>
          <span>Contact</span>
        </button>
        <button
          @click="startShutdown"
          class="menu-item w-full text-left px-4 py-2 hover:bg-[#000080] hover:text-white flex items-center gap-3"
        >
          <span class="text-lg">🔌</span>
          <span>Shut Down...</span>
        </button>
      </div>
    </div>

    <!-- Shutdown Screen -->
    <div
      v-if="isShuttingDown"
      class="absolute inset-0 bg-black flex flex-col items-center justify-center z-[100]"
    >
      <div class="text-center">
        <h2 class="text-4xl font-bold mb-8" style="color: #ff8c00;">{{ shutdownMessage }}</h2>
        <div v-if="shutdownStage === 'shutting-down'" class="w-64 h-2 bg-gray-800 overflow-hidden mx-auto">
          <div class="loading-bar h-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500"></div>
        </div>
      </div>
    </div>

    <!-- Taskbar -->
    <div class="taskbar absolute bottom-0 left-0 right-0 h-10 bg-[#c0c0c0] border-t-2 border-white flex items-center px-2 shadow-lg z-50">
      <button
        @click="showStartMenu = !showStartMenu"
        class="start-button px-3 py-1 bg-[#c0c0c0] border-2 font-bold flex items-center gap-2 hover:bg-[#dfdfdf]"
        :class="showStartMenu ? 'border-[#808080] border-r-white border-b-white' : 'border-white border-r-[#808080] border-b-[#808080]'"
      >
        <span class="text-lg">🦐</span>
        <span>Start</span>
      </button>

      <div class="flex-1 flex gap-1 ml-2">
        <button
          v-if="windows.about"
          class="taskbar-item px-3 py-1 bg-[#c0c0c0] border-2 text-sm"
          :class="activeWindow === 'about' ? 'border-[#808080] border-r-white border-b-white' : 'border-white border-r-[#808080] border-b-[#808080]'"
          @click="activeWindow = 'about'"
        >
          👤 About Me
        </button>
        <button
          v-if="windows.projects"
          class="taskbar-item px-3 py-1 bg-[#c0c0c0] border-2 text-sm"
          :class="activeWindow === 'projects' ? 'border-[#808080] border-r-white border-b-white' : 'border-white border-r-[#808080] border-b-[#808080]'"
          @click="activeWindow = 'projects'"
        >
          💼 Projects
        </button>
        <button
          v-if="windows.experience"
          class="taskbar-item px-3 py-1 bg-[#c0c0c0] border-2 text-sm"
          :class="activeWindow === 'experience' ? 'border-[#808080] border-r-white border-b-white' : 'border-white border-r-[#808080] border-b-[#808080]'"
          @click="activeWindow = 'experience'"
        >
          🎓 Experience
        </button>
        <button
          v-if="windows.contact"
          class="taskbar-item px-3 py-1 bg-[#c0c0c0] border-2 text-sm"
          :class="activeWindow === 'contact' ? 'border-[#808080] border-r-white border-b-white' : 'border-white border-r-[#808080] border-b-[#808080]'"
          @click="activeWindow = 'contact'"
        >
          📧 Contact
        </button>
      </div>

      <div class="time px-2 border-2 border-[#808080] border-t-white border-l-white text-sm">
        {{ currentTime }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import Window from '~/components/Window.vue'
import DesktopIcon from '~/components/DesktopIcon.vue'
import ShrimpRender from '~/components/ShrimpRender.vue'
import About from '~/components/About.vue'
import Projects from '~/components/Projects.vue'
import Experience from '~/components/Experience.vue'
import Contact from '~/components/Contact.vue'

const windows = reactive({
  about: false,
  projects: false,
  experience: false,
  contact: false,
})

const activeWindow = ref<string | null>(null)
const isLoading = ref(false)
const currentTime = ref('')
const isDesktopLoading = ref(true)
const loadingProgress = ref(0)
const loadingMessage = ref('Loading Desktop...')
const visibleIcons = ref(0)
const showStartMenu = ref(false)
const isShuttingDown = ref(false)
const shutdownStage = ref<'shutting-down' | 'safe-to-turn-off'>('shutting-down')
const shutdownMessage = ref('Shutting down...')

const openWindow = (windowName: keyof typeof windows) => {
  // Show hourglass cursor
  isLoading.value = true

  // Simulate loading delay
  setTimeout(() => {
    windows[windowName] = true
    activeWindow.value = windowName
    isLoading.value = false
  }, 500)
}

const closeWindow = (windowName: keyof typeof windows) => {
  windows[windowName] = false
  if (activeWindow.value === windowName) {
    activeWindow.value = null
  }
}

const startShutdown = async () => {
  showStartMenu.value = false
  isShuttingDown.value = true
  shutdownStage.value = 'shutting-down'
  shutdownMessage.value = 'ShrimpOS is shutting down...'

  await new Promise(resolve => setTimeout(resolve, 1500))

  // Hide icons one by one (in reverse)
  for (let i = 4; i >= 1; i--) {
    visibleIcons.value = i - 1
    await new Promise(resolve => setTimeout(resolve, 200))
  }

  await new Promise(resolve => setTimeout(resolve, 500))
  shutdownStage.value = 'safe-to-turn-off'
  shutdownMessage.value = "It's now safe to turn off your computer."

  setTimeout(() => {
    navigateTo('/')
  }, 5000)
}

const updateTime = () => {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  currentTime.value = `${hours}:${minutes}`
}

let timeInterval: ReturnType<typeof setInterval>

const startDesktopLoading = async () => {
  // Play welcome sound
  if (typeof window !== 'undefined') {
    const welcomeAudio = new Audio('/welcome.mp3')
    welcomeAudio.volume = 0.3
    welcomeAudio.play().catch((error) => {
      console.log('Audio autoplay blocked:', error)
    })
  }

  loadingMessage.value = 'Loading Desktop...'
  await new Promise(resolve => setTimeout(resolve, 500))
  loadingProgress.value = 25

  loadingMessage.value = 'Loading desktop data...'
  await new Promise(resolve => setTimeout(resolve, 400))
  loadingProgress.value = 50
  visibleIcons.value = 1

  await new Promise(resolve => setTimeout(resolve, 300))
  loadingProgress.value = 60
  visibleIcons.value = 2

  loadingMessage.value = 'Loading apps...'
  await new Promise(resolve => setTimeout(resolve, 300))
  loadingProgress.value = 70
  visibleIcons.value = 3

  await new Promise(resolve => setTimeout(resolve, 300))
  loadingProgress.value = 80
  visibleIcons.value = 4

  loadingMessage.value = 'Preparing workspace...'
  await new Promise(resolve => setTimeout(resolve, 400))
  loadingProgress.value = 100

  await new Promise(resolve => setTimeout(resolve, 300))
  isDesktopLoading.value = false
}

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
  startDesktopLoading()

  // Close start menu when clicking outside
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.start-button') && !target.closest('.start-menu')) {
      showStartMenu.value = false
    }
  })
})

onUnmounted(() => {
  clearInterval(timeInterval)
})
</script>

<style scoped>
.hourglass-cursor,
.hourglass-cursor * {
  cursor: wait !important;
}

.start-button:active {
  border-style: inset;
}

.taskbar-item:hover {
  background: #dfdfdf;
}

.menu-item {
  transition: all 0.1s ease;
}

.icon-fade-enter-active {
  animation: iconAppear 0.3s ease-out;
}

.icon-fade-leave-active {
  animation: iconDisappear 0.3s ease-out;
}

@keyframes iconAppear {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes iconDisappear {
  0% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  100% {
    opacity: 0;
    transform: scale(0.8) translateY(-10px);
  }
}

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
</style>
