<template>
  <div class="h-full overflow-auto p-6">
    <h1 class="text-3xl font-bold mb-6 text-black border-b-2 border-[#808080] pb-3">My Projects</h1>

    <p class="text-gray-700 mb-6 leading-relaxed">
      Here are some of my featured projects. Check them out on GitHub!
    </p>

    <!-- Projects Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="(project, index) in projects"
        :key="index"
        class="project-card bg-white border-2 border-[#808080] p-5 shadow-md hover:border-[#000080] transition-all group"
      >
        <div class="flex items-start justify-between mb-3">
          <div class="project-icon">
            <component
              :is="project.icon"
              :size="32"
              :class="['transition-colors', 'group-hover:text-[#1084d0]']"
            />
          </div>
          <a
            :href="project.link"
            target="_blank"
            class="px-3 py-1 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] text-xs font-bold hover:bg-[#dfdfdf] flex items-center gap-1"
          >
            View on GitHub
          </a>
        </div>

        <h3 class="text-xl font-bold text-black mb-2">{{ project.title }}</h3>
        <p class="text-gray-700 text-sm mb-3 leading-relaxed">{{ project.description }}</p>

        <div class="flex flex-wrap gap-2">
          <span
            v-for="(tech, techIndex) in project.technologies"
            :key="techIndex"
            class="tech-badge text-xs px-2 py-1 bg-[#f0f0f0] border border-[#808080] text-gray-700"
          >
            {{ tech }}
          </span>
        </div>
      </div>
    </div>

    <!-- More Projects CTA -->
    <div class="mt-6 bg-white border-2 border-[#808080] p-5 shadow-md text-center">
      <p class="text-gray-700 mb-3">
        Want to see more? Check out my GitHub profile for all my projects and contributions!
      </p>
      <a
        href="https://github.com/SticksDev"
        target="_blank"
        class="inline-block px-6 py-2 bg-[#24292e] text-white border-2 border-[#808080] font-bold hover:bg-[#1a1e22] transition-colors"
      >
        Visit GitHub Profile
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { Printer, Globe, Sparkles } from 'lucide-vue-next'

type Project = {
  title: string
  description: string
  link: string
  icon: Component
  technologies: string[]
}

const projects: Project[] = [
  {
    title: 'BambuConnect',
    description:
      'A third-party client for managing your Bambu Lab 3D printer with an intuitive interface and real-time monitoring capabilities.',
    link: 'https://github.com/SticksDev/BambuConnect',
    icon: Printer,
    technologies: ['TypeScript', 'Electron', '3D Printing'],
  },
  {
    title: 'VRDCN_NetworkTest',
    description:
      'A network testing tool designed for VR streaming services, built with Go for high performance and reliability.',
    link: 'https://github.com/SticksDev/VRCDN_NetworkTest',
    icon: Globe,
    technologies: ['Go', 'Networking', 'VR'],
  },
  {
    title: 'Runic Spells',
    description:
      'A comprehensive spell system for Minecraft servers using Java and PaperMC APIs, featuring custom magical abilities.',
    link: 'https://github.com/SticksDev/runic_spells',
    icon: Sparkles,
    technologies: ['Java', 'Minecraft', 'PaperMC'],
  },
]
</script>


<style scoped>
.project-card {
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.15);
}

.project-icon {
  transition: transform 0.2s, color 0.2s;
}

.project-card:hover .project-icon {
  transform: scale(1.1);
}

.tech-badge {
  font-family: 'Courier New', monospace;
  font-weight: 600;
}
</style>
