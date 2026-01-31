<template>
  <div class="h-full overflow-auto p-6">
    <h1 class="text-3xl font-bold mb-6 text-[#000080] border-b-2 border-[#808080] pb-3">
      Work Experience
    </h1>

    <div class="space-y-6">
      <div
        v-for="experience in experiences"
        :key="experience.company"
        class="experience-card bg-white border-2 border-[#808080] p-5 shadow-md"
      >
        <div class="flex items-start gap-4 mb-4">
          <div
            class="logo-container bg-white border border-gray-300 p-3 rounded flex items-center justify-center"
            style="min-width: 100px; height: 80px;"
          >
            <img
              :src="experience.logo"
              :alt="experience.company"
              class="max-w-full max-h-full object-contain"
            />
          </div>

          <div class="flex-1">
            <h2 class="text-2xl font-bold text-[#000080] mb-1">
              {{ experience.title }}
            </h2>
            <h3 class="text-lg font-semibold text-gray-700 mb-2">
              {{ experience.company }}
            </h3>
            <p class="text-sm text-gray-600">
              {{ experience.dates }}
            </p>
          </div>
        </div>

        <div class="ml-0 md:ml-28">
          <p
            v-if="experience.description"
            class="text-gray-700 leading-relaxed mb-3"
          >
            {{ experience.description }}
          </p>

          <ul
            v-if="experience.bullets?.length"
            class="list-disc list-inside text-gray-700 space-y-1 text-sm"
          >
            <li v-for="bullet in experience.bullets" :key="bullet">
              {{ bullet }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const experiences = [
  {
    company: "Team Hydra",
    title: "Software Developer",
    dates: "September 2020 - Present",
    logo: "https://hep.gg/hydralogo",
    description:
      "Working with Team Hydra on a variety of projects, including developing web applications, mobile apps, Discord bots, and APIs. Great team environment with continuous learning opportunities.",
    bullets: [
      "Developed web applications and APIs",
      "Built Discord bots and integrations",
      "Created mobile applications",
      "Collaborated on various client projects"
    ]
  },
  {
    company: "Level.io",
    title: "Support Specialist",
    dates: "October 2024 - Present",
    logo:
      "https://cdn.prod.website-files.com/65707faecd4cd453c0bb80ad/657087ef22ae05f257ad0b7b_Logo%20(1).svg",
    description:
      "Currently working as a Support Specialist at Level.io, helping customers solve technical issues and improve their experience with the platform. Providing technical support, troubleshooting, and working closely with the engineering team to resolve complex problems."
  },
  {
    company: "Gordon Food Services",
    title: "Network Engineer / IT Specialist",
    dates: "June 2022 - June 2024",
    logo: "https://gfs.com/wp-content/uploads/2022/07/logo_gfs.png",
    description:
      "Worked with Gordon Food Services to help maintain their network infrastructure and provide IT support to employees.",
    bullets: [
      "Maintained and troubleshot network infrastructure",
      "Set up and configured network equipment",
      "Provided technical support to employees",
      "Managed IT helpdesk operations"
    ]
  }
];
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
