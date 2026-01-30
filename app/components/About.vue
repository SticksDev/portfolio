<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="h-full overflow-auto p-6">
    <h1 class="text-3xl font-bold mb-6 text-[#000080] border-b-2 border-[#808080] pb-3">About Me</h1>

    <!-- Profile Card -->
    <div class="bg-white border-2 border-[#808080] p-6 shadow-md mb-6">
      <div class="flex items-start gap-6 mb-6">
        <div class="profile-avatar w-32 h-32 bg-[#000080] border-2 border-[#808080] flex items-center justify-center">
          <User :size="64" color="#ffffff" />
        </div>
        <div class="flex-1">
          <h2 class="text-3xl font-bold text-[#000080] mb-2">SticksDev</h2>
          <p class="text-xl text-gray-700 mb-3">Tanner Sommers</p>
          <div class="space-y-2 text-gray-700">
            <div class="flex items-center gap-2">
              <span class="font-semibold min-w-25">Age:</span>
              <span>22</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-semibold min-w-25">Location:</span>
              <span>United States (UTC-5)</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-semibold min-w-25">Occupation:</span>
              <span>Software Engineer / Freelancer</span>
            </div>
          </div>
        </div>
      </div>

      <div class="border-t-2 border-[#808080] pt-4">
        <p class="text-gray-700 leading-relaxed">
          Hi! I'm Tanner, a software engineer and freelancer from the US. I love coding, gaming, and learning new things.
          I'm always looking for opportunities to grow and expand my skillset. Feel free to reach out to me if you have any
          questions or just want to chat!
        </p>
      </div>
    </div>

    <!-- Skills Section -->
    <div class="bg-white border-2 border-[#808080] p-6 shadow-md mb-6">
      <h3 class="text-xl font-bold  mb-4 flex items-center gap-2">
        <Code :size="20" />
        Technical Skills
      </h3>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="skill in skills"
          :key="skill"
          class="skill-badge"
        >
          {{ skill }}
        </span>
      </div>
    </div>

    <!-- Interests & Hobbies -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-white border-2 border-[#808080] p-5 shadow-md">
        <h3 class="text-lg font-bold mb-3 flex items-center gap-2">
          <Target :size="18" />
          Interests
        </h3>
        <ul class="space-y-2">
          <li
            v-for="interest in interests"
            :key="interest"
            class="flex items-center gap-2 text-gray-700"
          >
            <ChevronRight :size="14" class="text-[#000080]" />
            {{ interest }}
          </li>
        </ul>
      </div>

      <div class="bg-white border-2 border-[#808080] p-5 shadow-md">
        <h3 class="text-lg font-bold mb-3 flex items-center gap-2">
          <Gamepad2 :size="18" />
          Hobbies
        </h3>
        <ul class="space-y-2">
          <li
            v-for="hobby in hobbies"
            :key="hobby"
            class="flex items-center gap-2 text-gray-700"
          >
            <ChevronRight :size="14" class="text-[#000080]" />
            {{ hobby }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User, Code, Target, Gamepad2, ChevronRight } from 'lucide-vue-next'

const skills = ['JavaScript', 'TypeScript', 'Vue.js', 'React', 'Node.js', 'Python', 'C#', 'Java']
const interests = ['Web Development', 'Game Development', 'Cybersecurity']
const hobbies = ['Coding', 'Gaming', 'Chess', 'Music']
</script>

<style scoped>
.profile-avatar {
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.1);
}

.skill-badge {
  color: #ffffff;
  padding: 0.375rem 0.75rem;
  border: 2px solid #808080;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s;
}

.skill-badge:hover {
  background-color: #1084d0;
  transform: translateY(-1px);
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.2);
}
</style>
