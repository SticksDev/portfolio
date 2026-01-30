<template>
  <div class="font-mono">
    <h1 class="text-terminal text-md mb-4">
      --- Reading database projects.db ---<br>
      Found {{ projects.length }} projects in database. Displaying all projects:
    </h1>
    <div v-for="(project, index) in preparedProjects" :key="index" class="flex flex-row flex-wrap mb-1">
      <p class="text-terminal">{{ project.title }}</p>
      <span class="text-terminal">&nbsp;|&nbsp;</span>
      <p class="text-terminal">{{ project.description }}</p>
      <span class="text-terminal">|</span>
      <a
        :href="project.link"
        class="text-terminal-dim hover:text-terminal transition-colors ml-1"
        target="_blank"
      >
        {{ project.link }}
      </a>
    </div>
    <h1 class="text-terminal text-md mt-4">
      --- End of database ---
    </h1>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const projects = [
  {
    title: 'BambuConnect',
    description: 'A simple 3rd party client for managing your 3D printer.',
    link: 'https://github.com/SticksDev/BambuConnect',
  },
  {
    title: 'VRDCN_NetworkTest',
    description: 'A simple network test for a VR Streaming service. Written in Go.',
    link: 'https://github.com/SticksDev/VRCDN_NetworkTest',
  },
  {
    title: 'Runic Spells',
    description: 'A simple spell system for Minecraft using Java and PaperMC APIs.',
    link: 'https://github.com/SticksDev/runic_spells',
  },
]

const preparedProjects = computed(() => {
  const maxTitleLength = Math.max(...projects.map((project) => project.title.length))
  const maxDescriptionLength = Math.max(...projects.map((project) => project.description.length))

  return projects.map((project) => ({
    ...project,
    title: project.title.padEnd(maxTitleLength, ' '),
    description: project.description.padEnd(maxDescriptionLength, ' '),
  }))
})
</script>
