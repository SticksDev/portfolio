<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="h-full overflow-auto p-6">
    <h1 class="text-3xl font-bold mb-6 text-[#000080] border-b-2 border-[#808080] pb-3">Contact Me</h1>

    <p class="text-gray-700 mb-6 leading-relaxed">
      I'd love to hear from you! Whether you have a question, want to collaborate, or just want to say hi,
      feel free to reach out through any of the following channels.
    </p>

    <!-- Contact Cards -->
    <div class="space-y-4">
      <!-- Email Card -->
      <a
        href="mailto:tanner@teamhydra.dev"
        class="contact-card bg-white border-2 border-[#808080] p-5 shadow-md flex items-start gap-4 hover:border-[#000080] transition-colors group"
      >
        <div class="contact-icon bg-[#000080] border-2 border-[#808080] w-16 h-16 flex items-center justify-center group-hover:bg-[#1084d0] transition-colors">
          <Mail :size="32" color="#ffffff" />
        </div>
        <div class="flex-1">
          <h3 class="text-xl font-bold text-[#000080] mb-1">Email</h3>
          <p class="text-gray-600 text-sm mb-2">Best for professional inquiries and projects</p>
          <p class="text-[#000080] font-mono text-lg">tanner@teamhydra.dev</p>
        </div>
      </a>

      <!-- Discord Card -->
      <a
        href="https://discord.gg/zira"
        target="_blank"
        class="contact-card bg-white border-2 border-[#808080] p-5 shadow-md flex items-start gap-4 hover:border-[#000080] transition-colors group"
      >
        <div class="contact-icon bg-[#5865F2] border-2 border-[#808080] w-16 h-16 flex items-center justify-center group-hover:bg-[#4752C4] transition-colors">
          <DiscordIcon :size="32" style="color: white" />
        </div>
        <div class="flex-1">
          <h3 class="text-xl font-bold text-[#000080] mb-1">Discord</h3>
          <p class="text-gray-600 text-sm mb-2">Join the Discord server for casual conversations</p>
          <p class="text-gray-700 mb-1">
            <span class="font-semibold">Username:</span> <span class="font-mono">sticksdev</span>
          </p>
          <p class="text-gray-700">
            <span class="font-semibold">Channel:</span> #other-support
          </p>
        </div>
      </a>

      <!-- GitHub Card -->
      <a
        href="https://github.com/SticksDev"
        target="_blank"
        class="contact-card bg-white border-2 border-[#808080] p-5 shadow-md flex items-start gap-4 hover:border-[#000080] transition-colors group"
      >
        <div class="contact-icon bg-[#24292e] border-2 border-[#808080] w-16 h-16 flex items-center justify-center group-hover:bg-[#1a1e22] transition-colors text-white">
          <GitHubIcon :size="32" style="color: white" />
        </div>
        <div class="flex-1">
          <h3 class="text-xl font-bold text-[#000080] mb-1">GitHub</h3>
          <p class="text-gray-600 text-sm mb-2">Check out my projects and contributions</p>
          <p class="text-[#000080] font-mono">@SticksDev</p>
        </div>
      </a>
    </div>

    <!-- Response Time Note -->
    <div class="mt-6 bg-[#ffffcc] border-2 border-[#808080] p-4">
      <p class="text-sm text-gray-700">
        <Lightbulb :size="16" class="inline mr-1 text-yellow-600" />
        <span class="font-bold">Note:</span> I typically respond within 24-48 hours. Looking forward to connecting with you!
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Mail, Lightbulb } from 'lucide-vue-next'
import { GitHubIcon, DiscordIcon } from 'vue3-simple-icons'
</script>

<style scoped>
.contact-card {
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.contact-card:hover {
  transform: translateY(-2px);
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.15);
}

.contact-icon {
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.2);
}
</style>
