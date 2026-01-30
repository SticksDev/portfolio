<template>
  <div class="h-full overflow-auto p-6">
    <h1 class="text-3xl font-bold mb-6 text-[#000080] border-b-2 border-[#808080] pb-3">Work Experience</h1>

    <div class="space-y-6">
      <!-- Level.io -->
      <div class="experience-card bg-white border-2 border-[#808080] p-5 shadow-md">
        <div class="flex items-start gap-4 mb-4">
          <div class="logo-container bg-white border border-gray-300 p-3 rounded flex items-center justify-center" style="min-width: 100px; height: 80px;">
            <img
              src="https://cdn.prod.website-files.com/65707faecd4cd453c0bb80ad/657087ef22ae05f257ad0b7b_Logo%20(1).svg"
              alt="Level.io"
              class="max-w-full max-h-full object-contain"
            />
          </div>
          <div class="flex-1">
            <h2 class="text-2xl font-bold text-[#000080] mb-1">Support Specialist</h2>
            <h3 class="text-lg font-semibold text-gray-700 mb-2">Level.io</h3>
            <p class="text-sm text-gray-600">October 2024 - Present</p>
          </div>
        </div>
        <div class="ml-0 md:ml-28">
          <p class="text-gray-700 leading-relaxed">
            Currently working as a Support Specialist at Level.io, helping customers solve technical issues and improve their experience with the platform.
            Providing technical support, troubleshooting, and working closely with the engineering team to resolve complex problems.
          </p>
        </div>
      </div>

      <!-- Gordon Food Services -->
      <div class="experience-card bg-white border-2 border-[#808080] p-5 shadow-md">
        <div class="flex items-start gap-4 mb-4">
          <div class="logo-container bg-white border border-gray-300 p-3 rounded flex items-center justify-center" style="min-width: 100px; height: 80px;">
            <img
              src="https://gfs.com/wp-content/uploads/2022/07/logo_gfs.png"
              alt="Gordon Food Services"
              class="max-w-full max-h-full object-contain"
            />
          </div>
          <div class="flex-1">
            <h2 class="text-2xl font-bold text-[#000080] mb-1">Network Engineer / IT Specialist</h2>
            <h3 class="text-lg font-semibold text-gray-700 mb-2">Gordon Food Services</h3>
            <p class="text-sm text-gray-600">June 2022 - June 2024</p>
          </div>
        </div>
        <div class="ml-0 md:ml-28">
          <p class="text-gray-700 leading-relaxed mb-3">
            Worked with Gordon Food Services to help maintain their network infrastructure and provide IT support to employees.
            Responsible for troubleshooting network issues, setting up new network equipment, and providing support with IT issues.
          </p>
          <ul class="list-disc list-inside text-gray-700 space-y-1 text-sm">
            <li>Maintained and troubleshot network infrastructure</li>
            <li>Set up and configured network equipment</li>
            <li>Provided technical support to employees</li>
            <li>Managed IT helpdesk operations</li>
          </ul>
        </div>
      </div>

      <!-- Team Hydra -->
      <div class="experience-card bg-white border-2 border-[#808080] p-5 shadow-md">
        <div class="flex items-start gap-4 mb-4">
          <div class="logo-container bg-white border border-gray-300 p-3 rounded flex items-center justify-center" style="min-width: 100px; height: 80px;">
            <img
              src="https://hep.gg/hydralogo"
              alt="Team Hydra"
              class="max-w-full max-h-full object-contain"
            />
          </div>
          <div class="flex-1">
            <h2 class="text-2xl font-bold text-[#000080] mb-1">Software Developer</h2>
            <h3 class="text-lg font-semibold text-gray-700 mb-2">Team Hydra</h3>
            <p class="text-sm text-gray-600">September 2020 - Present</p>
          </div>
        </div>
        <div class="ml-0 md:ml-28">
          <p class="text-gray-700 leading-relaxed mb-3">
            Working with Team Hydra on a variety of projects, including developing web applications, mobile apps, Discord bots, and APIs.
            Great team environment with continuous learning opportunities.
          </p>
          <ul class="list-disc list-inside text-gray-700 space-y-1 text-sm">
            <li>Developed web applications and APIs</li>
            <li>Built Discord bots and integrations</li>
            <li>Created mobile applications</li>
            <li>Collaborated on various client projects</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No script needed for static content
</script>

<style scoped>
.experience-card {
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.experience-card:hover {
  transform: translateY(-2px);
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.15);
}

.logo-container img {
  filter: grayscale(0%);
  transition: filter 0.2s;
}

.logo-container:hover img {
  filter: grayscale(0%) brightness(1.1);
}
</style>
